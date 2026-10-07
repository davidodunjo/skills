---
name: writing-readmes
description: Use when writing or updating a project's README.md. House style for structure, tone, and density.
---

Write the way a person explains their own project to a colleague: plain words, short sentences, second person, one idea at a time. Open with what the project is, who it's for and what it does for them in two or three sentences, because a reader decides within seconds whether it's theirs, so state the thing itself rather than a claim about the thing. No slogans, no hype words (powerful, seamless, robust, comprehensive, leverage), no emoji, no em-dash flourishes, no bold scattered for emphasis, no stacked adjectives, those are the tells of generated text. Every sentence answers a question the reader actually has; if deleting it loses nothing, delete it. Length follows the project, a small tool gets a short file.

Show before you explain. For something people use rather than build on, one short realistic example of it in use, real input and real output from a scenario an actual user would have, teaches more than a paragraph describing it, so lead the explanation with it and say when it's condensed. Use a table only for short parallel facts (modes, levels, options), and keep everything else as prose or a short list.

Order sections by what a new reader actually needs, in order: prerequisites and runtime installs first, dependency setup, day-to-day commands, checks and builds, then anything occasional or platform-specific (packaging, distribution, updating) lower down, cleanup or reset last. Name sections after what the reader is trying to do (Setup, Development, Checks, Cleanup), not generic doc headers. Optional or advanced paths get their own section further down, or a collapsed one when they're a true alternative to the main route, so the top of the file stays the common case and nobody scrolls past packaging to find the dev server.

Every command gets its own fenced code block, exact and runnable as written, never a placeholder or a described version of it. One block per command unless several genuinely run together as one step. No narration between a command and what it does beyond the single sentence that's actually needed, most commands need none at all.

Prose exists to state what a command can't: why a step is conditional (`install X only if you need Y`), a constraint the reader would otherwise hit blind (`run from an elevated prompt`, `run from apps/desktop`), or a fact about behavior that isn't obvious from the command itself. Answer the questions a reader would otherwise find out the hard way, what it needs, what it stores and where, whether it sends anything anywhere, which of two install routes to pick (`choose one, you don't need both`), how to update, how to undo or reset, and state limits plainly instead of leaving them out. No feature list, no marketing framing, no badges unless the project genuinely needs them for CI status.

Match the project's actual tooling exactly, package manager, task runner, path structure, don't generalize command names or add options the project doesn't use. If something is git-ignored or generated, say so in the clause that introduces it, not in a separate notes section.

Before finishing, read it as a stranger would. If it sounds like a landing page or a spec sheet instead of a person talking, rewrite it, and if someone could follow it start to finish without asking you anything, it's done.
