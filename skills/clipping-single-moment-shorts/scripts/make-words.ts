// Builds a Short's words.ts from a json3 transcript: one caption word per entry, placed on the cut-down
// timeline its shots.ts describes (gaps between shots are cut), with its speaker, names fixed and swears masked.
// Also writes bleeps.ts and assets/sfx/bleep-track.wav for every masked swear: a single timeline-long track,
// a 1 kHz tone only inside each bleep window, silence elsewhere, the same approach as the sibling's captions.ts.
// usage: bun make-words.ts <project-dir> <transcript.json3>
import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type * as ShotsModule from "../template/shots";
import type { Bleep } from "../template/bleeps";

const MASKS: Record<string, string> = {
  fuck: "f**k",
  fucking: "f**king",
  fuckin: "f**kin",
  fucked: "f**ked",
  shit: "sh*t",
  bullshit: "bullsh*t",
  bitch: "b***h",
  bitches: "b***hes",
};
const YOUTUBE_CENSORED = "[ __ ]";
const MAX_HOLD = 0.8;
const MIN_HOLD = 0.08;
const BLEEP_LEAD = 0.05;
const BLEEP_MIN = 0.25;
const BLEEP_MAX = 0.5;
const TONE_GAIN = 4; // ffmpeg's sine is 1/8 amplitude

interface Json3 {
  events: { tStartMs: number; segs?: { utf8: string; tOffsetMs?: number }[] }[];
}

const [projectArg, transcriptPath] = Bun.argv.slice(2);
if (!projectArg || !transcriptPath) throw new Error("usage: bun make-words.ts <project-dir> <transcript.json3>");
const project = resolve(projectArg);
const { FILE_ZERO, SHOTS, SPEAKERS, FIXES }: typeof ShotsModule = await import(pathToFileURL(join(project, "shots.ts")).href);
const { events }: Json3 = await Bun.file(transcriptPath).json();

const spoken = events
  .flatMap((event) =>
    (event.segs ?? []).map((seg) => ({
      at: (event.tStartMs + (seg.tOffsetMs ?? 0)) / 1000 - FILE_ZERO,
      text: seg.utf8.replace(/>>/g, "").trim(),
    })),
  )
  .filter((word) => word.text && (word.text === YOUTUBE_CENSORED || !word.text.startsWith("[")))
  // Drop stray punctuation-only tokens (e.g. a lone "-" json3 sometimes emits between words), which
  // would otherwise render as a caption of their own and can carry a zero-width timestamp.
  .filter((word) => word.text === YOUTUBE_CENSORED || /[a-z0-9]/i.test(word.text));

const words: { text: string; speaker: ShotsModule.Speaker; start: number; end: number }[] = [];
const bleeps: Bleep[] = [];

// A shot's `to` only marks a real audio cut when the next shot doesn't pick up exactly where it left
// off; back-to-back shots sharing a boundary (a punch-in reframe, not a pause) remove no audio in
// between, so a swear's bleep duration should keep looking for the next spoken word across it instead
// of getting truncated at a boundary that isn't actually a cut.
function runEnd(shotIndex: number): number {
  let i = shotIndex;
  while (i + 1 < SHOTS.length && SHOTS[i]!.to === SHOTS[i + 1]!.from) i++;
  return SHOTS[i]!.to;
}

let timelineStart = 0;
for (const [shotIndex, shot] of SHOTS.entries()) {
  const inShot = spoken.filter((word) => word.at >= shot.from && word.at < shot.to);
  inShot.forEach((word, i) => {
    const next = inShot[i + 1]?.at ?? shot.to;
    const start = timelineStart + word.at - shot.from;
    words.push({
      text: clean(word.text),
      speaker: SPEAKERS.find((s) => word.at >= s.from && word.at < s.to)?.speaker ?? "offCamera",
      start: round(start),
      // json3 transcripts occasionally stamp two consecutive words at (or almost at) the same source
      // time; without a floor here that word would render as a zero-duration caption a `check short`
      // flags as dead. MIN_HOLD guarantees a visible caption even when the transcript gives no gap.
      end: round(start + Math.min(Math.max(next - word.at, MIN_HOLD), MAX_HOLD)),
    });
    if (!isSwear(word.text)) return;
    const bleepBound = runEnd(shotIndex);
    const nextForBleep = spoken.find((w) => w.at > word.at && w.at < bleepBound)?.at ?? bleepBound;
    const uncappedSourceStart = word.at - BLEEP_LEAD;
    const duration = Math.min(Math.max(nextForBleep - word.at + BLEEP_LEAD, BLEEP_MIN), BLEEP_MAX);
    const sourceEnd = uncappedSourceStart + duration;
    // The lead-in is clamped to the shot's own start: a swear sitting right at a shot's edge would
    // otherwise lead into the cut gap (or the neighbouring shot, which isn't muted there), letting a
    // sliver of un-muted original speech play under the tone — the bleep track itself doesn't know about
    // shot boundaries, so without this clamp that lead-in plays regardless of what's actually muted
    // underneath it. The end point stays fixed, so clamping the start only ever shortens the bleep.
    const sourceStart = Math.max(uncappedSourceStart, shot.from);
    bleeps.push({
      sourceTime: round(sourceStart),
      timelineTime: round(Math.max(start - BLEEP_LEAD, timelineStart)),
      duration: round(Math.max(sourceEnd - sourceStart, 0.05)),
    });
  });
  timelineStart += shot.to - shot.from;
}
if (words.length === 0) throw new Error("no transcript words fall inside the shots; check FILE_ZERO and the transcript");

await Bun.write(join(project, "words.ts"), wordsModule());
await Bun.write(join(project, "bleeps.ts"), bleepsModule());
renderBleepTrack(join(project, "assets", "sfx"), timelineStart);
console.log(`${words.length} words, ${bleeps.length} bleeps, ${round(timelineStart)}s timeline`);

function isSwear(text: string): boolean {
  return text.replace(/[.,?!]+$/, "").toLowerCase() in MASKS;
}

function clean(text: string): string {
  if (text === YOUTUBE_CENSORED) return "****";
  return text
    .replace(/[.,?!]+$/, "")
    .replace(/[a-z]+/gi, (word) => FIXES[word.toLowerCase()] ?? MASKS[word.toLowerCase()] ?? word)
    .toUpperCase();
}

function round(seconds: number): number {
  return Math.round(seconds * 1000) / 1000;
}

function wordsModule(): string {
  return `// Generated by make-words.ts. Do not edit.
import type { Speaker } from "./shots";

export const WORDS: { text: string; speaker: Speaker; start: number; end: number }[] = ${JSON.stringify(words, null, 1)};
`;
}

function bleepsModule(): string {
  return `// Generated by make-words.ts. Do not edit.
export interface Bleep {
  /** Start in the clip file's own time, where volume keyframes live. */
  sourceTime: number;
  timelineTime: number;
  duration: number;
}

export const BLEEPS: Bleep[] = ${JSON.stringify(bleeps, null, 2)};
`;
}

function renderBleepTrack(folder: string, duration: number): void {
  mkdirSync(folder, { recursive: true });
  const windows = bleeps.map((bleep) => `between(t,${bleep.timelineTime},${round(bleep.timelineTime + bleep.duration)})`);
  const audible = windows.length > 0 ? windows.join("+") : "0";
  const ffmpeg = Bun.spawnSync([
    "ffmpeg", "-v", "error", "-y",
    "-f", "lavfi", "-i", `sine=frequency=1000:duration=${round(duration)}`,
    "-af", `volume=${TONE_GAIN},volume=0:enable='not(${audible})'`,
    join(folder, "bleep-track.wav"),
  ]);
  if (ffmpeg.exitCode !== 0) throw new Error(`ffmpeg failed: ${ffmpeg.stderr.toString()}`);
}
