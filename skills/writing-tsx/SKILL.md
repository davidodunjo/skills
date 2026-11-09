---
name: writing-tsx
description: Use when writing or editing frontend code in TSX & React.
---

`writing-code` applies in full. This adds what is specific to React and TSX, whatever the framework, router or data layer: use what the repo already uses, and a repo's own convention document wins over this skill. Read [STRUCTURE.md](STRUCTURE.md) before creating any file or folder.

**TanStack Router**

In a project that uses TanStack Router, add `tsr.config.json` at the app root or update its existing one, keeping its other keys, so the generator ignores every folder name that would cause route problems. A `routeFileIgnorePattern` set inline in the Vite config overrides this file, so it must match. The pattern is tested against every file and folder name under the routes directory, so a real URL segment with one of these names is a flat route file (`forms.tsx`), never a folder.

```json
{
    "target": "react",
    "routeFileIgnorePattern": "^(api|components|configs|contexts|dialogs|drawers|forms|hooks|lib|models|services|tabs|types|ui|views)$"
}
```

**Code looks like Fuse**

`C:\Users\DavidOdunjo\Codebase\fuse-react-v16.0.0-vitejs-demo\src` is the reference for how component code is organised, spaced, grouped, named and split, and for how components use props. Before writing a component, read two or three of the same kind there, starting with `components/theme-layouts/layout1/components/navbar/style-2/NavbarStyle2Content.tsx` and a form such as `app/(control-panel)/pages/authentication/forgot-password/components/forms/ForgotPasswordPageForm.tsx`. Copy its shape, never the parts that break these rules: its comments, `key={index}`, `console.log`, a silent `return null`, and effects that copy one state into another.

A file runs imports, module constants and schemas, the prop type, the component, then `export default` on the last line, with one blank line between each. Inside the component, hooks sit together with no blank lines between them, then one blank line before each handler, before each early return and before the final `return`. JSX puts one attribute per line once there are two, and a blank line between sibling sections.

**A component reads in the order you ask about it**

What does it take, what does it read, what does it work out, what does it do, what does it show. So: props destructured on the first line, then data hooks, then derived values, then handlers, then early returns for the special and empty cases, which come after the last hook because React forbids a hook after a return, then the JSX. Keep that order everywhere, so the eye knows where to land. Name the function after its file, its prop type after the component (`ContactListItemProps`), and its handlers for what they handle (`handleRemove`). The exact syntax matters less than using one form consistently: follow the repo, otherwise use named function declarations.

**Props**

A prop exists only for what a component cannot get itself. A component reads its own data through hooks and context, owns its own UI state and performs its own mutations, so most need nothing beyond `className` and the id or record they render. Never pass `value` and `onChange` so a parent can house state the child could hold alone. A callback is only for a finished event the parent must act on, never for reporting each change. Before adding a prop, name the line in the parent that needs it; if the parent only stores or forwards it, delete the prop.

**JSX stays shallow**

When JSX nests deep, repeats a block, or needs a comment to explain what a section is, give that section a component named for what it shows, in its own file, because a component is something a person looks up and is called from outside that file. Never a render helper or a second component inside the same file. Conditionals in JSX stay one level deep; anything more becomes an early return or a child component. Lists are keyed by stable ids from the data, never by index.

**Hooks and context**

Logic that works out data for a view, filtering, grouping, searching, stays in the component until a second component needs it, then becomes a hook. Reach for context only when props would otherwise pass through components that don't use them. A context is two files in its own folder: the definition with the hook that reads it and throws when used outside the provider, and the provider, which stays apart because fast refresh needs a file that exports only components.

**Forms**

Forms never use `useState` for values, errors, dirty or submitting state. Use TanStack Form or React Hook Form with a Zod schema, whichever the repo has, and ask if it has neither. The schema and default values are module constants above the component, and one form component owns its fields and its submit.

**State**

Never store what can be computed: filtered lists, counts and labels are worked out during render from the state they come from, and an effect that copies one state into another is a bug waiting for an edge case. Data from the server is a cache of something owned elsewhere, read through the repo's data layer, never copied into local or global state. State lives as close to the components that use it as it can, and state a user would share or expect back after a reload belongs in the URL.

**Things that never ship**

`console.log`. User-editable text rendered as HTML without a sanitizer, because one unescaped field is a stored script on every viewer's page. A silent `null` for a missing record or an empty list: render a not-found or empty state that says what happened.

**Done**

Open every route the change touches in a browser, use each interaction it adds, and read the console. A route that renders the wrong view or logs an error is a failed task.
