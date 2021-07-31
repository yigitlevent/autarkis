# Autarkis Changelog

## 0.3.0 - Major Refactor, Design, and Character Generator

### Major Changes
-	Replaced `Character.ts` and `Chronicle.ts` classes with `useSheet.tsx`. These now control the flow, and re-renders should be more react-compliant.
- 	Completely refactored the design. 
-	`useSheets.tsx` now controls which sheets are open. It also controls the order, consolidates basic sheet data, and such.
-	Most `V5___.ts` ruleset files are moved to their own folder.
-	Character Generation rules are now in place. `V5Modern` ruleset now includes Generator Conditions, Clans, Predator Types, Advantages, Disciplines, and more.
-	Removed `SheetContext`.
-	Sheet values now display via `defaultValue` or `defaultChecked` and modified accordingly. This is a much more performant solution.

### Minor Changes
-	Refactored a lot of types.
-	Moved `react-basic-select` directly into the project, inside the `../components/shared/Select.tsx`.
-	Added special conditions for `(` and `)` characters into `CleanString` and `DirtyString`.
-	Added various icons.
-	Moved type namespaces to their individual files.
-	Date manipulations now use `dayjs`.
-	Refactored `Pseudocheckbox` and added new `svg` icons to properly display the values.
-	Cleaned up some props.
-	Renamed `GeneratorBox` to `Checklist`.
-	Changed `storyteller_uuid`, `storyteller_name`, `player_uuid`, and `player_name` to `user_uuid` and `user_name`.

### Dependencies
-	`@supabase/supabase-js` to `1.15.0`
-	`@types/node` to `15.12.2`
-	`@types/react` to `17.0.11`
-	`@types/react-dom` to `17.0.7`
-	`@types/styled-components` to `5.1.10`
-	`@typescript-eslint/eslint-plugin` to `4.26.1`
-	`@typescript-eslint/parser` to `4.26.1`
-	`eslint` to `7.27.0`
-	`eslint-plugin-react` to `7.24.0`
-	`typescript` to `4.3.2`
-	Added `@types/deep-diff`
-	Added `fuse.js`
-	Added `dayjs`
-	Added `react-masonry-css`
-	Removed `react-basic-select`

## 0.1.0 - Tests

### Changes

-   `Test` class and `TestWrapper` component. This component now uses generic sheet components to generate its elements.
-   `TestWrapper` elements are now ruleset-dependent.
-   Test types are not ruleset-dependent.
-   `Test` class now controls all things dice.
-   Crippling Injury test. [#5](https://github.com/yigitlevent/autarkis/issues/5)
-   Dice probability calculations. [#1](https://github.com/yigitlevent/autarkis/issues/1)
-   `HTTPS` environment variable.
-   `Content-Security-Policy` in `index.html`.
-   `Switch` checkbox type.
-   `import`, `export` from `Chronicle.ts`.
-   Prefixes like `c.`, `s.` are mostly removed. Remaining occurances will probably cause bugs.
-   Moved generic sheet components into `./components/shared/sheet/`
-   A lot of files and functions regarding Tests are renamed.
-   A lot of style changes.
-   `PseudoCheckbox.getAmount()` now requires ruleset name.

### Dependencies

-   Bumped `@supabase/supabase-js` to `1.11.10`.
-   Bumped `eslint` to `7.26.0`.
-   Bumped `react-query` to `3.16.0`.
-   Bumped `node` to `16.1.0` and `npm` to `7.11.2`.

## 0.0.9 - Pre-release

This release includes a lot of changes from the autarkis-old repository. This update mainly removes the server completely, instead replaces it with [Supabase](supabase.io). This change was important to make it easier to maintain the project, and now that it is done, we can move forward with other features more easily and quickly.

Another big change is that the bot will be hosted on [replit](https://replit.com/) in future, some changes are made to prepare for that.

### Changes

-   [Supabase](supabase.io).
-   `Chronicle` ruleset is now Ruleset-independent. Rulesets will only have non-chronicle rules and data.
-   Removed all backend code.
-   Removed `useAnimations`.
-   Removed `makeRequests`.
