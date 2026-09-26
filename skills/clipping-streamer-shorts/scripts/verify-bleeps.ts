// Checks an exported Short against its bleeps.ts: inside each window the 1 kHz tone must rise well above the
// half second before it, and everything outside that band (the speech) must sit well below the Short's average.
// usage: bun verify-bleeps.ts <project-dir> <export.mp4>
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Bleep } from "../template/bleeps";

const TONE = "bandpass=f=1000:w=5,bandpass=f=1000:w=5";
const SPEECH = "bandreject=f=1000:w=300,bandreject=f=1000:w=300";
const LOOKBACK = 0.5;
const MIN_TONE_RISE = 10;
const MIN_SPEECH_DROP = 10;

const [projectArg, exported] = Bun.argv.slice(2);
if (!projectArg || !exported) throw new Error("usage: bun verify-bleeps.ts <project-dir> <export.mp4>");
const { BLEEPS }: { BLEEPS: Bleep[] } = await import(pathToFileURL(join(resolve(projectArg), "bleeps.ts")).href);
if (BLEEPS.length === 0) {
  console.log("no bleeps to verify");
  process.exit(0);
}

const speechAverage = meanVolume(SPEECH);
let failures = 0;
for (const bleep of BLEEPS) {
  const window = [bleep.timelineTime, bleep.duration] as const;
  const toneRise = meanVolume(TONE, window) - meanVolume(TONE, [bleep.timelineTime - LOOKBACK, LOOKBACK]);
  const speechDrop = speechAverage - meanVolume(SPEECH, window);
  const ok = toneRise >= MIN_TONE_RISE && speechDrop >= MIN_SPEECH_DROP;
  if (!ok) failures++;
  console.log(`#${bleep.rank} @${bleep.timelineTime}s  tone rise ${toneRise.toFixed(1)} dB  speech drop ${speechDrop.toFixed(1)} dB  ${ok ? "ok" : "FAIL"}`);
}
if (failures > 0) throw new Error(`${failures} of ${BLEEPS.length} bleeps failed`);

function meanVolume(filter: string, [from, duration]: readonly [number, number] = [0, Infinity]): number {
  const window = duration === Infinity ? [] : ["-ss", String(from), "-t", String(duration)];
  const ffmpeg = Bun.spawnSync([
    "ffmpeg", "-hide_banner", "-nostats", ...window, "-i", exported!, "-vn", "-af", `${filter},volumedetect`, "-f", "null", "-",
  ]);
  const log = ffmpeg.stderr.toString();
  const mean = log.match(/mean_volume: (-?[\d.]+|-inf) dB/)?.[1];
  if (ffmpeg.exitCode !== 0 || mean === undefined) throw new Error(`ffmpeg failed at ${from}s: ${log.slice(-500)}`);
  return mean === "-inf" ? -120 : Number(mean);
}
