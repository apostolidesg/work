<template>
  <button
    role="button"
    type="button"
    class="opap-base-button text-uppercase"
    :class="`opap-base-button--${this.theme}`"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
const BASE_BUTTON_THEMES = {
  NO_THEME: 'no-theme',
};

export default {
  name: 'BaseButton',
  props: {
    theme: {
      type: String,
      required: false,
      default: BASE_BUTTON_THEMES.NO_THEME,
      validator: value => Object.values(BASE_BUTTON_THEMES).includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss-utils/powerspin/colors';
.opap-base-button {
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  color: $color-primary-blue;
  padding: 33px;
  border-radius: 12px;
  border: none;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &--no-theme {
    background: $color-primary-white;
  }
}
</style>
