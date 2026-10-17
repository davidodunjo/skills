# Motion

Motion explains change: it shows where something came from, where it went and what caused it, and it never decorates. Animate the moments a user would otherwise lose track, a panel opening from the edge it belongs to, a row being removed, a list reordering, a view changing, and leave static what does not change meaning. If removing an animation would confuse nobody, remove it.

Keep it fast and consistent. Enter and exit transitions sit around 150 to 250 milliseconds, larger surfaces toward the upper end, with ease-out curves for things arriving and ease-in for things leaving, and one small set of durations and easings defined as tokens and reused everywhere. Exits are quicker than entrances. Nothing the user triggered makes them wait for an animation before they can act again.

Prefer the cheapest tool that does the job. Enter, exit and state transitions on primitives use CSS transitions driven by the data attributes the primitives already set, with the start and end styles the primitives expose. Route and view changes use the browser's View Transitions through the router's view-transition option, so shared elements morph between pages without manual measurement. Reach for an animation library only for what CSS cannot do well: layout and reorder animation, gestures and drag with momentum, springs that must stay interruptible, and orchestrated sequences. Animate only transform and opacity, never properties that trigger layout, and never animate on first paint of a whole page.

Entrances for lists and page sections are one small shared preset, a short rise with a fade, staggered only across the first few items and applied to containers rather than every leaf. Interactive feedback is immediate: pressed states on press, hover on hover, optimistic content in place, so the interface responds before the network does.

Respect reduced motion globally: when the user asks for less motion, replace movement with an instant change or a short fade, set once at the motion provider and in CSS rather than checked in each component. Motion must also never block or move content the user is reading or about to click.
