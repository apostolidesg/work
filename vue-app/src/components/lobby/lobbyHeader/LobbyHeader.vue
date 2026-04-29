<template>
  <header>
    <div id="ssbt_lobbyHeader" class="ssbt_lobby-header" :class="headerClass">
      <nav class="ssbt_lobby-header__navbar navbar navbar-expand">
        <div
          class="ssbt_lobby-header__navbar-logo-area d-flex align-items-center"
          :class="`ssbt_lobby-header__navbar-logo-area--${theme}`"
        >
          <img
            :id="`ssbt_lobby-header-img--${theme}`"
            :class="[
              `ssbt_lobby-header__logo--${theme}`,
              { 'ssbt_lobby-header__logo--eurojackpot-extra': isActiveDrawExtra },
              'ml-2',
            ]"
            alt="header logo"
            :src="logoSrc"
          />
          <LobbyHeaderOption
            class="ssbt_lobby-header__digital-assistant-home-icon"
            v-if="showHomeIcon"
            :icon="homeIcon"
            :text="$t('home')"
            @click="returnToLobby"
            :textTheme="'white'"
            :darkIcon="false"
          />
          <LobbyHeaderOption
            id="ssbt_barcode_error_universal"
            v-if="!lobbyHeaderMixin_barcodeReaderStatusOk && !isPlayArea"
            :icon="themeSettings.barcodeImage"
            text="bcrError"
            @click="barcodeReaderError"
            :textTheme="getBarcodeErrorTextTheme"
            class="ssbt-lobby-header__digital-assistant-barcode-error-universal"
          />
          <div
            id="ssbt_lobby-header-eurojackpot-amount"
            class="ssbt_lobby-header__navbar-eurojackpot-amount"
            v-if="isThemeEurojackpot"
          >
            <EurojackpotAmount :amount="getEurojackpotJackpot" v-if="getEurojackpotJackpot" />
            <EurojackpotSalesStop v-if="getIsSalesClosed" />
          </div>
          <LobbyHeaderOption
            v-if="isPlayArea || showBookOfGamesReturnToLobby"
            :textTheme="themeSettings.theme || 'white'"
            text="backUpper"
            @click="goBack"
            id="ssbt_return_to_lobby"
            :faIcon="['fas', 'arrow-left']"
          />
        </div>
        <div v-if="isThemeEurojackpot" class="ssbt_lobby-header__navbar-eurojackpot-info">
          <LobbyHeaderOption
            id="ssbt_barcode_error"
            v-if="!lobbyHeaderMixin_barcodeReaderStatusOk"
            :icon="themeSettings.barcodeImage"
            text="bcrError"
            @click="barcodeReaderError"
            :textTheme="themeSettings.theme"
          />
          <LobbyHeaderGameInfo
            id="ssbt_game_info"
            v-if="!$_lobbyHeaderMixin_inLobby"
            :textTheme="themeSettings.theme"
            :barcodeReaderStatusOk="lobbyHeaderMixin_barcodeReaderStatusOk"
          />
          <BaseClearButton
            id="ssbt_base_clear_button_header"
            :theme="themeSettings.theme"
            bottomLabel="clearAll"
            @click="clearBetslip"
          />
        </div>
        <div
          v-if="!isThemeEurojackpot"
          class="ssbt_lobby-header__navbar-nav-right navbar-nav"
          :class="`ssbt_lobby-header__navbar-nav-right--${theme}`"
        >
          <template v-if="!$_lobbyHeaderMixin_inLobby && isPlayArea">
            <LobbyHeaderGameInfo
              id="ssbt_game_info"
              :textTheme="themeSettings.theme"
              :barcodeReaderStatusOk="lobbyHeaderMixin_barcodeReaderStatusOk"
            />
            <LobbyHeaderOption
              id="ssbt_barcode_error"
              v-if="!lobbyHeaderMixin_barcodeReaderStatusOk"
              :icon="themeSettings.barcodeImage"
              text="bcrError"
              @click="barcodeReaderError"
              :textTheme="themeSettings.theme"
              class="barcode-error"
            />
            <div class="d-flex align-items-center" v-if="!getIsActiveLiveDrawScreen">
              <input id="return-to-lobby-enabled-test-input" type="hidden" :value="!activeSession" />
              <BaseClearButton
                id="ssbt_base_clear_button_header"
                :theme="themeSettings.theme"
                bottomLabel="clearAll"
                @click="clearBetslip"
              />
            </div>
            <DrawInformation
              :theme="$_lobbyHeaderMixin_gameType.toLowerCase()"
              :barcodeReaderStatusError="!lobbyHeaderMixin_barcodeReaderStatusOk"
            />
            <LobbyHeaderOption
              id="ssbt_cash_out"
              class="ssbt_lobby-header__navbar-cashout"
              :textTheme="themeSettings.theme"
              :class="{ 'ssbt_lobby-header__navbar-cashout--disabled': !activeSession }"
              :icon="themeSettings.cashOutImage"
              text="cashOut"
              @click="cashOut"
              :darkIcon="isKino"
            />
            <LobbyHeaderDigitalPay v-if="isDigitalPayEnabled" />
            <LobbyHeaderBalanceBox
              id="ssbt_balance_box"
              :textTheme="themeSettings.theme"
              :showBalance="showBalance"
              @toggle-balance="toggleBalanceDisplay"
              @update-balance="$_lobbyHeaderMixin_updateBalance"
            />
          </template>
          <router-link v-if="showBookOfGamesButton" id="lobby-games-book-of-games" to="/book-of-games" class="mr-4">
            <BookOfGamesButton />
          </router-link>
          <div v-if="showBalanceAndCashoutForHelpSection" class="ssbt_lobby-header__help-section-controls">
            <LobbyHeaderGameInfo
              v-if="shouldShowGameInfo"
              :textTheme="'clear-white'"
              :barcodeReaderStatusOk="lobbyHeaderMixin_barcodeReaderStatusOk"
            />
            <LobbyHeaderOption
              id="ssbt_cash_out"
              class="ssbt_lobby-header__navbar-cashout"
              :textTheme="'white'"
              :class="{ 'ssbt_lobby-header__navbar-cashout--disabled': !activeSession }"
              :icon="cashOutIcon"
              text="cashOut"
              @click="cashOut"
            />
            <LobbyHeaderDigitalPay v-if="isDigitalPayEnabled" />
            <LobbyHeaderBalanceBox
              id="ssbt_balance_box"
              :textTheme="themeSettings.theme"
              :showBalance="showBalance"
              @toggle-balance="toggleBalanceDisplay"
              @update-balance="$_lobbyHeaderMixin_updateBalance"
            />
          </div>
          <LobbyHeaderLanguageSelection
            id="ssbt_language_selection"
            :textTheme="themeSettings.theme"
            :language="lang"
            @change-language="changeLang"
          />
          <div
            id="ssbt_rg_image_box"
            class="ssbt_lobby-header__navbar-responsible-gaming"
            :class="{ 'ml-2': isAllwynBrand }"
          >
            <img
              id="ssbt_rg_img"
              width="110"
              :src="rgImage"
              @click="openResponsibleGamingInfo"
              alt="responsible gaming info"
            />
          </div>
        </div>
        <div v-if="isThemeEurojackpot" class="ssbt_lobby-header__help-section-controls">
          <LobbyHeaderOption
            id="ssbt_cash_out"
            class="ssbt_lobby-header__navbar-cashout"
            :textTheme="themeSettings.theme"
            :class="{ 'ssbt_lobby-header__navbar-cashout--disabled': !activeSession }"
            :icon="themeSettings.cashOutImage"
            text="cashOut"
            @click="cashOut"
          />
          <LobbyHeaderDigitalPay v-if="isDigitalPayEnabled" />
          <LobbyHeaderBalanceBox
            id="ssbt_balance_box"
            :textTheme="themeSettings.theme"
            :showBalance="showBalance"
            @toggle-balance="toggleBalanceDisplay"
            @update-balance="$_lobbyHeaderMixin_updateBalance"
          />
          <LobbyHeaderLanguageSelection
            id="ssbt_language_selection"
            :textTheme="themeSettings.theme"
            :language="lang"
            @change-language="changeLang"
          />
          <div id="ssbt_rg_image_box" class="ssbt_lobby-header__navbar-responsible-gaming">
            <img
              id="ssbt_rg_img"
              width="110"
              :src="rgImage"
              @click="openResponsibleGamingInfo"
              alt="responsible gaming info"
            />
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import awaitTo from 'await-to-js';
import { isFunction } from 'lodash';
import { mapActions, mapGetters, mapState } from 'vuex';
import barcodeScannerImgWhite from '../../../assets/barcode_gun_error_barcode-scan-white.png';
import barcodeScannerImg from '../../../assets/barcode_gun_error_barcode-scan.png';
import euroImg from '../../../assets/euro-icon-dark.png';
import cashOut from '../../../assets/cashout.svg';
import fireblazeLogo from '../../../assets/fireblaze/powerspin-on-fire-logo.png';
import eurojackpotLogo from '../../../assets/eurojackpot/eurojackpot.png';
import eurojackpotLogoExtra from '../../../assets/eurojackpot/eurojackpot_extra.png';
import eurojackpotCashout from '../../../assets/eurojackpot/eurojackpot-cashout.svg';
import home from '../../../assets/lobby/home.png';
import kino from '../../../assets/lobby/kino.png';
import kinoLogo from '../../../assets/kino-logo@2x.png';
import logo from '../../../assets/lobby/logo.png';
import allwynLogo from '../../../assets/lobby/opap-logo-allywyn.png';
import allwynLogoEn from '../../../assets/lobby/opap-logo-allywyn-en.png';
import allwynLogoDark from '../../../assets/allwyn-logo-dark.png';
import allwynLogoLight from '../../../assets/allwyn-logo-light.png';
import powerspinLogo from '../../../assets/power-spin/powerspin-logo-ON.png';
import rgLogoEl from '../../../assets/rg-logo-el.png';
import rgLogoEn from '../../../assets/rg-logo-en.png';
import allwynRgLogoDarkEn from '../../../assets/allwyn-rg-logo-dark-en.png';
import allwynRgLogoLightEn from '../../../assets/allwyn-rg-logo-light-en.png';
import allwynRgLogoDarkEl from '../../../assets/allwyn-rg-logo-dark-el.png';
import allwynRgLogoLightEl from '../../../assets/allwyn-rg-logo-light-el.png';
import eventHubConstants from '../../../constants/eventHub';
import EventSenderService from '../../../handler/EventSenderService';
import EventTypes from '../../../handler/EventTypes';
import RequestTypes from '../../../handler/RequestTypes';
import lobbyHeaderMixin from '../../../mixins/lobbyHeaderMixin';
import ModalUsageMixin from '../../../mixins/ModalUsageMixin';
import configurationStoreModuleTypes from '../../../store/modules/ConfigurationStoreModule/types';
import eurojackpotStoreModuleTypes from '../../../store/modules/EurojackpotStoreModule/types';
import languageStoreModuleTypes from '../../../store/modules/LanguageStoreModule/types';
import playerSessionTypes from '../../../store/modules/PlayerBetslipsSessionModule/types';
import sessionStoreModuleTypes from '../../../store/modules/SessionStoreModule/types';
import moduleTypes from '../../../store/modules/types';
import Constants from '../../../util/Constants';
import dialogModalMessages from '../../../util/dialogModalMessages';
import infoModalMessages from '../../../util/infoModalMessages';
import infoModalScrollableMessages from '../../../util/infoModalScrollableMessages';
import modalEventConstants from '../../../util/modalEventConstants';
import BaseClearButton from '../../common/BaseClearButton.vue';
import BookOfGamesButton from '../bookOfGames/BookOfGamesButton.vue';
import EurojackpotSalesStop from '../games/eurojackpot/common/EurojackpotSalesStop.vue';
import EurojackpotAmount from '../games/eurojackpot/mainscreen/EurojackpotAmount.vue';
import DrawInformation from './drawInformation/DrawInformation.vue';
import LobbyHeaderBalanceBox from './LobbyHeaderBalanceBox.vue';
import LobbyHeaderGameInfo from './LobbyHeaderGameInfo.vue';
import LobbyHeaderLanguageSelection from './LobbyHeaderLanguageSelection.vue';
import LobbyHeaderOption from './LobbyHeaderOption.vue';
import cashOutIcon from '../../../assets/new-header/cashOutIcon.svg';
import goBackIcon from '../../../assets/new-header/goBackIcon.svg';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
import LobbyHeaderDigitalPay from './LobbyHeaderDigitalPay.vue';
import ConfigurationStoreModule from '../../../store/modules/ConfigurationStoreModule';

const HEADER_THEMES = {
  lobby: {
    logo,
    theme: 'black',
    cashOutImage: euroImg,
    barcodeImage: barcodeScannerImg,
  },
  allwyn: {
    logo: allwynLogoDark,
    theme: 'black',
    cashOutImage: euroImg,
    barcodeImage: barcodeScannerImg,
  },
  kino: {
    logo: kinoLogo,
    theme: 'black',
    cashOutImage: cashOutIcon,
    barcodeImage: barcodeScannerImg,
  },
  powerspin: {
    logo: powerspinLogo,
    theme: 'white',
    cashOutImage: cashOutIcon,
    barcodeImage: barcodeScannerImgWhite,
  },
  fireblaze: {
    logo: fireblazeLogo,
    theme: 'clear-white',
    cashOutImage: cashOutIcon,
    barcodeImage: barcodeScannerImgWhite,
  },
  eurojackpot: {
    logo: eurojackpotLogo,
    theme: 'black',
    cashOutImage: eurojackpotCashout,
    barcodeImage: barcodeScannerImg,
  },
  eurojackpotExtra: {
    logo: eurojackpotLogoExtra,
    theme: 'black',
    cashOutImage: eurojackpotCashout,
    barcodeImage: barcodeScannerImg,
  },
  powerspinfaq: {
    logo: powerspinLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  'powerspinFaq-details': {
    logo: powerspinLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  kinofaq: {
    logo: kinoLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  'kinoFaq-details': {
    logo: kinoLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  helpfaq: {
    logo: allwynLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  'helpFaq-details': {
    logo: allwynLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  helpsection: {
    logo: allwynLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  'howto-lobby': {
    logo: allwynLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  'kino-videos': {
    logo: kinoLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  'powerspin-videos': {
    logo: powerspinLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  'digital-assistant': {
    logo: allwynLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  'kino-quickplay': {
    logo: kinoLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  quickbets: {
    logo: kinoLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  mainfaq: {
    logo: allwynLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  powerspin_quickplay: {
    logo: powerspinLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
  powerspin_quickbets: {
    logo: powerspinLogo,
    barcodeImage: barcodeScannerImgWhite,
  },
};

const HELP_SECTION_ROUTES = [
  Constants.ROUTE_NAMES.HELP_SECTION,
  Constants.ROUTE_NAMES.MAIN_FAQ,
  Constants.ROUTE_NAMES.KINO_FAQ,
  Constants.ROUTE_NAMES.KINO_FAQ_DETAILS,
  Constants.ROUTE_NAMES.KINO_QUICKPLAY,
  Constants.ROUTE_NAMES.QUICKBETS,
  Constants.ROUTE_NAMES.POWERSPIN_FAQ,
  Constants.ROUTE_NAMES.POWERSPIN_FAQ_DETAILS,
  Constants.ROUTE_NAMES.HELP_FAQ,
  Constants.ROUTE_NAMES.HELP_FAQ_DETAILS,
  Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY,
  Constants.ROUTE_NAMES.POWERSPIN_QUICKBETS,
  Constants.ROUTE_NAMES.HOWTO_LOBBY,
  Constants.ROUTE_NAMES.KINO_VIDEOS,
  Constants.ROUTE_NAMES.POWERSPIN_VIDEOS,
];

const DIGITAL_ASSISTANT_ROUTES = [
  Constants.ROUTE_NAMES.KINO_VIDEOS,
  Constants.ROUTE_NAMES.POWERSPIN_VIDEOS,
  Constants.ROUTE_NAMES.KINO_FAQ,
  Constants.ROUTE_NAMES.KINO_FAQ_DETAILS,
  Constants.ROUTE_NAMES.POWERSPIN_FAQ,
  Constants.ROUTE_NAMES.POWERSPIN_FAQ_DETAILS,
  Constants.ROUTE_NAMES.HELP_FAQ,
  Constants.ROUTE_NAMES.HELP_FAQ_DETAILS,
  Constants.ROUTE_NAMES.HELP_SECTION,
  Constants.ROUTE_NAMES.HOWTO_LOBBY,
  Constants.ROUTE_NAMES.KINO_QUICKPLAY,
  Constants.ROUTE_NAMES.QUICKBETS,
  Constants.ROUTE_NAMES.MAIN_FAQ,
  Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY,
  Constants.ROUTE_NAMES.POWERSPIN_QUICKBETS,
];

const THEME_GROUPS = {
  kino: [
    Constants.ROUTE_NAMES.KINO,
    Constants.ROUTE_NAMES.KINO_FAQ,
    Constants.ROUTE_NAMES.KINO_FAQ_DETAILS,
    Constants.ROUTE_NAMES.KINO_QUICKPLAY,
    Constants.ROUTE_NAMES.QUICKBETS,
    Constants.ROUTE_NAMES.KINO_VIDEOS,
  ],
  powerspin: [
    Constants.ROUTE_NAMES.POWERSPIN,
    Constants.ROUTE_NAMES.POWERSPIN_FAQ,
    Constants.ROUTE_NAMES.POWERSPIN_FAQ_DETAILS,
    Constants.ROUTE_NAMES.POWERSPIN_VIDEOS,
  ],
  lobby: [
    Constants.ROUTE_NAMES.LOBBY,
    Constants.ROUTE_NAMES.HELP_SECTION,
    Constants.ROUTE_NAMES.MAIN_FAQ,
    Constants.ROUTE_NAMES.HELP_FAQ,
    Constants.ROUTE_NAMES.HELP_FAQ_DETAILS,
    Constants.ROUTE_NAMES.HOWTO_LOBBY,
    Constants.ROUTE_NAMES.BOOK_OF_GAMES,
  ],
  eurojackpot: [Constants.ROUTE_NAMES.EUROJACKPOT],
  fireblaze: [Constants.ROUTE_NAMES.FIREBLAZE],
  [Constants.ROUTE_NAMES.POWERSPIN_VIDEOS]: [Constants.ROUTE_NAMES.POWERSPIN_VIDEOS],
};

const ALLWYN_LOGO_MAPPER = {
  el: allwynLogo,
  en: allwynLogoEn,
};

export default {
  name: 'LobbyHeader',
  components: {
    EurojackpotSalesStop,
    BaseClearButton,
    LobbyHeaderBalanceBox,
    LobbyHeaderLanguageSelection,
    LobbyHeaderOption,
    LobbyHeaderGameInfo,
    DrawInformation,
    EurojackpotAmount,
    BookOfGamesButton,
    LobbyHeaderDigitalPay,
  },
  mixins: [ModalUsageMixin, lobbyHeaderMixin],
  data() {
    return {
      homeIcon: home,
      kino,
      cashOutIcon,
      goBackIcon,
      lang: Constants.DEFAULT_LOCALE,
      showBalance: true,
      toggleHeader: false,
      configLoaded: false,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getVoucher: configurationStoreModuleTypes.getters.GET_VOUCHER,
      getConfiguration: configurationStoreModuleTypes.getters.GET_CONFIGURATION,
    }),
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getIsActiveLiveDrawScreen: playerSessionTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN,
    }),
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      getIsZeroBalance: sessionStoreModuleTypes.getters.GET_IS_ZERO_BALANCE,
      activeSession: sessionStoreModuleTypes.getters.GET_ACTIVE_SESSION,
      getBalance: sessionStoreModuleTypes.getters.GET_BALANCE,
      getBalanceVisibility: sessionStoreModuleTypes.getters.GET_BALANCE_VISIBILITY,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      digitalAssistantEnabled: ConfigurationStoreModule.getters.IS_DIGITAL_ASSISTANT_ENABLED,
    }),
    ...mapGetters(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      getEurojackpotJackpot: eurojackpotStoreModuleTypes.getters.GET_JACKPOT_AMOUNT,
      getIsSalesClosed: eurojackpotStoreModuleTypes.getters.GET_IS_SALES_CLOSED,
    }),
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, ['isActiveDrawExtra']),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      $_lobbyHeaderMixin_gameType: (state) => state.gameType,
    }),
    isAllwynBrand() {
      return this.$_lobbyHeaderMixin_getBrandName === Constants.BRAND_NAMES.ALLWYN;
    },
    rgImage() {
      const isEl = this.lang === Constants.DEFAULT_LOCALE;
      if (this.isAllwynBrand) {
        if (this.digitalAssistantEnabled) {
          if (this.isKino) return isEl ? allwynRgLogoDarkEl : allwynRgLogoDarkEn;
          return isEl ? allwynRgLogoLightEl : allwynRgLogoLightEn;
        } else {
          if (this.isFireblaze || this.isPowerspin) return isEl ? allwynRgLogoLightEl : allwynRgLogoLightEn;
          return isEl ? allwynRgLogoDarkEl : allwynRgLogoDarkEn;
        }
      }
      return isEl ? rgLogoEl : rgLogoEn;
    },
    isPlayArea() {
      return (
        this.$route.name === Constants.ROUTE_NAMES.KINO ||
        this.$route.name === Constants.ROUTE_NAMES.POWERSPIN ||
        this.$route.name === Constants.ROUTE_NAMES.FIREBLAZE ||
        this.$route.name === Constants.ROUTE_NAMES.EUROJACKPOT
      );
    },

    getBarcodeErrorTextTheme() {
      if (this.digitalAssistantEnabled || this.showBalanceAndCashoutForHelpSection) {
        return Constants.BAR_CODE_COLOR;
      }
      return this.themeSettings.theme;
    },
    theme() {
      const routeName = this.$route.name;

      for (const [theme, routes] of Object.entries(THEME_GROUPS)) {
        if (routes.includes(routeName)) {
          return theme;
        }
      }

      return (
        this.$_lobbyHeaderMixin_gameType?.toLowerCase() ||
        (this.isAllwynBrand ? Constants.LOBBY_HEADER_THEMES.ALLWYN : Constants.LOBBY_HEADER_THEMES.LOBBY)
      );
    },

    logoSrc() {
      if (this.themeSettings.logo === allwynLogo || this.themeSettings.logo === allwynLogoEn) {
        if (this.isAllwynBrand) return allwynLogoLight;
        return ALLWYN_LOGO_MAPPER[this.lang] || ALLWYN_LOGO_MAPPER.en;
      }
      return this.themeSettings.logo;
    },

    shouldShowGameInfo() {
      return (
        this.showBalanceAndCashoutForHelpSection ||
        (!this.$_lobbyHeaderMixin_inLobby &&
          !this.isThemeEurojackpot &&
          !this.isKinoFaqRoute &&
          !this.isPowerspinFaqRoute &&
          !this.isKinoQuickPlay &&
          this.isPlayArea)
      );
    },
    showHomeIcon() {
      return [
        Constants.ROUTE_NAMES.KINO_VIDEOS,
        Constants.ROUTE_NAMES.POWERSPIN_VIDEOS,
        Constants.ROUTE_NAMES.KINO_FAQ,
        Constants.ROUTE_NAMES.KINO_FAQ_DETAILS,
        Constants.ROUTE_NAMES.POWERSPIN_FAQ,
        Constants.ROUTE_NAMES.POWERSPIN_FAQ_DETAILS,
        Constants.ROUTE_NAMES.HELP_FAQ,
        Constants.ROUTE_NAMES.HELP_FAQ_DETAILS,
        Constants.ROUTE_NAMES.HOWTO_LOBBY,
        Constants.ROUTE_NAMES.HELP_SECTION,
        Constants.ROUTE_NAMES.KINO_QUICKPLAY,
        Constants.ROUTE_NAMES.QUICKBETS,
        Constants.ROUTE_NAMES.HELP_SECTION,
        Constants.ROUTE_NAMES.MAIN_FAQ,
        Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY,
        Constants.ROUTE_NAMES.POWERSPIN_QUICKBETS,
      ].includes(this.currentThemeKey);
    },
    currentThemeKey() {
      const routeName = this.$route ? this.$route.name : null;
      const sourceName =
        routeName ||
        this.theme ||
        (this.isAllwynBrand ? Constants.LOBBY_HEADER_THEMES.ALLWYN : Constants.LOBBY_HEADER_THEMES.LOBBY);
      if (this.digitalAssistantEnabled) {
        switch (routeName) {
          case Constants.ROUTE_NAMES.KINO_VIDEOS:
          case Constants.ROUTE_NAMES.POWERSPIN_VIDEOS:
          case Constants.ROUTE_NAMES.KINO_FAQ:
          case Constants.ROUTE_NAMES.KINO_FAQ_DETAILS:
          case Constants.ROUTE_NAMES.POWERSPIN_FAQ:
          case Constants.ROUTE_NAMES.POWERSPIN_FAQ_DETAILS:
          case Constants.ROUTE_NAMES.HELP_FAQ:
          case Constants.ROUTE_NAMES.HELP_FAQ_DETAILS:
          case Constants.ROUTE_NAMES.KINO_QUICKPLAY:
          case Constants.ROUTE_NAMES.QUICKBETS:
          case Constants.ROUTE_NAMES.HELP_SECTION:
          case Constants.ROUTE_NAMES.MAIN_FAQ:
          case Constants.ROUTE_NAMES.HOWTO_LOBBY:
          case Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY:
          case Constants.ROUTE_NAMES.POWERSPIN_QUICKBETS:
            return routeName;
          case Constants.ROUTE_NAMES.LOBBY:
            return 'digital-assistant';
          default:
            break;
        }
      }

      switch (sourceName) {
        case Constants.ROUTE_NAMES.KINO:
        case Constants.ROUTE_NAMES.KINO_QUICKPLAY:
          return Constants.ROUTE_NAMES.KINO;
        case Constants.ROUTE_NAMES.POWERSPIN:
          return Constants.ROUTE_NAMES.POWERSPIN;
        case Constants.ROUTE_NAMES.FIREBLAZE:
          return Constants.ROUTE_NAMES.FIREBLAZE;
        case Constants.ROUTE_NAMES.EUROJACKPOT:
          return Constants.ROUTE_NAMES.EUROJACKPOT;
        case Constants.ROUTE_NAMES.LOBBY:
          return this.isAllwynBrand ? Constants.LOBBY_HEADER_THEMES.ALLWYN : Constants.LOBBY_HEADER_THEMES.LOBBY;
        default:
          return this.digitalAssistantEnabled
            ? 'digital-assistant'
            : this.isAllwynBrand
              ? Constants.LOBBY_HEADER_THEMES.ALLWYN
              : Constants.LOBBY_HEADER_THEMES.LOBBY;
      }
    },
    themeSettings() {
      return HEADER_THEMES[this.currentThemeKey] || (this.isAllwynBrand ? HEADER_THEMES.allwyn : HEADER_THEMES.lobby);
    },
    whatImPassingToCashOut() {
      return this.themeSettings.theme;
    },
    shouldShowBackButton() {
      return this.route.name === Constants.ROUTE_NAMES.KINO || this.route.name === Constants.ROUTE_NAMES.POWERSPIN;
    },
    showBalanceAndCashoutForHelpSection() {
      if (!this.digitalAssistantEnabled) {
        return false;
      }
      return HELP_SECTION_ROUTES.includes(this.$route.name);
    },
    headerClass() {
      const isDigitalAssistant =
        this.currentThemeKey === 'digital-assistant' || DIGITAL_ASSISTANT_ROUTES.includes(this.currentThemeKey);

      if (isDigitalAssistant) {
        return this.isAllwynBrand
          ? 'ssbt_lobby-header--digital-assistant-allwyn'
          : 'ssbt_lobby-header--digital-assistant';
      }

      return `ssbt_lobby-header--${this.currentThemeKey}`;
    },
    isThemeEurojackpot() {
      return this.theme === Constants.ROUTE_NAMES.EUROJACKPOT;
    },
    showBookOfGamesReturnToLobby() {
      return this.$route.name === Constants.ROUTE_NAMES.BOOK_OF_GAMES;
    },
    showBookOfGamesButton() {
      return this.$route.name === Constants.ROUTE_NAMES.LOBBY;
    },
    isKinoQuickPlay() {
      return (
        this.$route.name === Constants.ROUTE_NAMES.KINO_QUICKPLAY ||
        this.$route.name === Constants.ROUTE_NAMES.QUICKBETS
      );
    },
    isKino() {
      return this.$route.name === Constants.ROUTE_NAMES.KINO;
    },
    isKinoFaqRoute() {
      return (
        this.$route.name === Constants.ROUTE_NAMES.KINO_FAQ ||
        this.$route.name === Constants.ROUTE_NAMES.KINO_FAQ_DETAILS
      );
    },
    isPowerspin() {
      return this.$route.name === Constants.ROUTE_NAMES.POWERSPIN;
    },
    isFireblaze() {
      return this.$route.name === Constants.ROUTE_NAMES.FIREBLAZE;
    },
    isPowerSpinQuickPlay() {
      return (
        this.$route.name === Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY ||
        this.$route.name === Constants.ROUTE_NAMES.POWERSPIN_QUICKBETS
      );
    },
    isPowerspinFaqRoute() {
      return (
        this.$route.name === Constants.ROUTE_NAMES.POWERSPIN_FAQ ||
        this.$route.name === Constants.ROUTE_NAMES.POWERSPIN_FAQ_DETAILS
      );
    },
    isDigitalPayEnabled() {
      return this.getConfiguration?.DIGITAL_PAY_ENABLED;
    },
  },
  watch: {
    $route(to, from) {
      this.showBalance = true;
      if (
        [to.name, from.name].every((name) =>
          [Constants.ROUTE_NAMES.POWERSPIN, Constants.ROUTE_NAMES.KINO].includes(name)
        )
      ) {
        this.initPlayerSession();
        this.updateDrawInfo();
      }
    },
    getIsZeroBalance(newValue, oldValue) {
      newValue && this.zeroBalanceActions();
      this.disableZeroBalanceOnCashOutOrSwitchApp();
    },
  },
  beforeCreate() {
    this.barcodeScannerImg = barcodeScannerImg;
  },
  created() {
    this.addListeners();
  },
  beforeDestroy() {
    this.removeListeners();
  },
  async mounted() {
    this.getVoucher !== '' && this.$_lobbyHeaderMixin_voucherScanned(this.getVoucher);
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      clearPlayerBetslips: playerSessionTypes.actions.CLEAR_PLAYER_BETSLIPS,
      updateDrawInfo: playerSessionTypes.actions.UPDATE_DRAW_INFO,
      initPlayerSession: playerSessionTypes.actions.INIT_PLAYER_SESSION_STATE,
    }),
    ...mapActions(moduleTypes.LANGUAGE_STORE_MODULE, {
      changeLanguage: languageStoreModuleTypes.actions.SET_LANGUAGE,
    }),
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      toggleBalanceVisibility: sessionStoreModuleTypes.actions.TOGGLE_BALANCE_VISIBILITY,
    }),
    addListeners() {
      this.$eventHub.$on('updateBalance', this.$_lobbyHeaderMixin_updateBalance);
      this.$eventHub.$on('doCashout', (switchApp) =>
        this.doCashout(switchApp).catch((err) => console.error('CASH_OUT_ERROR', err))
      );
      this.$eventHub.$on(modalEventConstants.GENERIC.MODAL_ACTIVE, this.handleModalActiveEvent);
      this.$eventHub.$on('getWager', this.$_lobbyHeaderMixin_doGetWager);
      this.$eventHub.$on(eventHubConstants.GET_TOKEN_AFTER_SWITCH, this.getTokenAfterAppSwitch);
    },
    removeListeners() {
      this.$eventHub.$off('updateBalance');
      this.$eventHub.$off('doCashout');
      this.$eventHub.$off(modalEventConstants.GENERIC.MODAL_ACTIVE);
      this.$eventHub.$off('getWager');
      this.$eventHub.$off(eventHubConstants.GET_TOKEN_AFTER_SWITCH);
    },
    disableZeroBalanceOnCashOutOrSwitchApp() {
      this.lobbyHeaderMixin_zeroBalanceOnCashOutOrSwitchApp = false;
    },
    clearBetslip() {
      this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.clearBetslip, () => {
        this.$eventHub.$emit('clearBetslip');
      });
    },
    goBack() {
      this.$router.go(-1);
      this.initPlayerSession();
    },
    returnToLobby() {
      gtag.sendEvent(gtmEvents.SSBT_LOTTERY_HOME_BUTTON_CLICK);
      this.$router.push({ name: Constants.ROUTE_NAMES.LOBBY });
    },
    getTokenAfterAppSwitch() {
      this.$eventHub.$emit('loading', true);
      this.lobbyHeaderMixin_api.getAccessToken(
        this.$_lobbyHeaderMixin_terminalId,
        RequestTypes.GET_SSBT_TOKEN_AFTER_SWITCH,
        this.$_lobbyHeaderMixin_handleGetTokenAfterAppSwitchResponse
      );
    },
    cashOut() {
      if (this.activeSession) {
        this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.cashOut, () => {
          this.doCashout(false).catch((err) => {
            console.error('CASH_OUT_ERROR', err);
          });
        });
      }
    },
    barcodeReaderError() {
      this.triggerInfoModal(infoModalMessages.barcodeReaderWarning);
    },
    async doCashout(switchApp) {
      if (this.$_lobbyHeaderMixin_getConfiguration.IPC_RENDERER_ENABLED) {
        const [err, isHalConnected] = await awaitTo(
          EventSenderService.sendSyncRequest(EventTypes.HAL_INITIALIZED_EVENT_TYPE)
        );
        if (!err && !isHalConnected) {
          this.triggerInfoModal(infoModalMessages.technicalProblemWarning);
          const [, bcrStatus] = await awaitTo(EventSenderService.sendSyncRequest(EventTypes.BCR_STATUS_EVENT_TYPE));
          this.$eventHub.$emit('barcodeStatusChange', bcrStatus);
        }

        const [err2, isPrinterStatusValid] = await awaitTo(
          EventSenderService.sendSyncRequest(EventTypes.PRINTER_STATUS_EVENT_TYPE)
        );
        if (!err2 && !isPrinterStatusValid) {
          this.triggerInfoModal(infoModalMessages.printerErrorWarning);
        }

        this.lobbyHeaderMixin_api.cashOut(
          this.$_lobbyHeaderMixin_getAccessToken,
          switchApp,
          this.$_lobbyHeaderMixin_handleCashoutResponse
        );
        this.$eventHub.$emit('loading', true);
      }
    },
    changeLang({ language }) {
      this.lang = language;
      this.$root.$i18n.set(language);
      this.changeLanguage({ language });
    },
    zeroBalanceActions() {
      this.clearPlayerBetslips();
      !this.lobbyHeaderMixin_zeroBalanceOnCashOutOrSwitchApp &&
        this.triggerInfoModal(infoModalMessages.liveDrawSessionEnd, null, true);
      this.$_lobbyHeaderMixin_resetAccessToken();
    },
    handleModalActiveEvent(isActive, callback) {
      !isActive && isFunction(callback) && callback();
    },
    openResponsibleGamingInfo() {
      const responsibleGamingModalMessage = this.isAllwynBrand
        ? infoModalScrollableMessages.allwynresponsibleGaming
        : infoModalScrollableMessages.responsibleGaming;
      this.$eventHub.$emit(modalEventConstants.OPEN.INFO_SCROLLABLE, responsibleGamingModalMessage);
    },
    toggleBalanceDisplay() {
      this.$_lobbyHeaderMixin_updateBalance();
      this.toggleBalanceVisibility();
    },
    goToLobby() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss-utils/common/variables';
@import '../../../scss-utils/fireblaze/colors';

.ssbt_lobby-header {
  max-width: 100% !important;
  min-height: $lobby-header-height;
  max-height: $lobby-header-height;

  &__navbar-logo-area {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__logo {
    &--powerspin {
      max-width: 60px;
      max-height: 60px;
      display: block;
      margin-top: -5px;
    }
    &--lobby {
      width: auto !important;
      padding-bottom: 0 !important;
      min-height: 50px;
      max-height: 50px;
      height: 50px;
    }
    &--allwyn {
      max-width: 110px;
      max-height: 55px;
    }
    &--kino {
      max-width: 110px;
      max-height: 60px;
    }
    &--eurojackpot {
      max-width: 110px;
      max-height: 60px;
    }
    &--eurojackpot-extra {
      width: 90px;
      height: 56px;
      padding-bottom: 5px;
    }
    &--fireblaze {
      width: 70px;
      height: 60px;
    }
    &--powerspin-videos {
      max-width: 60px;
      max-height: 50px;
    }
  }

  &__digital-assistant-barcode-error-universal {
    line-height: 16px;
  }

  #ssbt_cash_out {
    margin-top: 0.3rem;
  }

  #ssbt_countdown_time {
    margin-top: 0.2rem;
  }

  &__navbar {
    display: flex;
    align-items: center;
    min-height: $lobby-header-height;
    width: 100%;
    height: 60px;
    max-height: 75px;
    padding-top: 15px;
    &-responsible-gaming {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
    }
    &-cashout {
      width: 100px !important;
      &--disabled {
        opacity: 0.5;
      }
    }
    &-nav-right {
      flex-grow: 1;
      &--kino {
        display: flex;
        justify-content: flex-end;
        flex-grow: 1;
        align-self: center;
        > * {
          flex: none;
        }
      }

      justify-content: flex-end;
      &--fireblaze {
        flex: 1;
        align-items: center;
      }
    }
    &-eurojackpot-amount {
      margin-left: 60px;
      max-height: 45px;
      display: flex;
      align-items: center;
    }
    &-eurojackpot-info {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
      ::v-deep .ssbt-header-option-item {
        height: 50px;
      }
    }
    &-logo-area--fireblaze {
      justify-content: space-between;
      .ssbt-header-game-info {
        flex-direction: row;
      }
    }
  }

  &__help-section-controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    margin-left: auto;
    padding-top: 0;
    @media (max-width: 1200px) {
      gap: 10px;
    }
  }

  &__home {
    font-family: 'Roboto';
    color: white;
    font-weight: 900;
    &--center {
      margin-top: 6px;
      height: 60px;
    }
  }
  &__barcode-error-universal {
    font-size: 2rem;
  }

  &__digital-assistant-home-icon {
    color: white;
    text-align: 32px;
    text-transform: uppercase;
    &.ssbt-header-option-item {
      font-size: 14px;
      font-weight: 600px;
      font-family: 'Roboto Flex';
    }
  }

  &__cash-out-white-text {
    color: white !important;

    ::v-deep * {
      color: white !important;
    }
  }

  &--lobby,
  &--allwyn {
    background: white;
  }
  &--kino {
    background-color: #f5be20;
  }
  &--powerspin {
    background-color: #2e1e93;
  }
  &--fireblaze {
    background-color: $color-third-pink;
    .navbar {
      padding: 0 1em;
      .barcode-error {
        width: 160px;
      }
    }
  }
  &--eurojackpot {
    background-color: #f4d795;
    nav {
      .ssbt_lobby-header__navbar-eurojackpot-info {
        margin-top: 0;
      }
      #ssbt_cash_out {
        line-height: 25px;
      }
      #ssbt_return_to_lobby {
        line-height: 30px;
      }
    }
  }
  &--digital-assistant {
    height: 65px;
    width: 100%;
    background:
      linear-gradient(0deg, #003a78, #003a78),
      radial-gradient(95.47% 946.48% at 4.53% 50.77%, rgba(255, 255, 255, 0.41) 0%, rgba(22, 51, 122, 0.369) 100%);
    backdrop-filter: blur(7px);
    z-index: 2;
    &::before {
      content: '';
      position: absolute;
      top: -0.25rem;
      left: -0.25rem;
      right: -0.25rem;
      bottom: -0.25rem;
      z-index: -2;
      background: var(--header-background-gradient);
      backdrop-filter: blur(7px);
    }
    &-allwyn {
      background: #1d4757;
    }
  }
  &__navbar {
    &-responsible-gaming {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
    }
    &-cashout {
      width: 100px !important;
      &--disabled {
        opacity: 0.5;
      }
    }
    &-nav-right {
      flex-grow: 1;
      justify-content: flex-end;
      .ssbt_lobby-header--eurojackpot & {
        flex-grow: unset;
      }
      &--fireblaze {
        align-items: center;
      }
    }
    &-eurojackpot-amount {
      margin-left: 60px;
      max-height: 45px;
      display: flex;
      align-items: center;
    }
    &-eurojackpot-info {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
      ::v-deep .ssbt-header-option-item {
        height: 60px;
      }
    }
    &-logo-area--fireblaze {
      justify-content: space-between;
    }
  }
}

#ssbt_barcode_error_universal {
  line-height: 13px;
}

#ssbt_barcode_error {
  line-height: 13px;
}
</style>
