<template>
  <div class="quick-play" :class="`quick-play--${theme}`">
    <h1 class="quick-play__title">
      {{ $t('readyTickets') }}
      <font-awesome-icon class="quick-play__title-icon" @click="openResponsibleGamingInfo" :icon="infoCircle" />
    </h1>

    <kino-quickbets-number-selection v-if="isKino" />

    <div class="quick-play__cards">
      <slot />
    </div>

    <div class="quick-play__custom-container" v-if="!$_windowWidthMixin_isPortrait">
      <div class="game-card__button-container">
        <button @click="navigateToBoard" class="quick-play__button" :class="`quick-play__button--${theme}`">
          <span class="quick-play__button-text">{{ $t('playWithCustomNumbers') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moduleTypes from '@/store/modules/types';
import configurationModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import { mapGetters, mapActions } from 'vuex';
import Constants from '@/util/Constants';
import infoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle';
import modalEventConstants from '@/util/modalEventConstants';
import infoModalScrollableMessages from '@/util/infoModalMessages';
import powerspinModuleTypes from '@/store/modules/PowerspinBetslipStoreModule/types';
import sessionStoreModuleTypes from '@/store/modules/SessionStoreModule/types';
import KinoQuickbetsNumberSelection from '@/components/common/Quickbets/KinoQuickbetsNumberSelection.vue';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';

export default {
  name: 'QuickPlay',
  props: {
    theme: {
      type: String,
      default: Constants.THEMES.KINO,
    },
  },
  components: {
    KinoQuickbetsNumberSelection,
  },
  data() {
    return {
      infoCircle,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
    }),
    isKino() {
      return this.theme === Constants.THEMES.KINO;
    },
  },
  methods: {
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      resetPowerspinBetslips: powerspinModuleTypes.actions.RESET_BETSLIPS,
    }),
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setGameType: sessionStoreModuleTypes.actions.SET_GAME_TYPE,
    }),
    navigateToBoard() {
      this.resetPowerspinBetslips();
      gtag.sendEvent(
        this.theme === Constants.THEMES.KINO
          ? gtmEvents.SSBT_LOTTERY_GO_TO_KINO_BOARD_CLICKED
          : gtmEvents.SSBT_LOTTERY_GO_TO_POWERSPIN_BOARD_CLICKED
      );

      this.$router.push({
        name: this.theme === Constants.THEMES.KINO ? Constants.ROUTE_NAMES.KINO : Constants.ROUTE_NAMES.POWERSPIN,
      });
    },
    openResponsibleGamingInfo() {
      this.$eventHub.$emit(
        modalEventConstants.OPEN.INFO,
        this.theme === Constants.THEMES.KINO
          ? infoModalScrollableMessages.quickBetsKino
          : infoModalScrollableMessages.quickBetsPowerspin
      );

      gtag.sendEvent(gtmEvents.SSBT_LOTTERY_HEADER_HELP_CLICK, { game: this.theme });
    },
  },
  created() {
    this.setGameType({ gameType: Constants.GENERAL_GAME_TYPES[this.theme.toUpperCase()] });
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss-utils/powerspin/mixins.scss';
@import '@/scss-utils/kino/mixins.scss';

.quick-play {
  @include digital-assistant-background;
}

.quick-play {
  min-height: 100vh;
  padding: 3rem 1rem;
  background: linear-gradient(to bottom, var(--color-kino-quick-play-bg-start), var(--color-kino-quick-play-bg-end));
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &__custom-container {
    display: flex;
    align-items: center;
    gap: 4rem;
    margin-top: 4rem;
  }

  &__title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 2rem;

    &-icon {
      margin-left: 1rem;
    }
  }

  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  &__button {
    color: var(--color-white);
    font-weight: bold;
    font-size: 30px;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background: transparent;

    &:hover {
      background-color: var(--color-button-hover-yellow);
    }
  }

  &__button {
    &--kino::before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: var(--kino-button-gradient);
      mix-blend-mode: screen;
      -webkit-filter: blur(15px);
      filter: blur(15px);
      z-index: 1;
      opacity: 0.8;
    }

    &--kino {
      position: relative;
      background: var(--button-kino-gradient);
      cursor: pointer;
      border: none;
      outline: none;
      overflow: visible;
      border: 4px solid var(--color-kino-button-border);
      border-radius: 20px;
      font-size: 32px;
      font-weight: 700;
      padding: 1rem 4rem;
      color: var(--color-black);
    }

    &--powerspin {
      @include powerspin-button;
    }
  }

  &--powerspin {
    @include powerspin-digital-assistant-background;
    z-index: 0;
  }
}

@mixin theme-styles($theme) {
  &--#{$theme} {
    position: relative;
  }
}

.quick-play {
  @include theme-styles('kino');
  @include theme-styles('powerspin');
}

::v-deep .kino-quick-play__card-info--number {
  font-weight: 900;
  font-size: 26px;
  color: var(--color-yellow-warm);
}
</style>
