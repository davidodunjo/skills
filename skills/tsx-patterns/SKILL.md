---
name: tsx-patterns
description: Use when writing or editing frontend code in TypeScript/TSX (React components, hooks, forms, routing, services, styling). House style covering structure, naming, and shape, independent of specific libraries.
---

# TSX patterns

Stack-agnostic: describes structure, naming, shape, not specific libraries. Applies whatever your component, data-fetching, form, styling, and routing libraries are. Overlaps with `coding-principles`; these rules win within frontend scope.

1. Components are named function declarations (`function ContactView() {}`), never `const X = () => {}`.
2. Default export is a separate statement at the bottom, never inline `export default function`.
3. One default export per component file; components are never named-exported.
4. Prop types are `type` aliases, never `interface`.
5. Prop type named after the component (`BoardCardProps`), never bare `Props`, never inlined into the signature.
6. Props taken as a single `props` parameter, destructured on the first line of the body.
7. No-prop components use empty `()`, no `props` argument.
8. Body order: prop destructure, data hooks, derived values, handler declarations, early-return guards, remaining derived values, `return` JSX last.
9. Event handlers as `function handleX() {}` declarations; only one-off handlers passed directly to JSX props stay arrow functions.
10. `useCallback`/`useMemo` absent from presentational components, only in providers, custom hooks, expensive components.
11. Hook dependency arrays minimal; intentional omissions carry a visible exhaustive-deps disable comment.
12. Simple derived values recomputed inline every render, not memoized in view components.
13. Early-return guards: special-case, loading, error, empty/null, each returning before the main JSX.
14. Loading state renders one shared loading component, used everywhere.
15. Not-found/empty state returns `null`; list-level empties may render a short message.
16. No comments, no doc blocks on component bodies.
17. Comments rare everywhere; when unavoidable, explain why, never what.
18. `memo()` wraps the export only for expensive or frequently re-rendered components.
19. Server-component frameworks: client directive is the first line of top-level view/form/layout/page files, omitted on leaf components.
20. Layout/spacing/typography: utility classes. Theme-token/computed styles: inline style prop. CSS pseudo-state/transitions: styled wrapper.
21. Class-merge helper only for conditional/state classes plus incoming `className`, never static class lists.
22. Entrance animation: one small repeated preset (slide up, fade in), only on list/header wrappers, never leaf detail components.
23. Import order: third-party, then aliased internal/framework, then relative app imports.
24. Server data via per-resource hooks destructured with renamed `data:` plus loading/error flags; multiple loading flags aliased and OR-ed in the guard.
25. Conditional JSX inline with `&&`/ternaries in `return`; lists with inline `array?.map(...)`, not pre-extracted.
26. One utility library, one consistent alias, used for common helpers (find, defaults, isEmpty, unique-id).
27. Module-top styled wrapper (`Root`, or `Styled<X>` for leaves) between imports and props type, when CSS-state styling is needed.
28. Service file exports one plain object holding every endpoint method.
29. Every service imports the shared HTTP client first.
30. Service methods are async functions returning a typed promise.
31. Endpoint URLs use a shared base prefix; item-level operations interpolate id via template literal.
32. Write operations pass the body through the HTTP client's JSON-body option.
33. Create inputs typed `Omit<T, 'id'>`; bulk deletes take `string[]` posted as body.
34. Deep-partial type for update and create inputs.
35. One query/mutation hook file per CRUD operation.
36. Each query file exports a query-key constant: list keys plain array literals, item keys `(id) => [...]` factories.
37. Query keys: `['domain', 'entity', id?]`.
38. List hooks: thin query, service method as the fetcher directly.
39. Item hooks: closure to pass the id, disabled until id exists.
40. Hook naming: `useXxxList`/`useXxxs` for lists, `useXxx` for a single item, `useCreate/Update/DeleteXxx` for mutations.
41. Mutation hooks: fixed template, take query client, mutate with `onSuccess` invalidating affected keys.
42. Mutation files import query-key constants from sibling query files, don't redefine.
43. Update/Delete invalidate list key and item key; Create invalidates list key only.
44. Response row/array type passed as the query's generic.
45. Model files are factory functions taking deep-partial input, returning fully-defaulted object via defaults merge.
46. Default `id` seeded with a generated unique id, sometimes with a string prefix.
47. Primary model is default export; sub-models are named exports in the same file.
48. Domain types live in a single types barrel, `export type` exclusively, union literal types, optional `?` fields.
49. HTTP client created once in a single module, shared everywhere.
50. Automatic retries limited to idempotent methods.
51. Each route file default-exports one typed route object, in a variable named `route`.
52. View components code-split with `lazy(() => import(...))`, declared after imports, before the route object.
53. Route files never wrap in their own Suspense; applied once centrally around the layout outlet.
54. Route's parent element: bare outlet (no shell), shell-wrapped outlet (persistent shell), or the view directly (single-view routes).
55. Index redirect is the first child of the route.
56. Detail routes use `:camelCaseId` params nested directly under their list route.
57. Optional `auth`/`settings` keys on the route object; children inherit parent `auth` unless declaring their own.
58. Pages hiding app chrome do so through route settings, not branching in the layout.
59. App-shell view is default-exported wrapped in its own provider via a wrapper function, mounting at the route element level.
60. Each React context: three-file folder, the context (type + `createContext`), the provider, the hook.
61. Context value type declared in the context file; context itself is a named export.
62. `createContext` given a null/undefined default to force the hook null-check.
63. Consuming hook calls `useContext`, null-checks, throws if used outside its provider.
64. Provider holds local state, assembles a value object passed to the provider.
65. Feature context/provider/hook all named exports; app-wide context is the exception, default-exported.
66. Contexts use the `<Context value={...}>` provider form.
67. Validation schema declared at the top of the form module.
68. Validators carry inline human-readable messages.
69. Form type inferred from the schema.
70. Forms initialized with validate-on-change, schema resolver, default values.
71. Default values from a model factory for entity forms, or a literal object otherwise.
72. Form state destructured; validity, dirty fields, errors pulled on a separate line.
73. Entity forms hydrate from fetched data via a reset call inside an effect keyed on that data.
74. Every input bound through the form library's controller, wired to field state with error flag and helper message.
75. Submit handler named `onSubmit`, signature `(formData) => ...`, wired through the form library's submit wrapper.
76. Submit button disabled while pristine or invalid.
77. Pristine-or-loading guard renders the shared loading component before the form.
78. Multi-tab forms share state through the form provider, each tab reading control from form context.
79. Whole form value captured into a local variable used for submit payloads and pristine guards.
80. Server-side field errors mapped back through the form library's set-error API.
81. Inline/dialog forms auto-save via debounced changes through an update mutation, not explicit submit.
82. Hooks single-responsibility, minimal deps, guard throws when used outside their provider.
83. Storage/value hooks return getters/setters object; settings hooks return the raw context.
84. Formatting delegated entirely to the project formatter; never hand-format or fight it.
85. Blank-line padding around functions and `if` statements required.
86. Unused imports: error. Unused vars: warning with `^_` ignore pattern.
87. `console.log` disallowed; error channel is the only permitted console method.
88. Each file exports components only, no mixed component/non-component exports (fast refresh).
89. Hook lint rules on; intentional exceptions marked with explicit disable comment.
90. No `import React` (new JSX runtime); prop-types off (TypeScript covers it).
91. `type` preferred over `interface`; `interface` reserved for ambient/module-augmentation.
92. Imports use configured path aliases, not long relative chains.
93. Framework/shared-layer components, utils, types carry a consistent prefix.
94. `.tsx` only when it contains JSX, `.ts` otherwise.
95. Configuration registries live in a dedicated configs directory, data-only, default-exported objects/arrays.
96. Routes auto-discovered by globbing route files; no manual route registration.
97. URL grouping uses parenthesized route-group folders, no effect on URL path.
98. Translation bundles registered at module load under a feature namespace.
99. Each language bundle default-exports one flat object, UPPER_SNAKE_CASE keys.
100. Components read translations through a translation hook scoped to the feature namespace.
101. Data hooks depending on an optional id stay disabled until present, not called conditionally.
102. Domain entity shapes redefined per feature, not shared from a common module.
103. Within a service, item-level reads/writes pass id via template literal; collection reads use a static path.
104. App composed as a nested provider tree in a single root file, cross-cutting concerns outermost-to-innermost, layout at the leaf.
105. Post-login redirect intent stored in session storage, cleared on use, ignore-list of paths.
106. No `forwardRef`; components declare `ref?:` directly in props type, destructured (ref-as-prop).
107. Components needing internal and forwarded ref hand-roll a ref-merging callback.
108. `useImperativeHandle` exposes a small named-method object, no dependency array, handle type inlined into `ref?:`.
109. `useRef<T>(null)` for DOM nodes, `useRef<T | undefined>(undefined)` for mutable holders.
110. Shared dialogs managed through a central registry keyed by id: opening spreads props with open true, closing deletes the key.
111. Dialog content supplied as a render-prop receiving the close handler and data.
112. Two dialog approaches by design: local state + plain dialog for self-contained forms; central registry for shared/confirm dialogs.
113. Notifications through one notification utility, success and error variants.
114. Debounce hook wraps utility debounce in a stable callback, cancel-on-unmount, used for hover-intent and form auto-save.
115. Deep-compare effect is the form-sync effect of choice, paired with debounce for watch-then-persist.
116. Single pub/sub utility as the only event bus; one-time listener removes itself.
117. Immutable nested-setter: one shared helper, reused app-wide.
118. Router navigation/params accessed through thin re-export hooks, not importing the router directly in features.
119. Conditional styling uses the array form of the style prop.
120. Custom styled-component props lowercased to survive DOM forwarding, not a forward-prop filter.
121. Tab panels toggle visibility with a hidden class, not unmounting.
122. Drag-and-drop: context, droppable, draggable render-prop structure, early-bail guards in drag-end, generic reorder helpers.
123. Date utilities imported per-function, not as a namespace; relative labels use a distance formatter with a suffix.
124. Date picker inside the form controller bridges ISO strings and `Date` objects.
125. `as const` reserved almost exclusively for query keys; `satisfies` rarely used.
126. Status/variant types are union string literals, not enums.
127. TypeScript module augmentation kept minimal.
128. Route params read untyped, narrowed with an inline `as` object cast.
129. Non-null `!` assertions essentially never used; optional chaining with `?? ''`/`|| ''` fallbacks preferred.
130. `useReducer` with discriminated-union action type and `default: throw` reserved for tightly coupled state.
131. Nav item `type` is one of a small fixed set of strings; a collapsible item may itself be navigable.
132. Config files typed by importing the type from the consuming component, not a local copy.
133. `end: true` on parent-overlapping leaf URLs to stop the parent route staying active.
134. Route config: explicit `auth: null` for public routes, `undefined` inherits parent/default auth. Null vs undefined is load-bearing.