---
name: writing-ui-patterns
description: Use when documenting UI design decisions into a living patterns file that becomes the build prompt. Structure and sentence forms for keeping large mockup decisions consistent and undoing-proof.
---

Fence scope first: build a flat numbered feature list, don't record a pattern for a capability that isn't on it.

Structure: one H2 per area, in navigation order, navigation itself first since it's the map. A shared cross-product patterns section comes last, never first, don't invent shared vocabulary up front, grow it by promotion, a shape moves into shared patterns the second time it's used, never the first. Keep an open-questions section even when empty, "none outstanding" is a claim, a missing section is silence.

Name headings after the decision or object in the product's own words, as complete assertions, not generic labels like "Components" or "States." A good table of contents should be a readable spec on its own. Depth follows stakes, nested H4 only where a section earns more detail, sections are allowed to be wildly uneven in length.

Every paragraph takes one of five forms. The rule, present tense, no hedging. The reason, attached to the rule in the same paragraph, never split off, it's what stops someone undoing the decision by accident. The negative bound, what it must not become, usually naming the aggregate mean so it can be refused. The anti-collision rule, naming two things that could converge and the test for whether they have. "Why not the obvious alternative," its own short paragraph, killing the reader's default assumption before they quietly build it.

Never specify radius, shadow, spacing, type scale, or colour, those get derived from the reference separately and reported back, a patterns doc that hardcodes them becomes a theme file that goes stale. Tables enumerate a fixed, closed vocabulary only, never "component: description" or prose smuggled into cells.

Close the loop with a dated review section after the first build: what held (correctness rules, confirmed one by one), what's owed (each item as a defect plus its correction, never just "fix this"), scope drift judged explicitly (built more than the spec asked for gets ruled a spec change, not a design correction), and how to read a mockup honestly (a confirmation standing in for a result the real system returns is fine, a whole feature reduced to one line of confirmation is a missing screen). Dating the heading makes review an event that gets appended to, not an edit that overwrites.

Every mock feeding this document must be fully interactive, not indicative, `visualize` where available, otherwise generated into a `.mockups/` folder using the Basecoat CDN. A static or 80% mock gets 80% feedback and hides the actual disagreement.