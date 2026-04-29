<template>
  <AutoRedirectToPlaceBetWrapper>
    <div v-if="isLiveDrawConfigEnabled" class="row m-0 h-100">
      <div class="col-9 p-0">
        <div class="row h-100 m-0 p-0">
          <div class="col-12 flex-container justify-content-between flex-column p-0">
            <div class="row m-0">
              <div class="col-12 p-0">
                <LiveBoardIframe />
              </div>
            </div>
            <div class="kino-live-draw__left-footer row m-0">
              <div class="col-5 p-0 m-0">
                <SimpleSidebetsToggle />
              </div>
              <div class="col-7 p-0 m-0">
                <ThemeSelectorList />
              </div>
            </div>
          </div>
        </div>
        <LoadingOverlay :showLoader="getIsLoadingOverlayEnabled" />
        <NextDrawLoadingOverlay
          v-if="getIsNextDrawLoadingOverlayEnabled"
          :style="
            'background-image: -webkit-radial-gradient( 50% 47%, circle closest-side, rgb(52,99,125) 0%, rgba(37,77,104,1) 13%, rgba(21,55,82,1) 25%, rgba(21,55,82,1) 50%, rgba(21,55,82,1) 100%)'
          "
          :text="$t('nextDrawWillBeginShortly')"
        >
          <img src="../../../../../assets/clock-animation.svg" class="animation-colour" height="100px" />
        </NextDrawLoadingOverlay>
      </div>
      <div class="kino-live-draw__theme-color-right col-3 p-0">
        <TimeoutErrorHandler
          :priority-state="getIsNextDrawLoadingOverlayEnabled"
          :isErrorState="hasError"
          :duration="5000"
        >
          <div class="kino-live-draw__right-footer flex-container justify-content-between flex-column">
            <BetslipContainer />
            <DrawWinnings />
          </div>
        </TimeoutErrorHandler>
        <LoadingOverlay :showLoader="showLoader" />
        <NextDrawLoadingOverlay
          v-if="getIsNextDrawLoadingOverlayEnabled"
          :text="$t('betsAreLoading')"
          :style="'background:#0e2d3f'"
        >
          <img src="../../../../../assets/dots-animation.svg" class="animation-colour" height="100px" />
        </NextDrawLoadingOverlay>
      </div>
    </div>
  </AutoRedirectToPlaceBetWrapper>
</template>

<script>
import ThemeSelectorList from './ThemeSelectorList';
import SimpleSidebetsToggle from './SimpleSidebetsToggle';
import LiveBoardIframe from './LiveBoardIframe';
import LoadingOverlay from './LoadingOverlay';
import moduleTypes from '../../../../../store/modules/types';
import NextDrawLoadingOverlay from './NextDrawLoadingOverlay';
import liveDrawTypes from '../../../../../store/modules/LiveDrawModule/types';
import { mapGetters } from 'vuex';
import BetslipContainer from './BetslipContainer';
import DrawWinnings from './DrawWinnings';
import TimeoutErrorHandler from '../../../../common/TimeoutErrorHandler';
import AutoRedirectToPlaceBetWrapper from './AutoRedirectToPlaceBetWrapper';
import configurationModuleTypes from '../../../../../store/modules/ConfigurationStoreModule/types';

export default {
  name: 'live-draw-screen',
  components: {
    TimeoutErrorHandler,
    ThemeSelectorList,
    SimpleSidebetsToggle,
    LiveBoardIframe,
    LoadingOverlay,
    BetslipContainer,
    DrawWinnings,
    NextDrawLoadingOverlay,
    AutoRedirectToPlaceBetWrapper,
  },
  computed: {
    ...mapGetters(moduleTypes.LIVE_DRAW_MODULE, {
      getHasMatchingDrawIds: liveDrawTypes.getters.GET_HAS_MATCHING_DRAW_IDS,
      getIsLoadingOverlayEnabled: liveDrawTypes.getters.GET_IS_LOADING_OVERLAY_ENABLED,
      getIsNextDrawLoadingOverlayEnabled: liveDrawTypes.getters.GET_IS_NEXT_DRAW_LOADING_OVERLAY_ENABLED,
      getErrorState: liveDrawTypes.getters.GET_ERROR_STATE,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
    }),
    hasError() {
      return !this.getHasMatchingDrawIds;
    },
    isLiveDrawConfigEnabled() {
      return this.getConfiguration.KINO.LIVE_DRAW.ENABLED;
    },
    showLoader() {
      return this.getIsLoadingOverlayEnabled || this.hasError;
    },
  },
};
</script>
<style scoped>
.kino-live-draw__theme-color-right {
  background-color: #0a394e;
  padding-right: 0.75rem !important;
}
.flex-container {
  display: flex;
}
.kino-live-draw__left-footer {
  padding-bottom: 3.5em;
}
.kino-live-draw__right-footer {
  height: 92vh;
}
</style>
