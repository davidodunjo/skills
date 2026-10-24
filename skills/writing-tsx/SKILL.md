---
name: writing-tsx
description: Use when writing or editing frontend code in TSX & React.
---

`writing-code` applies in full. This adds what is specific to React and TSX, whatever the framework, router or data layer: use what the repo already uses, and a repo's own convention document wins over this skill. Read [STRUCTURE.md](STRUCTURE.md) before creating any file or folder.

**A component reads in the order you ask about it**

What does it take, what does it read, what does it work out, what does it do, what does it show. So: props destructured on the first line, then data hooks, then derived values, then handlers, then early returns for the special and empty cases, then the JSX. Keep that order everywhere, so the eye knows where to land. Name the function after its file, its prop type after the component (`ContactListItemProps`), and its handlers for what they handle (`handleRemove`). The exact syntax matters less than using one form consistently: follow the repo, otherwise use named function declarations. Every component opens with its doc comment: "The contact list item."

**JSX stays shallow**

When JSX nests deep, repeats a block, or needs a comment to explain what a section is, give that section a component named for what it shows. Conditionals in JSX stay one level deep; anything more becomes an early return or a child component. Lists are keyed by stable ids from the data, never by index.

**Hooks and context**

Logic that works out data for a view, filtering, grouping, searching, is a hook, not a block inside the component, so the component reads as what it shows. Reach for context only when props would otherwise pass through components that don't use them. A context is three files in its own folder: the definition, the provider, and the hook that reads it and throws when used outside the provider.

**State**

Never store what can be computed: filtered lists, counts and labels are worked out during render from the state they come from, and an effect that copies one state into another is a bug waiting for an edge case. Data from the server is a cache of something owned elsewhere, read through the repo's data layer, never copied into local or global state. State lives as close to the components that use it as it can, and state a user would share or expect back after a reload belongs in the URL.

**Things that never ship**

`console.log`. User-editable text rendered as HTML without a sanitizer, because one unescaped field is a stored script on every viewer's page. A silent `null` for a missing record or an empty list: render a not-found or empty state that says what happened.

**Done**

Open every route the change touches in a browser, use each interaction it adds, and read the console. A route that renders the wrong view or logs an error is a failed task.
