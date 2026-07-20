# skills

My agent skills for coding work. Small, composable, and model-agnostic.

Install with the `skills` CLI (works with `npx` or `bunx`):

```bash
bunx skills add davidodunjo/skills          # install everything
bunx skills add davidodunjo/skills --list   # see what's in here
bunx skills add davidodunjo/skills --skill verify-before-done   # just one
```

Skills install into `.claude/skills/` (or the equivalent dir for your agent).

## Layout

One folder per skill, each containing a `SKILL.md`:

```
skills/
  verify-before-done/
    SKILL.md
```

A `SKILL.md` is YAML frontmatter plus a markdown body:

```markdown
---
name: skill-name
description: What it does and when the agent should reach for it.
---

# Skill Title

Instructions for the agent...
```

The `description` is the most important line — it's what the agent reads to
decide whether to invoke the skill, so make it concrete about *when* to trigger.


## Skills

- **verify-before-done** — run the project's checks before claiming a task is finished.
