---
name: writing-tsx
description: Use when writing or editing frontend code in TSX & React.
---

Stack-agnostic within React/TSX: describes structure, naming, shape and quality, naming a library only where one is the clear modern default. Overlaps with `writing-code`; these rules win within frontend scope. A repo's own structure or convention document wins over this skill wherever the two disagree, and the libraries a repo already uses win over the defaults named here.

This file holds the rules every frontend change needs; the guides in **Going deeper** hold the rest and are not summarised here. Before writing code for a new feature or page, read ARCHITECTURE.md, ROUTING.md, DATA.md, FORMS.md and POLISH.md in full, because their rules decide structure, data flow, validation and every non-happy state, and code written without them has to be redone. Read any other guide before the work touches its area.

**Components**

Components are named function declarations, never arrow consts. Export style matches what the repo already does, named exports when it has no precedent, one component export per file. Prop types are `type` aliases named after the component (`BoardCardProps`), never bare `Props`, never inlined into the signature. Props come in as a single `props` param, destructured on the first line; no-prop components take empty `()`. Body order is fixed: destructure, data hooks, derived values, handlers, early-return guards, remaining derived values, JSX last. Handlers are `function handleX() {}` declarations except one-off inline callbacks. Guards return before the main JSX for special cases and empty or not-found data; loading and error are not guards inside components when the data layer suspends, they belong to the route. Every collection renders one shared empty-state component with a short message and, where it makes sense, the primary action, and a missing record renders a not-found state, never a silent `null`. No comments, no doc blocks. No `forwardRef`: components declare `ref?:` in their prop type and destructure it. `useRef<T>(null)` for DOM nodes, `useRef<T | undefined>(undefined)` for mutable holders.

**Files and folders**

A file earns a folder only when it gains private companions: once a component needs sub-components, hooks or types that nothing else uses, it becomes a folder named after it holding the component and those companions, and inside each kind of folder, code belonging to one resource groups under a folder named for that resource (`api/hooks/contacts/`, `api/hooks/tags/`) once the feature has two or more resources, with one file per query-options factory or operation inside it. A form whose repeatable field groups exist only for it is `forms/ProjectForm/` holding `ProjectForm.tsx`, `MemberFields.tsx` and `LinkFields.tsx`; a list whose row nothing else renders is `ui/TaskList/` holding `TaskList.tsx` and `TaskListRow.tsx`. Once a second consumer imports the row, it moves out beside the folder. Never create a folder for a single file or ahead of need. When a second consumer appears, move the shared piece up to the nearest folder both consumers already live under, not to a global shared folder. Components are PascalCase files, other modules camelCase, hooks start with `use`, `.tsx` only when the file contains JSX.

**Conventions**

Formatting belongs to the project formatter. Unused imports error, unused vars warn with a `^_` ignore pattern, `console.log` never ships, each file exports components only so fast refresh keeps working, and hook lint rules stay on with an explicit disable comment for any intentional exception. No `import React`. `type` over `interface`, which is reserved for module augmentation. Imports use the configured path aliases over relative chains that climb more than one level, ordered third-party, then aliased internal, then relative. Prefer the platform and the language over utility libraries: `structuredClone`, array and object methods, `Intl` for formatting, `crypto.randomUUID()` for ids. Text a user can edit never renders as HTML: show it as text, and use `dangerouslySetInnerHTML` only on markup passed through a sanitizer first, because one unescaped field is a stored script on every viewer's page.

**Done**

Passing type checks and lint is not done. Run the app, open every route the change touches in a browser, exercise each interaction it adds (create, edit, delete, search, going back), and read the console; a route that renders the wrong view or logs an error is a failed task. Say plainly what could not be checked. Run the project's verify command last, after every file, including notes and docs, has been written; a check that ran before the final edit proves nothing.

**Going deeper**

- [ARCHITECTURE.md](ARCHITECTURE.md) **(required)**: feature slices, import direction, where shared code lives.
- [ROUTING.md](ROUTING.md) **(required)**: file routes, loaders, typed params, search params as state, pending and error UI.
- [DATA.md](DATA.md) **(required)**: server state, query factories, keys, mutations, optimistic updates, services.
- [STATE.md](STATE.md): which kind of state lives where, stores, context, derived state.
- [FORMS.md](FORMS.md) **(required)**: schemas, field arrays, submission, server errors.
- [COMPONENTS.md](COMPONENTS.md): component APIs, composition, variants, styling, design tokens.
- [ACCESSIBILITY.md](ACCESSIBILITY.md): semantics, focus, keyboard, shortcuts, command palette.
- [MOTION.md](MOTION.md): when and how things move, transitions, reduced motion.
- [TABLES.md](TABLES.md): data tables, server-driven filtering, virtualization.
- [POLISH.md](POLISH.md) **(required)**: loading, empty and error design, feedback, density, the details that make it feel premium.
- [TYPE-SAFETY.md](TYPE-SAFETY.md): contracts, parsing at boundaries, no casts.
- [TESTING.md](TESTING.md): what to test, where tests live, browser and end-to-end tests.
- [PERFORMANCE.md](PERFORMANCE.md): compiler, memoization, splitting, measuring.
