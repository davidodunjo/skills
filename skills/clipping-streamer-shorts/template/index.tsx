import { For } from "solid-js";
import type { TransitionSpec } from "@diffusionstudio/jsx";
import { BLEEPS } from "./bleeps";
import { SEGMENTS, type Segment } from "./segments";

type Region = [x: number, y: number, width: number, height: number];

/** @inspect text path="Content/Title" */
const title = "STREAMER vs STREAMER · HOOK";

/** @inspect color path="Brand/Accent" */
const accent = "#A47CFF";

/** @inspect font path="Brand/Font" */
const fontFamily = "Inter";

/** @inspect number path="Captions/Offset" min=0 max=900 step=10 */
const captionsOffset = 720;

/** @inspect number path="Audio/Bleep volume" min=-40 max=0 step=1 */
const bleepVolume = -12;

const W = 1080;
const H = 1920;
const SOURCE_W = 1920;
const SOURCE_H = 1080;
const CONTENT_TOP = 440;
const CONTENT_HEIGHT = 1120;
const SPLIT_TOP_HEIGHT = 520;
const MUTE = -60;
const TRANSITION: TransitionSpec = { type: "fadeToWhite", duration: 0.3 };

interface Shot {
  region: Region;
  box: Region;
  audible: boolean;
}

/** Framing per rank, in source pixels, read off `media grab` contact sheets. */
const SHOTS: Record<number, Shot[]> = {
  3: split([460, 200, 1000, 480], [1470, 30, 450, 250]),
  2: single([300, 0, 1300, 1080]),
  1: single([1474, 0, 442, 296]),
};

/** Gameplay stacked over facecam; only the gameplay shot carries audio. */
function split(gameplay: Region, facecam: Region): Shot[] {
  return [
    { region: gameplay, box: [0, CONTENT_TOP, W, SPLIT_TOP_HEIGHT], audible: true },
    { region: facecam, box: [0, CONTENT_TOP + SPLIT_TOP_HEIGHT, W, CONTENT_HEIGHT - SPLIT_TOP_HEIGHT], audible: false },
  ];
}

/** One region at full width, centered in the content area. */
function single(region: Region): Shot[] {
  const height = region[3] * (W / region[2]);
  return [{ region, box: [0, CONTENT_TOP + (CONTENT_HEIGHT - height) / 2, W, height], audible: true }];
}

const length = (segment: Segment) => segment.sourceOut - segment.sourceIn;
const starts = SEGMENTS.map((_, i) => SEGMENTS.slice(0, i).reduce((sum, segment) => sum + length(segment), 0));
const END = starts.at(-1)! + length(SEGMENTS.at(-1)!);

function CroppedVideo(props: { segment: Segment; start: number; shot: Shot }) {
  const [sx, sy, sw, sh] = props.shot.region;
  const [bx, by, bw, bh] = props.shot.box;
  const scale = Math.max(bw / sw, bh / sh);
  const bleeps = BLEEPS.filter((bleep) => bleep.rank === props.segment.rank);
  return (
    <video
      src={props.segment.src}
      start={props.start}
      sourceIn={props.segment.sourceIn}
      sourceOut={props.segment.sourceOut}
      width={SOURCE_W * scale}
      height={SOURCE_H * scale}
      x={bx - sx * scale}
      y={by - sy * scale}
      muted={!props.shot.audible}
    >
      <rect mask x={sx * scale} y={sy * scale} width={bw} height={bh} start={0} end={props.segment.sourceOut} />
      {props.shot.audible && bleeps.length > 0 && (
        <keyframeTrack property="volume">
          <keyframe time={0} value={0} easing="steps(1)" />
          <For each={bleeps}>
            {(bleep) => (
              <>
                <keyframe time={bleep.sourceTime} value={MUTE} easing="steps(1)" />
                <keyframe time={bleep.sourceTime + bleep.duration} value={0} easing="steps(1)" />
              </>
            )}
          </For>
        </keyframeTrack>
      )}
    </video>
  );
}

export default function Project() {
  return (
    <stage background="#161616">
      <scene id="short" name="streamer-vs-streamer-hook-top-3"width={W} height={H} fill="black" active>
        <sequence name="Moments">
          <For each={SEGMENTS}>
            {(segment, i) => (
              <group name={`#${segment.rank}`} transition={i() < SEGMENTS.length - 1 ? TRANSITION : undefined}>
                <For each={SHOTS[segment.rank]}>
                  {(shot) => <CroppedVideo segment={segment} start={starts[i()]!} shot={shot} />}
                </For>
              </group>
            )}
          </For>
        </sequence>

        <text
          x={0}
          y={120}
          width={W}
          height={70}
          textAlign="center"
          textBaseline="middle"
          fontFamily={fontFamily}
          fontSize={46}
          fontWeight={800}
          letterSpacing={2}
          color="#FFFFFF"
          start={0}
          end={END}
        >
          {title}
        </text>

        <For each={SEGMENTS}>
          {(segment, i) => (
            <text
              x={0}
              y={190}
              width={W}
              height={220}
              textAlign="center"
              textBaseline="middle"
              fontFamily={fontFamily}
              fontSize={200}
              fontWeight={900}
              color={accent}
              start={starts[i()]!}
              end={starts[i()]! + length(segment)}
            >
              {`#${segment.rank}`}
              <animation type="grow" duration={0.35} />
            </text>
          )}
        </For>

        <audio name="Bleeps" src="sfx/bleep-track.wav" start={0} volume={bleepVolume} />

        <captions src="captions.srt" preset="classic" verticalAlign="center" offsetY={captionsOffset} />
      </scene>
    </stage>
  );
}
