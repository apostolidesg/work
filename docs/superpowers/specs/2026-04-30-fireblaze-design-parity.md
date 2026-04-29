# Fireblaze Design Parity: renderer-app → vue-app

**Date:** 2026-04-30  
**Scope:** Fix visual/design regressions in renderer-app Fireblaze components to match the vue-app original. Keep all functional improvements (click.stop, cursor, nav guard, key fix).  
**Out of scope:** LiveDrawScreen, SVG inline conversion (img approach is visually equivalent).

---

## Changes

### 1. FireblazeNumberButton.vue
**File:** `renderer-app/src/components/Games/Fireblaze/PlayArea/FireblazeNumberButton.vue`

Remove `color: var(--fireblaze-color-third-pink)` from `.fireblaze-number-button`.  
vue-app has no explicit color on the default state — number text inherits from context. The pink color (#b20248) was added incorrectly and makes unselected number text hot pink.

### 2. NumbersSelectionLayout.vue
**File:** `renderer-app/src/components/Games/Fireblaze/PlayArea/NumbersSelectionLayout.vue`

Change `.number-selection-layout__header-numbers` color from `var(--fireblaze-color-third-yellow)` (#f89d1c) to `#F1C118`.  
vue-app uses eurojackpot's `$color-primary-yellow: #F1C118` (bright yellow). The current fireblaze yellow (#f89d1c, orange-gold) is visually different.

### 3. FireblazeSelectionsList.vue
**File:** `renderer-app/src/components/Games/Fireblaze/Sidescreen/FireblazeSelectionsList.vue`

Remove `color: var(--fireblaze-color-primary-white)` and `background: transparent` from the `:deep(.add-board-button)` rule. Keep only `border: solid 2px var(--fireblaze-color-primary-white)`.  
vue-app only applies the border override — the extra color and background could override the button's intended theme styling.

### 4. FireblazeQuickPick.vue
**File:** `renderer-app/src/components/Games/Fireblaze/Settings/FireblazeQuickPick.vue`

- Remove `font-size: 13.5px` and `font-weight: 500` from `.fireblaze-quickpick__info`
- Remove `font-family: 'Roboto', sans-serif` and `font-weight: 900` from `.fireblaze-quickpick__button-info`

vue-app inherits all font properties from context for these elements.

### 5. FireblazeOptions.vue
**File:** `renderer-app/src/components/Games/Fireblaze/Settings/FireblazeOptions.vue`

Remove `font-size: 13.5px` from `.fireblaze-options__header-info`. vue-app inherits font size from context.

### 6. FireblazeSelections.vue
**File:** `renderer-app/src/components/Games/Fireblaze/Sidescreen/FireblazeSelections.vue`

Remove `font-size: 13px` from `.fireblaze-selections__header`. vue-app inherits font size from context.

---

## What is preserved (intentional renderer-app improvements)

- `cursor: pointer` on alternate view toggle and selections wrapper
- `@click.stop` on delete button in FireblazeSelections
- `onBeforeRouteLeave` navigation guard in FireblazeGame
- Fixed v-for key prefix (`fireblaze-selection-` not `eurojackpot-selection-`)
- `font-family: 'Roboto'` on FireblazeSidescreen root
- `width: 100%` on advertisement background image

---

## Approach

Component-by-component (A). 6 files edited, ~10 lines removed or changed. No new files, no new dependencies, no logic changes.
