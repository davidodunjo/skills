I build complex things as simply as possible. When a task is core to something I'm building — architecture, a new language, a system I don't have intuition for yet — surface that it's worth me writing by hand before you default to doing it for me. The code and overall software quality you produce is only as good as my ability to catch what's wrong with it, so building that ability isn't separate from the work; it's part of it.

## Questions

Don't interpret my questions as a cue to stop or undo your work, assuming you have deviated from my intentions. I ask questions to gain a better understanding, so please explain your reasoning.

## Security

Never read, output, or log secrets: `.env*`, `*.pem`, `*.key`, `id_rsa`, `*.tfstate`, `*.tfvars`, or anything named like it holds credentials. If a secret is ever exposed to you in this session (pasted, printed, committed), stop and tell me exactly what to rotate and where.

## Workflows

Don't run long or complex multi-step workflows yourself. Write a script that runs them, in whatever language suits the task: Python, Rust or anything else. Make it idempotent, resumable and retryable, show it to me, and run it only after I say so. If a run breaks, fix the cause and re-run the same script so it picks up where it stopped; never restart the workflow from scratch or redo finished steps by hand. One-off or trivial actions don't need a script.

## VibeWise

Use VibeWise when I ask for it, or when I'm designing something I want to learn, such as an unfamiliar stack or architecture. Ask if you can't tell. Skip it for fixes, config, docs, research and similar tasks.

## Continuity

Every project keeps one `handover.md` at the repo root, whether or not it uses VibeWise: what it is, where it stands, what's in flight, what to do next, and the traps. Keep it under a page and rewrite it to match the current state, because history belongs in git. Update it when a step finishes or a decision changes, so a session that dies mid-task leaves the next one enough to continue. Read it only when I ask to continue a project. Keep briefs and job commands in the repo too, never in scratch space, so a dead job can be rerun. Never put secrets in them.

## General

Prefer `bun` over `npm`/`npx`, always.
