# Performance

Speed is a feature users feel before they can name it, and most of it comes from structure rather than tuning: data that starts loading on navigation or hover, routes split so each page loads only its own code, the server-state cache serving repeat visits instantly, and optimistic updates making writes feel free. Get those right first; micro-optimisation without them is wasted.

Let the compiler memoise. With the React Compiler enabled, write plain components and do not reach for `useMemo`, `useCallback` or `memo`; they add noise and can fight the compiler. Without it, memoise only what a profile shows is slow, expensive derivations, callbacks passed to memoised children, providers' value objects, and nothing presentational by default. Either way, write code the compiler can reason about: no mutation of props or state, no reading refs during render, and side effects only in effects and handlers.

Keep re-renders local. State lives as low in the tree as its consumers allow, store subscriptions select the smallest slice, context carries rarely-changing values, and frequently-updating state, a text input, a pointer position, a timer, stays inside the component that shows it. Lists render with stable keys from the data, never indexes, and long ones are virtualized.

Keep bundles lean. Routes are code-split by the router; heavy, rarely-used pieces, editors, charts, date pickers, maps, load on demand when first opened. Import functions individually from large libraries, prefer the platform to a dependency for anything it already does, and check what a new dependency adds before installing it. Fonts are self-hosted, subset and preloaded; images are sized, lazy below the fold and served in modern formats.

Never block the main thread with work the user is not waiting for: defer non-urgent updates with transitions, debounce input-driven work such as search and auto-save, and move heavy computation off the main thread. Layout stays stable while content loads, with reserved space for images, skeletons matching the final layout and no content jumping under the pointer.

Measure before and after. Profile slow interactions in the browser's performance tools and the React profiler, watch the Core Web Vitals in production, and add a benchmark beside any hot path that has been optimised once, so a regression shows up as a number rather than a complaint.
