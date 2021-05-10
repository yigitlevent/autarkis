### 0.1.0 - Tests

-   **NEW:** `Test` class and `TestWrapper` component. This component now uses generic sheet components to generate its elements. 
-   **NEW:** `TestWrapper` elements are now ruleset-dependent.
-   **NEW:** Test types are not ruleset-dependent.
-   **NEW:** `Test` class now controls all things dice. 
-   **NEW:** Crippling Injury test. [#5](https://github.com/yigitlevent/autarkis/issues/5)
-   **NEW:** Dice probability calculations. [#1](https://github.com/yigitlevent/autarkis/issues/1)
-   **NEW:** `HTTPS` environment variable.
-   **NEW:** `Content-Security-Policy` in `index.html`.
-   **NEW:** `Switch` checkbox type.
-   **NEW:** `GetOrdinalSuffix` function to `utility.ts`.
-   **REM:** `import`, `export` from `Chronicle.ts`.
-   **REM:** Prefixes like `c.`, `s.` are mostly removed. Remaining occurances will probably cause bugs.
-   **MSC:** Moved generic sheet components into `./components/shared/sheet/`
-   **MSC:** A lot of files and functions regarding Tests are renamed.
-   **MSC:** A lot of style changes.
-   **MSC:** `PseudoCheckbox.getAmount()` now requires ruleset name.
-   **DEP:** Bumped `@supabase/supabase-js` to `1.11.10`.
-   **DEP:** Bumped `eslint` to `7.26.0`.
-   **DEP:** Bumped `react-query` to `3.16.0`.
-   **DEP:** Bumped `node` to `16.1.0` and `npm` to `7.11.2`.

### 0.0.9 - Pre-release

This release includes a lot of changes from the autarkis-old repository. This update mainly removes the server completely, instead replaces it with [Supabase](supabase.io). This change was important to make it easier to maintain the project, and now that it is done, we can move forward with other features more easily and quickly.

Another big change is that the bot will be hosted on [replit](https://replit.com/) in future, some changes are made to prepare for that.

-   **NEW:** [Supabase](supabase.io).
-   **NEW:** `Chronicle` ruleset is now Ruleset-independent. Rulesets will only have non-chronicle rules and data.
-   **REM:** All backend code.
-   **REM:** `useAnimations`.
-   **REM:** `makeRequests`.
-   **FIX:** Countless. Future entries here will be more robust.
-   **DEP:** Countless. Future entries here will be more robust.
