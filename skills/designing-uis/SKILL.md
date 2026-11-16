---
name: designing-uis
description: Use when designing or changing a UI: its look, layout, controls, hints or motion.
---

Almost every "this feels right" has a physical or logical cause, so taste is a set of decisions with reasons, followed strictly, because a rule that bends for each screen stops being a rule. The project's own taste doc wins over this skill, and where a rule already speaks, never invent a second opinion. When asked to add behaviour, port the behaviour and leave the look alone, because a redesign that carries the feature loses what the person liked.

**Low bandwidth**

A screen should take almost no effort to understand, because people read pictures, icons and a word or two at a glance and skip anything that looks like reading. Show the thing first, then name it: a pictogram, swatch, icon or image carries the meaning and one or two words confirm it. Use tiles a person taps, not rows they read down, and cut descriptions and captions under controls, putting the full name in `aria-label` and a tooltip. Show the current value where the eye already is, beside its label or its slider, instead of describing it. Every control should look worth touching, because one that looks like a form field invites reading, not tapping. A menu of sentences becomes tiles or an icon with two words. Before shipping, count the words a person must read, and cut any whose loss changes nothing.

**Hints, never tutorials**

Teach by subtle hints that play when the person seems unsure, never by onboarding tours. A hidden affordance gets a permanent cue, such as a visible arrow and a fade at the cut-off edge, because cues that only appear on hover go unnoticed. The hint plays on signals that mean lost: the element settles in view for about 0.6s, so it plays when they stop rather than while they pass; the pointer comes near; or they try the wrong gesture, like wheeling up and down over a sideways row or clicking the cut-off item. Play it at most once every 8 seconds, because a hint that repeats is noise, and the first time let the content itself demonstrate, since the eye follows content further than an arrow. Stop once the person does the gesture themselves, counting only their own input, never programmatic or snap movement. Using the fallback control replays it, because reaching for it means the gesture wasn't obvious. Store learned state per device, and play nothing with reduced motion on.

**Motion is physical**

Every motion needs a physical explanation, and every change between states should feel controlled and connected. Nothing appears from nothing: start at about scale .95 and low opacity, never 0, because real objects keep their shape. A replacement arrives over what it replaces, so it reads as placed, not swapped, and anything that opens grows from what was tapped. Choose easing by what is happening, never by feel, and duration by size and distance:

| What is happening            | Easing      |
| ---------------------------- | ----------- |
| Entering or leaving          | ease-out    |
| Moving or changing on screen | ease-in-out |
| Hover                        | ease        |
| Constant motion              | linear      |

| Element                      | Duration  |
| ---------------------------- | --------- |
| Press, toggle, colour change | 100–150ms |
| Menu, popover                | 150–250ms |
| Dialog, sheet                | 200–300ms |

Interface motion stays under 300ms, and leaving can be a fifth faster than entering. A signature move may run longer, but never so long it reads as waiting. Controls press to scale .97 so they answer the finger. Hover moves a child, never the hovered element, or the pointer slips off and it flickers. Name the properties in a transition, never `transition-all`.

**Speed is motion**

Navigation must feel instant, because a pause before an animation reads as broken, not as loading. Prefetch what the next tap needs, keep what was fetched, and show the first content before the last arrives.

**Nothing loads as a blank**

An empty page or a grey slab reads as cheap, so every part that loads shows what is coming, in the app's own material. Anything with a picture gets an illustration of it, such as an unprinted proof of a cover with its title and a slow gloss sweep, and the real image reveals over it instead of filling a hole. Text and lists get skeletons shaped like the text they stand for, so a synopsis shows three full lines and a short last one. A centred loading label is only for a whole page with nothing to shape yet.

**Done**

Review the work against these rules and the project's taste doc, and list every place it breaks one, because "it looks good" is not a review. When the person approves something, record in the taste doc what they approved, how to recreate it and why, and ask why if they haven't said, because a recipe without a reason can't be applied to anything new. When they reject something, write down what caused the wrong feeling as a rule, not as a note about one screen. If the project has no taste doc, ask before creating one.
