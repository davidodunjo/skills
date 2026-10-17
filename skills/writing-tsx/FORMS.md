# Forms

A form is schema-first: the validation schema is declared at the top of the form's module with human-readable messages on every rule, the form's type is inferred from it, and the same schema, or one derived from the resource's API schema, guards the submit, so client and server never disagree about what is valid. Use the repo's form library; with no precedent, use the one native to the stack that validates against Standard Schema.

Defaults come from the record the route already loaded, or from the resource's model factory for a new record, never from an inline literal and never by resetting the form in an effect after data arrives, since the data is present before the form mounts. Convert between API and form shapes in two small named functions beside the schema (`toFormValues`, `toInput`), so dates, nullable fields and nested arrays are handled in one place.

The form owns its state and submission; the view around it supplies the record, the mutation and where to go afterwards. Every input binds through the form library's field API with its label, error message and invalid state wired to the design system's field components, so labels are clickable, errors are announced and invalid inputs are marked. Validate on blur and on change after the first submit attempt, not on every keystroke from the start, so users are not scolded while typing.

Repeatable groups, several emails or phone numbers, are field arrays rendered by their own component that owns add, remove and reorder, with stable keys from the library rather than indexes, a sensible minimum, and focus moved to the new row's first input when one is added. Every row's inputs get unique ids derived from the field path.

Submit is disabled while the form is pristine, invalid or already submitting, and shows a pending state on the button rather than a page loader. On success, either navigate to the result or reset the form to the saved values so it is pristine again; never leave a saved form looking dirty. Server-side field errors map back onto their fields through the library's set-error API, and a form-level error is shown above the actions. Unsaved changes are protected: navigating away from a dirty form asks first, through the router's blocking API.

Forms that edit in place, inline titles, settings toggles, dialog fields, save through debounced changes and an update mutation instead of an explicit submit, show that they saved, and roll back on failure.
