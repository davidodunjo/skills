# Type safety

Types are only as true as the boundaries that feed them, so every value entering the app from outside, API responses, URL params and search params, storage, environment variables, messages from other windows, is parsed against a schema at the point it enters, and everything past that point trusts the parsed type. A type written by hand to describe a response nobody checked is a promise the runtime does not keep.

One contract per boundary. When client and server share a repo, both import the same schemas or the same generated client, so a renamed field breaks the build rather than production; when they do not, generate the client from the server's description rather than hand-writing request and response types. Domain types are inferred from those schemas instead of declared beside them, so the check and the type cannot drift.

No escape hatches in application code: no `any`, no `as` casts to silence the checker, no non-null `!`. Narrow with guards, parse unknown input, and use the router's and the data layer's typed APIs, typed params, typed links, typed query results, so a wrong route or a wrong key is a compile error. Where a cast is genuinely unavoidable at an integration seam, it lives in one small function with a name that says why.

Model states as unions rather than bags of optional fields and booleans: a status union instead of `isLoading`/`isError`, a discriminated union for each kind of item, and an exhaustive switch that fails to compile when a new case is added and not handled. Prefer union string literals to enums. Use `satisfies` to check configuration objects against a type while keeping their literal types, and `as const` for literal tuples such as query keys.

Make illegal states unrepresentable in props too: mutually exclusive props are expressed as a union of prop shapes, required props are required, and callbacks name the exact payload they receive. Generic components are generic over the row or item type so their callers keep full typing through render props and callbacks.

Keep the compiler strict: strict mode, unchecked indexed access, no implicit override, no unused locals or parameters, and type checking as part of the verify step, never skipped to get a build through.
