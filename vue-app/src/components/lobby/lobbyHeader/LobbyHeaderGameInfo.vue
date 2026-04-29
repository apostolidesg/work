<template>
  <span
    v-if="shouldShowComponent"
    :class="[
      'ssbt-header-game-info',
      `ssbt-header-game-info--${textTheme}`,
      { 'ssbt-header-game-info--column': !barcodeReaderStatusOk },
      { 'ssbt-header-game-info--faq-route': routeData.isFaqRoute },
      { 'ssbt-header-game-info--fireblaze': isGameTypeFireblaze },
      { 'ssbt-header-game-info--new': digitalAssistantEnabled || isKinoRoute },
      { 'ssbt-header-game-info--old': !(digitalAssistantEnabled || isKinoRoute) },
    ]"
  >
    <template v-if="routeData.shouldShowGameInfo || !(digitalAssistantEnabled || isKinoRoute)">
      <button
        id="ssbt-header-game-info-terms"
        :class="['ssbt-header-game-info__terms', { 'ssbt-header-game-info__terms--small': !barcodeReaderStatusOk }]"
        @click="openTerms"
      >
        {{ $t('termsAndConditions') }}
      </button>
      <button
        id="ssbt-header-game-info-how-to-play"
        :class="[
          'ssbt-header-game-info__how-to-play',
          { 'ssbt-header-game-info__how-to-play--small': !barcodeReaderStatusOk },
        ]"
        @click="openHowToPlay"
      >
        <span>{{ $t('howToPlayUpper') }}</span>
      </button>
    </template>
  </span>
</template>

<script>
import modalEventConstants from '../../../util/modalEventConstants';
import Constants from '../../../util/Constants';
import infoModalScrollableMessages from '../../../util/infoModalScrollableMessages';
import { mapState, mapGetters } from 'vuex';
import moduleTypes from '../../../store/modules/types';
import SessionStoreModuleTypes from '../../../store/modules/SessionStoreModule/types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faListAlt } from '@fortawesome/fontawesome-free-regular';
import howToPlayImage from '../../../assets/fireblaze/powerspin-on-fire-how-to-play.svg';
import ConfigurationStoreModule from '../../../store/modules/ConfigurationStoreModule/types';

library.add(faListAlt);

const TEXT_THEMES = {
  WHITE: 'white',
  BLACK: 'black',
  CLEAR_WHITE: 'clear-white',
};

export default {
  name: 'LobbyHeaderGameInfo',
  props: {
    textTheme: {
      type: String,
      default: TEXT_THEMES.BLACK,
      validator: (value) => Object.values(TEXT_THEMES).includes(value),
    },
    barcodeReaderStatusOk: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.howToPlayImg = howToPlayImage;
  },
  computed: {
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: SessionStoreModuleTypes.state.GAME_TYPE,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      digitalAssistantEnabled: ConfigurationStoreModule.getters.IS_DIGITAL_ASSISTANT_ENABLED,
      getBrandName: ConfigurationStoreModule.getters.GET_BRAND_NAME,
    }),

    routeData() {
      const currentRoute = this.$route.name;
      const routes = {
        playArea: [
          Constants.ROUTE_NAMES.KINO,
          Constants.ROUTE_NAMES.EUROJACKPOT,
          Constants.ROUTE_NAMES.POWERSPIN,
          Constants.ROUTE_NAMES.FIREBLAZE,
        ],
        kinoRelated: [
          Constants.ROUTE_NAMES.KINO_FAQ,
          Constants.ROUTE_NAMES.KINO_FAQ_DETAILS,
          Constants.ROUTE_NAMES.KINO_QUICKPLAY,
          Constants.ROUTE_NAMES.QUICKBETS,
          Constants.ROUTE_NAMES.KINO_VIDEOS,
        ],
        powerspinRelated: [
          Constants.ROUTE_NAMES.POWERSPIN_FAQ,
          Constants.ROUTE_NAMES.POWERSPIN_FAQ_DETAILS,
          Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY,
          Constants.ROUTE_NAMES.POWERSPIN_QUICKBETS,
          Constants.ROUTE_NAMES.POWERSPIN_VIDEOS,
        ],
        hideGameInfo: [Constants.ROUTE_NAMES.MAIN_FAQ],
      };

      const isKinoRelated = routes.kinoRelated.includes(currentRoute);
      const isPowerspinRelated = routes.powerspinRelated.includes(currentRoute);
      const isPlayArea = routes.playArea.includes(currentRoute);
      const isFaqRoute = isKinoRelated || isPowerspinRelated;

      return {
        current: currentRoute,
        isPlayArea,
        isKinoRelated,
        isPowerspinRelated,
        isFaqRoute,
        isPlayAreaOrKinoFaq: isPlayArea || isFaqRoute,
        shouldShowGameInfo: !routes.hideGameInfo.includes(currentRoute),
        gameTypeForTerms: isKinoRelated
          ? Constants.ROUTE_NAMES.KINO
          : isPowerspinRelated
            ? Constants.ROUTE_NAMES.POWERSPIN
            : this.gameType?.toLowerCase(),
      };
    },

    isGameTypeFireblaze() {
      return this.gameType === Constants.GENERAL_GAME_TYPES.FIREBLAZE;
    },

    isKinoRoute() {
      return this.$route.name === Constants.ROUTE_NAMES.KINO;
    },

    shouldShowComponent() {
      return this.digitalAssistantEnabled || this.isKinoRoute ? this.routeData.isPlayAreaOrKinoFaq : true;
    },
  },
  methods: {
    openTerms() {
      const brandName =
        this.getBrandName === Constants.BRAND_NAMES.ALLWYN ? Constants.BRAND_NAMES.ALLWYN.toLowerCase() : '';
      const termsKey = `${brandName}${this.routeData.gameTypeForTerms}Terms`;
      this.$eventHub.$emit(modalEventConstants.OPEN.INFO_SCROLLABLE, infoModalScrollableMessages[termsKey]);
    },
    openHowToPlay() {
      this.$eventHub.$emit(modalEventConstants.OPEN.HOW_TO_PLAY);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss-utils/powerspin/colors';

.ssbt-header-game-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 6px;
  &--white {
    button {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  &--black {
    button {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &--clear-white {
    button {
      color: $color-primary-white;
    }
  }
  &--column {
    flex-direction: column;
  }

  &--new {
    flex-direction: column;
    align-items: center;
  }
  &--faq-route {
    flex-direction: column;
  }
  &--fireblaze {
    flex-direction: column;
  }

  &--old {
    align-items: flex-end;
    padding-bottom: 6px;
  }
  &__terms,
  &__how-to-play {
    text-align: center;
    vertical-align: bottom;
    font-weight: 900;
    font-size: 11.36px;
    text-decoration: underline;
    cursor: pointer;
    border: none;
    background: none;
    width: 140px;
    padding: 5px 0px 0px 0px;
    &--small {
      font-size: 10.3px;
    }
    &--icon {
      font-size: 2.5em;
    }
  }

  &--new &__terms,
  &--new &__how-to-play {
    margin: 1px 10px 0 0px;
    width: 140px;
    padding: 6px 0px 0px 0px;
  }
  &--faq-route &__terms,
  &--faq-route &__how-to-play {
    margin: 2px 5px;
  }

  &--old &__terms,
  &--old &__how-to-play {
    margin: 5px 10px 0 10px;
    padding: 0;
  }
}
</style>
