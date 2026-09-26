"""Download moments of a YouTube video as sync-safe MP4 clips, fetching only the bytes they cover.

usage: python clip.py <url> <project_dir> <name>=<start>-<end> ... [--pad 8] [--video 303] [--audio 251] [--estimate]

Times are source seconds or clock strings (1:21:48). Each padded range is cut from the WebM streams
by their Cues index (header + covering clusters), then muxed to <project_dir>/assets/a-roll/<name>.mp4
with the audio trimmed to the video's first frame. --estimate prints the download size and stops.
"""
import argparse
import json
import subprocess
import tempfile
import urllib.request
from pathlib import Path

HEADER_BYTES = 1 << 20
SYNC_TOLERANCE = 0.05
EBML = bytes.fromhex("1A45DFA3")
SEGMENT = bytes.fromhex("18538067")
CLUSTER = bytes.fromhex("1F43B675")
INFO, TIMECODE_SCALE = 0x1549A966, 0x2AD7B1
CUES, CUE_TIME, CUE_POSITIONS, CUE_CLUSTER = 0x1C53BB6B, 0xB3, 0xB7, 0xF1


def main():
    args = parse_args()
    moments = [(name, max(0.0, start - args.pad), end + args.pad, start, end) for name, start, end in args.moments]
    video, audio = (WebmStream(stream_url(args.url, fmt)) for fmt in (args.video, args.audio))

    sizes = {name: video.size_of(a, b) + audio.size_of(a, b) for name, a, b, *_ in moments}
    for name, size in sizes.items():
        print(f"{name}: {mb(size)}")
    print(f"total: {mb(sum(sizes.values()))}")
    if args.estimate:
        return

    a_roll = args.project / "assets" / "a-roll"
    a_roll.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as scratch:
        for name, padded_start, padded_end, start, end in moments:
            video_part, audio_part = Path(scratch, f"{name}.v.webm"), Path(scratch, f"{name}.a.webm")
            video.download(padded_start, padded_end, video_part)
            audio.download(padded_start, padded_end, audio_part)
            file_zero = mux(video_part, audio_part, a_roll / f"{name}.mp4")
            segment = {
                "src": f"a-roll/{name}.mp4",
                "fileZero": file_zero,
                "sourceIn": round(start - file_zero, 3),
                "sourceOut": round(end - file_zero, 3),
            }
            print(json.dumps(segment))


def parse_args():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("url")
    parser.add_argument("project", type=Path)
    parser.add_argument("moments", nargs="+", type=moment, metavar="name=start-end")
    parser.add_argument("--pad", type=float, default=8, help="seconds added to each side (default 8)")
    parser.add_argument("--video", default="303", help="WebM video format id (default 303, VP9 1080p60)")
    parser.add_argument("--audio", default="251", help="WebM audio format id (default 251, Opus)")
    parser.add_argument("--estimate", action="store_true", help="print the download size and stop")
    return parser.parse_args()


def moment(text):
    name, _, span = text.partition("=")
    start, _, end = span.partition("-")
    if not name or not start or not end:
        raise argparse.ArgumentTypeError(f"expected name=start-end, got {text!r}")
    start, end = seconds(start), seconds(end)
    if end <= start:
        raise argparse.ArgumentTypeError(f"{name} ends before it starts")
    return name, start, end


def seconds(clock):
    total = 0.0
    for part in clock.split(":"):
        total = total * 60 + float(part)
    return total


def stream_url(url, fmt):
    return run(["yt-dlp", "-f", fmt, "-g", url]).strip()


class WebmStream:
    def __init__(self, url):
        self.url = url
        head, self.total = fetch(url, 0, HEADER_BYTES - 1)
        if not head.startswith(EBML):
            raise SystemExit("not a WebM stream: pick VP9/Opus format ids from `yt-dlp -F`")
        segment_start = head.find(SEGMENT)
        first_cluster = head.find(CLUSTER)
        if segment_start < 0 or first_cluster < 0:
            raise SystemExit(f"segment header does not fit in the first {mb(HEADER_BYTES)}")
        _, size_at = vint(head, segment_start, keep_marker=True)
        _, data = vint(head, size_at)
        self.header = head[:first_cluster]
        self.cues = parse_cues(head, data, first_cluster)

    def byte_range(self, start, end):
        first = max((pos for time, pos in self.cues if time <= start), default=self.cues[0][1])
        after = [pos for time, pos in self.cues if time > end]
        return first, (min(after) - 1 if after else self.total - 1)

    def size_of(self, start, end):
        first, last = self.byte_range(start, end)
        return len(self.header) + last - first + 1

    def download(self, start, end, path):
        body, _ = fetch(self.url, *self.byte_range(start, end))
        path.write_bytes(self.header + body)


def parse_cues(head, data, first_cluster):
    scale, cues = 1_000_000, []
    for element, start, end in elements(head, data, first_cluster):
        if element == INFO:
            for child, cs, ce in elements(head, start, end):
                if child == TIMECODE_SCALE:
                    scale = uint(head, cs, ce)
        if element == CUES:
            for _, ps, pe in elements(head, start, end):
                time = position = None
                for child, cs, ce in elements(head, ps, pe):
                    if child == CUE_TIME:
                        time = uint(head, cs, ce) * scale / 1e9
                    if child == CUE_POSITIONS:
                        for track, ts, te in elements(head, cs, ce):
                            if track == CUE_CLUSTER:
                                position = data + uint(head, ts, te)
                cues.append((time, position))
    if not cues:
        raise SystemExit("no Cues in the stream header, so ranges cannot be cut by byte")
    return cues


def elements(buffer, start, end):
    at = start
    while at < end:
        element, size_at = vint(buffer, at, keep_marker=True)
        size, data = vint(buffer, size_at)
        yield element, data, data + size
        at = data + size


def vint(buffer, at, keep_marker=False):
    first, length, marker = buffer[at], 1, 0x80
    while not first & marker:
        marker >>= 1
        length += 1
    value = first if keep_marker else first & (marker - 1)
    for byte in buffer[at + 1:at + length]:
        value = value << 8 | byte
    return value, at + length


def uint(buffer, start, end):
    return int.from_bytes(buffer[start:end], "big")


def fetch(url, first, last):
    request = urllib.request.Request(url, headers={"Range": f"bytes={first}-{last}", "User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request) as response:
        if response.status != 206:
            raise SystemExit(f"server ignored the byte range (HTTP {response.status})")
        total = int(response.headers["Content-Range"].rsplit("/", 1)[1])
        return response.read(), total


def mux(video_part, audio_part, output):
    """Joins the parts starting both at the video's first frame; returns that frame's source time."""
    video_zero, audio_zero = first_pts(video_part, "v:0"), first_pts(audio_part, "a:0")
    lead = video_zero - audio_zero
    align = f"atrim=start={lead:.3f}" if lead >= 0 else f"adelay={-lead * 1000:.0f}:all=1"
    run([
        "ffmpeg", "-v", "error", "-y", "-i", str(video_part), "-i", str(audio_part),
        "-map", "0:v", "-map", "1:a", "-c:v", "copy",
        "-af", f"{align},asetpts=PTS-STARTPTS", "-c:a", "aac", "-b:a", "192k", "-shortest", str(output),
    ])
    starts = first_pts(output, "v:0"), first_pts(output, "a:0")
    if max(map(abs, starts)) > SYNC_TOLERANCE:
        raise SystemExit(f"{output.name}: streams start at {starts}, expected both at 0")
    return round(video_zero, 3)


def first_pts(path, stream):
    probe = json.loads(run([
        "ffprobe", "-v", "error", "-select_streams", stream, "-show_entries", "packet=pts_time",
        "-read_intervals", "%+#1", "-of", "json", str(path),
    ]))
    if not probe.get("packets"):
        raise SystemExit(f"{path.name}: no {stream} packets")
    return float(probe["packets"][0]["pts_time"])


def run(command):
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        raise SystemExit(f"{command[0]} failed: {result.stderr.strip()}")
    return result.stdout


def mb(size):
    return f"{size / 1_048_576:.1f} MB"


if __name__ == "__main__":
    main()
