const DEFAULT_DURATION = 5000;

export default {
  props: {
    timerDuration: {
      type: Number,
      default: DEFAULT_DURATION
    },
  },
  data() {
    return {
      timeOut: null,
    };
  },
  computed: {
    calculateDuration() {
      return this.timerDuration;
    },
  },
  methods: {
    clearExistingTimeout() {
      this.$emit('timeoutCleared');
      clearTimeout(this.timeOut);
      return null;
    },
    setTimeout() {
      return this.timeOut || setTimeout(this.timeoutComplete, this.calculateDuration);
    },
    timeoutComplete() {
      this.$emit('timeoutComplete');
    },
    timerDependencyPropHandler(shouldSetTimeOut) {
      this.timeOut = shouldSetTimeOut ? this.setTimeout() : this.clearExistingTimeout();
    },
  },
  beforeDestroy() {
    this.clearExistingTimeout();
  },
};
