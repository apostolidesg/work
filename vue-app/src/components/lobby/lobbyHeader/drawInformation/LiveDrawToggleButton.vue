<template>
  <TimeoutErrorHandler :isErrorState="isLiveDrawButtonDisabled" :hideOnError="false" :duration="20000">
    <button
      :disabled="isLiveDrawButtonDisabled"
      class="live-draw-toggle-button d-flex flex-column align-self-stretch justify-content-between pl-2 pr-2"
      :class="[{ 'live-draw-toggle-button--active': getIsActiveLiveDrawScreen }, `live-draw-toggle-button--${theme}`]"
      @click="toggleLiveDraw"
    >
      <span class="text-center button-content">
        <NextDrawBetsTotalNumber
          v-if="shouldDisplayBadge"
          id="ssbt_next_draw_badge"
          class="badge badge-pill badge-success kino-badge"
        />
        <img
          v-if="getLiveDrawScreenSwitcherImage"
          id="ssbt_live_draw_play_icon"
          class="live-draw-toggle-button__icon"
          :src="getLiveDrawScreenSwitcherImage"
          alt="link icon"
        />
        <font-awesome-icon
          v-else
          id="ssbt_live_draw_play_icon"
          class="live-draw-toggle-button__play-icon"
          :icon="['fas', 'play']"
        />
      </span>
      <span id="ssbt_live_draw_label" class="text-center button-content">{{ $t(getLiveDrawScreenSwitcherLabel) }}</span>
    </button>
  </TimeoutErrorHandler>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import playerSessionTypes from '../../../../store/modules/PlayerBetslipsSessionModule/types';
import moduleTypes from '../../../../store/modules/types';
import liveDrawTypes from '../../../../store/modules/LiveDrawModule/types';
import TimeoutErrorHandler from '../../../common/TimeoutErrorHandler';
import NextDrawBetsTotalNumber from '../../games/kino/LiveDraw/NextDrawBetsTotalNumber';
import configurationModuleTypes from '../../../../store/modules/ConfigurationStoreModule/types';
import exitDrawButton from '../../../../assets/exit-draw-button.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay as fasPlay } from '@fortawesome/fontawesome-free-solid';
import SessionStoreModuleTypes from '../../../../store/modules/SessionStoreModule/types';
import play from '../../../../assets/playNew.png';
library.add(fasPlay);

const THEME_MAPPER = {
  KINO: 'kino',
  POWERSPIN: 'powerspin',
  EUROJACKPOT: 'eurojackpot',
  FIREBLAZE: 'fireblaze',
};

const THEME_ICONS_MAPPER = {
  [THEME_MAPPER.KINO]: {
    playIcon: play,
    exitIcon: exitDrawButton,
  },
  [THEME_MAPPER.POWERSPIN]: {
    exitIcon: exitDrawButton,
  },
  [THEME_MAPPER.EUROJACKPOT]: {
    exitIcon: exitDrawButton,
  },
  [THEME_MAPPER.FIREBLAZE]: {
    exitIcon: exitDrawButton,
  },
};

export default {
  name: 'LiveDrawButton',
  components: {
    TimeoutErrorHandler,
    NextDrawBetsTotalNumber,
  },
  props: {
    theme: {
      type: String,
      default: THEME_MAPPER.KINO,
      validator: (value) => Object.values(THEME_MAPPER).includes(value),
    },
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getIsActiveLiveDrawScreen: playerSessionTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN,
    }),
    ...mapGetters(moduleTypes.LIVE_DRAW_MODULE, {
      getIsLoadingOverlayEnabled: liveDrawTypes.getters.GET_IS_LOADING_OVERLAY_ENABLED,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
    }),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: SessionStoreModuleTypes.state.GAME_TYPE,
    }),
    shouldDisplayBadge() {
      return !this.getIsActiveLiveDrawScreen;
    },
    getLiveDrawScreenSwitcherImage() {
      return this.getIsActiveLiveDrawScreen
        ? THEME_ICONS_MAPPER[this.theme].exitIcon
        : THEME_ICONS_MAPPER[this.theme].playIcon;
    },
    getLiveDrawScreenSwitcherLabel() {
      return this.getIsActiveLiveDrawScreen ? 'exit' : 'watchLiveDraw';
    },
    isLiveDrawButtonDisabled() {
      return this.isLiveDrawConfigDisabled || this.getIsLoadingOverlayEnabled;
    },
    isLiveDrawConfigDisabled() {
      return !this.getConfiguration.KINO.LIVE_DRAW.ENABLED;
    },
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      enableLiveDrawScreen: playerSessionTypes.actions.ENABLE_LIVE_DRAW_SCREEN,
      disableLiveDrawScreen: playerSessionTypes.actions.DISABLE_LIVE_DRAW_SCREEN,
    }),
    toggleLiveDraw() {
      this.$snotify.clear();
      this.getIsActiveLiveDrawScreen ? this.disableLiveDrawScreen() : this.enableLiveDrawScreen();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../scss-utils/powerspin/colors';
.live-draw-toggle-button {
  width: 150px;
  margin-top: -8px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 900;
  font-size: 11.36px;
  text-align: center;
  padding-bottom: 0.5rem;
  padding-top: 0.6rem;
  border: 0;
  align-items: center;

  &--active {
    padding-top: 1rem;
  }

  &--kino {
    color: #20303f;
    background-color: inherit;
    ::v-deep.live-draw-toggle-button--active {
      background: #0c1922;
      color: #ffffff;
    }
  }
  &--powerspin {
    color: $color-light-blue;
    background: transparent;
    ::v-deep.live-draw-toggle-button--active {
      background: #0c1922;
      color: #ffffff;
    }
  }
  &--fireblaze {
    color: $color-primary-white;
    background: transparent;
    width: 150px;
    padding-top: 1.5em;

    .live-draw-toggle-button__play-icon {
      font-size: 30px;
    }
    ::v-deep .live-draw-toggle-button--active {
      background: transparent;
      color: #ffffff;
    }
  }

  &[disabled] .button-content {
    opacity: 0.5;
  }

  &__icon {
    width: 25px;
    height: 25px;
  }

  &--active &__icon {
    width: 18px;
    height: 18px;
  }

  &__play-icon {
    font-size: 20px;
    margin: 0 auto;
  }
}
.kino-badge {
  position: absolute;
  top: 0;
  right: 0;
}
.button-content {
  position: relative;
}
</style>
