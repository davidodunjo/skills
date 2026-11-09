---
name: writing-code
description: Use when writing or editing code in any language.
---

Write the least code that does the job and reads at a glance. These rules have no exceptions. A repo's conventions override only naming and formatting. When unsure, write less.

**Before writing**

Search for existing code that does this, then for a language or platform feature. Write new code only if neither exists. Before changing stored data, find out how much there is, whether writes continue during the run, and whether downtime is allowed. Ask if the repo cannot answer.

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

**Safety**

Assume any line can crash and the whole thing reruns. Code that changes state selects only unfinished work, so a rerun resumes and a finished run changes nothing. Each write leaves a record fully old or fully new. Use the platform's atomic and bulk operations, never hand-written loops, retries or locks. Do the work where the data lives, never fetch everything to loop over it. End by proving the final state, and fail if it is wrong. Write only the fields you own, because another writer can change a record between your read and your write. Never remove old data until its replacement exists.

**Errors**

Validate untrusted input where it enters. Never swallow an error or hide it behind a fallback. Never hardcode a secret.

**Examples**

Wrong:

    function getOrderTotal(items) { return items.reduce(addPrice, 0); }
    function addPrice(sum, item) { return sum + item.price; }

Right:

    const orderTotal = orderItems.reduce((sum, orderItem) => sum + orderItem.price, 0);

Wrong:

    const allProducts = await products.find().toArray();
    for (const product of allProducts) await products.updateOne({ _id: product._id }, { $set: { priceInCents: product.price * 100 } });

Right:

    await products.updateMany(hasNumericPrice, convertPriceToCents);

**Done**

Name the second caller of every function you added, or inline it. Name why a person would look up every file you added, or merge it. For code that changes state, interrupt it, rerun it, then rerun it again. Run what you changed and state exactly what could not be run. Then reread every line and delete whatever breaks a rule.
