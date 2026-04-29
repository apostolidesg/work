import { createLocalVue, shallowMount } from '@vue/test-utils';
import moduleTypes from '../../../src/store/modules/types';
import types from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import ModalUsageMixin from '../../../src/mixins/ModalUsageMixin';
import Vuex from 'vuex';
import sinon from 'sinon';
import modalEventConstants from '../../../src/util/modalEventConstants';

describe('LobbyHeader Mixin', () => {
  let component;
  let configurationStoreGetters;
  let sessionStoreModuleGetters;
  let sessionStoreModuleState;
  let playerSessionModuleactionsActions;
  let powerspinGameStoreModuleActions;
  let sessionStoreModuleActions;
  let store;
  let mocks;
  let localVue;
  let methods;
  let data;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    configurationStoreGetters = {
      [types.getters.GET_CONFIGURATION]: () => {},
      [types.getters.GET_VOUCHER_MESSAGE]: () => {},
    };
    sessionStoreModuleGetters = {
      [types.getters.GET_ACCESS_TOKEN]: () => {},
      [types.getters.GET_SSBT_ID]: () => 'ssbt id',
    };

    sessionStoreModuleState = {
      [types.state.GAME_TYPE]: () => '',
    };

    playerSessionModuleactionsActions = {
      [types.actions.IMPORT_PLAYER_BETSLIP]: () => {},
    };
    powerspinGameStoreModuleActions = {
      [types.actions.ADD_BETSLIP]: () => {},
    };

    sessionStoreModuleActions = {
      [types.actions.SET_ACCESS_TOKEN]: () => {},
      [types.actions.RESET_ACCESS_TOKEN]: () => {},
      [types.actions.SET_SSBT_ID]: () => {},
      [types.actions.RESET_BALANCE]: () => {},
      [types.actions.SET_BALANCE]: () => {},
    };

    store = new Vuex.Store({
      modules: {
        [moduleTypes.CONFIGURATION_STORE_MODULE]: {
          namespaced: true,
          getters: configurationStoreGetters,
        },
        [moduleTypes.SESSION_STORE_MODULE]: {
          namespaced: true,
          state: sessionStoreModuleState,
          getters: sessionStoreModuleGetters,
          actions: sessionStoreModuleActions,
        },
        [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: {
          actions: powerspinGameStoreModuleActions,
        },
        [moduleTypes.PLAYER_SESSION_MODULE]: {
          actions: playerSessionModuleactionsActions,
        },
      },
    });

    mocks = {
      $t: sinon.stub().callsFake(() => {
        return 'Test';
      }),
    };

    data = {
      lobbyHeaderMixin_shouldTriggerPlaceBetToSessionIM: sinon.spy(),
      lobbyHeaderMixin_barcodeReaderStatusOk: sinon.spy(),
      lobbyHeaderMixin_api: sinon.spy(),
      lobbyHeaderMixin_switchToPsApp: sinon.spy(),
      lobbyHeaderMixin_zeroBalanceOnCashOutOrSwitchApp: sinon.spy(),
    };

    methods = {
      $_lobbyHeaderMixin_addIpcRelatedListeners: sinon.spy(),
      $_lobbyHeaderMixin_removeIpcRelatedListeners: sinon.spy(),
      $_lobbyHeaderMixin_voucherScanned: sinon.spy(),
      $_lobbyHeaderMixin_handleGetTokenResponse: sinon.spy(),
      $_lobbyHeaderMixin_handleGetVoucherInfoResponse: sinon.spy(),
      $_lobbyHeaderMixin_depositVoucher: sinon.spy(),
      $_lobbyHeaderMixin_handleDepositVoucherResponse: sinon.spy(),
      $_lobbyHeaderMixin_triggerSwitchToPsApp: sinon.spy(),
      $_lobbyHeaderMixin_handleDepositVoucherResponseError: sinon.spy(),
      $_lobbyHeaderMixin_getWarningEvent: sinon.spy(),
      $_lobbyHeaderMixin_updateBalance: sinon.spy(),
      $_lobbyHeaderMixin_handleBalanceResponse: sinon.spy(),
      $_lobbyHeaderMixin_checkShouldTriggerPlaceBetToSessionIM: sinon.spy(),
      $_lobbyHeaderMixin_disableShouldTriggerPlaceBetToSessionIM: sinon.spy(),
      $_lobbyHeaderMixin_triggerPlaceBetToSessionIM: sinon.spy(),
      $_lobbyHeaderMixin_doRollover: sinon.spy(),
      $_lobbyHeaderMixin_handleGetTokenWithWagerResponse: sinon.spy(),
      $_lobbyHeaderMixin_handleRolloverWagerResponse: sinon.spy(),
      $_lobbyHeaderMixin_handleRolloverReplayInLobby: sinon.spy(),
      $_lobbyHeaderMixin_goToKinoWithParams: sinon.spy(),
      $_lobbyHeaderMixin_emitReplayWagerEvent: sinon.spy(),
      $_lobbyHeaderMixin_handleCashoutResponse: sinon.spy(),
      $_lobbyHeaderMixin_enableZeroBalanceOnCashOutOrSwitchApp: sinon.spy(),
      $_lobbyHeaderMixin_goToLobby: sinon.spy(),
      $_lobbyHeaderMixin_triggerLogOut: sinon.spy(),
      $_lobbyHeaderMixin_handleLogoutResponse: sinon.spy(),
      $_lobbyHeaderMixin_handleGetTokenAfterAppSwitchResponse: sinon.spy(),
      $_lobbyHeaderMixin_handleGetGenericTokenResponse: sinon.spy(),
      $_lobbyHeaderMixin_doGetWager: sinon.spy(),
      $_lobbyHeaderMixin_handleGetWagerResponse: sinon.spy(),
      $_lobbyHeaderMixin_importPlayerBetslipToSession: sinon.spy(),
      $_lobbyHeaderMixin_triggerImportBetslipToSessionIM: sinon.spy(),
      $_lobbyHeaderMixin_barcodeStatusChanged: sinon.spy(),
    };

    component = {
      mixins: [ModalUsageMixin],
      render() {},
    };
  });

  it('when component is created', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_addIpcRelatedListeners();
    wrapper.vm.$_lobbyHeaderMixin_barcodeStatusChanged();
    sinon.assert.called(methods.$_lobbyHeaderMixin_addIpcRelatedListeners);
    sinon.assert.called(methods.$_lobbyHeaderMixin_barcodeStatusChanged);
  });

  it('component before Destroyed', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    [types.getters.GET_CONFIGURATION].IPC_RENDERER_ENABLED = true;
    wrapper.vm.$_lobbyHeaderMixin_removeIpcRelatedListeners();
    sinon.assert.called(methods.$_lobbyHeaderMixin_removeIpcRelatedListeners);
  });

  it('when $_lobbyHeaderMixin_addIpcRelatedListeners is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_addIpcRelatedListeners();
    sinon.assert.called(methods.$_lobbyHeaderMixin_addIpcRelatedListeners);
  });
  it('when $_lobbyHeaderMixin_removeIpcRelatedListeners is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_removeIpcRelatedListeners();
    sinon.assert.called(methods.$_lobbyHeaderMixin_removeIpcRelatedListeners);
  });
  it('when $_lobbyHeaderMixin_voucherScanned is called', () => {
    const voucherCode = '343rf5t';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_voucherScanned(voucherCode);
    sinon.assert.called(methods.$_lobbyHeaderMixin_voucherScanned);
  });

  it('when $_lobbyHeaderMixin_handleGetTokenResponse is called', () => {
    const response = {
      status: 200,
    };
    const vacherCode = 'Coupon2454';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleGetTokenResponse(response, vacherCode);
    sinon.assert.calledWith(methods.$_lobbyHeaderMixin_handleGetTokenResponse, response, vacherCode);
    wrapper.vm.$emit('kinoSessionStarted');
  });

  it('when $_lobbyHeaderMixin_handleGetVoucherInfoResponse is called', () => {
    const response = {
      status: 200,
      data: {
        amount: 34,
      },
    };
    const voucherCode = 'Coupon2454';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleGetVoucherInfoResponse(response, voucherCode);
    wrapper.vm.$emit(modalEventConstants.OPEN.SELECT_GAME, {
      gamesCallback: (selectedGame) => methods.$_lobbyHeaderMixin_depositVoucher(voucherCode, false, selectedGame),
      psCallback: () => methods.$_lobbyHeaderMixin_depositVoucher(voucherCode, true),
      voucherPrice: response.data.amount,
      closeCallback: () => wrapper.vm.$emit('loading', false),
    });
    sinon.assert.called(methods.$_lobbyHeaderMixin_handleGetVoucherInfoResponse);
  });
  it('when $_lobbyHeaderMixin_depositVoucher is called', () => {
    const voucherCode = 'Code3463';
    const switchToPsApp = false;
    const selectedGame = 'powerSpin';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_depositVoucher(voucherCode, switchToPsApp, selectedGame);
    sinon.assert.called(methods.$_lobbyHeaderMixin_depositVoucher);
  });
  it('when $_lobbyHeaderMixin_handleDepositVoucherResponse is called', () => {
    const response = {
      status: 200,
    };
    const selectedGame = 'powerSpin';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleDepositVoucherResponse(response, selectedGame);
    sinon.assert.calledWith(methods.$_lobbyHeaderMixin_handleDepositVoucherResponse, response, selectedGame);
  });
  it('when $_lobbyHeaderMixin_triggerSwitchToPsApp is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_triggerSwitchToPsApp();
    sinon.assert.called(methods.$_lobbyHeaderMixin_triggerSwitchToPsApp);
  });
  it('when $_lobbyHeaderMixin_handleDepositVoucherResponseError is called', () => {
    const errorId = 'ERROR';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleDepositVoucherResponseError(errorId);
    sinon.assert.calledWith(methods.$_lobbyHeaderMixin_handleDepositVoucherResponseError, errorId);
  });
  it('when $_lobbyHeaderMixin_updateBalance is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_updateBalance();
    sinon.assert.called(methods.$_lobbyHeaderMixin_updateBalance);
  });
  it('when $_lobbyHeaderMixin_getWarningEvent is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_getWarningEvent();
    sinon.assert.called(methods.$_lobbyHeaderMixin_getWarningEvent);
  });
  it('when $_lobbyHeaderMixin_handleBalanceResponse is called', () => {
    const response = {
      status: 200,
    };
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleBalanceResponse(response);
    sinon.assert.called(methods.$_lobbyHeaderMixin_handleBalanceResponse);
  });
  it('when $_lobbyHeaderMixin_checkShouldTriggerPlaceBetToSessionIM is called', () => {
    const balance = 0;
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_checkShouldTriggerPlaceBetToSessionIM(balance);
    sinon.assert.calledWith(methods.$_lobbyHeaderMixin_checkShouldTriggerPlaceBetToSessionIM);
  });
  it('when $_lobbyHeaderMixin_disableShouldTriggerPlaceBetToSessionIM is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_disableShouldTriggerPlaceBetToSessionIM();
    sinon.assert.called(methods.$_lobbyHeaderMixin_disableShouldTriggerPlaceBetToSessionIM);
  });
  it('when $_lobbyHeaderMixin_triggerPlaceBetToSessionIM is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_triggerPlaceBetToSessionIM();
    sinon.assert.called(methods.$_lobbyHeaderMixin_triggerPlaceBetToSessionIM);
  });
  it('when $_lobbyHeaderMixin_doRollover is called', () => {
    const ticketStatus = 'OK';
    const doReplay = 'replay';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_doRollover(ticketStatus, doReplay);
    sinon.assert.called(methods.$_lobbyHeaderMixin_doRollover);
  });
  it('when $_lobbyHeaderMixin_handleGetTokenWithWagerResponse is called', () => {
    const response = {
      status: 200,
    };
    const wagerId = '346';
    const doReplay = 'replay';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleGetTokenWithWagerResponse(response, wagerId, doReplay);
    wrapper.vm.$emit('kinoSessionStarted');
    sinon.assert.called(methods.$_lobbyHeaderMixin_handleGetTokenWithWagerResponse);
  });
  it('when $_lobbyHeaderMixin_handleRolloverWagerResponse is called', () => {
    const response = {
      status: 200,
    };
    const wagerId = '346';
    const doReplay = 'replay';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleRolloverReplayInLobby(doReplay, wagerId);
    wrapper.vm.$_lobbyHeaderMixin_handleRolloverWagerResponse(response, wagerId, doReplay);
    sinon.assert.called(methods.$_lobbyHeaderMixin_handleRolloverReplayInLobby);
    sinon.assert.called(methods.$_lobbyHeaderMixin_handleRolloverWagerResponse);
  });
  it('when $_lobbyHeaderMixin_emitReplayWagerEvent is called', () => {
    const wagerId = '346';
    const doReplay = 'replay';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_emitReplayWagerEvent(doReplay, wagerId);
    sinon.assert.called(methods.$_lobbyHeaderMixin_emitReplayWagerEvent);
  });
  it('when $_lobbyHeaderMixin_handleCashoutResponse is called', () => {
    const response = {
      status: 400,
    };
    const switchApp = 'app';
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_triggerLogOut(switchApp);
    wrapper.vm.$_lobbyHeaderMixin_handleCashoutResponse(response, switchApp);
    wrapper.vm.$emit('clearBetslip');
    sinon.assert.calledWith(methods.$_lobbyHeaderMixin_triggerLogOut);
    sinon.assert.called(methods.$_lobbyHeaderMixin_handleCashoutResponse);
  });
  it('when $_lobbyHeaderMixin_enableZeroBalanceOnCashOutOrSwitchApp is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_enableZeroBalanceOnCashOutOrSwitchApp();
    sinon.assert.called(methods.$_lobbyHeaderMixin_enableZeroBalanceOnCashOutOrSwitchApp);
  });
  it('when $_lobbyHeaderMixin_goToLobby is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_goToLobby();
    wrapper.vm.$emit('goToLobby');
    sinon.assert.called(methods.$_lobbyHeaderMixin_goToLobby);
  });
  it('when $_lobbyHeaderMixin_goToKinoWithParams is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_goToKinoWithParams();
    sinon.assert.called(methods.$_lobbyHeaderMixin_goToKinoWithParams);
  });
  it('when $_lobbyHeaderMixin_triggerLogOut is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_triggerLogOut();
    sinon.assert.called(methods.$_lobbyHeaderMixin_triggerLogOut);
  });
  it('when $_lobbyHeaderMixin_handleLogoutResponse is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleLogoutResponse();
    wrapper.vm.$emit('switchToApplicationOk');
    sinon.assert.called(methods.$_lobbyHeaderMixin_handleLogoutResponse);
  });
  it('when $_lobbyHeaderMixin_handleGetTokenAfterAppSwitchResponse is called', () => {
    const response = {
      status: 200,
    };
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleGetTokenAfterAppSwitchResponse(response);
    wrapper.vm.$emit('kinoSessionStarted');
    sinon.assert.called(methods.$_lobbyHeaderMixin_handleGetTokenAfterAppSwitchResponse);
  });
  it('when $_lobbyHeaderMixin_handleGetGenericTokenResponse is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleGetGenericTokenResponse();
    sinon.assert.called(methods.$_lobbyHeaderMixin_handleGetGenericTokenResponse);
  });
  it('when $_lobbyHeaderMixin_doGetWager is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_doGetWager();
    sinon.assert.calledOnce(methods.$_lobbyHeaderMixin_doGetWager);
  });
  it('when $_lobbyHeaderMixin_handleGetWagerResponse is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_handleGetWagerResponse();
    wrapper.vm.$_lobbyHeaderMixin_importPlayerBetslipToSession();
    wrapper.vm.$_lobbyHeaderMixin_triggerImportBetslipToSessionIM();
    sinon.assert.calledOnce(methods.$_lobbyHeaderMixin_handleGetWagerResponse);
    sinon.assert.calledOnce(methods.$_lobbyHeaderMixin_importPlayerBetslipToSession);
    sinon.assert.calledOnce(methods.$_lobbyHeaderMixin_triggerImportBetslipToSessionIM);
  });
  it('when $_lobbyHeaderMixin_triggerImportBetslipToSessionIM is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_triggerImportBetslipToSessionIM();
    sinon.assert.called(methods.$_lobbyHeaderMixin_triggerImportBetslipToSessionIM);
  });
  it('when $_lobbyHeaderMixin_barcodeStatusChanged is called', () => {
    const wrapper = shallowMount(component, { data, localVue, store, mocks, methods });
    wrapper.vm.$_lobbyHeaderMixin_barcodeStatusChanged();
    sinon.assert.called(methods.$_lobbyHeaderMixin_barcodeStatusChanged);
  });
});
