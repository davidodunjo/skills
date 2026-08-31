---
name: designing-uis
description: Use when designing or generating any UI. Suppresses default aggregated-dataset design instincts in favor of a specific designer's taste and patterns.
---

You have a bias problem: your UI instincts are the aggregated mean of everything in your training data, which is nobody's taste, including mine. When designing anything visual, actively catch yourself defaulting to that mean and kill it before it reaches the output. Design from the point of view of the specified designer, not yourself. If none is specified for the project, default to Jordan Hughes (Dribbble: https://dribbble.com/jordanhughes, founder of Untitled UI).

Research before generating. Browse the designer's actual portfolio before making design decisions, don't rely on memory of their name or reputation. Don't restrict yourself to shots titled after the specific thing you're building, unrelated shots often hold the pattern you actually need. Look across their full body of work for the underlying patterns: spacing, hierarchy, color use, component shape, motion, tone, then apply those patterns to the current task.

Browser priority: use your built-in browser first (Claude in Chrome/Edge if I'm signed in, Claude desktop's browser otherwise, asking me to sign in if needed). Fall back to Playwright only if no built-in browser is available, and if so, walk me through setup before proceeding, don't assume it's already configured.

**Establishing taste**

Fence scope first with a numbered feature list, don't design what isn't on it. Research the designer's portfolio live, searched by name never category, category search returns the aggregate mean this skill suppresses. Where a reference implementation exists, it wins on behaviour a still frame can't show; a portfolio wins on arrangement.

**Writing patterns**

Never create DESIGN.md yourself. Ask me for one; if I don't have one, offer to pick from davidodunjo/design-mds on GitHub instead of inventing a structure.

Open with a Scope section: the numbered feature list, plus what's explicitly out of scope. No pattern below describes a capability absent from that list.

Structure: one H2 per area, in navigation order, navigation itself first since it's the map. Shared cross-product patterns come last, grown by promotion, a shape earns the shared section on its second use, never its first. Keep open questions even when empty, "none outstanding" is a claim, a missing section is silence.

Name headings after the decision or object in the product's own words, as complete assertions, not generic labels. The table of contents should read as a spec on its own. Depth follows stakes, nested H4 only where a section earns it, sections stay uneven in length on purpose.

Every paragraph takes one of five forms: the rule, present tense, no hedging; the reason, attached in the same paragraph, never split off; the negative bound, what it must not become, usually naming the aggregate mean so it can be refused; the anti-collision rule, naming two things that could converge plus an explicit test for whether they have; "why not the obvious alternative," its own short paragraph, killing the reader's default assumption before they quietly build it.

Never specify radius, shadow, spacing, type scale, or colour, derive those from reference separately and report back. Tables enumerate a fixed, closed vocabulary only, never "component: description."

Close with a dated review section after the first build: what held, confirmed rule by rule; what's owed, each as a defect plus its correction; scope drift judged explicitly, more than the spec asked for is a spec change, not a design correction; how to read a mockup honestly, a confirmation standing in for a real result is fine, a whole feature reduced to one line of confirmation is a missing screen. Dating the heading makes review an event that gets appended to, not an edit that overwrites.

Every mock feeding this document is fully interactive, not indicative, `visualize` where available, otherwise generated into `design/` using the Basecoat CDN and Faker for data.