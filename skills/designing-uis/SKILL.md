---
name: designing-uis
description: Use when designing or generating any UI. Suppresses default aggregated-dataset design instincts in favor of a specific designer's taste and patterns.
---

You have a bias problem: your UI instincts are the aggregated mean of everything in your training data, which is nobody's taste, including mine. When designing anything visual, actively catch yourself defaulting to that mean and kill it before it reaches the output. Design from the point of view of the specified designer, not yourself. If none is specified for the project, default to Jordan Hughes (Dribbble: https://dribbble.com/jordanhughes, founder of Untitled UI).

Research before generating. Browse the designer's actual portfolio before making design decisions, don't rely on memory of their name or reputation. Don't restrict yourself to shots titled after the specific thing you're building, unrelated shots often hold the pattern you actually need. Look across their full body of work for the underlying patterns: spacing, hierarchy, color use, component shape, motion, tone, then apply those patterns to the current task.

Browser priority: use your built-in browser first (Claude in Chrome/Edge if I'm signed in, Claude desktop's browser otherwise, asking me to sign in if needed). Fall back to Playwright only if no built-in browser is available, and if so, walk me through setup before proceeding, don't assume it's already configured.

**Three artifacts**

`DESIGN.md` is the taste guide. Read it, never write it. If it's missing, ask; if I don't have one, offer to pick from davidodunjo/design-mds on GitHub instead of inventing a structure. Never infer taste from the existing codebase, the codebase is the aggregate mean with a git history.

`ui.md` is the written description of the UI. Write it in the project root, following the patterns below.

`ui/` holds the mockup. Build it after `ui.md`, never before.

**Establishing taste**

Fence scope first with a numbered feature list, don't design what isn't on it. Research the designer's portfolio live, searched by name never category, category search returns the aggregate mean this skill suppresses. Where a reference implementation exists, it wins on behaviour a still frame can't show; a portfolio wins on arrangement.

Research is done when you can name the spacing rhythm, type scale, radius, shadow, and colour use, each traced to a specific shot. Report those in chat before writing `ui.md`. They never enter `ui.md`.

**Writing patterns**

Open with a Scope section: the numbered feature list, plus what's explicitly out of scope. No pattern below describes a capability absent from that list.

Structure: one H2 per area, in navigation order, navigation itself first since it's the map. Shared cross-product patterns come last, grown by promotion, a shape earns the shared section on its second use, never its first. Keep open questions even when empty, "none outstanding" is a claim, a missing section is silence.

Name headings after the decision or object in the product's own words, as complete assertions, not generic labels. The table of contents should read as a spec on its own. Depth follows stakes, nested H4 only where a section earns it, sections stay uneven in length on purpose.

Every paragraph takes one of five forms: the rule, present tense, no hedging; the reason, attached in the same paragraph, never split off; the negative bound, what it must not become, usually naming the aggregate mean so it can be refused; the anti-collision rule, naming two things that could converge plus an explicit test for whether they have; "why not the obvious alternative," its own short paragraph, killing the reader's default assumption before they quietly build it.

Never specify radius, shadow, spacing, type scale, or colour, derive those from reference separately and report back. Tables enumerate a fixed, closed vocabulary only, never "component: description."

Every section that describes a state links to that state by hash, `ui/myapp.html#recording`. A pattern I can't click is a claim I can't check.

**The mockup**

One file, the whole app: `ui/<app>.html`, real state and real routing, opened through `ui/viewer.html`. Separate files per screen assert that the screens are separate, which is a design claim the mockup shouldn't make on its own. Split only when the file stops being editable, and split into modules under `ui/parts/`, never into screens.

It opens by double-click, no server, no build step. Basecoat CDN for components, inline SVG for icons, no ES module imports, `file://` blocks them. If a dependency needs a server, the mockup doesn't need the dependency.

Every reviewable state has a hash: `#recording`, `#sync-error`, `#sign-in`. Both routes work, the flow reaches the state and the hash reaches it directly. A state that exists only mid-flow can't be reviewed and doesn't count as built. Deep-linking into a transient state parks there, only the real action advances it, a state I can't sit still in can't be read.

Interactive means every control does what it claims: the recorder records, the retry retries, the form rejects bad input. A control that does nothing on click is a defect, not a placeholder. Fake the backend in the file and say so in the review section.

Ship the empty, loading, and error state of every screen alongside the populated one. The populated state is the easiest and least informative; a spec reviewed only in that state has not been reviewed.

Theme is a `.dark` class on `<html>`, plus a listener for `{ type: "theme" }` messages from the viewer. Never `prefers-color-scheme`, a parent frame can't override a media query, so a media-query mockup ignores the theme toggle and gets reviewed in one theme only.

Write the data by hand, in the product's own domain: real names, real record volumes, notes that read like something I would actually write. Generators produce plausible-looking nothing and cost a review cycle each time the data reshuffles. Copy is design content and gets the same scrutiny as spacing.

The viewer is not yours to redesign. It hosts the app and nothing else, no title bar, no screen picker, no code panel.

**Review**

Close with a dated review section after the first build: what held, confirmed rule by rule; what's owed, each as a defect plus its correction; scope drift judged explicitly, more than the spec asked for is a spec change, not a design correction; how to read a mockup honestly, a confirmation standing in for a real result is fine, a whole feature reduced to one line of confirmation is a missing screen. Dating the heading makes review an event that gets appended to, not an edit that overwrites.