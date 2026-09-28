// Checks an exported Short against its bleeps.ts: inside each window the 1 kHz tone must rise well above
// the track's non-bleep baseline, and everything outside that band (the speech) must sit well below the
// Short's average. Adapted from the sibling skill's verify-bleeps.ts for this skill's bleeps.ts shape (no
// `rank` field, since there is only one clip).
// The tone baseline is measured once, over the whole track with every bleep window cut out (an `aselect`
// complement of the same `between(t,...)` windows `make-words.ts` uses to build the bleep track itself),
// rather than the half second immediately before each bleep: on a swear-heavy rant bleeps can land under
// half a second apart, and a per-bleep lookback then samples the tail of the PREVIOUS bleep's own tone as
// its "before" baseline, understating the rise and false-failing bleeps that landed fine (verified by hand
// on Short #005: every window measured the same ~-21 to -23 dB tone against an ~-80 dB silence floor).
// usage: bun verify-bleeps.ts <project-dir> <export.mp4>
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Bleep } from "../template/bleeps";

const TONE = "bandpass=f=1000:w=5,bandpass=f=1000:w=5";
const SPEECH = "bandreject=f=1000:w=300,bandreject=f=1000:w=300";
const MIN_TONE_RISE = 10;
const MIN_SPEECH_DROP = 10;

const [projectArg, exported] = Bun.argv.slice(2);
if (!projectArg || !exported) throw new Error("usage: bun verify-bleeps.ts <project-dir> <export.mp4>");
const { BLEEPS }: { BLEEPS: Bleep[] } = await import(pathToFileURL(join(resolve(projectArg), "bleeps.ts")).href);
if (BLEEPS.length === 0) {
  console.log("no bleeps to verify");
  process.exit(0);
}

const bleepWindows = BLEEPS.map((b) => `between(t,${b.timelineTime},${b.timelineTime + b.duration})`).join("+");
const speechAverage = meanVolume(SPEECH);
const toneBaseline = meanVolume(TONE, undefined, `not(${bleepWindows})`);
let failures = 0;
for (const bleep of BLEEPS) {
  const window = [bleep.timelineTime, bleep.duration] as const;
  const toneRise = meanVolume(TONE, window) - toneBaseline;
  const speechDrop = speechAverage - meanVolume(SPEECH, window);
  const ok = toneRise >= MIN_TONE_RISE && speechDrop >= MIN_SPEECH_DROP;
  if (!ok) failures++;
  console.log(`@${bleep.timelineTime}s  tone rise ${toneRise.toFixed(1)} dB  speech drop ${speechDrop.toFixed(1)} dB  ${ok ? "ok" : "FAIL"}`);
}
if (failures > 0) throw new Error(`${failures} of ${BLEEPS.length} bleeps failed`);

function meanVolume(filter: string, window?: readonly [number, number], select?: string): number {
  const seek = window ? ["-ss", String(window[0]), "-t", String(window[1])] : [];
  const chain = select ? `${filter},aselect='${select}',asetpts=N/SR/TB,volumedetect` : `${filter},volumedetect`;
  const ffmpeg = Bun.spawnSync(["ffmpeg", "-hide_banner", "-nostats", ...seek, "-i", exported!, "-vn", "-af", chain, "-f", "null", "-"]);
  const log = ffmpeg.stderr.toString();
  const mean = log.match(/mean_volume: (-?[\d.]+|-inf) dB/)?.[1];
  if (ffmpeg.exitCode !== 0 || mean === undefined) throw new Error(`ffmpeg failed: ${log.slice(-500)}`);
  return mean === "-inf" ? -120 : Number(mean);
}
