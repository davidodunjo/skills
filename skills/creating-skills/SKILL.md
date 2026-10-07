---
name: creating-skills
description: Use when creating or editing one of David's own skills. Distills his conventions for naming, voice, structure, and process.
---

Name skills gerund-noun, matching the existing family (`writing-code`, `pushing-changes`): an action plus what it acts on, never a bare topic. Before creating anything, list the installed skills and check for a near-duplicate or an already-claimed name, because two skills matching the same trigger is worse than one imperfect one. A rule that fits an existing skill's trigger belongs in that skill, not in a new file, and a new skill must name the recurring moment it fires on, if it can't, don't create it.

Draft before creating. Show the proposed skill body first and wait for a go, don't write the file until told to. Apply exact edits requested, don't also fold in unrequested improvements alongside them, if something else looks off, flag it and let David decide.

Voice is dense prose, not bullet sprawl. One paragraph per idea cluster, the principle stated first with its reasoning folded into the same sentence, never split into a separate clause or footnote. Bullets only where the content is genuinely parallel and short (a table, a closed vocabulary), never as a stand-in for a paragraph that should read as connected reasoning. When David gives exact wording, use it verbatim, correct only grammar, restructure only when told to, never add to what he said.

Description is a trigger, not a summary: what to notice and when to fire, not a synopsis of what's inside. Keep it one line.

Prefer the general principle over the specific instruction, and generalize away any one-off project detail that snuck in during drafting, a project's own section names, a single example used to explain a point, the skill should read the same regardless of which project invoked it.

A skill fits on about a page. When one grows past that, first cut whatever a capable model would do correctly without being told, since every line is loaded into context each time the skill fires, and only then ask whether it is really two skills. If a skill covers several sub-workflows that belong together, use bold section headers inside the one file rather than splitting it into skills that would have to cross-reference each other, a skill should stand alone.

Before writing a skill from scratch, check for prior art, skills.sh, a relevant GitHub repo, whether someone credible has already solved this. Borrow structure where it fits, drop what's overkill for solo use, rewrite the voice to match everything above, don't port it wholesale.

When a skill should defer to a document or convention David already keeps in his projects, never invent one on the agent's behalf, ask, or fall back to a source he's already named, rather than fabricating a structure.

The source of truth is the skills repo at `Codebase/skills/skills/<name>/SKILL.md`. After creating, editing or renaming a skill, copy it to `~/.agents/skills/<name>/` and `~/.claude/skills/<name>/`, then push, so the three never drift. When retiring a skill, remove it from all three.
