<template>
  <div class="number-selection-layout">
    <div class="number-selection-layout__header">
      <span class="number-selection-layout__header-prefix">
        <slot name="titlePrefix" />
      </span>
      <span class="number-selection-layout__header-numbers">
        <slot name="titleNumbers" />
      </span>
    </div>
    <div class="number-selection-layout__number-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumbersSelectionLayout',
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/eurojackpot/colors';

.number-selection-layout {
  &__header {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 12px;

    &-prefix {
      color: white;
    }

    &-numbers {
      color: $color-primary-yellow;
    }
  }

  &__number-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1em;
  }
}
</style>
