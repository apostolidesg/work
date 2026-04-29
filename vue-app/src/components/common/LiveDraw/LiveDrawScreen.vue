<template>
  <div class="live-draw-screen">
    <LoadingOverlay :showLoader="getIsLoadingOverlayEnabled" />
    <LiveDrawIframe
      v-for="type in iframeTypesToRender"
      :key="type"
      :iframe-type="type"
      class="live-draw-screen__iframe"
      @powerspin-iframe-load="() => iframeLoadHandler(type)"
    />
  </div>
</template>

<script>
import LiveDrawIframe from './LiveBoardIframe.vue';
import LoadingOverlay from '../../lobby/games/kino/LiveDraw/LoadingOverlay.vue';
import { mapActions, mapGetters } from 'vuex';
import moduleTypes from '../../../store/modules/types';
import liveDrawTypes from '../../../store/modules/LiveDrawModule/types';

const IFRAME_TYPES = {
  FIREBLAZE: 'fireblaze',
  POWERSPIN: 'powerspin',
  MULTISPIN: 'multispin',
};

export default {
  name: 'CommonLiveDrawScreen',
  components: { LiveDrawIframe, LoadingOverlay },
  props: {
    iframeTypesToRender: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      iframeTypes: IFRAME_TYPES,
      loadedState: {},
    };
  },
  computed: {
    ...mapGetters(moduleTypes.LIVE_DRAW_MODULE, {
      getIsLoadingOverlayEnabled: liveDrawTypes.getters.GET_IS_LOADING_OVERLAY_ENABLED,
      getIsIframeLoaded: liveDrawTypes.getters.GET_IS_IFRAME_LOADED,
    }),
    shouldDisableLoadingOverlay() {
      return (
        Object.keys(this.loadedState).length === this.iframeTypesToRender.length &&
        Object.values(this.loadedState).every(Boolean) &&
        this.getIsLoadingOverlayEnabled
      );
    },
  },
  watch: {
    shouldDisableLoadingOverlay(newValue) {
      newValue && this.disableLoadingScreen();
    },
  },
  created() {
    this.iframeStartLoading();
  },
  methods: {
    ...mapActions(moduleTypes.LIVE_DRAW_MODULE, {
      disableLoadingScreen: liveDrawTypes.actions.DISABLE_LOADING_OVERLAY,
      enableLoadingScreen: liveDrawTypes.actions.ENABLE_LOADING_OVERLAY,
      toggleIframeLoadedEnable: liveDrawTypes.actions.TOGGLE_IFRAME_LOADED_ENABLE,
      toggleIframeLoadedDisable: liveDrawTypes.actions.TOGGLE_IFRAME_LOADED_DISABLE,
    }),
    iframeStartLoading() {
      this.enableLoadingScreen();
      this.toggleIframeLoadedDisable();
      this.loadedState = this.iframeTypesToRender.reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {});
    },
    iframeLoadHandler(type) {
      this.$set(this.loadedState, type, true);
      if (this.shouldDisableLoadingOverlay) {
        this.toggleIframeLoadedEnable();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../scss-utils/common/variables';

.live-draw-screen {
  width: 100%;
  height: $play-area-height;
  background: #01042d;
  display: flex;
  &__iframe {
    flex: 1;
  }
}
</style>
