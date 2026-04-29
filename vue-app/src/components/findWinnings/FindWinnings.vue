<template>
  <div v-if="isVisible" id="winningsModal">
    <transition name="modal-fade">
      <div class="winningsModalBackdrop">
        <section :class="modalClasses">
          <div
            v-if="prizeCheck.isValid && prizeCheck.ticketStatus !== undefined && prizeCheck.ticketStatus !== null"
            id="modal_winnings"
            class="p-3"
          >
            <WinningScreen
              v-if="isWinningTicket"
              @close="closeFindWinnings"
              :getNetAmount="getNetAmount"
              :getGrossAmount="getGrossAmount"
              :getTaxAmount="getTaxAmount"
              :hasFutureDraws="hasFutureDraws"
              :isSpecialWinnings="isSpecialWinnings"
              :isHighWinnings="isHighWinnings"
              :isPrinterAvailable="isPrinterAvailable"
              :canRollover="canRollover"
              :isRolloverAvailable="isRolloverAvailable"
              @rollover="rollover(false)"
              :isRolloverAndReplayAvailable="isRolloverAndReplayAvailable"
              @rollover-and-replay="rollover(true)"
              :canReplay="canReplay"
              @replay="replay"
              :loadingDrawInfo="loadingDrawInfo"
              :showTimeLeftToEnterTimeFrame="showTimeLeftToEnterTimeFrame"
              :timeLeftToEnterTimeFrame="timeLeftToEnterTimeFrame"
              :shouldEnableCountdownComponent="shouldEnableCountdownComponent"
              :timeToNextDraw="timeToNextDraw"
              @countdown-progress="handleCountdownProgress"
              @count-down-end="onCountDownEnd"
              :isRolloverAndInsertBetslipToSessionAvailable="isRolloverAndInsertBetslipToSessionAvailable"
              :isInsertBetslipToSessionButtonDisabled="isInsertBetslipToSessionButtonDisabled"
              @rollover-add-ticket-to-bucket="rolloverAndAddToPlayerBetslipSession"
              :shouldDisplayButtons="footerButtonsVisible"
              :loading="loading"
              :isSystem="kinoSystemTicketMixin_isSystem"
              :game-type="scannedGameType"
            />
            <div v-else class="row">
              <div class="col-12 text-center">
                <div class="fwCloseButtonRow">
                  <button
                    type="button"
                    class="fwCloseButton"
                    @click="closeFindWinnings"
                    id="findWinningsCloseButton1"
                  ></button>
                </div>
                <h3 class="find-winnings-header">
                  {{ findWinningsHeader }}
                </h3>
                <div v-if="kinoSystemTicketMixin_isSystem" class="pb-4">{{ $t('kinoSystemMessage') }}</div>
                <loading :active="loading" v-bind="loadingConfig" class="position-relative" />
                <div v-if="showFooterButtons" class="find-winnings-modal-footer position-relative">
                  <slot name="footer">
                    <div class="action-buttons__container">
                      <div class="generic-action-buttons__container">
                        <button
                          v-if="isReplayAvailable"
                          id="replay"
                          type="button"
                          class="footerButtons"
                          @click="replay"
                          :disabled="!isPrinterAvailable"
                        >
                          {{ $t('replayWager') }}
                        </button>
                        <button
                          v-if="isBackAvailable"
                          id="rolloverNo"
                          type="button"
                          class="footerButtons"
                          @click="closeFindWinnings"
                        >
                          {{ $t('back') }}
                        </button>
                      </div>
                      <div v-if="isInsertBetslipToSessionAvailable" class="add-to-session-buttons__container">
                        <div class="add-to-session-buttons__header">
                          <template v-if="loadingDrawInfo">{{ $t('searchingCurrentDrawInfo') }}</template>
                          <template v-if="showTimeLeftToEnterTimeFrame"
                            >{{ $t('addBetslipToSessionAvailableIn') }} {{ timeLeftToEnterTimeFrame }}</template
                          >
                          <countdown
                            v-if="shouldEnableCountdownComponent"
                            ref="countdown"
                            :end-time="timeToNextDraw"
                            @process="handleCountdownProgress"
                            @finish="onCountDownEnd"
                          />
                        </div>
                        <div class="add-to-session-buttons__items">
                          <button
                            id="addToSession"
                            type="button"
                            class="footerButtons"
                            @click="addToPlayerBetslipSession"
                            :disabled="isInsertBetslipToSessionButtonDisabled"
                          >
                            <loading class="p-2" :active.sync="loadingDrawInfo" v-bind="spinnerConfig"></loading>
                            {{ $t('addWagerToSession') }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </slot>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="prizeCheck.error" id="modal_winnings_error" class="p-3">
            <div class="row">
              <div class="fwCloseButtonRow">
                <button
                  type="button"
                  class="fwCloseButton"
                  @click="closeFindWinnings"
                  id="findWinningsCloseButton2"
                ></button>
              </div>
              <div class="col-12 text-center">
                <div id="error_message" class="winningsMessage">
                  <p>{{ $t('findWinnings.errorOccurred') }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
import { faCoins } from '@fortawesome/fontawesome-free-solid';
import to from 'await-to-js';
import get from 'lodash/get';
import moment from 'moment';
import numeral from 'numeral';
import { ifElse, lte } from 'ramda/es';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapActions, mapGetters } from 'vuex';
import { FW_LOADING_CONFIG, FW_SPINNER_CONFIG } from '../../config/loaderConfigs';
import EventSenderService from '../../handler/EventSenderService';
import EventTypes from '../../handler/EventTypes';
import KinoSystemTicketMixin from '../../mixins/KinoSystemTicketMixin';
import configurationModuleTypes from '../../store/modules/ConfigurationStoreModule/types';
import playerSessionTypes from '../../store/modules/PlayerBetslipsSessionModule/types';
import moduleTypes from '../../store/modules/types';
import Constants from '../../util/Constants';
import { logToMainProcess } from '../../util/LoggerService';
import modalEventConstants from '../../util/modalEventConstants';
import NextDrawInfoService from '../../util/NextDrawInfoService';
import WinningScreen from './WinningScreen.vue';
import eventHubConstants from '../../constants/eventHub';

const GAMETYPE_TO_ROUTE = {
  [Constants.GENERAL_GAME_TYPES.KINO]: Constants.ROUTE_NAMES.KINO,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: Constants.ROUTE_NAMES.POWERSPIN,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: Constants.ROUTE_NAMES.EUROJACKPOT,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: Constants.ROUTE_NAMES.FIREBLAZE,
};

const GAMES_WITH_LIVE_DRAW = [Constants.GENERAL_GAME_TYPES.KINO, Constants.GENERAL_GAME_TYPES.POWERSPIN];

const GAME_TO_THEME_POSTFIX = {
  [Constants.GENERAL_GAME_TYPES.KINO]: 'kino',
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: 'powerspin',
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: 'eurojackpot',
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: 'fireblaze',
};

const MY_SSBT_GAME_TYPES = ['POWERSPIN', 'KINO'];

export default {
  name: 'FindWinnings',
  mixins: [KinoSystemTicketMixin],
  components: {
    Loading,
    WinningScreen,
  },
  data() {
    return {
      prizeCheck: null,
      isVisible: false,
      isPrinterAvailable: false,
      footerButtonsVisible: false,
      autoCloseFindWinningsTimer: null,
      isInsertBetslipToSessionInTimeFrame: false,
      timeLeftToEnterTimeFrame: '',
      timeToNextDraw: 0,
      loadingDrawInfo: false,
      spinnerConfig: FW_SPINNER_CONFIG,
      loadingConfig: FW_LOADING_CONFIG,
      routerName: '',
    };
  },
  created() {
    this.$eventHub.$on('openFindWinnings', this.showFindWinnings);
    this.$eventHub.$on(modalEventConstants.CLOSE.ALL_MODALS, this.closeFindWinnings);
    if (this.getConfiguration.IPC_RENDERER_ENABLED) {
      this.$eventHub.$on('printerAvailable', (isAvailable) => {
        this.isPrinterAvailable = isAvailable;
      });
    }
    this.$eventHub.$on(eventHubConstants.FIND_WINNINGS_WAGER_DETAILS, this.getWagerHandler);
  },
  beforeDestroy() {
    this.$eventHub.$off('openFindWinnings');
    this.$eventHub.$off(modalEventConstants.CLOSE.ALL_MODALS);
    this.$eventHub.$off('printerAvailable');
    this.$eventHub.$off(eventHubConstants.FIND_WINNINGS_WAGER_DETAILS);
    this.clearAutoCloseFindWinningsTimer();
    this.initBeforeGetDrawInfo();
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      setNextDrawIdForImportedBetslip: playerSessionTypes.actions.SET_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP,
      clearNextDrawIdForImportedBetslip: playerSessionTypes.actions.CLEAR_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP,
      disableLiveDrawScreen: playerSessionTypes.actions.DISABLE_LIVE_DRAW_SCREEN,
    }),
    checkAndReturnValue(value, tier) {
      let ret = '*****';
      if (tier !== 'special') {
        ret = numeral(value).format('0,0.00');
      }
      return ret;
    },
    disableCountDownComponent() {
      this.timeToNextDraw = 0;
    },
    enableLoadingDrawInfo() {
      this.loadingDrawInfo = true;
    },
    disableLoadingDrawInfo() {
      this.loadingDrawInfo = false;
    },
    disableIsInsertBetslipToSessionInTimeFrame() {
      this.isInsertBetslipToSessionInTimeFrame = false;
    },
    enableIsInsertBetslipToSessionInTimeFrame() {
      this.isInsertBetslipToSessionInTimeFrame = true;
    },
    checkIfInTime({ leftTime }) {
      return lte(leftTime, this.enableBetslipImportBeforeNextDrawMillis);
    },
    inTimeHandler() {
      !this.isInsertBetslipToSessionInTimeFrame && this.enableIsInsertBetslipToSessionInTimeFrame();
    },
    calcTimeLeftToEnterTimeFrame({ leftTime }) {
      this.timeLeftToEnterTimeFrame = moment(leftTime - this.enableBetslipImportBeforeNextDrawMillis).format('mm:ss');
    },
    handleCountdownProgress({ timeObj: { leftTime } = {} }) {
      ifElse(this.checkIfInTime, this.inTimeHandler, this.calcTimeLeftToEnterTimeFrame)({ leftTime });
    },
    onCountDownEnd() {
      this.initBeforeGetDrawInfo();
    },
    setTimeToNextDraw(timeToNextDraw) {
      this.timeToNextDraw = timeToNextDraw;
    },
    initBeforeGetDrawInfo() {
      this.disableCountDownComponent();
      this.disableIsInsertBetslipToSessionInTimeFrame();
      this.timeLeftToEnterTimeFrame = '';
    },
    async getDrawInfo() {
      this.enableLoadingDrawInfo();
      this.initBeforeGetDrawInfo();
      this.clearNextDrawIdForImportedBetslip();
      const { timeToNextDraw = 0, nextDrawId = 0 } = await NextDrawInfoService.getNextDraw({
        retryConfig: { firstRequestDelay: 0, maxRetries: 2 },
        gameType: this.prizeCheck?.ticketStatus.ticket.gameType,
      });
      this.setTimeToNextDraw(timeToNextDraw);
      this.setNextDrawIdForImportedBetslip(nextDrawId);
      this.disableLoadingDrawInfo();
    },
    async showFindWinnings(prizeCheck) {
      this.$eventHub.$emit('findWinningsActive', true);
      if (this.getConfiguration.IPC_RENDERER_ENABLED) {
        const [err, isPrinterStatusValid] = await to(
          EventSenderService.sendSyncRequest(EventTypes.PRINTER_STATUS_EVENT_TYPE)
        );
        if (!err) {
          this.isPrinterAvailable = isPrinterStatusValid;
        } else {
          logToMainProcess('SHOW_FIND_WINNINGS_ERROR', err);
        }
      }
      const validGameTypes = this.getConfiguration.DIGITAL_ASSISTANT.DIGITAL_ASSISTANT_ENABLED
        ? MY_SSBT_GAME_TYPES
        : Constants.SSBT_GAME_TYPES;
      this.footerButtonsVisible =
        (Object.values(validGameTypes).includes(prizeCheck.ticketStatus.ticket.gameType) ||
        prizeCheck.ticketStatus.ticket.status === Constants.FIND_WINNINGS.TICKET_STATUS.BLOCKED ||
        prizeCheck.ticketStatus.ticket.status === Constants.FIND_WINNINGS.TICKET_STATUS.CANCELLED) &&
        prizeCheck.ticketStatus.ticket.status !== Constants.FIND_WINNINGS.TICKET_STATUS.COPY &&
        prizeCheck.ticketStatus.ticket.status !== Constants.FIND_WINNINGS.TICKET_STATUS.COPY_CLAIMED;
      this.isVisible = true;
      this.prizeCheck = prizeCheck;
      this.routerName = GAMETYPE_TO_ROUTE[prizeCheck.ticketStatus.ticket?.gameType] || Constants.ROUTE_NAMES.LOBBY;
      this.triggerAutoCloseFindWinningsTimer();
      this.checkAndTriggerGetWager();
      this.isInsertBetslipToSessionAvailable &&
        Object.values(GAMETYPE_TO_ROUTE).includes(this.routerName) &&
        this.getDrawInfo();
    },
    checkAndTriggerGetWager() {
      this.footerButtonsVisible &&
        this.isValidTicket &&
        this.$_kinoSystemTicketMixin_getWager({ wagerId: this.getSerialNumber });
    },
    getWagerHandler({ gameType = '' } = {}) {
      if (gameType === this.prizeCheck.ticketStatus.ticket?.gameType) return;
      this.prizeCheck.ticketStatus.ticket.gameType = gameType;
      this.routerName = GAMETYPE_TO_ROUTE[this.prizeCheck.ticketStatus.ticket.gameType] || Constants.ROUTE_NAMES.LOBBY;
      this.isInsertBetslipToSessionAvailable &&
        Object.values(GAMETYPE_TO_ROUTE).includes(this.routerName) &&
        this.getDrawInfo();
    },
    closeFindWinnings() {
      this.isVisible = false;
      this.prizeCheck = null;
      this.clearAutoCloseFindWinningsTimer();
      this.initBeforeGetDrawInfo();
      this.$_kinoSystemTicketMixin_reset();
      this.$eventHub.$emit('findWinningsActive', false);
    },
    rollover(doReplay = false) {
      this.$eventHub.$emit('rollover', this.prizeCheck.ticketStatus, doReplay);
      this.closeFindWinnings();
    },
    replay() {
      this.inLobby || this.$route.name !== this.routerName
        ? this.$router.push({ name: this.routerName, params: { wagerId: this.getSerialNumber } })
        : this.$eventHub.$emit('replayWager', { wagerId: this.getSerialNumber });
      if (this.getIsActiveLiveDrawScreen) {
        this.disableLiveDrawScreen();
      }
      this.closeFindWinnings();
    },
    addToSession({ wagerId, callback }) {
      this.$eventHub.$emit('getWager', wagerId, true);
      callback();
    },
    addToSessionFromLobby({ wagerId, callback }) {
      this.$router.push(
        {
          name: this.routerName,
          params: { addWagerToPlayerBetslipSession: true, wagerId },
        },
        () => callback()
      );
    },
    addToPlayerBetslipSession({ callback = this.closeFindWinnings }) {
      ifElse(
        () => this.inLobby || this.shouldRedirect,
        this.addToSessionFromLobby,
        this.addToSession
      )({ wagerId: this.getSerialNumber, callback });
    },
    rolloverAndAddToPlayerBetslipSession() {
      this.addToPlayerBetslipSession({ callback: this.rollover });
    },
    triggerAutoCloseFindWinningsTimer() {
      this.clearAutoCloseFindWinningsTimer();
      this.autoCloseFindWinningsTimer = setTimeout(this.closeFindWinnings, Constants.FIND_WINNINGS.AUTO_CLOSE_TIMEOUT);
    },
    clearAutoCloseFindWinningsTimer() {
      clearTimeout(this.autoCloseFindWinningsTimer);
    },
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getIsNotBetslipInSession: playerSessionTypes.getters.GET_IS_NOT_BETSLIP_IN_SESSION,
      getIsActiveLiveDrawScreen: playerSessionTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
      getBrandName: configurationModuleTypes.getters.GET_BRAND_NAME,
    }),
    shouldRedirect() {
      const gameTypeRoute = GAMETYPE_TO_ROUTE[this.prizeCheck?.ticketStatus.ticket.gameType];
      return gameTypeRoute && this.$route.name !== gameTypeRoute;
    },
    loading() {
      return this.kinoSystemTicketMixin_loading;
    },
    scannedGameType() {
      return this.prizeCheck?.ticketStatus.ticket.gameType;
    },
    modalClasses() {
      return {
        winningTicketModal: this.isWinningTicket,
        [`winningTicketModal--${GAME_TO_THEME_POSTFIX[this.scannedGameType]}`]: this.isWinningTicket,
        winningsModal: !this.winningsModal,
      };
    },
    showFooterButtons() {
      return this.footerButtonsVisible && !this.loading;
    },
    getSerialNumber() {
      const { ticketStatus: { ticket: { serialNumber } = {} } = {} } = this.prizeCheck || {};
      return serialNumber;
    },
    enableBetslipImportBeforeNextDrawMillis() {
      return this.getConfiguration.KINO.LIVE_DRAW.ENABLE_BETSLIP_IMPORT_BEFORE_NEXT_DRAW_MILLIS;
    },
    inLobby() {
      return this.$route.name === Constants.ROUTE_NAMES.LOBBY;
    },
    shouldEnableCountdownComponent() {
      return this.timeToNextDraw > 0;
    },
    isInsertBetslipToSessionAvailable() {
      return (
        this.prizeCheck &&
        this.prizeCheck.ticketStatus?.ticket.status !== Constants.FIND_WINNINGS.TICKET_STATUS.PENDING_PRIZE_BREAKDOWN &&
        this.isValidTicket &&
        GAMES_WITH_LIVE_DRAW.includes(this.prizeCheck.ticketStatus?.ticket.gameType) &&
        this.hasRemainingDraws &&
        this.getIsNotBetslipInSession({ serialNumber: this.getSerialNumber }) &&
        !this.kinoSystemTicketMixin_isSystem
      );
    },
    isRolloverAndInsertBetslipToSessionAvailable() {
      return this.canRollover && this.isInsertBetslipToSessionAvailable;
    },
    isInsertBetslipToSessionButtonDisabled() {
      return !this.isPrinterAvailable || !this.isInsertBetslipToSessionInTimeFrame || this.loadingDrawInfo;
    },
    isRolloverAvailable() {
      return this.canRollover;
    },
    isRolloverAndReplayAvailable() {
      return this.canRollover && !this.kinoSystemTicketMixin_isSystem;
    },
    isReplayAvailable() {
      return this.canReplay;
    },
    isBackAvailable() {
      return this.isValidTicket;
    },
    canRollover() {
      const { ticketStatus: { tier, ticket: { status } = {} } = {} } = this.prizeCheck || {};
      return (
        Constants.FIND_WINNINGS.TIER.REGULAR_LIST.includes(tier) && status === Constants.FIND_WINNINGS.TICKET_STATUS.WON
      );
    },
    isHighWinnings() {
      const { ticketStatus: { tier } = {} } = this.prizeCheck || {};
      return this.prizeCheck && Constants.FIND_WINNINGS.TIER.SPECIAL_LIST[0] === tier;
    },
    isSpecialWinnings() {
      const { ticketStatus: { tier } = {} } = this.prizeCheck || {};
      return this.prizeCheck && Constants.FIND_WINNINGS.TIER.SPECIAL_LIST[1] === tier;
    },
    canReplay() {
      return this.isValidTicket && !this.kinoSystemTicketMixin_isSystem;
    },
    isValidTicket() {
      return this.prizeCheck.ticketStatus.ticket.status !== Constants.FIND_WINNINGS.TICKET_STATUS.INVALID;
    },
    getNetAmount() {
      return this.checkAndReturnValue(this.prizeCheck.ticketStatus.ticket.net, this.prizeCheck.ticketStatus.tier);
    },
    getGrossAmount() {
      return this.checkAndReturnValue(this.prizeCheck.ticketStatus.ticket.gross, this.prizeCheck.ticketStatus.tier);
    },
    getTaxAmount() {
      return this.checkAndReturnValue(this.prizeCheck.ticketStatus.ticket.tax, this.prizeCheck.ticketStatus.tier);
    },
    coinsIcon() {
      return faCoins;
    },
    isWinningTicket() {
      return get(this.prizeCheck, 'ticketStatus.ticket.status', '') === Constants.FIND_WINNINGS.TICKET_STATUS.WON;
    },
    hasRemainingDraws() {
      return this.prizeCheck.ticketStatus.ticket.remainingDraws > 0;
    },
    hasFutureDraws() {
      return this.hasRemainingDraws && this.isWinningTicket;
    },
    showTimeLeftToEnterTimeFrame() {
      return this.shouldEnableCountdownComponent && this.isInsertBetslipToSessionButtonDisabled;
    },
    findWinningsHeader() {
      if (
        this.getBrandName === Constants.BRAND_NAMES.ALLWYN &&
        this.prizeCheck.ticketStatus.ticket.status === Constants.FIND_WINNINGS.TICKET_STATUS.COPY
      )
        return this.$t('findWinnings.header.COPY_ALLWYN', {
          amount: this.getNetAmount,
        });
      return this.$t('findWinnings.header.' + this.prizeCheck.ticketStatus.ticket.status, {
        amount: this.getNetAmount,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss-utils/powerspin/colors';
@import '../../scss-utils/eurojackpot/mixins';

.winningsModalBackdrop {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.winningsModal {
  justify-items: center;
  text-align: center;
  width: 40%;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  background: linear-gradient(90deg, #0c2442 0%, #0a3b51 100%);
  box-shadow: 0 0 10px 0 #000;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}
.find-winnings-header {
  margin-bottom: 2.5rem;
}
.fwCloseButtonRow {
  height: 33px !important;
  width: 100% !important;
}
.fwCloseButton {
  float: right;
  width: 40px;
  height: 43px;
  background: url(../../assets/close-white.png) transparent no-repeat center;
  background-size: 27px;
  border: 0;
  cursor: pointer;
  z-index: 99;
  margin: -10px 0 0 0;
  padding: 1px;
  right: 0.3em;
  vertical-align: top;
}
.winningsMessage {
  font-size: 20px;
  font-weight: bold;
}
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.action-buttons__container,
.add-to-session-buttons__container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.add-to-session-buttons__items,
.generic-action-buttons__container {
  display: flex;
  justify-content: stretch;
}

.add-to-session-buttons__header {
  text-align: center;
}

.find-winnings-modal-footer {
  margin: 0 auto;
  padding: 0;
  align-items: center;
  justify-content: center;
  display: flex;
}

.footerButtons {
  margin-right: 5px;
  border: 1px solid #fff;
  background: transparent;
  color: whitesmoke;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  height: 60px !important;
  margin-top: 2px;
  margin-bottom: 2px;
  border-radius: 5px;
  flex: 1;
  position: relative;
}

#rolloverYes:disabled,
.footerButtons:disabled {
  opacity: 0.3;
}

.winningTicketModal {
  width: 55%;
  justify-items: center;
  text-align: center;
  background-size: cover;
  box-shadow: 0 0 10px 0 #000;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  &--kino {
    background: #f5b327 url('../../assets/winning-modal-background.jpg') no-repeat;
    color: black;
  }

  &--powerspin {
    background: $gradient-dark-blue;
    color: white;
  }

  &--eurojackpot {
    @include eurojackpot-modal-background;
    color: white;
  }

  &--powerspin {
    background: $gradient-dark-blue;
    color: white;
  }
}
</style>
