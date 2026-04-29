import modalEventConstants from '../util/modalEventConstants';

export default {
  methods: {
    triggerInfoModal(modalData, onCloseCallback = null, useAutoCloseTimer = false) {
      this.$eventHub.$emit(modalEventConstants.OPEN.INFO, modalData, onCloseCallback, useAutoCloseTimer);
    },
  },
};
