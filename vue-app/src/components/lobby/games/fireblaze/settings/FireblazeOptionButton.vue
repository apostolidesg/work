<template>
  <button
    class="fireblaze-option-button"
    :class="[{ 'fireblaze-option-button--active': active }, { 'fireblaze-option-button--disabled': disabled }]"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'FireblazeOptionButton',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/fireblaze/colors';

.fireblaze-option-button {
  width: 100%;
  padding: 0.5em 1em;
  font-size: 1.25em;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
  color: $color-primary-white;
  background: $gradient-purple;
  border: none;
  border-radius: 8px;
  position: relative;
  z-index: 1;

  &--active {
    background: $gradient-light-gold;

    &::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      right: 2px;
      bottom: 2px;
      border-radius: 8px;
      background: $gradient-dark-pink;
      z-index: -1;
    }
  }
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
