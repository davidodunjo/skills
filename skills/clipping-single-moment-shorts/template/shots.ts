// One entry per jump cut, in order. Times are in the clip file's own seconds; the timeline is the
// shots laid end to end, so any gap between one shot's `to` and the next one's `from` is cut out.
// `center` is the source pixel the 9:16 crop centres on; `zoom` 1 shows the full 1080 px height.

export const SOURCE_URL = "https://www.youtube.com/watch?v=VIDEO_ID";
export const CLIP = "a-roll/moment.mp4";
/** Source time, in seconds into the full video, of the clip file's first frame (printed by clip.py). */
export const FILE_ZERO = 0;

export interface Shot {
  from: number;
  to: number;
  center: [x: number, y: number];
  /** 1 or more. */
  zoom: number;
}

export const SHOTS: Shot[] = [
  { from: 8, to: 12, center: [960, 540], zoom: 1 },
  { from: 12.5, to: 16, center: [960, 420], zoom: 1.3 },
];

export type Speaker = "main" | "second" | "offCamera";

/** Who is speaking on camera, by file time. Words outside every range belong to the off-camera voice. */
export const SPEAKERS: { speaker: Exclude<Speaker, "offCamera">; from: number; to: number }[] = [
  { speaker: "main", from: 8, to: 16 },
];

/** Names the transcript mishears, lowercase as heard → as they should read. */
export const FIXES: Record<string, string> = {};

/** Punchline beat for the colour flash, in file time. */
export const PUNCH = 15;

/** Sound effects, in file time. Not rendered yet; see the skill's Sound effects section. */
export const SFX: { file: string; at: number }[] = [];
