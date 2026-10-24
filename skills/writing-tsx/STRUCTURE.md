# Structure

The tree is the table of contents. Someone who has seen one feature should find anything in another without searching, so organise by feature first, then by responsibility inside it, and give each thing a person looks up on its own its own file. Grow the tree only when there is something to put in it: a two-file feature stays two files, and a folder appears when its second file does.

**A feature**

```text
contacts/
├── api/
│   ├── hooks/
│   │   ├── contacts/
│   │   │   ├── useContact.ts
│   │   │   ├── useContacts.ts
│   │   │   ├── useCreateContact.ts
│   │   │   ├── useUpdateContact.ts
│   │   │   └── useDeleteContact.ts
│   │   └── tags/
│   │       ├── useTags.ts
│   │       └── useCreateTag.ts
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
│       ├── ContactsAppProvider.tsx
│       └── useContactsAppContext.ts
├── hooks/
│   ├── useFilteredContacts.ts
│   └── useGroupedContacts.ts
├── lib/
│   ├── constants/
│   │   └── contactLabels.ts
│   └── utils/
│       └── contactNames.ts
└── route.tsx
```

`api/` is everything that talks to the server: one hook per read or write in `hooks/`, grouped by resource once there are two; one service object holding every operation in `services/`; the API's shapes in `types/index.ts`; and in `models/`, one factory per entity that fills in defaults for a new record. `components/` splits into `views/` for what a route renders, `ui/` for the pieces views are built from, and `forms/` for forms and their inputs. `contexts/`, `hooks/` (logic that is not an API call, such as filtering or grouping), `lib/` (`constants/` for fixed values, `utils/` for helpers two or more files share, each file named for its subject) and `types/` (frontend-only shapes) appear only when there is something to put in them. The route file is whatever the framework calls it.

A component with children nothing else renders becomes a folder named for it, holding the parent and its children: `contact-list/` holds `ContactsList.tsx` and `ContactListItem.tsx`. Folders nest the way the UI nests, so `board/card/checklist/` is a checklist inside a card inside a board. Once a second component imports a child, the child moves out to sit beside the folder.

**Names**

| Thing | Case | Example |
| --- | --- | --- |
| Folder | kebab-case | `contact-list/`, `contacts-app-context/` |
| Route group | kebab-case in parens | `(protected)/`, `(public)/` |
| Component | PascalCase `.tsx` | `ContactListItem.tsx` |
| Model | PascalCase `.ts` | `ContactModel.ts` |
| Context and provider | PascalCase | `ContactsAppContext.ts`, `ContactsAppProvider.tsx` |
| Hook | camelCase, `use` prefix | `useCreateContact.ts` |
| Service | camelCase | `contactsApiService.ts` |
| Any other module | camelCase | `navigationConfig.ts`, `reorder.ts` |
| A feature's API types | `index.ts` | `api/types/index.ts` |

Folders are plural nouns for kinds of thing (`hooks/`, `views/`) and singular for one thing (`contact-list/`). Hooks name the thing they return or the action they perform: `useContact`, `useContacts`, `useCreateContact`, never `useGetContact`, `useContactData` or `useContactHelper`. `.tsx` only when the file contains JSX. No `index.ts` barrels by habit; the types module is the exception.

**The app around the features**

App-wide pieces sit at the top level in the same shape: `components/` for components several features use, `hooks/`, `contexts/`, `lib/`, and `configs/` for the data that drives the UI (navigation, theme, settings) as plain typed modules. Design-system primitives live where their tooling puts them and are not mixed in with app components. Features never import from each other: what two features share moves down into the shared level, and what one feature needs stays in that feature.

**When nothing here covers it**

Place it with the three questions in `writing-code`, then name it with the table above.
