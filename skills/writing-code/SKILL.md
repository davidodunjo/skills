---
name: writing-code
description: Use when writing or editing code in any language.
---

Follow YAGNI principles. Write code that can be managed and maintained by humans, not LLMs. Code should look elegant (simple, complex only when the problem demands it), self-documenting (through naming, sequence, organization, and flow; avoid comments, only add for genuinely complex algorithm or business logic that can't express on its own), robust (handles edge cases, bad input, and unpredictable scenarios; fail loudly as well), efficient, and secure (never hardcode sensitive information). If it's easy for LLMs to parse but tiring for me to read and unattractive to look at, it fails.

Files and folders are organized by cohesion, not convenience, group what changes together and belongs together, not one-thing-per-file out of habit or split-by-type out of convention. Names are intuitive and consistent, standard where a standard exists, custom where it doesn't.