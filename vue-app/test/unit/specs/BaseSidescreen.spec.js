import { createLocalVue, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import Vue from 'vue';
import Vuex from 'vuex';
import BaseSidescreen from '../../../src/components/common/BaseSidescreen.vue';
import EventSenderService from '../../../src/handler/EventSenderService';

describe('BaseSidescreen.vue', () => {
  Vue.prototype.$eventHub = new Vue();
  let localVue;
  let sandbox;
  let stubs;
  let store;
  let wrapper;
  let propsData;
  let betslip;

  // stubs
  let getConfigStub;
  let getConsecutiveDrawsStub;
  let getGameTypeStub;
  let sendSyncRequestStub;

  // spies
  let setConsecutiveDrawsSpy;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);

    getConfigStub = sandbox.stub().returns({
      IPC_RENDERER_ENABLED: true,
    });
    getConsecutiveDrawsStub = sandbox.stub();
    getGameTypeStub = sandbox.stub();
    sendSyncRequestStub = sandbox.stub(EventSenderService, 'sendSyncRequest');

    sendSyncRequestStub.withArgs('PRINTER_STATUS').resolves(true);

    setConsecutiveDrawsSpy = sandbox.spy();

    betslip = {};

    propsData = {
      betslip,
    };

    stubs = {
      SidescreenLayout: {
        name: 'SidescreenLayout',
        template:
          '<div>' +
          "<slot name='header'></slot>" +
          '<slot></slot>' +
          "<slot name='static'></slot> " +
          "<slot name='footer'></slot> " +
          '</div>',
      },
      ConsecutiveDraws: {
        name: 'ConsecutiveDraws',
        template: '<div class="consecutive-draws-stub"></div>',
        props: ['multiple-draws', 'theme'],
        emits: ['update-consecutive-draws'],
      },
      SubmitWager: {
        name: 'SubmitWager',
        template: '<div class="submit-wager-stub"><slot></slot></div>',
        props: ['betslip'],
        emits: ['place-bet-error', 'place-bet-success'],
      },
      SubmitWagerButton: {
        name: 'SubmitWagerButton',
        template: '<button class="submit-wager-button-stub"></button>',
        props: ['isSubmitting', 'submitWager', 'error', 'betslipCost'],
      },
    };

    store = new Vuex.Store({
      modules: {
        CONFIGURATION_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_CONFIGURATION: getConfigStub,
          },
        },
        SESSION_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_ACTIVE_BETSLIP_CONSECUTIVE_DRAWS: getConsecutiveDrawsStub,
            GET_GAME_TYPE: getGameTypeStub,
          },
          actions: {
            SET_BETSLIP_CONSECUTIVE_DRAWS: setConsecutiveDrawsSpy,
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
    sandbox.restore();
  });

  it('should render the component', () => {
    wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });
    expect(wrapper.exists()).to.be.true;
  });

  it('should render the printer error message if the printer is not connected', async () => {
    sendSyncRequestStub.withArgs('PRINTER_STATUS').resolves(false);
    wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.find('.sidescreen__printer-error').isVisible()).to.be.true;
    expect(wrapper.findComponent({ name: stubs.SidescreenLayout.name }).isVisible()).to.be.false;
  });

  it('should render the Sidescreen Layout if the printer is connected', async () => {
    wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.sidescreen__printer-error').isVisible()).to.be.false;
    expect(wrapper.findComponent({ name: stubs.SidescreenLayout.name }).isVisible()).to.be.true;
  });

  it('should render the header slot if exists', () => {
    const headerSlot = '<div class="header-slot"></div>';
    wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData, slots: { header: headerSlot } });

    expect(wrapper.find('.header-slot').exists()).to.be.true;
  });

  it('should render the static slot if exists', () => {
    const staticSlot = '<div class="static-slot"></div>';
    wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData, slots: { static: staticSlot } });

    expect(wrapper.find('.static-slot').exists()).to.be.true;
  });

  it('should render the default slot', () => {
    const defaultSlot = '<div class="default-slot"></div>';
    wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData, slots: { default: defaultSlot } });

    expect(wrapper.find('.default-slot').exists()).to.be.true;
  });

  describe('when rendering the ConsecutiveDraws component', () => {
    it('should render the ConsecutiveDraws component', () => {
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });

      expect(wrapper.findComponent({ name: stubs.ConsecutiveDraws.name }).exists()).to.be.true;
    });

    it('should pass the multiple-draws prop to the ConsecutiveDraws component from the store', () => {
      getConsecutiveDrawsStub.returns(3);
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });

      expect(wrapper.findComponent({ name: stubs.ConsecutiveDraws.name }).props('multipleDraws')).to.equal(3);
    });

    it('should pass the dark theme prop to the ConsecutiveDraws component if the game is EUROJACKPOT', () => {
      getGameTypeStub.returns('EUROJACKPOT');
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });

      expect(wrapper.findComponent({ name: stubs.ConsecutiveDraws.name }).props('theme')).to.equal('dark');
    });

    it('should pass the light theme prop to the ConsecutiveDraws component if the game is KINO', () => {
      getGameTypeStub.returns('KINO');
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });

      expect(wrapper.findComponent({ name: stubs.ConsecutiveDraws.name }).props('theme')).to.equal('light');
    });

    it('should pass the light theme prop to the ConsecutiveDraws component if the game is POWERSPIN', () => {
      getGameTypeStub.returns('POWERSPIN');
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });

      expect(wrapper.findComponent({ name: stubs.ConsecutiveDraws.name }).props('theme')).to.equal('light');
    });

    it('should call the setConsecutiveDraws action when the ConsecutiveDraws component emits the update-consecutive-draws event', () => {
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });
      wrapper.findComponent({ name: stubs.ConsecutiveDraws.name }).vm.$emit('update-consecutive-draws', 2);

      expect(setConsecutiveDrawsSpy.calledOnce).to.be.true;
      expect(setConsecutiveDrawsSpy.getCall(0).args[1]).to.deep.equal({ multipleDraws: 2 });
    });
  });

  describe('when rendering the SubmitWager component', () => {
    it('should render the SubmitWager component', () => {
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });

      expect(wrapper.findComponent({ name: stubs.SubmitWager.name }).exists()).to.be.true;
    });

    it('should pass the betslip prop to the SubmitWager component', () => {
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });

      expect(wrapper.findComponent({ name: stubs.SubmitWager.name }).props('betslip')).to.equal(betslip);
    });

    it('should show the printer error when the SubmitWager component emits the place-bet-error event', async () => {
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });
      wrapper.findComponent({ name: stubs.SubmitWager.name }).vm.$emit('place-bet-error', 'PRINTER_UNAVAILABLE');

      await wrapper.vm.$nextTick();

      expect(wrapper.find('.sidescreen__printer-error').isVisible()).to.be.true;
      expect(wrapper.findComponent({ name: stubs.SidescreenLayout.name }).isVisible()).to.be.false;
    });

    it('should emit the place-bet-success event when the SubmitWager component emits the place-bet-success event', () => {
      wrapper = shallowMount(BaseSidescreen, { stubs, localVue, store, propsData });
      wrapper.findComponent({ name: stubs.SubmitWager.name }).vm.$emit('place-bet-success');

      expect(wrapper.emitted('place-bet-success')).to.have.lengthOf(1);
    });
  });
});
