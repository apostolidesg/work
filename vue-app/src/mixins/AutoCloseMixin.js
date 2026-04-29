import Constants from '../util/Constants';

export default {
  data() {
    return {
      autoCloseTimer: null,
    };
  },
  methods: {
    triggerAutoCloseTimer(autoCloseCallback, timeout = Constants.GENERAL_AUTO_CLOSE_TIMEOUT) {
      this.clearAutoCloseTimer();
      this.autoCloseTimer = setTimeout(autoCloseCallback, timeout);
    },
    clearAutoCloseTimer() {
      clearTimeout(this.autoCloseTimer);
    },
  },
  beforeDestroy() {
    this.clearAutoCloseTimer();
  },
};
