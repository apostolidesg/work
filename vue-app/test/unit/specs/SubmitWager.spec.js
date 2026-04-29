import { createLocalVue, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import Vue from 'vue';
import Vuex from 'vuex';
import PamApiElectron from '../../../src/apis/pam-api-electron';
import SubmitWager from '../../../src/components/common/SubmitWager.vue';
import EventSenderService from '../../../src/handler/EventSenderService';
import PlaceBetError from '../../../src/model/PlaceBetError';

describe('SubmitWager', () => {
  Vue.prototype.$eventHub = new Vue();
  const instance = new Vue();
  let sandbox;
  let localVue;
  let propsData;
  let scopedSlots;
  let stubs;
  let store;
  let mixins;
  let wrapper;

  // Stubs
  let isBetslipValidStub;
  let activeSessionStub;
  let activeBetSlipCostStub;
  let getAccessTokenStub;
  let getIsSalesClosedStub;

  // Spies
  let addPlayerBetslipSpy;
  let removePowerspinBetslipSpy;
  let removeEurojackpotBetslipSpy;
  let clearKinoBetslipSpy;
  let setAccessTokenSpy;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);
    isBetslipValidStub = sandbox.stub();
    activeSessionStub = sandbox.stub();
    activeBetSlipCostStub = sandbox.stub();
    getAccessTokenStub = sandbox.stub();
    getIsSalesClosedStub = sandbox.stub();
    addPlayerBetslipSpy = sandbox.spy();
    removePowerspinBetslipSpy = sandbox.spy();
    removeEurojackpotBetslipSpy = sandbox.spy();
    clearKinoBetslipSpy = sandbox.spy();
    setAccessTokenSpy = sandbox.spy();

    propsData = {
      betslip: {
        isValidBetslip: isBetslipValidStub,
        setISecureTokens: sandbox.spy(),
      },
    };

    // Bind slot props
    scopedSlots = {
      default: '<SubmitButton v-bind="props" />',
    };

    stubs = {
      SubmitButton: {
        name: 'SubmitButton',
        template: '<button id="submit-wager-button" @click="submitWager">Submit</button>',
        props: ['submitWager', 'isSubmitting', 'error', 'betslipCost'],
      },
    };

    mixins = [
      {
        methods: {
          triggerInfoModal: sandbox.spy(),
        },
      },
    ];

    store = new Vuex.Store({
      modules: {
        CONFIGURATION_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_CONFIGURATION: () => ({
              IPC_RENDERER_ENABLED: true,
            }),
          },
        },
        SESSION_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_ACTIVE_SESSION: activeSessionStub,
            GET_ACCESS_TOKEN: getAccessTokenStub,
            GET_SSBT_ID: () => 'ssbtId',
            GET_ACTIVE_BETSLIP_COST: activeBetSlipCostStub,
          },
          state: {
            gameType: null,
          },
          actions: {
            SET_ACCESS_TOKEN: setAccessTokenSpy,
          },
        },
        PLAYER_SESSION_MODULE: {
          namespaced: true,
          actions: {
            ADD_PLAYER_BETSLIP: addPlayerBetslipSpy,
          },
        },
        POWERSPIN_GAME_STORE_MODULE: {
          namespaced: true,
          actions: {
            REMOVE_BETSLIP: removePowerspinBetslipSpy,
          },
        },
        EUROJACKPOT_GAME_STORE_MODULE: {
          namespaced: true,
          actions: {
            RESET_BETSLIP: removeEurojackpotBetslipSpy,
          },
          getters: {
            GET_IS_SALES_CLOSED: getIsSalesClosedStub,
          },
        },
        KINO_GAME_STORE_MODULE: {
          namespaced: true,
          actions: {
            CLEAR_BETSLIP: clearKinoBetslipSpy,
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
    sandbox.restore();
  });

  it('should render the default slot', () => {
    wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
    expect(wrapper.find('#submit-wager-button').exists()).to.true;
  });

  it('should expose the isSubmitting prop to the default slot', () => {
    wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
    const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
    expect(submitButton.props('isSubmitting')).to.false;
  });

  it('should expose an not active session error to the default slot when there is no active session', () => {
    wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
    const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
    expect(submitButton.props('error')).to.equal('placeBetInfoMsg1');
  });

  it('should expose a not valid betslip error to the default slot when there is an active session and the betslip is not valid', () => {
    activeSessionStub.returns(true);
    isBetslipValidStub.returns(false);
    wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
    const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
    expect(submitButton.props('error')).to.equal('placeBetInfoMsg2');
  });

  it('should expose a not valid betslip error to the default slot when there is an active session and the betslip is an array that contains a not valid betslip', () => {
    activeSessionStub.returns(true);
    propsData = {
      betslip: [{ isValidBetslip: () => false }, { isValidBetslip: () => true }],
    };
    wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
    const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
    expect(submitButton.props('error')).to.equal('placeBetInfoMsg2');
  });

  it('should expose a sales closed error if the game is EJP and the sales are closed ', () => {
    activeSessionStub.returns(true);
    store.state.SESSION_STORE_MODULE.gameType = 'EUROJACKPOT';
    getIsSalesClosedStub.returns(true);
    isBetslipValidStub.returns(true);
    wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
    expect(wrapper.findComponent({ name: stubs.SubmitButton.name }).props('error')).to.equal(
      'eurojackpot.salesStopped'
    );
  });

  it('should expose null to the errors props when there is an active session and the betslip is valid', () => {
    activeSessionStub.returns(true);
    isBetslipValidStub.returns(true);
    wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
    const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
    expect(submitButton.props('error')).to.null;
  });

  it('shoudld expose null to the errors props when there is an active session and the betslip is an array that contains only valid bets', () => {
    activeSessionStub.returns(true);
    propsData = {
      betslip: [{ isValidBetslip: () => true }, { isValidBetslip: () => true }],
    };
    wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
    const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
    expect(submitButton.props('error')).to.null;
  });

  describe('when the game type kino', () => {
    beforeEach(() => {
      store.state.SESSION_STORE_MODULE.gameType = 'KINO';
      activeBetSlipCostStub.returns(10);
    });

    it('should expose the kino betslip cost to the default slot', () => {
      wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
      const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
      expect(activeBetSlipCostStub.calledOnce).to.true;
      expect(submitButton.props('betslipCost')).to.eq(10);
    });
  });

  describe('when the game type is powerspin', () => {
    beforeEach(() => {
      store.state.SESSION_STORE_MODULE.gameType = 'POWERSPIN';
      activeBetSlipCostStub.returns(20);
    });

    it('should expose the powerspin betslip cost to the default slot', () => {
      wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
      const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
      expect(activeBetSlipCostStub.calledOnce).to.true;
      expect(submitButton.props('betslipCost')).to.eq(20);
    });
  });

  describe('when the game type is eurojackpot', () => {
    beforeEach(() => {
      store.state.SESSION_STORE_MODULE.gameType = 'EUROJACKPOT';
      activeBetSlipCostStub.returns(30);
    });

    it('should expose the eurojackpot betslip cost to the default slot', () => {
      wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
      const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
      expect(activeBetSlipCostStub.calledOnce).to.true;
      expect(submitButton.props('betslipCost')).to.eq(30);
    });
  });

  describe('when the user clicks on the submit button', () => {
    let sendSyncRequestStub;
    let placeBetStub;

    beforeEach(() => {
      activeSessionStub.returns(true);
      isBetslipValidStub.returns(true);
      sendSyncRequestStub = sandbox.stub(EventSenderService, 'sendSyncRequest');
      placeBetStub = sandbox.stub(PamApiElectron.prototype, 'placeBet');
      sendSyncRequestStub.withArgs('HAL_INITIALIZED').resolves(true);
      sendSyncRequestStub.withArgs('BCR_STATUS').resolves(0);
      sendSyncRequestStub.withArgs('PRINTER_STATUS').resolves(true);
      sendSyncRequestStub.withArgs('REQUEST_ISECURE_HASH').resolves({ hashes: ['hash1', 'hash2'] });
    });

    it('should emit to the $eventhub a loading true', async () => {
      const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
      wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
      await new Promise(resolve => setTimeout(resolve, 0));
      const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
      await submitButton.trigger('click');
      await wrapper.vm.$nextTick();
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(emitSpy.calledWith('loading', true)).to.true;
    });

    describe('and the HAL is not connected', () => {
      beforeEach(() => {
        sendSyncRequestStub.withArgs('HAL_INITIALIZED').resolves(false);
        sandbox
          .stub(PlaceBetError, 'halUnavailable')
          .returns({ errorCode: 'halUnavailableErrorCode', modal: { configuration: { title: 'halUnavailable' } } });
      });

      it('should emit an place bet error with the correct error code', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(wrapper.emitted('place-bet-error')[0][0]).to.equal('halUnavailableErrorCode');
      });

      it('should show a modal with the correct configuration', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(mixins[0].methods.triggerInfoModal.calledWith({ title: 'halUnavailable' })).to.true;
      });

      it('should emit to the $eventhub a loading false', async () => {
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.calledWith('loading', false)).to.true;
      });

      it('should set the isSubmitting prop to false', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(submitButton.props('isSubmitting')).to.false;
      });
    });

    describe('and the printer is not connected', () => {
      beforeEach(() => {
        sendSyncRequestStub.withArgs('HAL_INITIALIZED').resolves(true);
        sendSyncRequestStub.withArgs('PRINTER_STATUS').resolves(false);
        sandbox.stub(PlaceBetError, 'printerUnavailable').returns({
          errorCode: 'printerUnavailableErrorCode',
          modal: { configuration: { title: 'printerUnavailable' } },
        });
      });

      it('should emit an place bet error with the correct error code', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(wrapper.emitted('place-bet-error')[0][0]).to.equal('printerUnavailableErrorCode');
      });

      it('should show a modal with the correct configuration', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(mixins[0].methods.triggerInfoModal.calledWith({ title: 'printerUnavailable' })).to.true;
      });

      it('should emit to the $eventhub a loading false', async () => {
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.calledWith('loading', false)).to.true;
      });

      it('should set the isSubmitting prop to false', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(submitButton.props('isSubmitting')).to.false;
      });
    });

    describe('and the betslip is not valid', () => {
      beforeEach(() => {
        isBetslipValidStub.returns(false);
      });

      it('should not set the isSubmitting prop to true', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(submitButton.props('isSubmitting')).to.false;
      });

      it('should not emit to the $eventhub a loading true', async () => {
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.called).to.false;
      });

      it('should not call the placeBet method', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(placeBetStub.called).to.false;
      });
    });

    describe('and the isSubmitting data is true', () => {
      let data;

      beforeEach(() => {
        data = () => ({
          isSubmitting: true,
        });
      });

      it('should not set the isSubmitting prop to true', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(submitButton.props('isSubmitting')).to.true;
      });

      it('should not emit to the $eventhub a loading true', async () => {
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.called).to.false;
      });

      it('should not call the placeBet method', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(placeBetStub.called).to.false;
      });
    });

    describe('and the hal and the printer are connected and the betslips are valid', () => {
      beforeEach(() => {
        sendSyncRequestStub.withArgs('HAL_INITIALIZED').resolves(true);
        sendSyncRequestStub.withArgs('PRINTER_STATUS').resolves(true);
        sendSyncRequestStub.withArgs('REQUEST_ISECURE_HASH').resolves({ hashes: ['hash1', 'hash2'] });
        store.state.SESSION_STORE_MODULE.gameType = 'KINO';
        getAccessTokenStub.returns('accessToken');
      });

      it('should set the isecure tokens to the betslip', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(propsData.betslip.setISecureTokens.calledWith(['hash1', 'hash2'])).to.true;
      });

      it('sould set the isecure tokens to the first betslip when the game is POWERSPIN', async () => {
        store.state.SESSION_STORE_MODULE.gameType = 'POWERSPIN';
        propsData.betslip = [{ ...propsData.betslip }];
        sendSyncRequestStub.withArgs('REQUEST_ISECURE_HASH').resolves({ hashes: ['hash1', 'hash2'] });
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(propsData.betslip[0].setISecureTokens.calledWith(['hash1', 'hash2'])).to.true;
      });

      it('should call the placeBet method with the correct parameters', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        await submitButton.trigger('click');
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(
          placeBetStub.calledWith({
            accessToken: 'accessToken',
            gameType: 'KINO',
            betslip: propsData.betslip,
            callback: wrapper.vm.handlePlaceBetResponse,
          })
        ).to.true;
      });
    });
  });

  describe('when the elector reports a place bet response', () => {
    let data;

    beforeEach(() => {
      data = () => ({
        isSubmitting: true,
        iSecure: {
          hashes: ['hash1', 'hash2'],
          randomNumbers: 'randomNumbers',
        },
      });
    });

    describe('and the response is a success', () => {
      let sendSyncRequestStub;

      let successResponse;

      beforeEach(() => {
        successResponse = {
          status: 200,
          success: true,
          data: {
            serialNumbers: ['serialNumber1', 'serialNumber2'],
          },
        };

        sendSyncRequestStub = sandbox.stub(EventSenderService, 'sendSyncRequest');
        sendSyncRequestStub.withArgs('REQUEST_CRC', 'serialNumber1randomNumbers').resolves('crc');
      });

      it('should trigger an update balance event', async () => {
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.calledWith('updateBalance')).to.true;
      });

      it('should emit a place bet success event', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(wrapper.emitted('place-bet-success')).to.not.be.undefined;
      });

      it('should emit to the $eventhub a loading false', async () => {
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.calledWith('loading', false)).to.true;
      });

      it('should set the isSubmitting slot prop to false', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        expect(submitButton.props('isSubmitting')).to.true;
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(submitButton.props('isSubmitting')).to.false;
      });

      describe('and the game type is kino', () => {
        beforeEach(() => {
          store.state.SESSION_STORE_MODULE.gameType = 'KINO';
        });

        it('should add the betslip to the player session module with the correct parameters', async () => {
          wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
          instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);

          const expectedData = {
            serialNumbers: ['serialNumber1', 'serialNumber2'],
            iSecure: {
              hashes: ['hash1', 'hash2'],
              randomNumbers: 'randomNumbers',
              crcCode: 'crc',
            },
          };

          await new Promise(resolve => setTimeout(resolve, 0));
          expect(addPlayerBetslipSpy.calledOnce).to.true;
          expect(addPlayerBetslipSpy.getCall(0).args[1]).to.eql(expectedData);
        });

        it('should send an event to $eventHub to print the betslip', async () => {
          const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
          wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
          instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
          await new Promise(resolve => setTimeout(resolve, 0));
          expect(emitSpy.calledWith('print', 2, successResponse.data)).to.true;
        });

        it('should remove the first betslip from the kino betslip module', async () => {
          wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
          instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
          await new Promise(resolve => setTimeout(resolve, 0));
          expect(clearKinoBetslipSpy.calledOnce).to.true;
        });
      });

      describe('and the game type is powerspin', () => {
        beforeEach(() => {
          store.state.SESSION_STORE_MODULE.gameType = 'POWERSPIN';
        });

        it('should send an event to $eventHub to print the betslip', async () => {
          const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
          wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
          instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
          await new Promise(resolve => setTimeout(resolve, 0));
          expect(emitSpy.calledWith('print', 4, successResponse.data)).to.true;
        });

        it('should remove the first betslip from the powerspin module', async () => {
          wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
          instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
          await new Promise(resolve => setTimeout(resolve, 0));
          expect(removePowerspinBetslipSpy.calledOnce).to.true;
          expect(removePowerspinBetslipSpy.getCall(0).args[1]).to.eql({ betslipIndex: 0 });
        });
      });

      describe('and the game type is eurojackpot', () => {
        beforeEach(() => {
          store.state.SESSION_STORE_MODULE.gameType = 'EUROJACKPOT';
        });

        it('should send an event to $eventHub to print the betslip', async () => {
          const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
          wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
          instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
          await new Promise(resolve => setTimeout(resolve, 0));
          expect(emitSpy.calledWith('print', 5, successResponse.data)).to.true;
        });

        it('should remove the betslip from the eurojackpot module', async () => {
          wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
          instance.$eventHub.$emit('ELECTRON_PLACE_BET', successResponse);
          await new Promise(resolve => setTimeout(resolve, 0));
          expect(removeEurojackpotBetslipSpy.calledOnce).to.true;
        });
      });
    });

    describe('and the response is unauthorized', () => {
      let getApiAccessTokenStub;

      beforeEach(() => {
        getApiAccessTokenStub = sandbox.stub(PamApiElectron.prototype, 'getAccessToken');
      });

      it('should call tha api to get a new access token', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', { status: 401 });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(
          getApiAccessTokenStub.calledWith(
            'ssbtId',
            'ELECTRON_GET_ACCESS_TOKEN_PLACE_BET',
            wrapper.vm.handleGetTokenForPlaceBetResponse
          )
        ).to.true;
      });

      it('should keep the isSubmiting slot prop to true', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', { status: 401 });
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(submitButton.props('isSubmitting')).to.true;
      });

      it('should not emit to the $eventhub a loading false', async () => {
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', { status: 401 });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.calledWith('loading', false)).to.false;
      });

      it('should not modify the isecure tokens', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', { status: 401 });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(wrapper.vm.iSecure).to.eql({ hashes: ['hash1', 'hash2'], randomNumbers: 'randomNumbers' });
      });
    });

    describe('and the response has an error', () => {
      let errorFromResponseStub;

      beforeEach(() => {
        errorFromResponseStub = sandbox.stub(PlaceBetError, 'fromResponse').returns({
          errorCode: 'errorCode',
          modal: { type: 'INFO', configuration: { title: 'title' } },
        });
      });

      it('should update the balance', async () => {
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', { error: 'error' });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.calledWith('updateBalance')).to.true;
      });

      it('should open an info modal with the correct configuration', async () => {
        const responce = { error: 'error' };
        errorFromResponseStub.withArgs(responce).returns({
          errorCode: 'errorCode',
          modal: { type: 'INFO', configuration: { title: 'title' } },
        });
        shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', responce);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(mixins[0].methods.triggerInfoModal.calledWith({ title: 'title' })).to.true;
      });

      it('should use the error configuration to open a modal if it not info', async () => {
        const responce = { error: 'error' };
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        errorFromResponseStub.withArgs(responce).returns({
          errorCode: 'errorCode',
          modal: { type: 'ERROR' },
        });
        shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', responce);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.calledWith('ERROR')).to.true;
      });

      it('should emit an place bet error with the correct error code', async () => {
        errorFromResponseStub.returns({
          errorCode: 'errorCode',
          modal: { type: 'ERROR' },
        });
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', { error: 'error' });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(wrapper.emitted('place-bet-error')[0][0]).to.equal('errorCode');
      });

      it('should set the isSubmitting slot prop to false', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', { error: 'error' });
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(submitButton.props('isSubmitting')).to.false;
      });

      it('should emit to the $eventhub a loading false', async () => {
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_PLACE_BET', { error: 'error' });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.calledWith('loading', false)).to.true;
      });
    });
  });

  describe('when the elector reports a get token for place bet response', () => {
    let data;

    beforeEach(() => {
      data = () => ({
        isSubmitting: true,
        iSecure: {
          hashes: ['hash1', 'hash2'],
          randomNumbers: 'randomNumbers',
        },
      });
    });

    describe('and the response is a success', () => {
      const response = { success: true, status: 200, data: { accessToken: 'accessToken' } };

      it('should call the submitWager method', async () => {
        const submitWagerStub = sandbox.spy(SubmitWager.methods, 'submitWager');
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_GET_ACCESS_TOKEN_PLACE_BET', response);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(submitWagerStub.calledOnce).to.true;
      });

      it('should set the access token to the session store module', async () => {
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_GET_ACCESS_TOKEN_PLACE_BET', response);
        expect(setAccessTokenSpy.calledOnce).to.true;
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(setAccessTokenSpy.getCall(0).args[1]).to.eql({ accessToken: 'accessToken' });
      });
    });

    describe('and the response is failed', () => {
      beforeEach(() => {
        sandbox.stub(PlaceBetError, 'getAccessTokenError').returns({
          errorCode: 'errorCode',
          modal: { type: 'INFO', configuration: { title: 'title' } },
        });
      });

      it('should open an info modal with the correct configuration', async () => {
        const response = { error: 'error' };
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_GET_ACCESS_TOKEN_PLACE_BET', response);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(mixins[0].methods.triggerInfoModal.calledWith({ title: 'title' })).to.true;
      });

      it('should emit an place bet error with the correct error code', async () => {
        const response = { error: 'error' };
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_GET_ACCESS_TOKEN_PLACE_BET', response);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(wrapper.emitted('place-bet-error')[0][0]).to.equal('errorCode');
      });

      it('should set the isSubmitting slot prop to false', async () => {
        const response = { error: 'error' };
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        await new Promise(resolve => setTimeout(resolve, 0));
        const submitButton = wrapper.findComponent({ name: stubs.SubmitButton.name });
        instance.$eventHub.$emit('ELECTRON_GET_ACCESS_TOKEN_PLACE_BET', response);
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(submitButton.props('isSubmitting')).to.false;
      });

      it('should emit to the $eventhub a loading false', async () => {
        const response = { error: 'error' };
        const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
        wrapper = shallowMount(SubmitWager, { propsData, scopedSlots, stubs, localVue, store, mixins, data });
        instance.$eventHub.$emit('ELECTRON_GET_ACCESS_TOKEN_PLACE_BET', response);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(emitSpy.calledWith('loading', false)).to.true;
      });
    });
  });
});
