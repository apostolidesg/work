<template functional>
  <button
    type="button"
    :ref="data.ref"
    class="info-modal__footer-button text-center font-weight-bold w-25 rounded"
    :class="[
      data.class,
      data.staticClass,
      `info-modal__footer-button--${props.theme}`,
      `info-modal__footer-button--${props.game}`,
    ]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'InfoModalFooterButton',
  props: {
    theme: {
      type: String,
      default: 'DEFAULT',
    },
    game: {
      type: String,
      default: 'kino',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss-utils/eurojackpot/mixins';

.info-modal__footer-button {
  font-size: 16px;
  height: 50px;
  color: #fff;
  background: transparent;
  border: 1px solid #fff;
}
.info-modal__footer-button.info-modal__footer-button--WINNING {
  background: #0e486a;
  border: 1px solid #0e486a;
}

.info-modal__footer-button--eurojackpot {
  @include eurojackpot-modal-button;
}
</style>
