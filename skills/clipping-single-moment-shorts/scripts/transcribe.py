"""Transcribe audio locally with faster-whisper and write YouTube-shaped json3 with word timings,
so make-words.ts reads it exactly as it reads YouTube's auto-captions.

usage: python transcribe.py <audio> <out.json3> [--model base.en]

Runs on the CPU (int8), prints each segment as it lands. base.en takes about 4 minutes for
14 minutes of audio on a laptop CPU; the model (~145 MB) downloads on first use.
"""
import argparse
import json
import os

os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")

from faster_whisper import WhisperModel  # noqa: E402  (the environment must be set before import)


def main():
    args = parse_args()
    model = WhisperModel(args.model, device="cpu", compute_type="int8")
    segments, _ = model.transcribe(args.audio, word_timestamps=True, vad_filter=True)

    events = []
    for segment in segments:
        words = list(segment.words or [])
        if not words:
            continue
        start = round(words[0].start * 1000)
        events.append({
            "tStartMs": start,
            "segs": [{"utf8": word.word, "tOffsetMs": round(word.start * 1000) - start} for word in words],
        })
        print(f"[{clock(segment.start)}] {segment.text.strip()}", flush=True)

    if not events:
        raise SystemExit("no speech found")
    with open(args.out, "w", encoding="utf8") as file:
        json.dump({"events": events}, file)


def parse_args():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("audio")
    parser.add_argument("out")
    parser.add_argument("--model", default="base.en", help="faster-whisper model (default base.en)")
    return parser.parse_args()


def clock(seconds):
    return f"{int(seconds // 60)}:{seconds % 60:05.2f}"


if __name__ == "__main__":
    main()
