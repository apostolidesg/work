import { shallowMount } from '@vue/test-utils';
import ConsecutiveDraws from '../../../src/components/common/ConsecutiveDraws';
import sinon from 'sinon';

describe('ConsecutiveDraws Component', () => {
  let propsData;
  let stubs;
  let mocks;

  beforeEach(() => {
    propsData = {
      multipleDraws: 1,
    };
    stubs = {
      MinusPlusButton: {
        name: 'MinusPlusButton',
        props: ['type'],
        template: '<div class="minus-plus-button-stub"></div>',
      },
      ConsDrawsCalcPad: {
        name: 'ConsDrawsCalcPad',
        props: ['targetElement'],
        template: `<div class="cons-draws-calc-stub" @update-consecutive-draws="$listeners['update-consecutive-draws']"></div>`,
      },
    };
    mocks = {
      $t: sinon.stub().callsFake(() => {
        return 'consecutive_draws_text';
      }),
    };
  });
  it('should render the MinusPlusButton component and triggers the events', async () => {
    const wrapper = shallowMount(ConsecutiveDraws, { propsData, stubs, mocks });
    const MinusPlusButton = wrapper.findAllComponents({ name: stubs.MinusPlusButton.name });
    await MinusPlusButton.at(0).trigger('click');
    expect(wrapper.vm.consecutiveDraws).to.equal(1);
    wrapper.vm.increaseConsecutiveDraws();
    expect(wrapper.vm.consecutiveDraws).to.equal(1);
    wrapper.vm.consecutiveDraws = 2;
    wrapper.vm.decreaseConsecutiveDraws();
    expect(wrapper.vm.consecutiveDraws).to.equal(1);
    expect(wrapper.emitted('update-consecutive-draws')[0][0]).to.equal(2);
    expect(MinusPlusButton.at(0).exists()).to.be.true;
    expect(MinusPlusButton.at(0).props('type')).to.equal('minus');
    expect(MinusPlusButton.at(1).exists()).to.be.true;
    expect(MinusPlusButton.at(1).props('type')).to.equal('plus');
  });
  it('should render the ConsDrawsCalcPad component', () => {
    const wrapper = shallowMount(ConsecutiveDraws, { propsData, stubs, mocks });
    wrapper.findComponent({ name: stubs.ConsDrawsCalcPad.name }).vm.$emit('update-consecutive-draws');
    expect(wrapper.findComponent({ name: stubs.ConsDrawsCalcPad.name }).exists()).to.be.true;
  });
  it('should render the ConsecutiveDraws header text', () => {
    const wrapper = shallowMount(ConsecutiveDraws, { propsData, stubs, mocks });
    const element = wrapper.find('.consecutive-draws__header');
    expect(element.exists()).to.be.true;
    expect(element.text()).to.be.equal('consecutive_draws_text');
  });
});
