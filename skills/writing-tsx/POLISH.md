# Polish

Premium is the absence of rough edges, so every state a screen can be in is designed, not just the happy one. Loading shows a skeleton shaped like the content that will replace it, appearing only after a short delay so fast responses never flash; spinners are for actions in progress, inside the control that started them. Empty states say what the area is for, why it is empty and what to do next, with the primary action, and distinguish a new user's empty from a filter that matched nothing. Errors say what failed in plain words, keep whatever the user typed, and offer the next step, usually retry; raw error messages and status codes never reach the screen.

Every action gets feedback at the speed of the action: the control reacts on press, the result appears optimistically where it can, and a quiet toast confirms only what happened out of view or what can be undone. Destructive actions are undoable by default and confirmed only when undo is impossible. Long work shows progress and can be left and returned to.

Pages share one anatomy so users learn it once: a header band with the title, a live count or summary, the page's search and filters, and its primary action on the right; content below; secondary detail in a side panel that keeps the list visible, so context is never lost. One primary action per view, visually dominant; everything else is secondary or tucked into a menu.

Rhythm and type do the rest. Use the spacing scale and nothing between its steps, align to a consistent grid, and keep density consistent within a view. Type has a small scale with clear hierarchy, tabular figures for numbers that line up, sentence case for UI copy, and truncation with the full text available on hover. Avatars, covers and thumbnails have fallbacks; images never shift layout as they load.

Copy is part of the interface: verbs on buttons (`Save contact`, not `OK`), the same word for the same thing everywhere, no jargon, no blame in errors, no exclamation marks except in genuine celebration. Dates and numbers are formatted for the user's locale.

The details people notice without naming: the browser tab title tracks the page, the favicon and theme colour match the app, links behave as links, selection, scroll position and form drafts survive navigation, keyboard shortcuts are shown where the action lives, and both themes look intentional rather than one being an afterthought.
