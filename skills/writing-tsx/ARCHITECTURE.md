# Architecture

A feature is a vertical slice: everything one part of the product needs, its routes, data access, components, state and helpers, lives together under one folder, so a change to that feature touches one place and deleting the feature deletes one folder. Organise by what changes together, never by file type across the whole app; a top-level `components/`, `hooks/` and `utils/` holding every feature's pieces is the layout to avoid. Where the router is file-based and the repo keeps features beside their routes, the route folder is the feature folder and its non-route folders are excluded from route generation.

Every feature has the same shape, which is what makes a codebase predictable to people and agents alike: data access in `api/`, UI in `components/` split into page-level `views/`, feature-only `ui/` and `forms/`, and optional `hooks/`, `lib/`, `contexts/` and `types/` that appear only when there is something to put in them. The shape is a ceiling, not a checklist; a two-file feature stays two files.

Imports flow one way: the app shell and routes import from features, features import from shared code, and shared code imports from neither. Features never import from each other; when two features need the same thing, it moves down into shared code, and when a feature needs to show another feature's data, the route composes both. Enforce the direction with the linter's restricted-paths rule where the toolchain supports it, so the architecture holds without review.

Shared code is layered by how generic it is: design-system components (the generated or vendored primitives) at the bottom, app-wide components built from them above, then app-wide hooks, utilities and configuration. Something earns a place in shared code only when a second feature uses it; before that it lives in the feature that needs it, close to its only caller.

Configuration that drives the UI, navigation items, feature flags, theme options, is plain typed data in one config folder, imported by the code that renders it, never scattered as literals through components. Environment access goes through one typed, validated module read at startup, so a missing variable fails loudly at boot instead of as `undefined` at runtime.

Name things for the domain, not the implementation: `ContactsView`, `useArchiveContact`, `contactQueries`, never `DataGrid2`, `useHelper` or `utils2`. One term per concept across routes, files, types and UI copy; if the product calls it a workspace, nothing in the code calls it a team.
