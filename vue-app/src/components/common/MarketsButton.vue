<template>
  <button :class="['markets-button', buttonActiveClass]" @click="$emit('click')">
    <span class="markets-button__text">
      {{ $t('markets.title') }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'MarketsButton',
  props: {
    active: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonActiveClass() {
      return this.active ? 'button_active' : 'button_inactive';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss-utils/powerspin/colors';

.markets-button {
  border: 2px solid rgba(204, 185, 116, 1);
  width: 200px;
  border-radius: 20px;
  font-weight: 900;
  font-size: 27px;
  padding: 10px;
  line-height: 32px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
}

.button_active {
  background: linear-gradient(102.71deg, #ccb974 -0.1%, #ccb974 21.26%, #ecdeb4 42.09%, #bfa33f 66.05%, #bfa33f 99.9%);
}

.button_inactive {
  background: $color-primary-white;
}

.markets-button__text {
  color: #000000;
  text-shadow: 1px 1px 0 rgba(204, 185, 116, 0.8), -1px 1px 0 rgba(204, 185, 116, 0.8),
    1px -1px 0 rgba(204, 185, 116, 0.8), -1px -1px 0 rgba(204, 185, 116, 0.8), -1px 0 0 rgba(236, 222, 180, 0.8),
    1px 0 0 rgba(236, 222, 180, 0.8), 0 1px 0 rgba(191, 163, 63, 0.8), 0 -1px 0 rgba(191, 163, 63, 0.8);
}
</style>
