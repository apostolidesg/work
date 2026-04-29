import to from 'await-to-js';
import HttpStatus from 'http-status';
import { get } from 'lodash';
import { mapActions, mapGetters, mapState } from 'vuex';
import PromotionsApi from '../apis/promotions-api';
import eventHubConstants from '../constants/eventHub';
import EventSenderService from '../handler/EventSenderService';
import EventTypes from '../handler/EventTypes';
import RequestTypes from '../handler/RequestTypes';
import Betslip from '../model/Betslip';
import PowerspinBetslip from '../model/powerspin/Betslip';
import EurojackpotBetslip from '../model/eurojackpot/Betslip';
import FireblazeBetslip from '../model/fireblaze/Betslip';
import configurationStoreModuleTypes from '../store/modules/ConfigurationStoreModule/types';
import playerSessionTypes from '../store/modules/PlayerBetslipsSessionModule/types';
import powerspinBetslipStoreModuleTypes from '../store/modules/PowerspinBetslipStoreModule/types';
import sessionStoreModuleTypes from '../store/modules/SessionStoreModule/types';
import moduleTypes from '../store/modules/types';
import Constants from '../util/Constants';
import eurojackpotGameStoreModuleTypes from '../store/modules/EurojackpotStoreModule/types';
import fireblazeGameStoreModuleTypes from '../store/modules/FireblazeStoreModule/types';
import PamApiElectron from '../apis/pam-api-electron';
import PamApi from '../apis/pam-api';
import EventHubTypes from '../util/EventHubTypes';
import infoModalMessages from '../util/infoModalMessages';
import { logToMainProcess } from '../util/LoggerService';
import modalEventConstants from '../util/modalEventConstants';
import promotionVoucherUtilities from '../util/promotionVoucherUtilities';
import ModalUsageMixin from './ModalUsageMixin';
import { HALApplicationTypes } from '@/constants/HALApplicationTypes';

const SUCCESSFUL_BET_MSG_WRAPPER = {
  [Constants.GENERAL_GAME_TYPES.KINO]: infoModalMessages.kinoInformativeNextDrawBets,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: infoModalMessages.powerspinInformativeNextDrawBets,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: infoModalMessages.eurojackpotInformativeNextDrawBets,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: infoModalMessages.fireblazeInformativeNextDrawBets,
};

const GAMETYPE_TO_ROUTE = {
  [Constants.GENERAL_GAME_TYPES.KINO]: Constants.ROUTE_NAMES.KINO,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: Constants.ROUTE_NAMES.POWERSPIN,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: Constants.ROUTE_NAMES.EUROJACKPOT,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: Constants.ROUTE_NAMES.FIREBLAZE,
};

export default {
  mixins: [ModalUsageMixin],
  data() {
    return {
      lobbyHeaderMixin_shouldTriggerPlaceBetToSessionIM: false,
      lobbyHeaderMixin_barcodeReaderStatusOk: true,
      lobbyHeaderMixin_api: null,
      lobbyHeaderMixin_Promotions_api: null,
      lobbyHeaderMixin_switchToPsApp: false,
      lobbyHeaderMixin_zeroBalanceOnCashOutOrSwitchApp: false,
      lobbyHeaderMixin_scannedGameType: null,
      lobbyHeaderMixin_isInstantWin: false,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      $_lobbyHeaderMixin_getConfiguration: configurationStoreModuleTypes.getters.GET_CONFIGURATION,
      $_lobbyHeaderMixin_getVoucherMessage: configurationStoreModuleTypes.getters.GET_VOUCHER_MESSAGE,
      $_lobbyHeaderMixin_getLastOldColumnPriceDrawTime:
        configurationStoreModuleTypes.getters.GET_POWERSPIN_LAST_OLD_COLUMN_DRAW_TIME,
      $_lobbyHeaderMixin_getBrandName: configurationStoreModuleTypes.getters.GET_BRAND_NAME,
    }),
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      $_lobbyHeaderMixin_getAccessToken: sessionStoreModuleTypes.getters.GET_ACCESS_TOKEN,
      $_lobbyHeaderMixin_terminalId: sessionStoreModuleTypes.getters.GET_SSBT_ID,
    }),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      $_lobbyHeaderMixin_gameType: sessionStoreModuleTypes.state.GAME_TYPE,
    }),
    $_lobbyHeaderMixin_inLobby() {
      return this.$_lobbyHeaderMixin_gameType === '';
    },
    $_lobbyHeaderMixin_shouldTriggerSelectGameModal() {
      return this.$_lobbyHeaderMixin_inLobby;
    },
  },
  created() {
    this.$_lobbyHeaderMixin_setupApi().catch((err) => {
      logToMainProcess('lobbyHeaderMixin_setupApi', err);
    });
  },
  beforeDestroy() {
    this.$_lobbyHeaderMixin_getConfiguration.IPC_RENDERER_ENABLED &&
      this.$_lobbyHeaderMixin_removeIpcRelatedListeners();
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      $_lobbyHeaderMixin_importPlayerBetslipToSession: playerSessionTypes.actions.IMPORT_PLAYER_BETSLIP,
    }),
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      $_lobbyHeaderMixin_updateBetslip: powerspinBetslipStoreModuleTypes.actions.UPDATE_BETSLIP,
      $_lobbyHeaderMixin_resetBetslips: powerspinBetslipStoreModuleTypes.actions.RESET_BETSLIPS,
    }),
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      $_lobbyHeaderMixin_setAccessToken: sessionStoreModuleTypes.actions.SET_ACCESS_TOKEN,
      $_lobbyHeaderMixin_resetAccessToken: sessionStoreModuleTypes.actions.RESET_ACCESS_TOKEN,
      $_lobbyHeaderMixin_setSsbtId: sessionStoreModuleTypes.actions.SET_SSBT_ID,
      $_lobbyHeaderMixin_resetBalance: sessionStoreModuleTypes.actions.RESET_BALANCE,
      $_lobbyHeaderMixin_setBalance: sessionStoreModuleTypes.actions.SET_BALANCE,
      $_lobbyHeaderMixin_clearSavedBetslip: sessionStoreModuleTypes.actions.CLEAR_SAVED_KINO_BETSLIP,
    }),
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      $_lobbyHeaderMixin_resetPowerspinBetslips: powerspinBetslipStoreModuleTypes.actions.RESET_BETSLIPS,
    }),
    ...mapActions(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      $_lobbyHeaderMixin_resetEurojackpotBetslip: eurojackpotGameStoreModuleTypes.actions.RESET_BETSLIP,
      $_lobbyHeaderMixin_setEurojackpotBetslip: eurojackpotGameStoreModuleTypes.actions.ADD_BETSLIP,
    }),
    ...mapActions(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      $_lobbyHeaderMixin_resetFireblazeBetslip: fireblazeGameStoreModuleTypes.actions.RESET_BETSLIPS,
      $_lobbyHeaderMixin_setFireblazeBetslip: fireblazeGameStoreModuleTypes.actions.ADD_BETSLIP,
    }),
    async $_lobbyHeaderMixin_setupApi() {
      if (this.$_lobbyHeaderMixin_getConfiguration.IPC_RENDERER_ENABLED) {
        this.lobbyHeaderMixin_api = new PamApiElectron(this.$_lobbyHeaderMixin_getConfiguration);
        this.lobbyHeaderMixin_Promotions_api = new PromotionsApi(this.$_lobbyHeaderMixin_getConfiguration);
        this.$_lobbyHeaderMixin_addIpcRelatedListeners();
        const [err, bcrStatus] = await to(EventSenderService.sendSyncRequest(EventTypes.BCR_STATUS_EVENT_TYPE));
        if (!err) {
          this.$_lobbyHeaderMixin_barcodeStatusChanged(bcrStatus);
        } else {
          this.$_lobbyHeaderMixin_barcodeStatusChanged(null);
          logToMainProcess('BCR_STATUS_ERROR', err);
        }
      } else {
        this.lobbyHeaderMixin_api = new PamApi(this.$_lobbyHeaderMixin_getConfiguration);
        this.lobbyHeaderMixin_Promotions_api = new PromotionsApi(this.$_lobbyHeaderMixin_getConfiguration);
      }
    },
    $_lobbyHeaderMixin_addIpcRelatedListeners() {
      this.$eventHub.$on('voucherScanned', this.$_lobbyHeaderMixin_voucherScanned);
      this.$eventHub.$on('promotionVoucherScanned', this.$_lobbyHeaderMixin_promotionVoucherScanned);
      this.$eventHub.$on('rollover', this.$_lobbyHeaderMixin_doRollover);
      this.$eventHub.$on(RequestTypes.CASH_OUT, this.$_lobbyHeaderMixin_handleCashoutResponse);
      this.$eventHub.$on(RequestTypes.LOG_OUT, this.$_lobbyHeaderMixin_handleLogoutResponse);
      this.$eventHub.$on(RequestTypes.GET_BALANCE, this.$_lobbyHeaderMixin_handleBalanceResponse);
      this.$eventHub.$on(
        RequestTypes.GET_SSBT_TOKEN_WITH_VOUCHER,
        this.$_lobbyHeaderMixin_handleGetTokenResponseForVoucher
      );
      this.$eventHub.$on(
        RequestTypes.GET_SSBT_TOKEN_AFTER_SWITCH,
        this.$_lobbyHeaderMixin_handleGetTokenAfterAppSwitchResponse
      );
      this.$eventHub.$on(RequestTypes.GET_VOUCHER_INFO, this.$_lobbyHeaderMixin_handleGetVoucherInfoResponse);
      this.$eventHub.$on(RequestTypes.DEPOSIT_VOUCHER, this.$_lobbyHeaderMixin_handleDepositVoucherResponse);
      this.$eventHub.$on(
        RequestTypes.GET_SSBT_TOKEN_WITH_WAGER,
        this.$_lobbyHeaderMixin_handleGetTokenWithWagerResponse
      );
      this.$eventHub.$on(RequestTypes.ROLLOVER, this.$_lobbyHeaderMixin_handleRolloverWagerResponse);
      this.$eventHub.$on(
        RequestTypes.GET_ACCESS_TOKEN_FOR_GET_WAGER,
        this.$_lobbyHeaderMixin_handleGetAccessTokenResponseForWager
      );
      this.$eventHub.$on(RequestTypes.GET_WAGER, this.$_lobbyHeaderMixin_handleGetWagerResponse);
      this.$eventHub.$on('barcodeStatusChange', this.$_lobbyHeaderMixin_barcodeStatusChanged);
      this.$eventHub.$on(eventHubConstants.TRIGGER_LOGOUT, this.$_lobbyHeaderMixin_triggerLogOut);
      this.$eventHub.$on(RequestTypes.GET_ACCESS_TOKEN_FOR_BALANCE, this.$_lobbyHeaderMixin_GetTokenResponseForBalance);
    },
    $_lobbyHeaderMixin_removeIpcRelatedListeners() {
      this.$eventHub.$off('voucherScanned');
      this.$eventHub.$off('rollover');
      this.$eventHub.$off(RequestTypes.CASH_OUT);
      this.$eventHub.$off(RequestTypes.LOG_OUT);
      this.$eventHub.$off(RequestTypes.GET_BALANCE);
      this.$eventHub.$off(RequestTypes.GET_SSBT_TOKEN_WITH_VOUCHER);
      this.$eventHub.$off(RequestTypes.GET_VOUCHER_INFO);
      this.$eventHub.$off(RequestTypes.DEPOSIT_VOUCHER);
      this.$eventHub.$off(RequestTypes.GET_SSBT_TOKEN_WITH_WAGER);
      this.$eventHub.$off(RequestTypes.ROLLOVER);
      this.$eventHub.$off(RequestTypes.GET_ACCESS_TOKEN_FOR_GET_WAGER);
      this.$eventHub.$off(RequestTypes.GET_WAGER);
      this.$eventHub.$off('barcodeStatusChange');
      this.$eventHub.$off(RequestTypes.GET_ACCESS_TOKEN_FOR_BALANCE);
    },
    $_lobbyHeaderMixin_promotionVoucherScanned(voucherCode) {
      if (this.$_lobbyHeaderMixin_getConfiguration.IPC_RENDERER_ENABLED) {
        if (!EventSenderService.sendSyncRequest(EventTypes.PRINTER_STATUS_EVENT_TYPE)) {
          this.triggerInfoModal(infoModalMessages.printerErrorWarning);
          return;
        }
        this.lobbyHeaderMixin_Promotions_api.getVoucherPromoInfo({
          voucherCode,
          callback: (response) => {
            const voucherMessage = promotionVoucherUtilities.handlePromotionVoucherResponse(response, this.$_lobbyHeaderMixin_getBrandName);
            voucherMessage && this.triggerInfoModal(voucherMessage);
          },
        });
      }
    },
    async $_lobbyHeaderMixin_voucherScanned(voucherCode) {
      if (this.$_lobbyHeaderMixin_getConfiguration.IPC_RENDERER_ENABLED) {
        const [err, isPrinterStatusValid] = await to(
          EventSenderService.sendSyncRequest(EventTypes.PRINTER_STATUS_EVENT_TYPE)
        );
        if (err || !isPrinterStatusValid) {
          this.triggerInfoModal(infoModalMessages.printerErrorWarning);
        }
        if (!this.$_lobbyHeaderMixin_terminalId) {
          const [err2, terminalId] = await to(EventSenderService.sendSyncRequest(EventTypes.TERMINAL_NAME_EVENT_TYPE));
          if (!err2) {
            this.$_lobbyHeaderMixin_setSsbtId({ ssbtId: terminalId });
          }
        }

        this.$eventHub.$emit('loading', true);

        if (!this.$_lobbyHeaderMixin_getAccessToken) {
          this.lobbyHeaderMixin_api.getAccessToken(
            this.$_lobbyHeaderMixin_terminalId,
            RequestTypes.GET_SSBT_TOKEN_WITH_VOUCHER,
            this.$_lobbyHeaderMixin_handleGetTokenResponseForVoucher,
            voucherCode
          );
        } else {
          this.lobbyHeaderMixin_api.getVoucherInfo({
            accessToken: this.$_lobbyHeaderMixin_getAccessToken,
            voucherCode,
            callback: this.$_lobbyHeaderMixin_handleGetVoucherInfoResponse,
          });
        }
      }
    },
    $_lobbyHeaderMixin_handleGetTokenResponseForVoucher(response, voucherCode) {
      if (response.success) {
        if (response.status === HttpStatus.OK) {
          this.$_lobbyHeaderMixin_setAccessToken({ accessToken: response.data.access_token });
          this.lobbyHeaderMixin_api.getVoucherInfo({
            accessToken: this.$_lobbyHeaderMixin_getAccessToken,
            voucherCode,
            callback: this.$_lobbyHeaderMixin_handleGetVoucherInfoResponse,
          });
        }
      } else {
        console.log('ERROR:Could not get token!');
        this.$eventHub.$emit('loading', false);
        this.triggerInfoModal(infoModalMessages.operationFailed);
      }
    },
    $_lobbyHeaderMixin_handleGetVoucherInfoResponse(response, voucherCode) {
      if (response.success) {
        if (
          response.data.type !== undefined &&
          (response.data.type === Constants.GET_VOUCHER_INFO.ERROR.USED_VOUCHER.TYPE.FROM_APOLLO ||
            response.data.type === Constants.GET_VOUCHER_INFO.ERROR.USED_VOUCHER.TYPE.FROM_SSBT) &&
          response.data.status === Constants.GET_VOUCHER_INFO.ERROR.USED_VOUCHER.STATUS.REDEEMED
        ) {
          this.$eventHub.$emit('loading', false);
          this.triggerInfoModal(infoModalMessages.usedVoucher);
        } else if (
          response.data.type !== undefined &&
          (response.data.type === Constants.GET_VOUCHER_INFO.ERROR.USED_VOUCHER.TYPE.FROM_APOLLO ||
            response.data.type === Constants.GET_VOUCHER_INFO.ERROR.USED_VOUCHER.TYPE.FROM_SSBT) &&
          (response.data.status === Constants.GET_VOUCHER_INFO.ERROR.USED_VOUCHER.STATUS.CASHEDOUT ||
            response.data.status === Constants.GET_VOUCHER_INFO.ERROR.USED_VOUCHER.STATUS.CANCELED)
        ) {
          this.$eventHub.$emit('loading', false);
          this.triggerInfoModal(infoModalMessages.paidVoucher);
        } else if (response.status === HttpStatus.OK) {
          const voucherPrice = response.data.amount;
          this.$_lobbyHeaderMixin_shouldTriggerSelectGameModal
            ? this.$eventHub.$emit(modalEventConstants.OPEN.SELECT_GAME, {
                gamesCallback: (selectedGame) =>
                  this.$_lobbyHeaderMixin_depositVoucher(voucherCode, false, selectedGame),
                psCallback: () => this.$_lobbyHeaderMixin_depositVoucher(voucherCode, true),
                voucherPrice,
                closeCallback: () => this.$eventHub.$emit('loading', false),
              })
            : this.$_lobbyHeaderMixin_depositVoucher(voucherCode);
        }
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        this.lobbyHeaderMixin_api.getAccessToken(
          this.$_lobbyHeaderMixin_terminalId,
          RequestTypes.GET_SSBT_TOKEN_WITH_VOUCHER,
          this.$_lobbyHeaderMixin_handleGetTokenResponseForVoucher,
          voucherCode
        );
      } else {
        this.$eventHub.$emit('loading', false);
        console.log('ERROR:Could not get voucher info!');
        this.triggerInfoModal(infoModalMessages.usedVoucher);
      }
    },
    $_lobbyHeaderMixin_depositVoucher(voucherCode = '', switchToPsApp = false, selectedGame) {
      this.lobbyHeaderMixin_switchToPsApp = switchToPsApp;
      this.lobbyHeaderMixin_api.depositVoucher({
        accessToken: this.$_lobbyHeaderMixin_getAccessToken,
        voucherCode,
        selectedGame,
        callback: this.$_lobbyHeaderMixin_handleDepositVoucherResponse,
      });
    },
    $_lobbyHeaderMixin_handleDepositVoucherResponse(response, selectedGame) {
      this.$eventHub.$emit('loading', false);
      if (response.success) {
        if (this.lobbyHeaderMixin_switchToPsApp) {
          this.$_lobbyHeaderMixin_triggerSwitchToPsApp();
          return;
        }
        selectedGame && this.$router.push(selectedGame);
        this.$_lobbyHeaderMixin_updateBalance();
      } else {
        this.$_lobbyHeaderMixin_handleDepositVoucherResponseError(response.data);
      }
    },
    $_lobbyHeaderMixin_triggerSwitchToPsApp() {
      this.lobbyHeaderMixin_switchToPsApp = false;
      this.$eventHub.$emit('switchToApplicationOk');
    },
    $_lobbyHeaderMixin_handleDepositVoucherResponseError({ errorId } = {}) {
      console.log('ERROR:Could not deposit!');
      this.triggerInfoModal(this.$_lobbyHeaderMixin_getWarningEvent(errorId));
    },
    $_lobbyHeaderMixin_getWarningEvent(errorId) {
      // TODO use this logic in some kind of mixin or plugin for generating warning messages
      switch (errorId) {
        case Constants.DEPOSIT_VOUCHER.ERROR.LIMIT_EXCEEDED:
          return infoModalMessages.cashInLimitExceeded(this.$_lobbyHeaderMixin_getConfiguration.WALLET_LIMIT);
        case Constants.DEPOSIT_VOUCHER.ERROR.NOT_ALLOWED_ACTION_FOR_RETAILER_ERROR:
          return infoModalMessages.notAllowedVoucher;
        default:
          return infoModalMessages.operationFailed;
      }
    },
    $_lobbyHeaderMixin_updateBalance({ shouldTriggerPlaceBetToSessionIM = false, isInstantWin = false } = {}) {
      this.lobbyHeaderMixin_shouldTriggerPlaceBetToSessionIM = !!shouldTriggerPlaceBetToSessionIM;
      this.lobbyHeaderMixin_isInstantWin = isInstantWin;
      this.lobbyHeaderMixin_api.getBalance(
        this.$_lobbyHeaderMixin_getAccessToken,
        this.$_lobbyHeaderMixin_handleBalanceResponse
      );
    },
    $_lobbyHeaderMixin_handleBalanceResponse(response) {
      if (response.success) {
        const { data: { balance = 0 } = {} } = response || {};
        this.$_lobbyHeaderMixin_checkShouldTriggerPlaceBetToSessionIM({ balance });
        this.$_lobbyHeaderMixin_setBalance({ balance });
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        this.lobbyHeaderMixin_api.getAccessToken(
          this.$_lobbyHeaderMixin_terminalId,
          RequestTypes.GET_ACCESS_TOKEN_FOR_BALANCE,
          this.$_lobbyHeaderMixin_GetTokenResponseForBalance,
          this.lobbyHeaderMixin_shouldTriggerPlaceBetToSessionIM
        );
      } else {
        console.log('ERROR:Balance Update Failed!');
      }
    },
    $_lobbyHeaderMixin_GetTokenResponseForBalance(response, shouldTriggerPlaceBetToSessionIM) {
      if (response.success) {
        if (response.status === HttpStatus.OK) {
          this.$_lobbyHeaderMixin_setAccessToken({ accessToken: response.data.access_token });
          this.$_lobbyHeaderMixin_updateBalance({ shouldTriggerPlaceBetToSessionIM });
        }
      } else {
        this.triggerInfoModal(infoModalMessages.operationFailed);
      }
    },
    $_lobbyHeaderMixin_checkShouldTriggerPlaceBetToSessionIM({ balance = 0 }) {
      this.lobbyHeaderMixin_shouldTriggerPlaceBetToSessionIM &&
        balance > 0 &&
        this.$_lobbyHeaderMixin_triggerPlaceBetToSessionIM();
      this.$_lobbyHeaderMixin_disableShouldTriggerPlaceBetToSessionIM();
    },
    $_lobbyHeaderMixin_disableShouldTriggerPlaceBetToSessionIM() {
      this.lobbyHeaderMixin_shouldTriggerPlaceBetToSessionIM = false;
    },
    $_lobbyHeaderMixin_triggerPlaceBetToSessionIM() {
      this.triggerInfoModal(
        this.lobbyHeaderMixin_isInstantWin
          ? infoModalMessages.instantWinInformativeNextDrawBets
          : SUCCESSFUL_BET_MSG_WRAPPER[this.$_lobbyHeaderMixin_gameType],
        null,
        true
      );
    },
    async $_lobbyHeaderMixin_doRollover(ticketStatus, doReplay) {
      this.lobbyHeaderMixin_scannedGameType = ticketStatus.ticket.gameType;
      if (this.$_lobbyHeaderMixin_getConfiguration.IPC_RENDERER_ENABLED) {
        const [err, isPrinterStatusValid] = await to(
          EventSenderService.sendSyncRequest(EventTypes.PRINTER_STATUS_EVENT_TYPE)
        );
        if (err || !isPrinterStatusValid) {
          this.triggerInfoModal(infoModalMessages.printerErrorWarning);
        }

        if (!this.$_lobbyHeaderMixin_terminalId) {
          const [err2, terminalId] = await to(EventSenderService.sendSyncRequest(EventTypes.TERMINAL_NAME_EVENT_TYPE));
          if (!err2) {
            this.$_lobbyHeaderMixin_setSsbtId({ ssbtId: terminalId });
          }
        }

        if (!this.$_lobbyHeaderMixin_getAccessToken) {
          this.lobbyHeaderMixin_api.getAccessToken(
            this.$_lobbyHeaderMixin_terminalId,
            RequestTypes.GET_SSBT_TOKEN_WITH_WAGER,
            this.$_lobbyHeaderMixin_handleGetTokenWithWagerResponse,
            ticketStatus.ticket.barcode,
            doReplay
          );
        } else {
          this.lobbyHeaderMixin_api.rolloverWager(
            this.$_lobbyHeaderMixin_getAccessToken,
            ticketStatus.ticket.barcode,
            this.$_lobbyHeaderMixin_handleRolloverWagerResponse,
            doReplay
          );
        }
      }
    },
    $_lobbyHeaderMixin_handleGetTokenWithWagerResponse(response, wagerId, doReplay) {
      if (response.success) {
        if (response.status === HttpStatus.OK) {
          this.$_lobbyHeaderMixin_setAccessToken({ accessToken: response.data.access_token });
          this.lobbyHeaderMixin_api.rolloverWager(
            this.$_lobbyHeaderMixin_getAccessToken,
            wagerId,
            this.$_lobbyHeaderMixin_handleRolloverWagerResponse,
            doReplay
          );
        }
      } else {
        this.triggerInfoModal(infoModalMessages.operationFailed);
        this.lobbyHeaderMixin_scannedGameType = null;
      }
    },
    $_lobbyHeaderMixin_handleRolloverWagerResponse(response, wagerId, doReplay) {
      if (response.success) {
        this.$_lobbyHeaderMixin_handleRolloverReplayInLobby(doReplay, wagerId);
      } else {
        console.log('ERROR:Could not deposit!');
        this.lobbyHeaderMixin_scannedGameType = null;
        if (response.data !== undefined && response.data.errorId === Constants.DEPOSIT_VOUCHER.ERROR.LIMIT_EXCEEDED) {
          this.triggerInfoModal(
            infoModalMessages.cashInLimitExceeded(this.$_lobbyHeaderMixin_getConfiguration.WALLET_LIMIT),
            this.$_lobbyHeaderMixin_handleRolloverReplayInLobby.bind(this, doReplay, wagerId)
          );
        } else {
          this.triggerInfoModal(
            infoModalMessages.operationFailed,
            this.$_lobbyHeaderMixin_handleRolloverReplayInLobby.bind(this, doReplay, wagerId)
          );
        }
      }
      this.$_lobbyHeaderMixin_updateBalance();
    },
    $_lobbyHeaderMixin_handleRolloverReplayInLobby(doReplay, wagerId) {
      this.$_lobbyHeaderMixin_inLobby || this.$_lobbyHeaderMixin_shouldRedirect()
        ? this.$_lobbyHeaderMixin_goToGameWithParams(doReplay, wagerId)
        : this.$_lobbyHeaderMixin_emitReplayWagerEvent(doReplay, wagerId);
    },
    $_lobbyHeaderMixin_goToGameWithParams(doReplay, wagerId) {
      const gameType = this.lobbyHeaderMixin_scannedGameType;
      this.lobbyHeaderMixin_scannedGameType = null;
      const params = doReplay ? { wagerId } : {};
      this.$router.push({
        name: GAMETYPE_TO_ROUTE[gameType] || Constants.ROUTE_NAMES.KINO,
        params,
      });
    },
    $_lobbyHeaderMixin_shouldRedirect() {
      return (
        this.lobbyHeaderMixin_scannedGameType !== null &&
        this.$route.name !== GAMETYPE_TO_ROUTE[this.lobbyHeaderMixin_scannedGameType]
      );
    },
    $_lobbyHeaderMixin_emitReplayWagerEvent(doReplay, wagerId) {
      this.lobbyHeaderMixin_scannedGameType = null;
      doReplay && this.$eventHub.$emit('replayWager', { wagerId });
    },
    $_lobbyHeaderMixin_handleCashoutResponse(response, switchApp) {
      this.$eventHub.$emit('loading', false);
      if (response.success) {
        if (response.status < 300) {
          this.$eventHub.$emit('clearBetslip');
          this.$_lobbyHeaderMixin_clearSavedBetslip();
          this.$_lobbyHeaderMixin_resetPowerspinBetslips();
          this.$_lobbyHeaderMixin_resetBalance();
          this.$_lobbyHeaderMixin_enableZeroBalanceOnCashOutOrSwitchApp();
          response.data.voucherMessage = this.$_lobbyHeaderMixin_getVoucherMessage[this.lang] || '';
          this.$eventHub.$emit('print', Constants.PRINT_TYPE.VOUCHER, response.data);
          !switchApp &&
            this.triggerInfoModal(infoModalMessages.liveDrawSessionEnd, this.$_lobbyHeaderMixin_goToLobby, true);
          this.$_lobbyHeaderMixin_triggerLogOut(switchApp);
        }
      } else {
        console.log('ERROR:Could not cash out!');
        this.triggerInfoModal(infoModalMessages.operationFailed);
      }
      this.$_lobbyHeaderMixin_updateBalance();
    },
    $_lobbyHeaderMixin_enableZeroBalanceOnCashOutOrSwitchApp() {
      this.lobbyHeaderMixin_zeroBalanceOnCashOutOrSwitchApp = true;
    },
    $_lobbyHeaderMixin_goToLobby() {
      this.$eventHub.$emit('goToLobby');
    },
    $_lobbyHeaderMixin_triggerLogOut(switchApp = false, applicationType = HALApplicationTypes.SPORTS) {
      this.$_lobbyHeaderMixin_getAccessToken
        ? this.lobbyHeaderMixin_api.logOut(
            this.$_lobbyHeaderMixin_getAccessToken,
            switchApp,
            this.$_lobbyHeaderMixin_handleLogoutResponse,
            applicationType
          )
        : this.$_lobbyHeaderMixin_handleLogoutResponse(null, switchApp, applicationType);
    },
    $_lobbyHeaderMixin_handleLogoutResponse(response, switchApp, applicationType) {
      switchApp && this.$_lobbyHeaderMixin_enableZeroBalanceOnCashOutOrSwitchApp();
      this.$_lobbyHeaderMixin_resetBalance();
      this.$_lobbyHeaderMixin_resetAccessToken();
      switchApp && this.$eventHub.$emit('switchToApplicationOk', applicationType);
    },
    $_lobbyHeaderMixin_handleGetTokenAfterAppSwitchResponse(response) {
      if (response.success) {
        if (response.status === HttpStatus.OK) {
          this.$_lobbyHeaderMixin_setAccessToken({ accessToken: response.data.access_token });
          this.$_lobbyHeaderMixin_updateBalance();
        }
      } else {
        console.log('ERROR:Could not get token after app switch!');
      }
      this.$eventHub.$emit('loading', false);
    },
    $_lobbyHeaderMixin_handleGetAccessTokenResponseForWager(response, barcode, callbackArgs) {
      if (response.success) {
        this.$_lobbyHeaderMixin_setAccessToken({ accessToken: response.data.access_token });
        const { addWagerToPlayerBetslipSession = false, forFindWinnings = false } = callbackArgs || {};
        this.$_lobbyHeaderMixin_doGetWager(barcode, addWagerToPlayerBetslipSession, forFindWinnings);
      }
    },
    $_lobbyHeaderMixin_doGetWager(barcode, addWagerToPlayerBetslipSession = false, forFindWinnings = false) {
      const callbackArgs = { addWagerToPlayerBetslipSession, forFindWinnings };
      if (!this.$_lobbyHeaderMixin_getAccessToken) {
        this.lobbyHeaderMixin_api.getAccessToken(
          this.$_lobbyHeaderMixin_terminalId,
          RequestTypes.GET_ACCESS_TOKEN_FOR_GET_WAGER,
          this.$_lobbyHeaderMixin_handleGetAccessTokenResponseForWager,
          barcode,
          callbackArgs
        );
      } else {
        this.lobbyHeaderMixin_api.getWager(
          this.$_lobbyHeaderMixin_getAccessToken,
          this.$_lobbyHeaderMixin_terminalId,
          barcode,
          callbackArgs,
          this.$_lobbyHeaderMixin_handleGetWagerResponse
        );
      }
    },
    $_lobbyHeaderMixin_handleGetWagerResponse(response, barcode, callbackArgs) {
      const { addWagerToPlayerBetslipSession = false, forFindWinnings = false } = callbackArgs || {};
      if (response.success) {
        if (addWagerToPlayerBetslipSession) {
          this.$_lobbyHeaderMixin_importPlayerBetslipToSession(response.data);
          this.$_lobbyHeaderMixin_triggerImportBetslipToSessionIM();
        } else if (forFindWinnings) {
          this.$eventHub.$emit(eventHubConstants.FIND_WINNINGS_WAGER_DETAILS, {
            kinoSystemEnabled: get(response, 'data.kinoSystemEnabled'),
            gameType: get(response, 'data.gameType'),
          });
        } else {
          const wager = get(response, 'data.wager');
          const gameType = get(response, 'data.gameType');
          if (gameType === Constants.GENERAL_GAME_TYPES.KINO) {
            this.$eventHub.$emit('wagerUpdated', new Betslip(wager));
          } else if (gameType === Constants.GENERAL_GAME_TYPES.POWERSPIN) {
            if (
              !this.$_lobbyHeaderMixin_getLastOldColumnPriceDrawTime ||
              wager.participatingDraws.firstDrawTime <= this.$_lobbyHeaderMixin_getLastOldColumnPriceDrawTime
            ) {
              this.$eventHub.$emit(
                modalEventConstants.OPEN.OLD_TICKET_SCANNED,
                this.$_lobbyHeaderMixin_replayPowerspinBetslip.bind(this, wager)
              );
            } else {
              this.$_lobbyHeaderMixin_replayPowerspinBetslip(wager);
            }
          } else if (gameType === Constants.GENERAL_GAME_TYPES.EUROJACKPOT) {
            if (wager.teamShares && wager.teamShares > 1) {
              this.$eventHub.$emit(
                modalEventConstants.OPEN.DIALOG,
                infoModalMessages.confirmReplayGroupPlay,
                this.$_lobbyHeaderMixin_replayEurojackpotBetslip.bind(this, wager)
              );
            } else {
              this.$_lobbyHeaderMixin_replayEurojackpotBetslip(wager);
            }
          } else if (gameType === Constants.GENERAL_GAME_TYPES.FIREBLAZE) {
            this.$_lobbyHeaderMixin_replayFireblazeBetslip(wager);
          }
        }
      } else {
        console.log('ERROR:Could not get wager!');
        this.triggerInfoModal(infoModalMessages.operationFailed);
        forFindWinnings && this.$eventHub.$emit(eventHubConstants.FIND_WINNINGS_WAGER_DETAILS);
      }
    },
    $_lobbyHeaderMixin_replayPowerspinBetslip(wager) {
      this.$_lobbyHeaderMixin_resetBetslips();
      const betslip = new PowerspinBetslip(wager);
      this.$_lobbyHeaderMixin_updateBetslip({ betslip });
      this.$eventHub.$emit(
        EventHubTypes.SWITCH_POWERSPIN_PLAY_MODE,
        betslip.isWheelsEmpty() ? Constants.POWERSPIN_PLAY_MODE.MARKETS : Constants.POWERSPIN_PLAY_MODE.WHEELS
      );
    },
    $_lobbyHeaderMixin_replayEurojackpotBetslip(wager) {
      this.$_lobbyHeaderMixin_resetEurojackpotBetslip();
      const betslip = new EurojackpotBetslip(wager);
      this.$_lobbyHeaderMixin_setEurojackpotBetslip({ betslip });
    },
    $_lobbyHeaderMixin_replayFireblazeBetslip(wager) {
      this.$_lobbyHeaderMixin_resetFireblazeBetslip();
      const betslip = new FireblazeBetslip(wager);
      this.$_lobbyHeaderMixin_setFireblazeBetslip({ betslip });
    },
    $_lobbyHeaderMixin_triggerImportBetslipToSessionIM() {
      this.triggerInfoModal(SUCCESSFUL_BET_MSG_WRAPPER[this.$_lobbyHeaderMixin_gameType], null, true);
    },
    $_lobbyHeaderMixin_barcodeStatusChanged(status) {
      this.lobbyHeaderMixin_barcodeReaderStatusOk = status === 0;
    },
  },
};
