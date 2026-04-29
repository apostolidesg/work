<template functional>
  <transition name="modal-overlay">
    <div v-if="props.visible" class="modal-overlay__container position-fixed d-flex justify-content-center align-items-center w-100 h-100">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalOverlay',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.modal-overlay__container {
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 1040;
  opacity: 1;
}
/* Animation */
.modal-overlay-enter-active, .modal-overlay-leave-active {
  transition: all .2s;
}
.modal-overlay-enter, .modal-overlay-leave-to {
  opacity: 0;
}
</style>
