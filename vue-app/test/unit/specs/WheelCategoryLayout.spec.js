import { shallowMount } from '@vue/test-utils';
import WheelCategoryRow from '../../../src/components/common/WheelCategoryLayout.vue';
import sinon from 'sinon';

describe('WheelCategoryRow', () => {
  let propsData;
  let stubs;
  let mocks;

  beforeEach(() => {
    propsData = {
      title: 'Test',
      showBettingAmount: true,
      selectedMultipliers: [],
      betslip: {},
      multipliers: [],
      textTheme: 'white',
    };
    stubs = {
      BettingAmount: {
        props: ['textTheme'],
        template: '<div class="betting-amount-stab"></div>',
      },
    };
    mocks = {
      $t: sinon.stub().callsFake(() => {
        return 'Test';
      }),
    };
  });
  it('should render title', () => {
    const wrapper = shallowMount(WheelCategoryRow, { mocks, stubs, propsData });
    expect(wrapper.text()).to.be.equal('Test');
  });
  it('should render BettingAmount component', () => {
    const wrapper = shallowMount(WheelCategoryRow, { mocks, stubs, propsData });
    expect(wrapper.find('.betting-amount-stab').exists()).to.be.true;
  });
  it('should not render BettingAmount component', () => {
    propsData.showBettingAmount = false;
    const wrapper = shallowMount(WheelCategoryRow, { mocks, stubs, propsData });
    expect(wrapper.find('.betting-amount-stab').exists()).to.be.false;
  });
});
