<template>
  <div id="app" @click="clickEvent" :class="gameTypeClass">
    <div v-if="isLoading" class="content-mask"></div>
    <MaintenancePanel></MaintenancePanel>
    <FindWinnings></FindWinnings>
    <InfoModal></InfoModal>
    <OptionDialog></OptionDialog>
    <InfoModalScrollable></InfoModalScrollable>
    <HowToPlayModal></HowToPlayModal>
    <SelectGameModal></SelectGameModal>
    <MaxCapModal></MaxCapModal>
    <LobbyHeader></LobbyHeader>
    <OldPowerspinTicketModal></OldPowerspinTicketModal>
    <router-view></router-view>
    <span class="terminal-info"
      >Version:&ensp;{{ appVersion }}-{{ electronAppVersion }}&ensp;SSBT&ensp;ID: {{ terminalId }}</span
    >
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import to from 'await-to-js';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bPopover from 'bootstrap-vue/es/components/popover/popover';
import bTooltip from 'bootstrap-vue/es/components/tooltip/tooltip';
import HttpStatus from 'http-status';
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import PamApi from './apis/pam-api';
import PamApiElectron from './apis/pam-api-electron';
import FindWinnings from './components/findWinnings/FindWinnings.vue';
import LobbyHeader from './components/lobby/lobbyHeader/LobbyHeader.vue';
import MaintenancePanel from './components/maintenancePanel/MaintenancePanel.vue';
import HowToPlayModal from './components/modals/HowToPlayModal.vue';
import InfoModal from './components/modals/InfoModal.vue';
import InfoModalScrollable from './components/modals/InfoModalScrollable.vue';
import MaxCapModal from './components/modals/MaxCapModal.vue';
import OldPowerspinTicketModal from './components/modals/OldPowerspinTicketModal.vue';
import OptionDialog from './components/modals/OptionDialog.vue';
import SelectGameModal from './components/modals/SelectGameModal.vue';
import eventHubConstants from './constants/eventHub';
import EventHandlerService from './handler/EventHandlerService';
import EventSenderService from './handler/EventSenderService';
import EventTypes from './handler/EventTypes';
import RequestType from './handler/RequestTypes';
import ModalUsageMixin from './mixins/ModalUsageMixin';
import PrintTemplate from './model/PrintTemplate';
import PrizeCheck from './model/PrizeCheck';
import TicketStatus from './model/TicketStatus';
import configurationModuleTypes from './store/modules/ConfigurationStoreModule/types';
import EurojackpotStoreModuleTypes from './store/modules/EurojackpotStoreModule/types';
import languageStoreModuleTypes from './store/modules/LanguageStoreModule/types';
import playerSessionTypes from './store/modules/PlayerBetslipsSessionModule/types';
import serviceCheckStoreModuleTypes from './store/modules/ServiceCheckStoreModule/types';
import sessionStoreModuleTypes from './store/modules/SessionStoreModule/types';
import moduleTypes from './store/modules/types';
import Constants from './util/Constants';
import infoModalMessages from './util/infoModalMessages';
import { logToMainProcess } from './util/LoggerService';
import modalEventConstants from './util/modalEventConstants';
import Utilities from './util/Utilities';
import gtmEvents from '@/constants/gtmEvents';
import initializeIdleTracking from './util/idle';
import gtag from '@/util/gtag';

Vue.component('b-modal', bModal);
Vue.use(bPopover);

const GAMETYPES_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: Constants.ROUTE_NAMES.POWERSPIN,
  [Constants.GENERAL_GAME_TYPES.KINO]: Constants.ROUTE_NAMES.KINO,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: Constants.ROUTE_NAMES.EUROJACKPOT,
};
export default {
  name: 'app',
  components: {
    OldPowerspinTicketModal,
    MaintenancePanel,
    LobbyHeader,
    FindWinnings,
    InfoModal,
    OptionDialog,
    InfoModalScrollable,
    HowToPlayModal,
    SelectGameModal,
    MaxCapModal,
    PrizeCheck,
    bPopover,
    bTooltip,
  },
  mixins: [ModalUsageMixin],
  data() {
    return {
      prizeCheck: null,
      appVersion: '',
      electronAppVersion: '',
      bg: 'primary',
      isModalActive: false,
      isFindWinningsActive: false,
      timer: null,
      isLoading: false,
      api: null,
      printTemplate: new PrintTemplate(),
    };
  },
  created() {
    if (this.getConfiguration.IPC_RENDERER_ENABLED) {
      this.api = new PamApiElectron(this.getConfiguration);
      this.$eventHub.$on(RequestType.FIND_WINNINGS, this.handleFindWinningsResponse);
      this.$eventHub.$on(RequestType.GET_ACCESS_TOKEN_FOR_FIND_WINNINGS, this.handleGetAccessTokenResponse);
      this.electronAppVersion = this.getConfiguration.ELECTRON_APP_VERSION;
    } else {
      this.api = new PamApi(this.getConfiguration);
    }

    if (this.getConfiguration.DIGITAL_ASSISTANT.DIGITAL_ASSISTANT_ENABLED) {
      gtag.sendEvent(gtmEvents.SSBT_LOTTERY_APPLICATION_STARTED);
    }

    logToMainProcess('EJP_USING_SALES_CLOSE_SETTINGS', this.getConfiguration?.EUROJACKPOT?.SALES_OPEN || {});
    this.appVersion = this.getConfiguration.APP_VERSION;

    this.setupEventHandlers();

    this.$eventHub.$on('goToLobby', this.goToLobby);
    this.$eventHub.$on('switchToApplicationOk', this.switchApplication);
    this.$eventHub.$on(modalEventConstants.GENERIC.MODAL_ACTIVE, (isActive) => {
      this.isModalActive = isActive;
    });
    this.$eventHub.$on('findWinningsActive', (isActive) => {
      this.isFindWinningsActive = isActive;
    });
    this.$eventHub.$on('loading', (isLoading) => {
      this.isLoading = isLoading;
    });
    this.$eventHub.$on('print', this.sendToPrinter);
    this.getEurojackpotDrawInfo();
  },
  mounted() {
    this.$eventHub.$emit(eventHubConstants.GET_TOKEN_AFTER_SWITCH);

    if (this.digitalAssistantConfiguration.DIGITAL_ASSISTANT.DIGITAL_ASSISTANT_ENABLED) {
      gtag.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);
      initializeIdleTracking();
    }
  },
  beforeDestroy() {
    this.$eventHub.$off('switchToApplicationOk');
    this.$eventHub.$off(modalEventConstants.GENERIC.MODAL_ACTIVE);
    this.$eventHub.$off('findWinningsActive');
    this.$eventHub.$off('loading');
    this.$eventHub.$off('print');
    clearTimeout(this.timer);
  },
  methods: {
    ...mapActions(moduleTypes.CONFIGURATION_STORE_MODULE, {
      setConfiguration: configurationModuleTypes.actions.SET_CONFIGURATION,
      setVoucher: configurationModuleTypes.actions.SET_VOUCHER,
    }),
    ...mapActions(moduleTypes.SERVICE_CHECK_STORE_MODULE, {
      changeServiceAvailability: serviceCheckStoreModuleTypes.actions.CHANGE_SERVICE_AVAILABILITY,
    }),
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setAccessToken: sessionStoreModuleTypes.actions.SET_ACCESS_TOKEN,
      setSsbtId: sessionStoreModuleTypes.actions.SET_SSBT_ID,
    }),
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      disableLiveDrawScreen: playerSessionTypes.actions.DISABLE_LIVE_DRAW_SCREEN,
    }),
    ...mapActions(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      getEurojackpotDrawInfo: EurojackpotStoreModuleTypes.actions.GET_DRAW_INFO,
      clearEurojackpotTimer: EurojackpotStoreModuleTypes.actions.CLEAR_TIMER,
    }),
    setupEventHandlers() {
      if (this.getConfiguration.IPC_RENDERER_ENABLED) {
        const eventHandlers = [];

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.SERVICE_STATUS_CHECK, (serviceStatus) => {
            this.changeServiceAvailability({ serviceStatus });
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.FIND_WINNINGS_EVENT_TYPE, (data) => {
            this.doFindWinnings(data);
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.SCAN_VOUCHER_EVENT_TYPE, (data) => {
            if (!this.isModalActive && !this.isFindWinningsActive && !this.getMaintenance) {
              this.$eventHub.$emit('voucherScanned', data);
            }
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.SCAN_PROMOTION_VOUCHER_EVENT_TYPE, (data) => {
            if (!this.isModalActive && !this.isFindWinningsActive && !this.getMaintenance) {
              this.$eventHub.$emit('promotionVoucherScanned', data);
            }
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.SWITCH_APPLICATION, (data) => {
            !this.isFindWinningsActive && this.$eventHub.$emit('switchToApplicationOk');
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.BARCODE_READER_STATUS_CHANGE, (data) => {
            this.$eventHub.$emit('barcodeStatusChange', data);
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.PRINTER_STATUS_EVENT_TYPE, (data) => {
            this.$eventHub.$emit('printerAvailable', data);
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.LIVE_DRAW_IFRAME_LOAD_FAILED, (data) => {
            this.triggerInfoModal(infoModalMessages.liveDrawUnavailableWarning, this.disableLiveDrawScreen, true);
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.SCAN_SPORTS_VOUCHER_EVENT_TYPE, (data) => {
            let ev;
            if (!this.isModalActive && !this.isFindWinningsActive) {
              if (this.$router.currentRoute.name === Constants.ROUTE_NAMES.LOBBY) {
                ev = infoModalMessages.switchApplicationWarningLobby;
              } else {
                ev = infoModalMessages.switchApplicationWarningInGame;
              }
              this.$eventHub.$emit(modalEventConstants.OPEN.INFO, ev);
            }
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.SCAN_SPORTS_TICKET_EVENT_TYPE, (data) => {
            let ev;
            if (!this.isModalActive && !this.isFindWinningsActive) {
              if (this.$router.currentRoute.name === Constants.ROUTE_NAMES.LOBBY) {
                ev = infoModalMessages.switchApplicationWarningLobby;
              } else {
                ev = infoModalMessages.switchApplicationWarningInGame;
              }
              this.$eventHub.$emit(modalEventConstants.OPEN.INFO, ev);
            }
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.SCAN_INVALID_BARCODE_EVENT_TYPE, (data) => {
            if (this.isFindWinningsActive) {
              this.$eventHub.$emit('closeFindWinnings');
            }
            this.$eventHub.$emit(modalEventConstants.OPEN.INFO, infoModalMessages.invalidBarcode);
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.SCAN_OPAP_BET_CARD_EVENT_TYPE, (data) => {
            this.$eventHub.$emit(modalEventConstants.OPEN.INFO, infoModalMessages.opapBetCardWarning);
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.SEND_REQUEST, (requestType, response, ...additionalArgs) => {
            this.$eventHub.$emit(requestType, response, ...additionalArgs);
          })
        );

        eventHandlers.push(
          EventTypes.prepareEventHandlerObject(EventTypes.WINDOW_SHOWN, (data) => {
            this.$eventHub.$emit(eventHubConstants.GET_TOKEN_AFTER_SWITCH);
            this.getEurojackpotDrawInfo();
          })
        );

        const eventHandlerService = new EventHandlerService();
        eventHandlerService.initializeEventHandlers(eventHandlers);
      }
    },
    async sendToPrinter(printType, data) {
      if (this.getConfiguration.IPC_RENDERER_ENABLED) {
        const [err, terminalId] = await to(EventSenderService.sendSyncRequest(EventTypes.TERMINAL_NAME_EVENT_TYPE));
        if (!err) {
          const selectedLanguage = this.getLanguage;
          data.brandName = this.getBrandName;
          data.companyInfo = this.getConfiguration?.COMPANY_INFO;
          this.printTemplate.prepareTemplate(printType, data, terminalId, selectedLanguage).then((result) => {
            const base64 = result.canvas.toDataURL();
            EventSenderService.sendAsyncRequest(EventTypes.PRINT_EVENT_TYPE, base64);
            const outcomeType = data?.promotionOutcomes?.[0]?.outcomeType;
            if (outcomeType === Constants.PROMOTIONS_INSTANT_WIN_OUTCOME) {
              this.printTemplate
                .prepareTemplate(Constants.PRINT_TYPE.INSTANT_WIN_VOUCHER, data, terminalId, selectedLanguage)
                .then((secondReceipt) => {
                  const base64 = secondReceipt.canvas.toDataURL();
                  EventSenderService.sendAsyncRequest(EventTypes.PRINT_EVENT_TYPE, base64);
                });
            }
          });
        } else {
          logToMainProcess('SEND_TO_PRINTER_ERROR', err);
        }
      }
    },
    goToLobby() {
      this.$router.push({ name: Constants.ROUTE_NAMES.LOBBY, query: { shouldConfirm: 'false' } });
    },
    clickEvent(event) {
      this.$eventHub.$emit('clickEvent');
      this.initializeIdleTimer();
    },
    initializeIdleTimer() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (
          (this.$router.currentRoute.name === Constants.ROUTE_NAMES.KINO ||
            this.$router.currentRoute.name === Constants.ROUTE_NAMES.POWERSPIN) &&
          !this.getIsActiveLiveDrawScreen
        ) {
          this.$eventHub.$emit(modalEventConstants.CLOSE.ALL_MODALS);
          this.goToLobby();
        }
        this.initializeIdleTimer();
      }, this.getConfiguration.IDLE_TIME);
    },
    switchApplication(data) {
      this.clearEurojackpotTimer();
      if (this.getConfiguration.IPC_RENDERER_ENABLED) {
        this.triggerLogOut
          ? this.$eventHub.$emit(eventHubConstants.TRIGGER_LOGOUT, true, data)
          : EventSenderService.sendAsyncRequest(EventTypes.SWITCH_APPLICATION_ACK, data);
      }
    },
    doFindWinnings(barcode) {
      if (!this.isModalActive) {
        this.api.findWinnings(this.getAccessToken, this.terminalId, barcode, this.handleFindWinningsResponse);
      }
    },
    handleFindWinningsResponse(response, barcode) {
      if (response.success) {
        response.data.barcode = barcode;
        this.prizeCheck = new PrizeCheck(new TicketStatus(response.data));
        this.$eventHub.$emit('openFindWinnings', this.prizeCheck);
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        this.api.getAccessToken(
          this.terminalId,
          RequestType.GET_ACCESS_TOKEN_FOR_FIND_WINNINGS,
          this.handleGetAccessTokenResponse,
          barcode
        );
      } else if (response.status === HttpStatus.NOT_FOUND || response.status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        const serialNumber = Utilities.serialNumberFromBarcode(barcode);
        if (response.status === HttpStatus.NOT_FOUND) {
          this.prizeCheck = new PrizeCheck({
            ticket: {
              status: 'INVALID',
            },
          });
        } else if (response.data.errorId === 'BLOCKED_COUPON') {
          this.prizeCheck = new PrizeCheck({
            ticket: {
              status: 'BLOCKED',
              serialNumber,
            },
          });
        } else if (response.data.errorId === 'CANCELLED_COUPON') {
          this.prizeCheck = new PrizeCheck({
            ticket: {
              status: 'CANCELLED',
              serialNumber,
            },
          });
        } else if (response.data.errorId === 'SERVER_ERROR') {
          this.$eventHub.$emit(modalEventConstants.OPEN.INFO, infoModalMessages.operationFailed);
          return;
        } else {
          this.prizeCheck = new PrizeCheck(null, true);
        }
        this.$eventHub.$emit('openFindWinnings', this.prizeCheck);
      }
    },
    handleGetAccessTokenResponse(response, barcode) {
      if (response.success) {
        this.setAccessToken({ accessToken: response.data.access_token });
        this.doFindWinnings(barcode);
      }
    },
  },
  computed: {
    ...mapGetters(moduleTypes.LANGUAGE_STORE_MODULE, {
      getLanguage: languageStoreModuleTypes.getters.GET_LANGUAGE,
    }),
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getIsActiveLiveDrawScreen: playerSessionTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
      getBrandName: configurationModuleTypes.getters.GET_BRAND_NAME,
    }),
    ...mapGetters(moduleTypes.SERVICE_CHECK_STORE_MODULE, {
      getMaintenance: serviceCheckStoreModuleTypes.getters.GET_MAINTENANCE,
    }),
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      getAccessToken: sessionStoreModuleTypes.getters.GET_ACCESS_TOKEN,
      getIsZeroBalance: sessionStoreModuleTypes.getters.GET_IS_ZERO_BALANCE,
      getSsbtId: sessionStoreModuleTypes.getters.GET_SSBT_ID,
      getBalance: sessionStoreModuleTypes.getters.GET_BALANCE,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      digitalAssistantConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
    }),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: sessionStoreModuleTypes.state.GAME_TYPE,
    }),
    triggerLogOut() {
      return !this.getIsZeroBalance || !!this.getAccessToken;
    },
    terminalId() {
      return this.getSsbtId;
    },
    gameTypeClass() {
      return this.gameType ? `app--${GAMETYPES_MAPPER[this.gameType]}` : '';
    },
  },
};
</script>

<style lang="scss">
@import '../node_modules/vue-snotify/styles/material';
@import './assets/css/variables.css';
@import './scss-utils/powerspin/colors';
/* roboto-regular - greek_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src:
    local('Roboto'),
    local('Roboto-Regular'),
    url(../static/fonts/roboto-v18-greek_latin-regular.woff2) format('woff2'),
    /* Chrome 26+, Opera 23+, Firefox 39+ */ url(../static/fonts/roboto-v18-greek_latin-regular.woff) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-500 - greek_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  src:
    local('Roboto Medium'),
    local('Roboto-Medium'),
    url(../static/fonts/roboto-v18-greek_latin-500.woff2) format('woff2'),
    /* Chrome 26+, Opera 23+, Firefox 39+ */ url(../static/fonts/roboto-v18-greek_latin-500.woff) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* roboto-700 - greek_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src:
    local('Roboto Bold'),
    local('Roboto-Bold'),
    url(../static/fonts/roboto-v18-greek_latin-700.woff2) format('woff2'),
    /* Chrome 26+, Opera 23+, Firefox 39+ */ url(../static/fonts/roboto-v18-greek_latin-700.woff) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* roboto-900 - greek_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  src:
    local('Roboto Black'),
    local('Roboto-Black'),
    url(../static/fonts/roboto-v18-greek_latin-900.woff2) format('woff2'),
    /* Chrome 26+, Opera 23+, Firefox 39+ */ url(../static/fonts/roboto-v18-greek_latin-900.woff) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

@font-face {
  font-family: Roboto Flex;
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');
}

html,
body {
  /* background: radial-gradient(#0b263b, #0c354b); */
  font-family: 'Roboto', sans-serif !important;
  font-weight: 400;
  overflow-x: hidden;
  overflow-y: hidden;
  user-select: none;
  height: 100%;
  /*background: radial-gradient(#12576f, #156e8b);*/
}

.digital-assistant-font {
  font-family: Roboto Flex;
}

.margin-bottom {
  margin-bottom: 10px;
  height: 98%;
}

.max-width {
  width: 100%;
  padding: 0px;
}

.terminal-info {
  font-size: 10px;
  font-weight: 600;
  color: lightgray;
  position: fixed;
  bottom: 0;
  right: 9px;
  z-index: 999;
}

.content-mask {
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  display: flex;
  justify-content: center;
  align-items: center;
}

.snotify-rightTop {
  top: 60px;
}

.popover {
  border: 0px !important;
  background: transparent !important;
  top: 0px !important;
}

.popover > .arrow {
  display: none !important;
}

*:focus {
  outline: none !important;
}
.app {
  &--kino {
    height: 100%;
    .snotifyToast.snotify-simple {
      background-color: #f5bc25;
    }
    .snotifyToast.snotify-simple .snotifyToast__progressBar {
      background-color: #ffdc7e;
    }
    .snotifyToast.snotify-simple .snotifyToast__progressBar__percentage {
      background-color: #d29a00;
    }
    .live-draw-dialog__text {
      color: #133d53;
    }
    .snotifyToast.snotify-simple .snotifyToast__buttons button {
      border: 2px solid #133d53;
    }
    .snotifyToast__buttons button.live-draw-dialog__reject-button,
    .snotifyToast__buttons button.live-draw-dialog__reject-button:hover,
    .snotifyToast__buttons button.live-draw-dialog__reject-button:focus {
      background-color: #f5bc25;
      color: #133d53;
    }
    .snotifyToast__buttons button.live-draw-dialog__accept-button,
    .snotifyToast__buttons button.live-draw-dialog__accept-button:hover,
    .snotifyToast__buttons button.live-draw-dialog__accept-button:focus {
      background-color: #133d53;
    }
  }
  &--powerspin {
    height: 100%;
    .snotifyToast.snotify-simple {
      background-color: #2e1e93;
    }
    .snotifyToast.snotify-simple .snotifyToast__progressBar {
      background-color: #5136f9;
    }
    .snotifyToast.snotify-simple .snotifyToast__progressBar__percentage {
      background-color: #070a4e;
    }
    .live-draw-dialog__text {
      color: white;
    }
    .snotifyToast.snotify-simple .snotifyToast__buttons button {
      border: 2px solid #070a4e;
    }
    .snotifyToast__buttons button.live-draw-dialog__reject-button,
    .snotifyToast__buttons button.live-draw-dialog__reject-button:hover,
    .snotifyToast__buttons button.live-draw-dialog__reject-button:focus {
      background-color: transparent;
      color: white;
    }
    .snotifyToast__buttons button.live-draw-dialog__accept-button,
    .snotifyToast__buttons button.live-draw-dialog__accept-button:hover,
    .snotifyToast__buttons button.live-draw-dialog__accept-button:focus {
      background-color: #070a4e;
    }
  }
}

.video-container {
  background: linear-gradient(180deg, #0e4ae1 38.13%, #051658 100%);
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
