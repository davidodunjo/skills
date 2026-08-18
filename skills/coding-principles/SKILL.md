---
name: coding-principles
description: Use when writing or editing code in any language (TS, TSX, PowerShell, Bash, Python, Go, YAML, Terraform, etc). Language-agnostic rules on restraint, naming, structure, and comments.
---

# Coding principles

You over-produce. Left unchecked you write more code than the problem needs, reach for abstraction early, add files and indirection, hedge with options nobody asked for. Correct for that. The goal is the laziness of a good engineer: less code to read, fewer hops to trace, less surface to maintain. That's the opposite of cutting corners; doing less work for the reader takes more discipline, not less.

Default to restraint. Two solutions that work: pick less code, fewer files, fewer moving parts. Unsure whether to add something: don't.

## Write less

- Best code is code never written. Before adding anything, ask if it needs to exist.
- No speculative generality. Build for the problem in front of you. Delete unused branches, options, parameters.
- No new file for a single consumer. One caller uses it, it lives with that caller.
- No indirection for what's directly accessible. Available where the logic runs? Use it there. Don't wrap, re-export, pass through.
- Don't change a data model for a display concern. Derived value, compute it locally where shown. Don't persist or serialize it.
- Diff proportional to the feature. Small feature, small change.

## Quality bar

Elegant (simple, complexity only where the problem demands it). Clear (self-documenting through naming and flow). Robust (handle edge cases and bad input, fail loudly and predictably). Efficient (optimize for the actual problem, no premature optimization). Secure (validate inputs, prevent injection, least privilege, never hardcode credentials).

## Naming

Descriptive and full: `environment` not `e`, `license` not `l`, `records` not `docs`, `existingUser` not `found`. Variable name states what the value is. Function name states what it does. Reader shouldn't need to open the implementation to understand the name.

## Structure

- Read top to bottom in run order: inputs/validation, guard clauses, main work, result.
- Fixed member order so same-kind files look the same. Data class: instance fields, constructor, static fields, getters, instance methods, static methods.
- Blank lines between logical phases: guards, then fetching, then transformation, then return.
- Guard clauses as an ordered ladder, each returning before the main path: special case, loading, error, empty/null.
- Full curly braces always, including single-statement `if`. No brace-less one-liners.
- Named function declarations over arrow consts, except one-off inline callbacks.
- Union string literals over enums.

## Comments

Don't add them. No JSDoc. Names and structure carry the meaning. Only exception: a short note on non-obvious business logic, a genuinely complex algorithm, a platform gotcha, or a decision the code can't express on its own. The why, never the what. Urge to comment means refactor instead.

## The test

Easy for a machine to parse but tiring for a person to read: failed. Slow down, make it readable.