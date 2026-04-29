<template>
  <button
    class="eurojackpot-system-button"
    :class="{ 'eurojackpot-system-button--active': active }"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'EurojackpotSystemButton',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/eurojackpot/colors';

.eurojackpot-system-button {
  width: 52px;
  height: 48px;
  text-align: center;
  color: $color-secondary-black;
  font-size: 20px;
  font-weight: 900;
  line-height: normal;
  cursor: pointer;
  border: 2px solid $color-secondary-brown;
  background: linear-gradient(to bottom, $color-secondary-gold, $color-primary-gold);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  &--active {
    border-color: $color-primary-brown;
    background: $color-third-gold;
  }
}
</style>
