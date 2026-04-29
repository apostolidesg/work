<template>
  <DigitalAssistantLayout
    :asset-key="videoNames.LOBBY"
    :show-asset-wrapper="getConfiguration.configLoaded"
    @video-click="navigateToHelpSection"
    class="digital-assistant"
  >
    <div class="digital-assistant__section digital-assistant__section--bottom">
      <div class="digital-assistant__bottom-content">
        <div class="digital-assistant__games">
          <div class="game-wrapper game-wrapper--kino">
            <GameCard theme="kino" :buttonText="$t('youPlayHere')" :to="routeNames.KINO_QUICKPLAY" />
          </div>
          <div class="game-wrapper game-wrapper--powerspin">
            <GameCard theme="powerspin" :buttonText="$t('youPlayHere')" :to="routeNames.POWERSPIN_QUICKPLAY" />
          </div>
        </div>
      </div>
    </div>
  </DigitalAssistantLayout>
</template>
<script>
import DigitalAssistantLayout from './DigitalAssistantLayout.vue';
import { mapActions, mapGetters } from 'vuex';
import './fonts.css';
import moduleTypes from '../../store/modules/types';
import GameCard from './GameCard.vue';
import Constants from '../../util/Constants';
import VideoTypes from '../../store/modules/VideoStoreModule/types';
import SessionStoreModuleTypes from '../../store/modules/SessionStoreModule/types';
import gtag from '../../util/gtag';
import gtmEvents from '../../constants/gtmEvents';
import configurationStoreModuleTypes from '../../store/modules/ConfigurationStoreModule/types';

export default {
  name: 'DigitalAssistant',
  components: {
    DigitalAssistantLayout,
    GameCard,
  },

  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationStoreModuleTypes.getters.GET_CONFIGURATION_ASSETS,
    }),
  },
  created() {
    this.routeNames = Constants.ROUTE_NAMES;
    this.videoNames = Constants.VIDEO_NAMES;
  },
  mounted() {
    this.setBalanceVisibility({ isVisible: true });
  },
  methods: {
    ...mapActions(moduleTypes.VIDEO_STORE_MODULE, {
      [VideoTypes.actions.PLAY_VIDEO]: VideoTypes.actions.PLAY_VIDEO,
    }),
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setBalanceVisibility: SessionStoreModuleTypes.actions.SET_BALANCE_VISIBILITY,
    }),
    async navigateToHelpSection() {
      this.$router.push({
        name: Constants.ROUTE_NAMES.HELP_SECTION,
      });
      gtag.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY_EDUCATIONAL);
    },
  },
};
</script>

<style lang="scss" scoped>
.digital-assistant {
  &__section {
    position: relative;

    &--bottom {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;

      @media (max-width: 1200px) {
        position: relative;
      }
    }
  }

  &__center-image {
    position: absolute;
    left: 159px;
    z-index: 10;
    overflow: hidden;
    height: 100%;
    bottom: 80px;
    overflow: hidden;
  }

  &__bottom-left-clickable {
    position: absolute;
    left: 10%;
    bottom: 0;
    width: 40%;
    height: 30%;
    cursor: pointer;
    z-index: 6;
  }

  &__image {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &__bottom-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    pointer-events: auto;

    @media (max-width: 1200px) {
      display: flex;
      align-items: start;
      justify-content: center;
      padding: 20px;
      width: 100%;
    }
  }
  &__games {
    grid-column: 6 / 13;
    grid-row: 1 / 11;
    margin-top: 20%;
    display: flex;
    justify-content: center;
    gap: 2rem;
    @media (max-width: 1200px) {
      margin-top: 0;
      width: 100%;
      gap: 0;
    }
  }
  &__popup {
    cursor: pointer;
    pointer-events: auto;
    text-align: left;
    z-index: 11;
    position: relative;
    &--primary {
      position: absolute;
      top: 2rem;
      left: 2rem;
      width: var(--bettie-button-width);
      height: var(--bettie-button-height);
      background: var(---popup);
      border-radius: var(--border-radius-asymmetric);
      z-index: 20;
    }
    &--secondary {
      position: fixed;
      top: auto;
      bottom: 2rem;
      width: var(--learn-button-width);
      height: var(--learn-button-height);
      z-index: 200;
      transition: none !important;
      animation: none !important;
      left: 275px;
      z-index: 11;
    }
    &-button {
      width: 232px;
      height: 100%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      text-align: center;
      cursor: pointer;
      .digital-assistant__popup--primary & {
        background: var(--color-white);
        color: var(--color-primary-blue);
        border-radius: var(--border-radius-asymmetric);
        font-size: 2rem;
        font-weight: 500;
        line-height: 114.99999%;
        text-align: left;
        padding-left: 25px;
        height: 108px;
      }
      &--secondary {
        background: var(--gradient-secondary);
        color: var(--color-white);
        border-radius: var(--border-radius-asymmetric);
        font-size: var(--font-size-lg);
        width: 100%;
        overflow: hidden;
        position: relative;
        font-weight: 700;
        height: 102px;
        border: none;
        width: 484px;
      }
    }
    &--primary::before {
      content: '';
      position: absolute;
      inset: -0.25rem;
      background: var(--gradient-primary);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      padding: 0.3125rem;
      border-radius: inherit;
      z-index: -1;
      width: 240px;
      height: 117px;
    }
    &--secondary::before {
      content: '';
      position: absolute;
      inset: -0.2rem;
      background: var(--gradient-primary);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      padding: 0.4125rem;
      border-radius: var(--border-radius-asymmetric);
      z-index: -1;
      height: 108px;
      width: 490px;
    }
  }
  &__game-wrapper {
    height: var(--game-height);
    width: var(--game-width);
    border-radius: 40px;
    padding: 0.3125rem;
    display: flex;
    justify-content: center;
    position: relative;
  }
}

@media (max-width: 1200px) {
  .game-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.popup--secondary {
  left: 12.4375rem;
  width: auto;
  border-radius: var(--border-radius-asymmetric);
}

.popup--primary .popup__button {
  font-size: 2rem;
}

.popup--secondary .popup__button {
  font-size: 2rem;
  width: 450px;
  pointer-events: auto !important;
  position: relative;
  z-index: 100;
}

@media (min-width: 2800px) {
  .popup--secondary {
    left: 20.4375rem;
    width: auto;
    border-radius: var(--border-radius-asymmetric);
  }
}

@media (max-width: 1920px) {
  :root {
    --bettie-button-height: 6rem;
    --learn-button-width: 23.125rem;
    --learn-button-height: 7.5rem;
    --game-height: 33.75rem;
    --game-width: 25.25rem;
    --button-height: 5rem;
    --button-width: 18rem;
  }

  .popup--primary {
    top: 2.5rem;
    left: 2.5rem;
  }

  .popup--secondary {
    left: calc(5vw + 11.4375rem);
    width: auto;
    border-radius: var(--border-radius-asymmetric);
    pointer-events: auto;
    height: 7rem;
  }

  .popup--primary .popup__button {
    font-size: 2rem;
  }

  .popup--secondary .popup__button {
    font-size: 2rem;
    width: 30rem;
    pointer-events: auto !important;
    position: relative;
    z-index: 100;
  }

  .game__content {
    padding: 3rem 2rem 6rem;
    background: transparent;
    position: relative;
    z-index: 2;
    padding: 20px;
  }

  .games {
    grid-column: 6 / 13;
    grid-row: 1 / 11;
    margin-top: 11.37rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
}

@media (max-width: 1300px) {
  .popup--secondary {
    left: 1.4375rem;
    width: auto;
    border-radius: var(--border-radius-asymmetric);
    pointer-events: auto;
  }
}

@media (max-width: 1899px) and (min-width: 1600px) {
  .popup--secondary {
    left: calc(20% - 1rem);
    width: auto;
    border-radius: var(--border-radius-asymmetric);
    pointer-events: auto;
  }
}

@media (max-width: 1600px) {
  :root {
    --bettie-button-height: 6rem;
    --learn-button-width: 23.125rem;
    --learn-button-height: 7.5rem;
    --game-height: 33.75rem;
    --game-width: 25.25rem;
    --button-height: 5rem;
    --button-width: 18rem;
  }

  .digital-assistant__popup--secondary {
    left: 178px;
    bottom: 2.5rem;
  }

  .popup--primary {
    top: 2.5rem;
    left: 2.5rem;
  }

  .popup--secondary {
    left: calc(5vw + 5.4375rem);
    width: auto;
    border-radius: var(--border-radius-asymmetric);
    pointer-events: auto;
  }

  .popup--primary .popup__button {
    font-size: 2rem;
  }

  .popup--secondary .popup__button {
    font-size: 2rem;
    width: 30rem;
    pointer-events: auto !important;
    position: relative;
    z-index: 100;
  }

  .game__content {
    padding: 3rem 2rem 6rem;
    background: transparent;
    position: relative;
    z-index: 2;
    padding: 20px;
  }

  .games {
    grid-column: 6 / 13;
    grid-row: 1 / 11;
    margin-top: 6.37rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
}
</style>
