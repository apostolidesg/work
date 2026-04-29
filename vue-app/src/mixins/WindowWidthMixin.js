export default {
  name: 'WindowWidthMixin',
  data() {
    return {
      windowWidthMixin_windowWidth: window.innerWidth,
    };
  },
  computed: {
    $_windowWidthMixin_isSmallDesktop() {
      return this.windowWidthMixin_windowWidth > 1200 && this.windowWidthMixin_windowWidth <= 1600;
    },
    $_windowWidthMixin_isDesktop() {
      return this.windowWidthMixin_windowWidth > 1600;
    },
    $_windowWidthMixin_isPortrait() {
      return this.windowWidthMixin_windowWidth <= 1200;
    },
  },
  methods: {
    $_windowWidthMixin_updateWindowWidth() {
      this.windowWidthMixin_windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener('resize', this.$_windowWidthMixin_updateWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_windowWidthMixin_updateWindowWidth);
  },
};
