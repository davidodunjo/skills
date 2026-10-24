---
name: writing-prose
description: Use when writing any text a person will read: a README, docs, a PR description, a message, copy, an explanation.
---

Write the way a clear, calm person explains something they understand well: plain words, exact meanings, nothing to prove. The reader should never have to read a sentence twice. Concise means every sentence survives the question "would the reader miss this?", not that the reasoning is stripped out; keep the one step that makes the rest make sense, and cut everything around it.

**Sentences**

State the point first, in a short declarative sentence. Then give the concrete case that shows it, then the qualification if one is needed, stated once and set aside: "This doesn't mean X." End on the point, not on a summary of it. Vary the rhythm: a longer sentence that carries the detail, then a short one that lands. Use colons to deliver what the sentence has been setting up, and dashes to step aside mid-thought and come back — the way a person speaks — never as a stand-in for every comma or full stop. Ask a question only to voice what the reader is about to ask, and answer it in the next sentence.

**Words**

Choose the specific word over the impressive one, and a number or a name over a vague quantity. Define a term once, precisely, then use it the same way every time; switching between synonyms makes the reader wonder whether they are different things. Use first person for an opinion and own it, without stacking hedges. Confidence comes from precision, warmth from dry understatement, never from exclamation marks or enthusiasm.

**Paragraphs**

One paragraph makes one move. The first sentence says what the move is, and the rest earns it. When the move is small, the paragraph is one sentence. Put the common case first and the rare or optional case after it, so nobody reads past the unusual path to reach the usual one. Length follows the subject: a small thing gets a short text.

**Show before you explain**

When the text introduces something people use, a short realistic example teaches more than a paragraph describing it, so lead with it. Answer what the reader would otherwise find out the hard way: what it needs, what it costs, what it can't do, what to do when it goes wrong, and which of two routes to take. State limits plainly instead of leaving them out.

**Markdown and READMEs**

A title, then one sentence that says what the thing is. Then sections in the order a newcomer acts: requirements, setup, development, checks, then anything optional or advanced, then cleanup. Each step is one sentence saying what it does or when you need it, followed by one exact, runnable command in its own code block. A caveat goes in one sentence right after the command it qualifies. Headings are plain nouns in sentence case. No badges, tables of contents, feature lists, architecture essays or closing summaries; link to detail rather than embedding it. Match the project's real names, commands and tooling exactly.

**Commits, PRs and messages**

A commit subject says the change in the imperative: `Add contact search`. Add a body only when the reason isn't obvious from the change, and follow the repo's convention when it has one. A PR description says what changed for the user and how it was checked. A message or reply leads with the answer or the blocker, then the reason, then the next step.

**What gives generated text away**

Slogans and taglines, hype words (powerful, seamless, robust, comprehensive, leverage), emoji, stacked adjectives, bold scattered for emphasis, rhetorical triplets, "not just X but Y", and closing summaries that repeat what was just said. Before finishing, read it as a stranger would. If it sounds like a landing page or a spec sheet instead of a person talking, rewrite it; if someone could follow it start to finish without asking you anything, it's done.
