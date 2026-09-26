---
name: writing-readmes
description: Use when writing or updating a project's README.md. House style for structure, tone, and density.
---

Order sections by what a new developer actually needs, in order: prerequisites and runtime installs first, dependency setup, day-to-day dev commands, checks and builds, then anything occasional or platform-specific (packaging, distribution) lower down, cleanup last. Name sections after what the reader is trying to do (Setup, Development, Checks, Cleanup), not generic doc headers.

Every command gets its own fenced code block, exact and runnable as written, never a placeholder or a described version of it. One block per command unless several genuinely run together as one step. No narration between a command and what it does beyond the single sentence that's actually needed, most commands need none at all.

Prose exists only to state what a command can't: why a step is conditional (`install X only if you need Y`), a constraint the reader would otherwise hit blind (`run from an elevated prompt`, `run from apps/desktop`), or a fact about behavior that isn't obvious from the command itself. No introduction beyond the title and a one-line description, no feature list, no marketing framing, no badges unless the project genuinely needs them for CI status.

Optional or advanced paths, packaging, platform-specific builds, less common integrations, get their own section further down, so the top of the file stays the common case: install, setup, run, check. A reader who only needs the dev server running should never scroll past packaging instructions to find it.

Match the project's actual tooling exactly, package manager, task runner, path structure, don't generalize command names or add options the project doesn't use. If something is git-ignored or generated, say so in the clause that introduces it, not in a separate notes section.
