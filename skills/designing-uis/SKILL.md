---
name: designing-uis
description: Use when designing or changing a UI: its look, layout, controls, feedback, hints or motion.
---

Almost every "this feels right" has a physical or logical cause, so taste is a set of decisions with reasons, followed strictly, because a rule that bends for each screen stops being a rule. Three concerns lead every decision, low bandwidth, feedback and consistency, and the rest serves them. The project's own taste doc wins over this skill, and where a rule already speaks, never invent a second opinion. When asked to add behaviour, port the behaviour and leave the look alone, because a redesign that carries the feature loses what the person liked.

**Low bandwidth**

A screen should take almost no effort to understand, because people read pictures, icons and a word or two at a glance and skip anything that looks like reading. Show the thing first, then name it: a pictogram, swatch, icon or image carries the meaning and one or two words confirm it. Use tiles a person taps, not rows they read down, and cut descriptions and captions under controls, putting the full name in `aria-label` and a tooltip. Show the current value where the eye already is, beside its label or its slider, instead of describing it. Leave room: one clear statement and generous space read as elegant, where a full screen reads as work. Every control should look worth touching, because one that looks like a form field invites reading, not tapping. Before shipping, count the words a person must read, and cut any whose loss changes nothing.

**Feedback**

Every action answers, even the most granular, because an action with no answer reads as broken and makes the person do it again. Within 100ms of a press, hover, toggle, drag, copy, save or failure, something in the interface responds, visually, by sound, or both, and the response confirms the result, not just the touch: a copy icon becomes a check, a saved item settles into place, a picked option closes its menu, a failure shakes or marks the field in place. Judge the form by the product's material and feel, and be inventive within it: a paper interface rustles and creases, a terminal-styled one types, a calm one answers softly, so feedback reads as part of the world rather than bolted on. Sound is short, quiet, preloaded and one sound per meaning, plays only for the person's own actions, never on load or passive events, and has a setting to turn it off. On touch, a light haptic can stand in for sound. Show the result where it happened before reaching for a toast, and never let a success pass silently.

**Consistency**

A new screen should look like it came from the same hand as the rest, because an interface that changes its rules from page to page makes the person relearn it, and novelty that ignores the system reads as a mistake, not a design. Be novel inside the system, never beside it: reuse the app's own components, spacing scale, type sizes, icon sizes, radii and colours, and put recurring things where they already live, so a close button, a back button, a header or a primary action sits in the same place and at the same size on every screen. Align to the edges and columns the page already uses. Before adding a size, gap or position, find where the app already solved the same problem and match it, and if something truly needs a new value, add it to the system once rather than inline in one place.

**Samples before code**

Before committing to any new look, layout or interaction, build two or three genuinely different samples on a samples page, with real data, that the person can open and switch between, and say in a line what each one bets on. Let them pick, then port the chosen one into the product, because a choice made from working samples is faster and surer than one made from a description. Keep samples pages after the pick, since they are the record of what was tried. A small change to an already approved look needs no samples.

**Hints, never tutorials**

Teach by subtle hints that play when the person seems unsure, never by onboarding tours. A hidden affordance gets a permanent cue, such as a visible arrow and a fade at the cut-off edge, because cues that only appear on hover go unnoticed. The hint plays on signals that mean lost, such as the element settling in view for about 0.6s, the pointer coming near, or the wrong gesture, at most once every 8 seconds, and stops once the person does the gesture themselves. Using the fallback control replays it, because reaching for it means the gesture wasn't obvious. Store learned state per device, and play nothing with reduced motion on.

**Motion is physical**

Every motion needs a physical explanation, and every change between states should feel controlled and connected. Nothing appears from nothing: start at about scale .95 and low opacity, never 0. A replacement arrives over what it replaces, and anything that opens grows from what was tapped. Choose easing by what is happening, never by feel, and duration by size and distance:

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

Interface motion stays under 300ms, and leaving can be a fifth faster than entering. A signature move may run longer, but never so long it reads as waiting. Controls press to scale .97. Hover moves a child, never the hovered element. Name the properties in a transition, never `transition-all`.

**Speed and loading**

Navigation must feel instant, because a pause before an animation reads as broken, not as loading. Prefetch what the next tap needs, keep what was fetched, and show the first content before the last arrives. Nothing loads as a blank: anything with a picture gets an illustration of it in the app's own material that the real image reveals over, text and lists get skeletons shaped like what they stand for, and a centred loading label is only for a whole page with nothing to shape yet.

**Done**

Look at the work in a browser, then review it against these rules and the taste doc and list every place it breaks one, because "it looks good" is not a review. Check that every action you added answers. When the person approves something, record in the taste doc what they approved, how to recreate it and why, and ask why if they haven't said. When they reject something, write down what caused the wrong feeling as a rule, not as a note about one screen. If the project has no taste doc, ask before creating one.
