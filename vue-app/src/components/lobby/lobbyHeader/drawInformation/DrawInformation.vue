<template>
  <div
    id="ssbt_countdown_time"
    class="draw-information remove d-flex flex-row align-items-center pl-1"
    :class="[`draw-information--${theme}`, { 'pr-3': !barcodeReaderStatusError }]"
  >
    <div
      id="ssbt_lobbyHeaderNextDrawTimer"
      class="draw-information__draw-text pr-2"
      :class="{ 'draw-information__draw-text-small': barcodeReaderStatusError }"
    >
      {{ $t('kinoDraw') }} {{ getNextDrawId }}<br />{{ $t('startsIn') }}
    </div>
    <div
      id="ssbt_draw_information"
      class="draw-information__next-draw"
      :class="{ 'draw-information__next-draw-small': barcodeReaderStatusError }"
    >
      <countdown
        v-if="displayCountdown"
        id="ssbt_countdown"
        ref="countdown"
        :end-time="getTimeToNextDraw"
        @process="handleCountdownProgress"
        @finish="onCountDownEnd"
      >
        <template #process="{ timeObj }">
          <span id="ssbt_draw_minutes_seconds">{{ timeObj.m }}:{{ timeObj.s }}</span>
        </template>
      </countdown>
      <template v-else><span id="ssbt_draw_minutes_seconds">00:00</span></template>
    </div>
    <LiveDrawToggleButton id="ssbt_live_draw_button" :theme="theme" />
    <live-draw-dialog />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import playerSessionTypes from '../../../../store/modules/PlayerBetslipsSessionModule/types';
import liveDrawTypes from '../../../../store/modules/LiveDrawModule/types';
import moduleTypes from '../../../../store/modules/types';
import { when, lte } from 'ramda/es';
import LiveDrawDialog from '../../games/kino/LiveDraw/LiveDrawDialog.vue';
import LiveDrawToggleButton from './LiveDrawToggleButton.vue';
import eventHubTypes from '../../../../util/EventHubTypes';
import configurationModuleTypes from '../../../../store/modules/ConfigurationStoreModule/types';

const THEME_MAPPER = {
  KINO: 'kino',
  POWERSPIN: 'powerspin',
  EUROJACKPOT: 'eurojackpot',
  FIREBLAZE: 'fireblaze',
};

export default {
  name: 'drawInformation',
  components: {
    LiveDrawDialog,
    LiveDrawToggleButton,
  },
  props: {
    theme: {
      type: String,
      default: THEME_MAPPER.KINO,
      validator: (value) => Object.values(THEME_MAPPER).includes(value),
    },
    barcodeReaderStatusError: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadingDrawInfo: false,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getIsActiveLiveDrawScreen: playerSessionTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN,
      getShowNextDrawAvailableBets: playerSessionTypes.getters.GET_SHOW_NEXT_DRAW_AVAILABLE_BETS,
      getAutoRedirectAfterDraw: playerSessionTypes.getters.GET_AUTO_REDIRECT_AFTER_DRAW,
      getNextDrawId: playerSessionTypes.getters.GET_NEXT_DRAW_ID,
      getTimeToNextDraw: playerSessionTypes.getters.GET_TIME_TO_NEXT_DRAW,
      getIsValidTimeToNextDraw: playerSessionTypes.getters.GET_IS_VALID_TIME_TO_NEXT_DRAW,
    }),
    ...mapGetters(moduleTypes.LIVE_DRAW_MODULE, {
      getIsIframeLoaded: liveDrawTypes.getters.GET_IS_IFRAME_LOADED,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
    }),
    displayCountdown() {
      return !this.loadingDrawInfo && this.getIsValidTimeToNextDraw;
    },
    autoClearBetsBeforeNextDrawMillis() {
      return this.getConfiguration.KINO.LIVE_DRAW.AUTO_CLEAR_BETS_BEFORE_NEXT_DRAW_MILLIS;
    },
  },
  watch: {
    getNextDrawId() {
      this.disableLoadingDrawInfo();
    },
  },
  mounted() {
    this.toggleNextDrawLoadingOverlayEnable();
    this.enableLoadingDrawInfo();
    this.updateDrawInfo();
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      updateDrawInfo: playerSessionTypes.actions.UPDATE_DRAW_INFO,
      enableShowNextDrawAvailableBets: playerSessionTypes.actions.ENABLE_SHOW_NEXT_DRAW_AVAILABLE_BETS,
      enableAutoRedirectAfterDraw: playerSessionTypes.actions.ENABLE_AUTO_REDIRECT_AFTER_DRAW,
    }),
    ...mapActions(moduleTypes.LIVE_DRAW_MODULE, {
      toggleNextDrawLoadingOverlayEnable: liveDrawTypes.actions.TOGGLE_NEXT_DRAW_LOADING_OVERLAY_ENABLE,
    }),
    enableLoadingDrawInfo() {
      this.loadingDrawInfo = true;
    },
    disableLoadingDrawInfo() {
      this.loadingDrawInfo = false;
    },
    onCountDownEnd() {
      // First time this runs is on countdown component init because the first "time" value is 0 from "getTimeToNextDraw",
      // so it emits the "end" event immediately.
      this.$eventHub.$emit(eventHubTypes.COUNT_DOWN_END);
      this.enableLoadingDrawInfo();
      this.updateDrawInfo();
      this.toggleNextDrawLoadingOverlayEnable();
    },
    checkIfInTime({ countdownTimeToStart, leftTime }) {
      return lte(leftTime, countdownTimeToStart);
    },
    checkShowNextDrawAvailableBetsAndEnableRedirect({ leftTime }) {
      return this.checkIfInTime({ countdownTimeToStart: this.autoClearBetsBeforeNextDrawMillis, leftTime });
    },
    triggerShowNextDrawAvailableBetsAndEnableRedirect() {
      this.getIsActiveLiveDrawScreen && !this.getAutoRedirectAfterDraw && this.enableAutoRedirectAfterDraw();
      !this.getShowNextDrawAvailableBets && this.enableShowNextDrawAvailableBets();
    },
    handleCountdownProgress({ timeObj: { leftTime } = {} }) {
      when(
        this.checkShowNextDrawAvailableBetsAndEnableRedirect,
        this.triggerShowNextDrawAvailableBetsAndEnableRedirect
      )({ leftTime });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../scss-utils/powerspin/colors';
.draw-information {
  &__draw-text {
    font-weight: 900;
    flex-direction: column;
    display: inline-flex;
    vertical-align: text-bottom;
    font-size: 13px;
    text-align: right;
    width: 135px;
  }
  &__next-draw {
    font-size: 40px;
    font-weight: 900;
    display: inline-flex;
    width: 130px;
  }
  #ssbt_live_draw_button {
    padding-bottom: 0.6rem;
  }

  &--kino {
    .draw-information__draw-text {
      color: rgba(0, 0, 0, 0.6);
    }
    .draw-information__next-draw {
      color: #20303f;
    }
    #ssbt_lobbyHeaderNextDrawTimer {
      margin-top: 3.9px;
    }
    #ssbt_draw_minutes_seconds {
      position: relative;
      top: 3px;
    }
  }
  &--powerspin {
    .draw-information__draw-text {
      color: $color-weldon-blue;
    }
    .draw-information__next-draw {
      color: $color-light-blue;
    }
  }
  &--fireblaze {
    .draw-information__draw-text {
      color: $color-primary-white;
      width: 115px;
      &-small {
        width: 85px;
      }
    }
    .draw-information__next-draw {
      color: $color-primary-white;
      &-small {
        width: 105px;
      }
    }
  }
}
</style>
