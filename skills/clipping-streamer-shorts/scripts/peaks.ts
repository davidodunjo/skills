// Prints each video's most-replayed peaks from yt-dlp info JSON, one video per line on stdin.
// usage: yt-dlp -j --skip-download <url...> | bun peaks.ts [top=5]
interface Heat {
  start_time: number;
  end_time: number;
  value: number;
}

const top = Number(Bun.argv[2] ?? 5);
if (!Number.isInteger(top) || top < 1) throw new Error(`top must be a positive integer, got ${Bun.argv[2]}`);

const clock = (s: number) =>
  `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

for (const line of (await Bun.stdin.text()).split("\n").filter((line) => line.trim())) {
  const info = JSON.parse(line);
  const heat: Heat[] = info.heatmap ?? [];
  console.log(`\n${info.id} | ${clock(info.duration ?? 0)} | ${info.view_count} views | ${info.channel} | ${info.title}`);
  if (heat.length === 0) {
    console.log("  no heatmap yet");
    continue;
  }
  // Local maxima only, so one wide hump doesn't fill the list. The first bucket is skipped: it is the video's opening.
  const peaks = heat.filter((h, i) => i > 0 && h.value >= heat[i - 1]!.value && h.value >= (heat[i + 1]?.value ?? 0));
  for (const peak of peaks.sort((a, b) => b.value - a.value).slice(0, top)) {
    console.log(`  ${clock(peak.start_time)}-${clock(peak.end_time)}  ${peak.value.toFixed(2)}  (${Math.round(peak.start_time)}s)`);
  }
}
