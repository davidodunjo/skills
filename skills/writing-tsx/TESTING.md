# Testing

Test behaviour a user or caller depends on, through the same interface they use, and nothing else: a test that breaks when the implementation is refactored but behaviour is unchanged is a cost, not a safeguard. Tests live beside the code they cover (`contactList.ts` and `contactList.test.ts`), so moving or deleting a module moves or deletes its tests.

Use the cheapest test that proves the behaviour. Pure logic, formatting, grouping, filtering, reducers, schema parsing, gets fast unit tests with plain inputs and outputs, which is one more reason to keep logic out of components. Components and hooks with real interaction get component tests that render them in a real browser through the test runner's browser mode, find elements by role and accessible name the way a user or screen reader would, act with real events, and assert on what appears, never on internal state or class names. Whole flows that cross routes, create, edit, delete, search, navigate back, get a few end-to-end tests against the running app, covering the paths that would cost the most if they broke.

The network is faked at the boundary, not inside components: tests use the same mock service or request handlers the app can run against, with realistic data from shared factories, so a component test exercises the real data layer, cache and loading states. Every async assertion waits for what the user would see rather than sleeping, and tests are independent, each building the state it needs.

Test the states, not just the happy path: loading, empty, error with retry, not-found, validation messages, a disabled submit, optimistic updates rolling back on failure. Accessibility checks run inside component tests so a missing label fails the build.

A bug fix starts with a failing test that reproduces it. Tests run in the verify step and in CI on every change; a skipped or flaky test is fixed or deleted the day it is noticed, never left to train people to ignore red.
