---
name: writing-code
description: Use when writing or editing code in any language.
---

Write the least code that does the job and reads at a glance. These rules have no exceptions. A repo's conventions override only naming and formatting. When unsure, write less.

**Functions**

Write code inline. Create a function only when two or more places call it, or when something outside the file calls it. A function only one other function calls gets inlined into it. Never wrap a call to rename it.

**Files**

Create a file only for something a person would look up on its own. Operations on the same thing share one file, grouped together. Never create a file for one small function, and never create `utils`, `helpers` or `common`.

**Names**

Functions say the whole action: `saveProductAndSync`, `convertPriceToCents`. Variables say what they hold: `unpaidInvoices`. Use full domain words and one term per concept. Never use `data`, `item`, `temp`, `res`, `r`, `e`.

**Repetition**

Logic, a value or a shape needed twice is defined once and imported.

**Untangled from the start**

Before placing code, ask what must change with it, and keep those things together, grouped by feature, never by layer. Pass in what code needs: no hidden globals, no call order callers must know. Features never import each other, and what they share moves below both. Stable code never imports volatile code. No parameter for one caller and no `if` for one value: change the design so the case disappears.

**Nothing extra**

Write only what the task requires. No option, config, interface, wrapper or abstraction for something that doesn't vary today. No guard for a value that cannot be missing. No dependency where the language already does the job.

**Layout**

Imports, setup, constants, logic, execution, in that order. Related lines sit together, with one blank line between groups. Guard clauses come first and the main path runs down the page. No nested ternaries.

**Comments**

Comment only a fact the code cannot show. Never restate the code.

**Errors**

Validate untrusted input where it enters. Never swallow an error or hide it behind a fallback. Never hardcode a secret.

**Example**

Wrong:

    function getOrderTotal(items) { return items.reduce(addPrice, 0); }
    function addPrice(sum, item) { return sum + item.price; }

Right:

    const orderTotal = orderItems.reduce((sum, orderItem) => sum + orderItem.price, 0);

**Done**

Run what you changed. Then reread every line and delete whatever breaks a rule.
