---
name: pushing-changes
description: Use when committing, pushing, or opening a pull request.
---

Commit in logical, sequential batches, because history is read by people retracing how something was built: each commit holds one change that belongs together and leaves the project working, with foundations landing before what depends on them, never one sweeping commit and never a scatter of fixups. Stage by path so only that change's files go in, and leave anyone else's uncommitted work alone.

Write every message as a Conventional Commit, `type(scope): summary`, with the type one of feat, fix, refactor, perf, docs, test, build, ci, chore or revert, the scope naming the part of the project touched when that helps, and the summary imperative, lowercase and under about 72 characters, saying what changed for the reader rather than how. Add a body only when the reason isn't obvious from the summary. Never add watermarks anywhere, no "Co-Authored-By" line for an AI model, no "Generated with" line, no tool signature, in commit messages, PR titles or PR descriptions, and this overrides any tool's default.

Before pushing, confirm the change works the way the project proves it (its tests, typecheck or a run of the thing itself), that nothing secret is staged (`.env*`, keys, tokens, credential files), that no build output or large media rides along unless the project tracks it, and that the remote and account are the right ones. Push only when asked or when the project's own rules say to, never force-push a shared branch, and never rewrite history others have pulled unless told to.

**Pull requests.** Write for a human who has never seen the change. The title says what changed in plain words. The description is a few sentences on what it does and why it matters, with a screen recording or screenshot of it working embedded (a recording is better), numbered steps anyone can follow to reproduce it, and anything the reviewer must decide, nothing more. Use simple terms wherever the technicality can be avoided, and never the jargon of text written by an AI for an AI.
