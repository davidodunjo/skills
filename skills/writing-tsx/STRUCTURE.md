# Structure

The tree is the table of contents. Someone who has seen one feature should find anything in another without searching, so organise by feature first, then by responsibility inside it, and give each thing a person looks up on its own its own file. Grow the tree only when there is something to put in it: a two-file feature stays two files, and a folder appears when its second file does.

**Where features go**

Features live under the routes directory, never directly in `src/`. When there is auth or any other gating, group them in `_public` and `_protected` layouts, prefixing the folder names with an underscore so the gate for protected pages sits in the layout's route file. Without gating, features sit directly under routes, inside a layout only if they share one. A layout folder holds its route file and its features, never a `components/`, `hooks/` or `lib/` for the features inside it, because `src/components` and the other shared folders serve that purpose.

```text
src/
├── components/
│   ├── PageTitle.tsx
│   └── data-table/
│       ├── DataTable.tsx
│       └── DataTableTopToolbar.tsx
└── routes/
    ├── __root.tsx
    ├── _public/
    │   ├── route.tsx
    │   └── sign-in/
    └── _protected/
        ├── route.tsx
        └── contacts/
```

`src/components` is flat. Never group by kind there, so no `ui/`, `forms/`, `views/`, `shared/` or `common/`. A component goes straight into `src/components` unless it has subcomponents, and then it gets a folder named for its purpose, like `data-table/`. The one exception is design-system primitives, which live where their tooling puts them.

**A feature**

```text
contacts/
├── api/
│   ├── hooks/
│   │   ├── contactHooks.ts
│   │   └── tagHooks.ts
│   ├── models/
│   │   ├── ContactModel.ts
│   │   └── TagModel.ts
│   ├── services/
│   │   └── contactsApiService.ts
│   └── types/
│       └── index.ts
├── components/
│   ├── views/
│   │   ├── ContactsAppView.tsx
│   │   └── ContactView.tsx
│   ├── ui/
│   │   ├── ContactsHeader.tsx
│   │   └── contact-list/
│   │       ├── ContactsList.tsx
│   │       └── ContactListItem.tsx
│   └── forms/
│       ├── ContactForm.tsx
│       └── email-selector/
│           ├── ContactEmailSelector.tsx
│           └── EmailInput.tsx
├── contexts/
│   └── contacts-app-context/
│       ├── ContactsAppContext.ts
│       └── ContactsAppProvider.tsx
├── hooks/
│   └── useFilteredContacts.ts
├── lib/
│   ├── contactLabels.ts
│   └── contactNames.ts
└── route.tsx
```

`api/` is everything that talks to the server: in `hooks/`, one file per resource holding every read and write hook for it; one service object holding every operation in `services/`; the API's shapes in `types/index.ts`; and in `models/`, one factory per entity that fills in defaults for a new record. `components/` splits into `views/` for what a route renders, `ui/` for the pieces views are built from, and `forms/` for forms and their inputs. `contexts/`, `hooks/` (logic two components share that is not an API call), `lib/` (fixed values and helpers two or more files share, each file named for its subject) and `types/` (frontend-only shapes) appear only when there is something to put in them. The route file is whatever the framework calls it.

A component with children nothing else renders becomes a folder named for it, holding the parent and its children: `contact-list/` holds `ContactsList.tsx` and `ContactListItem.tsx`. Folders nest the way the UI nests, so `board/card/checklist/` is a checklist inside a card inside a board. Once a second component imports a child, the child moves out to sit beside the folder.

**Names**

| Thing | Case | Example |
| --- | --- | --- |
| Folder | kebab-case | `contact-list/`, `contacts-app-context/` |
| Layout | underscore prefix | `_protected/`, `_public/` |
| Route group | kebab-case in parens | `(errors)/` |
| Component | PascalCase `.tsx` | `ContactListItem.tsx` |
| Model | PascalCase `.ts` | `ContactModel.ts` |
| Context and provider | PascalCase | `ContactsAppContext.ts`, `ContactsAppProvider.tsx` |
| Hook | camelCase, `use` prefix | `useFilteredContacts.ts` |
| A resource's API hooks | camelCase | `contactHooks.ts` |
| Service | camelCase | `contactsApiService.ts` |
| Any other module | camelCase | `navigationConfig.ts`, `reorder.ts` |
| A feature's API types | `index.ts` | `api/types/index.ts` |

Folders are plural nouns for kinds of thing (`hooks/`, `views/`) and singular for one thing (`contact-list/`). Hooks name the thing they return or the action they perform: `useContact`, `useContacts`, `useCreateContact`, never `useGetContact`, `useContactData` or `useContactHelper`. `.tsx` only when the file contains JSX. No `index.ts` barrels by habit; the types module is the exception.

**The app around the features**

App-wide pieces sit at the top level of `src/`: `components/` as described above, `hooks/`, `contexts/`, `lib/`, and `configs/` for the data that drives the UI (navigation, theme, settings) as plain typed modules. Features never import from each other: what two features share moves down into the shared level, and what one feature needs stays in that feature.

**When nothing here covers it**

Place it with "Untangled from the start" in `writing-code`, then name it with the table above.
