import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import BettingAmount from '../../../src/components/common/BettingAmount';

describe('BettingAmount component', () => {
  const tSpy = sinon.spy();

  const stubs = {
    SquareButton: {
      name: 'SquareButton',
      template: '<div></div>',
      props: ['disabled', 'number', 'active', 'theme'],
    },
  };

  const mocks = {
    $t: tSpy,
  };

  afterEach(() => {
    tSpy.resetHistory();
  });

  const propsData = {
    multipliers: [1, 2, 3, 4, 5],
    basicBettingAmount: 2,
    selectedMultipliers: [],
  };

  it('should render the available betting amounts', () => {
    const wrapper = shallowMount(BettingAmount, { propsData, stubs });
    const btns = wrapper.findAllComponents({ name: stubs.SquareButton.name });
    expect(btns.length).to.eq(propsData.multipliers.length);
  });

  it('should disable the options if the component is disabled', () => {
    const wrapper = shallowMount(BettingAmount, { propsData: { ...propsData, disabled: true }, stubs });
    const btns = wrapper.findAllComponents({ name: stubs.SquareButton.name });
    for (let i = 0; i < btns.length; i++) {
      expect(btns.at(i).props().disabled).to.be.true;
    }
  });

  it('should set the options based in the multipliers and the basicBettingAmount', () => {
    const wrapper = shallowMount(BettingAmount, { propsData, stubs });
    const btns = wrapper.findAllComponents({ name: stubs.SquareButton.name });
    for (let i = 0; i < btns.length; i++) {
      expect(btns.at(i).props().number).to.eql(propsData.multipliers[i] * propsData.basicBettingAmount);
    }
  });

  it('should present the options as selected based on the selectedMultipliers prop', () => {
    const wrapper = shallowMount(BettingAmount, { propsData: { ...propsData, selectedMultipliers: [1, 3, 5] }, stubs });
    const btns = wrapper.findAllComponents({ name: stubs.SquareButton.name });

    const selectedBtns = [btns.at(0), btns.at(2), btns.at(4)];
    const unselectedBtns = [btns.at(1), btns.at(3)];

    for (let i = 0; i < selectedBtns.length; i++) {
      expect(selectedBtns[i].props().active).to.be.true;
    }

    for (let i = 0; i < unselectedBtns.length; i++) {
      expect(unselectedBtns[i].props().active).to.be.false;
    }
  });

  it('should emit an update-multipliers event when an option is selected', () => {
    const wrapper = shallowMount(BettingAmount, { propsData: { ...propsData, selectedMultipliers: [1, 3, 5] }, stubs });
    const btns = wrapper.findAllComponents({ name: stubs.SquareButton.name });

    btns.at(1).vm.$emit('square-button-clicked');

    expect(wrapper.emitted('update-multipliers')[0][0]).to.eql(propsData.multipliers[1]);
  });

  it('should use the theme prop to render the options', () => {
    const wrapper = shallowMount(BettingAmount, { propsData: { ...propsData, theme: 'light-blue' }, stubs });
    const btns = wrapper.findAllComponents({ name: stubs.SquareButton.name });

    for (let i = 0; i < btns.length; i++) {
      expect(btns.at(i).props().theme).to.eql('light-blue');
    }
  });

  it('should call the translation service to get the title', () => {
    shallowMount(BettingAmount, { propsData, stubs, mocks });

    expect(tSpy.calledWith('multiplier')).to.be.true;
  });
});
