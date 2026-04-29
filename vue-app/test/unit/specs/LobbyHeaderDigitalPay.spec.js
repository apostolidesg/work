import { shallowMount, createLocalVue } from '@vue/test-utils';
import LobbyHeaderDigitalPay from '@/components/lobby/lobbyHeader/LobbyHeaderDigitalPay.vue';
import Vue from 'vue';
import { HALApplicationTypes } from '@/constants/HALApplicationTypes';
import sinon from 'sinon';

describe('LobbyHeaderDigitalPay.vue', () => {
  let localVue;
  let mocks;

  beforeEach(() => {
    localVue = createLocalVue();

    mocks = {
      $t: sinon.stub().callsFake((key) => key),
      $eventHub: new Vue(),
    };

    sinon.spy(mocks.$eventHub, '$emit');
  });

  afterEach(() => {
    mocks.$eventHub.$emit.restore();
  });

  it('renders the button with correct translated text', () => {
    const wrapper = shallowMount(LobbyHeaderDigitalPay, {
      localVue,
      mocks,
    });

    const button = wrapper.find('button');
    expect(button.exists()).to.be.true;
    expect(button.text()).to.equal('noVoucherDeposit');
  });

  it('emits "switchToApplicationOk" with DIGITAL_PAY when clicked', async () => {
    const wrapper = shallowMount(LobbyHeaderDigitalPay, {
      localVue,
      mocks,
    });

    await wrapper.find('button').trigger('click');

    expect(mocks.$eventHub.$emit.calledOnceWith('switchToApplicationOk', HALApplicationTypes.DIGITAL_PAY)).to.be.true;
  });
});
