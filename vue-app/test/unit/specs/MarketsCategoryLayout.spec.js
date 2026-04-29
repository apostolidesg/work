import { shallowMount } from '@vue/test-utils';
import MarketsCategoryLayout from '../../../src/components/lobby/games/Powerspin/MainScreen/MarketsCategoryLayout.vue';
import sinon from 'sinon';

describe('MarketsCategoryLayout', () => {
  let propsData;
  let stubs;
  let mocks;

  const tStub = sinon.stub();

  beforeEach(() => {
    propsData = {
      title: 'title-prop',
      selectedMultipliers: [1, 2],
      multipliers: [1, 2, 3, 4],
      disabledBettingAmount: false,
    };

    stubs = {
      BettingAmount: {
        name: 'BettingAmount',
        props: ['selected-multipliers', 'textTheme', 'multipliers', 'disabled'],
        template: '<div class="betting-amount-stab"></div>',
      },
    };

    mocks = {
      $t: tStub,
    };
  });

  afterEach(() => {
    tStub.resetBehavior();
  });

  it('should render the title', () => {
    tStub.withArgs(propsData.title).returns('Title');
    const wrapper = shallowMount(MarketsCategoryLayout, { propsData, stubs, mocks });
    const title = wrapper.find('.powerspin-markets-layout__title');

    expect(title.exists()).to.be.true;
    expect(title.text()).to.eq('Title');
  });

  it('should render the BettingAmount', () => {
    const wrapper = shallowMount(MarketsCategoryLayout, { propsData, stubs, mocks });
    const bettingAmount = wrapper.findComponent({ name: stubs.BettingAmount.name });

    expect(bettingAmount.exists()).to.be.true;
    expect(bettingAmount.props().selectedMultipliers).to.eql(propsData.selectedMultipliers);
    expect(bettingAmount.props().multipliers).to.eql(propsData.multipliers);
    expect(bettingAmount.props().disabled).to.eql(propsData.disabledBettingAmount);
  });

  it('should emit a update-multipliers event when the BettingAmount component emits one', () => {
    const wrapper = shallowMount(MarketsCategoryLayout, { propsData, stubs, mocks });
    const bettingAmount = wrapper.findComponent({ name: stubs.BettingAmount.name });
    bettingAmount.vm.$emit('update-multipliers', 2);

    expect(wrapper.emitted()['update-multipliers'][0]).to.eql([2]);
  });

  it('should render the slot component', () => {
    const wrapper = shallowMount(MarketsCategoryLayout, {
      propsData,
      stubs,
      mocks,
      slots: { default: '<div>Content</div>' },
    });

    const contentWrapper = wrapper.find('.powerspin-markets-layout__content');
    expect(contentWrapper.html()).to.contain('Content');
  });
});
