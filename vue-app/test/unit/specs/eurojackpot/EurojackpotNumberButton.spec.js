import EurojackpotNumberButton from '../../../../src/components/lobby/games/eurojackpot/mainscreen/EurojackpotNumberButton.vue';
import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';

describe('EurojackpotNumberButton', () => {
  let propsData;
  let slots;

  beforeEach(() => {
    propsData = {
      theme: 'main',
      active: false,
    };

    slots = {
      default: '1',
      info: '100',
    };
  });

  it('should render the number in the default slot', () => {
    const wrapper = shallowMount(EurojackpotNumberButton, { propsData, slots });
    const mainSlot = wrapper.find('.eurojackpot-number-button__number');

    expect(mainSlot.text()).to.contain('1');
  });

  it('should render the number in the info slot', () => {
    const wrapper = shallowMount(EurojackpotNumberButton, { propsData, slots });
    const infoSlot = wrapper.find('.eurojackpot-number-button__info');

    expect(infoSlot.text()).to.contain('100');
  });

  it('should not render the info slot wrapper if there in no info slot', () => {
    const wrapper = shallowMount(EurojackpotNumberButton, { propsData, slots: { default: '1' } });
    const infoSlot = wrapper.find('.eurojackpot-number-button__info');

    expect(infoSlot.exists()).to.be.false;
  });

  it('should render the main active class if the active prop is true', () => {
    const wrapper = shallowMount(EurojackpotNumberButton, { propsData: { ...propsData, active: true }, slots });
    const button = wrapper.find('.eurojackpot-number-button');

    expect(button.classes()).to.contain('eurojackpot-number-button--main-active');
  });

  it('should render the main class if the active prop is false', () => {
    const wrapper = shallowMount(EurojackpotNumberButton, { propsData, slots });
    const button = wrapper.find('.eurojackpot-number-button');

    expect(button.classes()).to.contain('eurojackpot-number-button--main');
  });

  it('should render the euro active class if the active prop is true and the theme is euro', () => {
    const wrapper = shallowMount(EurojackpotNumberButton, {
      propsData: { ...propsData, active: true, theme: 'euro' },
      slots,
    });
    const button = wrapper.find('.eurojackpot-number-button');

    expect(button.classes()).to.contain('eurojackpot-number-button--euro-active');
  });

  it('should render the euro class if the active prop is false and the theme is euro', () => {
    const wrapper = shallowMount(EurojackpotNumberButton, { propsData: { ...propsData, theme: 'euro' }, slots });
    const button = wrapper.find('.eurojackpot-number-button');

    expect(button.classes()).to.contain('eurojackpot-number-button--euro');
  });

  it('should emit an event when clicked', () => {
    const clickSpy = sinon.spy();
    const listeners = { click: clickSpy };

    const wrapper = shallowMount(EurojackpotNumberButton, { propsData, slots, listeners });
    const button = wrapper.find('.eurojackpot-number-button');

    button.trigger('click');

    expect(clickSpy.calledOnce).to.be.true;
  });
});
