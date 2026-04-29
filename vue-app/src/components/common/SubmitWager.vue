<script>
import to from 'await-to-js';
import HttpStatus from 'http-status';
import { join } from 'lodash';
import { mapActions, mapGetters, mapState } from 'vuex';
import fireblazeBetslipStoreModuleTypes from '../../store/modules/FireblazeStoreModule/types';
import PamApi from '../../apis/pam-api';
import PamApiElectron from '../../apis/pam-api-electron';
import EventSenderService from '../../handler/EventSenderService';
import EventTypes from '../../handler/EventTypes';
import RequestTypes from '../../handler/RequestTypes';
import ModalUsageMixin from '../../mixins/ModalUsageMixin';
import PlaceBetError from '../../model/PlaceBetError';
import configurationStoreModuleTypes from '../../store/modules/ConfigurationStoreModule/types';
import eurojackpotBetslipStoreModuleTypes from '../../store/modules/EurojackpotStoreModule/types';
import kinoGameModuleTypes from '../../store/modules/KinoStoreModule/types';
import playerSessionTypes from '../../store/modules/PlayerBetslipsSessionModule/types';
import powerspinBetslipStoreModuleTypes from '../../store/modules/PowerspinBetslipStoreModule/types';
import sessionStoreModuleTypes from '../../store/modules/SessionStoreModule/types';
import moduleTypes from '../../store/modules/types';
import Constants from '../../util/Constants';
import { logToMainProcess } from '../../util/LoggerService';
import modalEventConstants from '../../util/modalEventConstants';

const GAME_PRINT_TEMPLATE_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.KINO]: Constants.PRINT_TYPE.BETSLIP,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: Constants.PRINT_TYPE.POWERSPIN_BETSLIP,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: Constants.PRINT_TYPE.EUROJACKPOT_BETSLIP,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: Constants.PRINT_TYPE.FIREBLAZE_BETSLIP,
};

export default {
  name: 'SubmitWager',
  mixins: [ModalUsageMixin],
  props: {
    betslip: {
      type: [Object, Array],
      required: true,
    },
  },
  data: () => ({
    isSubmitting: false,
    api: null,
    iSecure: null,
  }),
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationStoreModuleTypes.getters.GET_CONFIGURATION,
    }),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: sessionStoreModuleTypes.state.GAME_TYPE,
    }),
    ...mapGetters(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      isSalesClosed: eurojackpotBetslipStoreModuleTypes.getters.GET_IS_SALES_CLOSED,
    }),
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      activeSession: sessionStoreModuleTypes.getters.GET_ACTIVE_SESSION,
      getAccessToken: sessionStoreModuleTypes.getters.GET_ACCESS_TOKEN,
      getTerminalId: sessionStoreModuleTypes.getters.GET_SSBT_ID,
      getActiveBetslipCost: sessionStoreModuleTypes.getters.GET_ACTIVE_BETSLIP_COST,
    }),
    isBetslipValid() {
      return Array.isArray(this.betslip)
        ? !this.betslip.some((betslip) => !betslip.isValidBetslip())
        : this.betslip.isValidBetslip();
    },
    isUserSessionActive() {
      // The balance is greater than zero and there is an access token present
      return this.activeSession;
    },
    error() {
      if (!this.isUserSessionActive) {
        return 'placeBetInfoMsg1';
      }
      if (!this.isBetslipValid) {
        return 'placeBetInfoMsg2';
      }
      if (this.isSalesClosed && this.gameType === Constants.GENERAL_GAME_TYPES.EUROJACKPOT) {
        return 'eurojackpot.salesStopped';
      }
      return null;
    },
    betslipCost() {
      return this.getActiveBetslipCost;
    },
  },
  mounted() {
    if (this.getConfiguration.IPC_RENDERER_ENABLED) {
      this.api = new PamApiElectron(this.getConfiguration);
      this.$eventHub.$on(RequestTypes.PLACE_BET, this.handlePlaceBetResponse);
      this.$eventHub.$on(RequestTypes.GET_ACCESS_TOKEN_FOR_PLACE_BET, this.handleGetTokenForPlaceBetResponse);
    } else {
      this.api = new PamApi(this.getConfiguration);
    }
  },
  beforeDestroy() {
    if (this.getConfiguration.IPC_RENDERER_ENABLED) {
      this.$eventHub.$off(RequestTypes.PLACE_BET);
      this.$eventHub.$off(RequestTypes.GET_ACCESS_TOKEN_FOR_PLACE_BET);
    }
  },
  render() {
    return this.$scopedSlots.default({
      submitWager: () => {
        this.$emit('submit-clicked');
        this.submitWager();
      },
      isSubmitting: this.isSubmitting,
      error: this.error,
      betslipCost: this.betslipCost,
    });
  },
  methods: {
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setAccessToken: sessionStoreModuleTypes.actions.SET_ACCESS_TOKEN,
    }),
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      addPlayerBetslip: playerSessionTypes.actions.ADD_PLAYER_BETSLIP,
    }),
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      removeBetslip: powerspinBetslipStoreModuleTypes.actions.REMOVE_BETSLIP,
    }),
    ...mapActions(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      resetEurojackpodBetslip: eurojackpotBetslipStoreModuleTypes.actions.RESET_BETSLIP,
    }),
    ...mapActions(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      resetFireblazeBetslip: fireblazeBetslipStoreModuleTypes.actions.RESET_BETSLIPS,
    }),
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      clearKinoBetslip: kinoGameModuleTypes.actions.CLEAR_BETSLIP,
    }),

    // This method is exposed outside the component via the scoped slot props. It is the responsibility of the
    // slot component to call this method. The method will check if the betslip is valid and if the user session
    // is active. If both conditions are met then the betslip will be submitted to the api.
    async submitWager() {
      if (this.error || this.isSubmitting) {
        return;
      }
      this.setSubmittingState(true);

      let halInitialized = false;
      const [err, isHalInitialized] = await to(
        EventSenderService.sendSyncRequest(EventTypes.HAL_INITIALIZED_EVENT_TYPE)
      );
      if (!err) {
        halInitialized = isHalInitialized;
      } else {
        logToMainProcess('HAL_INITIALIZED_ERROR', err);
      }

      if (this.getConfiguration.IPC_RENDERER_ENABLED && !halInitialized) {
        const error = PlaceBetError.halUnavailable();
        this.triggerInfoModal(error.modal.configuration);
        const [, bcrStatus] = await to(EventSenderService.sendSyncRequest(EventTypes.BCR_STATUS_EVENT_TYPE));
        this.$eventHub.$emit('barcodeStatusChange', bcrStatus);
        this.$emit('place-bet-error', error.errorCode);
        this.setSubmittingState(false);
        return;
      }

      let printerStatusValid = false;
      const [err2, isPrinterStatusValid] = await to(
        EventSenderService.sendSyncRequest(EventTypes.PRINTER_STATUS_EVENT_TYPE)
      );
      if (!err2) {
        printerStatusValid = isPrinterStatusValid;
      } else {
        logToMainProcess('PRINTER_STATUS_ERROR', err2);
      }

      if (this.getConfiguration.IPC_RENDERER_ENABLED && !printerStatusValid) {
        const error = PlaceBetError.printerUnavailable();
        this.triggerInfoModal(error.modal.configuration);
        this.$emit('place-bet-error', error.errorCode);
        this.setSubmittingState(false);
        return;
      }

      // The powerspin betslip is an array of betslips and the rest are just a single betslip
      const betslip = this.gameType === Constants.GENERAL_GAME_TYPES.POWERSPIN ? this.betslip[0] : this.betslip;
      // Request from the electon main process the isecure hashes and fill the betslip with them. We need to store
      // the isecure object in the component data because we need it later on the handlePlaceBetResponse method
      const [err3, iSecure] = await to(EventSenderService.sendSyncRequest(EventTypes.REQUEST_ISECURE_HASH));
      if (!err3) {
        this.iSecure = iSecure;
      } else {
        logToMainProcess('REQUEST_ISECURE_HASH_ERROR', err3);
      }
      betslip.setISecureTokens(this.iSecure.hashes);

      // Send the request to the api and return. The response will be handled by the event hub
      this.api.placeBet({
        accessToken: this.getAccessToken,
        gameType: this.gameType,
        betslip,
        callback: this.handlePlaceBetResponse,
      });
    },
    // This method is called when the api responds to the place bet request. It will check if the response is
    // successful and if it is then it will update the balance and print the betslip and inform the parent via the
    // place-bet-success event. If the game is managed by the store it will remove the betslip from it.
    // If the response is not successful then it will show the error modal and inform the parent component via the
    // place-bet-error event.
    async handlePlaceBetResponse(response) {
      // Success Flow
      if (response.success) {
        if (response.status === HttpStatus.OK) {
          const l10SerialNumber = join([response.data.serialNumbers[0], join(this.iSecure.randomNumbers, '')], '');
          const [err, crcCode] = await to(EventSenderService.sendSyncRequest(EventTypes.REQUEST_CRC, l10SerialNumber));
          if (!err) {
            this.iSecure.crcCode = crcCode;
          } else {
            logToMainProcess('REQUEST_CRC_ERROR', err);
          }
          response.data.iSecure = this.iSecure;

          this.$eventHub.$emit('print', GAME_PRINT_TEMPLATE_MAPPER[this.gameType], response.data);

          const isOutcomeTypeIW =
            response.data?.promotionOutcomes?.[0]?.outcomeType === Constants.PROMOTIONS_INSTANT_WIN_OUTCOME;
          // By seting the shouldTriggerPlaceBetToSessionIM to true we are telling handler of the updateBalance event
          // (lobby header mixin) to present the "bet added to session" info modal
          this.$eventHub.$emit('updateBalance', {
            shouldTriggerPlaceBetToSessionIM: true,
            isInstantWin: isOutcomeTypeIW,
          });
          if (this.gameType === Constants.GENERAL_GAME_TYPES.KINO) {
            this.addPlayerBetslip(response.data);
            this.clearKinoBetslip();
          } else if (this.gameType === Constants.GENERAL_GAME_TYPES.POWERSPIN) {
            this.removeBetslip({ betslipIndex: 0 });
            if (this.betslip.length > 0) {
              this.setSubmittingState(false);
              this.iSecure = null;
              this.submitWager();
              if (!this.isBetslipValid) {
                this.$emit('place-bet-success');
              }
              return;
            }
          } else if (this.gameType === Constants.GENERAL_GAME_TYPES.EUROJACKPOT) {
            this.resetEurojackpodBetslip();
          } else if (this.gameType === Constants.GENERAL_GAME_TYPES.FIREBLAZE) {
            this.resetFireblazeBetslip();
          }

          this.$emit('place-bet-success');
        }
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        this.api.getAccessToken(
          this.getTerminalId,
          RequestTypes.GET_ACCESS_TOKEN_FOR_PLACE_BET,
          this.handleGetTokenForPlaceBetResponse
        );
        return;
      } else {
        this.$eventHub.$emit('updateBalance');
        const error = PlaceBetError.fromResponse(response);
        if (error.modal.type === modalEventConstants.OPEN.INFO) {
          this.triggerInfoModal(error.modal.configuration);
        } else {
          this.$eventHub.$emit(error.modal.type, error.modal.configuration);
        }
        this.$emit('place-bet-error', error.errorCode);
      }
      this.setSubmittingState(false);
      // The isecure object is set by the submitWager method. We need to set it to null here to prepare for
      // the next betslip submission
      this.iSecure = null;
    },
    handleGetTokenForPlaceBetResponse(response) {
      if (response.success) {
        if (response.status === HttpStatus.OK) {
          this.setAccessToken({ accessToken: response.data.accessToken });
          this.submitWager();
        }
      } else {
        const error = PlaceBetError.getAccessTokenError();
        this.triggerInfoModal(error.modal.configuration);
        this.$emit('place-bet-error', error.errorCode);
        this.setSubmittingState(false);
      }
    },
    setSubmittingState(value) {
      this.isSubmitting = value;
      this.$eventHub.$emit('loading', value);
    },
  },
};
</script>
