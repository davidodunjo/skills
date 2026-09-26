import { For } from "solid-js";
import { CLIP, PUNCH, SHOTS, type Shot, type Speaker } from "./shots";
import { WORDS } from "./words";

/** @inspect font path="Captions/Font" */
const captionFont = "Bahnschrift";

/** @inspect number path="Captions/Size" min=60 max=220 step=2 */
const captionSize = 132;

/** @inspect number path="Captions/Y" min=900 max=1700 step=10 */
const captionY = 1180;

/** @inspect color path="Captions/Main speaker" */
const mainColor = "#FFFFFF";

/** @inspect color path="Captions/Second speaker" */
const secondColor = "#FFE14D";

/** @inspect color path="Captions/Off camera" */
const offCameraColor = "#FF7AD9";

/** @inspect color path="Flash/Color" */
const flashColor = "#39FF14";

const W = 1080;
const H = 1920;
const SOURCE_W = 1920;
const SOURCE_H = 1080;
const FLASH_LENGTH = 0.35;

const SPEAKER_COLORS: Record<Speaker, string> = { main: mainColor, second: secondColor, offCamera: offCameraColor };

const starts = SHOTS.map((_, i) => SHOTS.slice(0, i).reduce((sum, shot) => sum + shot.to - shot.from, 0));
const punchShot = SHOTS.findIndex((shot) => PUNCH >= shot.from && PUNCH < shot.to);
if (punchShot < 0) throw new Error(`PUNCH ${PUNCH} falls outside every shot`);
const PUNCH_AT = starts[punchShot]! + PUNCH - SHOTS[punchShot]!.from;

/** Scales the whole frame so a 9:16 region around the shot's center, clamped to the source, fills the scene. */
function crop(shot: Shot) {
  const regionH = SOURCE_H / shot.zoom;
  const regionW = regionH * (W / H);
  const scale = H / regionH;
  const cx = Math.min(Math.max(shot.center[0], regionW / 2), SOURCE_W - regionW / 2);
  const cy = Math.min(Math.max(shot.center[1], regionH / 2), SOURCE_H - regionH / 2);
  return { width: SOURCE_W * scale, height: SOURCE_H * scale, x: W / 2 - cx * scale, y: H / 2 - cy * scale };
}

export default function Project() {
  return (
    <stage background="#161616">
      <scene id="short" name="streamer-does-something" width={W} height={H} fill="black" active>
        <sequence name="Shots">
          <For each={SHOTS}>
            {(shot, i) => <video src={CLIP} start={starts[i()]!} sourceIn={shot.from} sourceOut={shot.to} {...crop(shot)} />}
          </For>
        </sequence>

        <rect name="Punch flash" x={0} y={0} width={W} height={H} fill={flashColor} blendMode="color" opacity={0.55} start={PUNCH_AT} end={PUNCH_AT + FLASH_LENGTH}>
          <animation type="fade" phase="out" duration={0.25} />
        </rect>

        <For each={WORDS}>
          {(word) => (
            <text
              x={40}
              y={captionY - 120}
              width={W - 80}
              height={240}
              textAlign="center"
              textBaseline="middle"
              fontFamily={captionFont}
              fontWeight={700}
              fontSize={captionSize}
              color={SPEAKER_COLORS[word.speaker]}
              start={word.start}
              end={word.end}
            >
              {word.text}
              <stroke color="#000000" width={16} join="round" />
            </text>
          )}
        </For>
      </scene>
    </stage>
  );
}
