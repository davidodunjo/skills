# Accessibility and keyboard

Accessibility is the default behaviour of correct markup, so start from semantics: a control that navigates is a link, one that acts is a button, a list is a list, headings descend in order without skipping, and each page has one main landmark and one top-level heading. Reach for ARIA only when no element expresses the role, and prefer the design system's headless primitives, which already implement roles, states and keyboard patterns for menus, dialogs, comboboxes, tabs and listboxes, over rebuilding them.

Every interactive element is reachable and operable by keyboard in a sensible tab order, with a visible focus ring that is never removed without a replacement. Composite widgets, menus, tabs, grids, listboxes, take one tab stop and move within themselves by arrow keys. Overlays manage focus: dialogs and sheets trap focus while open, move it to the first meaningful control on open and return it to the trigger on close, and Escape closes them. When an action removes the focused element, deleting a row or closing a panel, move focus somewhere deliberate rather than letting it fall to the body.

Every input has a visible label tied to it, every icon-only button an accessible name, every image meaningful alt text or an empty alt when decorative. Errors are associated with their fields and announced; status changes that happen out of view, a save confirmation, a background failure, a filtered result count, are announced through a polite live region, which toast and notification primitives usually provide.

Power users get the keyboard as a first-class input: frequent actions have shortcuts, shown in tooltips and menus beside the action they trigger, registered in one keymap so they can be listed and never collide, and ignored while the user types in a field. A command palette opened with the platform's modifier and K lists navigation and actions, searchable, with recent and contextual commands first.

Respect the user's settings: reduced motion, increased contrast and forced colours, and text zoom to 200 percent without content clipping or horizontal scrolling at standard widths. Colour is never the only carrier of meaning, and text and essential icons meet contrast minimums against their actual background in both themes. Touch targets are large enough to hit, and hover-only affordances have a keyboard and touch equivalent.

Check, do not assume: tab through every new screen, operate it without a mouse, run the browser's accessibility checks, and read what a screen reader would announce for new controls.
