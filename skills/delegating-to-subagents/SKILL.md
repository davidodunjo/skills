---
name: delegating-to-subagents
description: Use when about to spawn a subagent or split work across agents.
---

Delegate only when there is bulk to hand off: several independent pieces, a search or read too large for one context, or routine work that would otherwise burn the orchestrator's own expensive tokens. A single dependent chain, or work that fits comfortably in one context, stays with the orchestrator, because the brief, handoff and merge cost more than they save and workers lose accuracy against the stronger model. Keep the planning, decomposition, judgment calls and final synthesis; hand off the token-heavy execution.

Choose the model per task and set it explicitly on every spawn, since a subagent otherwise inherits the orchestrator's. Follow Anthropic's selection guidance and start efficiency-first, moving up only for a concrete capability gap rather than a hunch. Haiku takes high-volume, low-judgment work: locating and listing, reading and summarizing files, mechanical edits and renames, formatting, running checks and reporting results. Sonnet takes everyday coding: implementing a well-specified change, writing tests, reviewing a diff against stated criteria. Opus is reserved for what Sonnet can't carry: ambiguous design, architecture, hard debugging and long autonomous work. When a task fails, escalate it one tier once with a note on what failed instead of retrying at the same tier, and try lowering effort before raising the model.

Brief every worker with the objective, the relevant files, constraints, the deliverable, the checks to run and a stopping point, and keep parallel workers off the same files. Read what comes back and run proportionate checks before reporting, never forward a worker's claim unverified. Give every delegated agent the project's shared `agent-guide.md` and save its brief in the repo, not in session scratch space, so a dead job can be rerun by the next session.
