export interface Segment {
  rank: number;
  /** Library path of the clip under assets/. */
  src: string;
  /** Source time, in seconds into the full video, of the clip file's first frame (printed by clip.py). */
  fileZero: number;
  /** Trim in the clip file's own time. */
  sourceIn: number;
  sourceOut: number;
}

export const SOURCE_URL = "https://www.youtube.com/watch?v=VIDEO_ID";

/** Playback order: the countdown runs #3, #2, #1. */
export const SEGMENTS: Segment[] = [
  { rank: 3, src: "a-roll/moment-3.mp4", fileZero: 0, sourceIn: 8, sourceOut: 22 },
  { rank: 2, src: "a-roll/moment-2.mp4", fileZero: 0, sourceIn: 8, sourceOut: 23 },
  { rank: 1, src: "a-roll/moment-1.mp4", fileZero: 0, sourceIn: 8, sourceOut: 30 },
];
