---
name: writing-code
description: Use when writing or editing code in any language.
---

Write for the person who opens the file cold, in any language. They should know where to look, what each piece is and why it is there, without running it or asking anyone. Code that is easy for a model to produce but tiring for a person to read fails, however correct it is. A repo's own conventions win over this skill.

**Predictable over clever**

The highest compliment for a codebase is that it is boring to navigate. The same kind of thing has the same shape, the same name pattern and the same place everywhere, so someone who has read one part already knows the next. Before writing, open the nearest sibling and mirror it: if invoices have `getInvoice` and `createInvoice`, payments get `getPayment` and `createPayment`, not `fetchPaymentData`. When the repo has no precedent, set one and repeat it. A new variation needs a reason a reviewer would accept, not a preference. A value two files must agree on, a cache key, a route path, a list of statuses, is defined once where it belongs and imported everywhere else, never retyped.

**Build only what the task needs**

No scaffolding for a future that hasn't arrived, no interface with one implementation, no service, manager or repository layer that only passes calls through, no setting nobody sets. Prefer the language and its standard library to a dependency or home-made infrastructure. Simple is the default; complexity appears only where the problem itself is complex.

**Inline until a name earns its place**

A piece of code earns its own name when the name tells the reader something they need, not because a few lines can be lifted out. Small handlers, one-off transforms and a lookup used twice in one function stay where they are used. A function only one file uses lives in that file. Something gets its own file when it owns a responsibility a person would look up on its own. Two or three repeated lines cost less than an abstraction nobody asked for. Never create a grab-bag `utils`, `helpers` or `common` file, and never put one trivial function in a file of its own.

**One thing per file, things read together stay together**

Split by what a person looks for, not by line count. A unit someone looks up on its own, a class, a hook, a command, a component, gets its own file named after it. Operations on one resource stay together in one module, because they are read side by side, and so do the shapes they exchange. A long file is a symptom, not the rule: split it when its responsibilities diverge, not to hit a length.

**Organised by feature, named by convention**

Group by feature or responsibility first and by kind inside it, so a change to one feature touches one folder and deleting it deletes one folder. Never scatter a feature across repo-wide `models`, `services` and `utils` folders. Folders are plural nouns for a kind of thing (`hooks/`, `services/`) and singular for one thing (`invoice-list/`). Names follow the language's own convention, PascalCase C# types, snake_case Python modules, and where the ecosystem has none, folders are kebab-case. Use full domain words: `invoice`, not `inv`, `data` or `item` when the domain is known, and one term per concept everywhere.

To place anything new, ask three questions in order. Who uses it? One file: keep it in that file. One feature: that feature's folder for its kind. Two features: the nearest folder both already live under. The whole app: the top-level folder for its kind. What kind of thing is it? The folder is named for the kind, the file for the thing. Does a sibling already do this? Put it where the sibling put its own, and name it the same way. If the answer still isn't obvious, the thing probably does two jobs; split it first.

**Say what it is, once, at the top**

Every module, type and exported function opens with a short doc comment in the language's own form, saying what it is in plain words: a multi-line `/** */` block in JavaScript and TypeScript (never the one-line form), `///` in C#, a docstring in Python, comment-based help in PowerShell.

```ts
/**
 * Groups contacts by the first letter of their name.
 */
```

Inside a body, comment only what the code cannot say: why a rule exists, why the obvious approach was not taken. Never restate the next line, and never use descriptive line comments.

**Plain, then short**

Use the shortest version that stays clear, never shorter. The main path reads top to bottom, guard clauses handle the special cases first, and nothing makes the reader run the code in their head: no nested ternaries, no clever chains. Don't guard against values that cannot be missing, since every null check tells the reader something might be absent. Let types infer where the reader can see the type anyway, and write them out at boundaries.

**Fail loudly**

Validate untrusted input at the boundary where it enters. Don't swallow errors, turn a failure into an empty success, or add a fallback value that hides a broken assumption. Keep security checks, cleanup, cancellation and error handling even when they make the code longer. Never hardcode a secret.

**Done**

Passing type checks and lint is not done. Run the change the way a user would, and say plainly what could not be checked. Run the project's verify command last, after every file, notes included, is written.
