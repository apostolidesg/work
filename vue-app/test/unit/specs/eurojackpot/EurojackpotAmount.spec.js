import { shallowMount } from '@vue/test-utils';
import EurojackpotAmount from '../../../../src/components/lobby/games/eurojackpot/mainscreen/EurojackpotAmount.vue';
import sinon from 'sinon';

describe('JackpotAmount component', () => {
  let propsData;
  let mocks;
  let tStub;

  beforeEach(() => {
    tStub = sinon.stub();

    propsData = {
      amount: 1000000,
    };

    mocks = {
      $t: tStub,
    };
  });

  afterEach(() => {
    tStub.resetHistory();
  });

  it('should render correct amount', () => {
    const wrapper = shallowMount(EurojackpotAmount, { propsData, mocks });
    const amount = wrapper.find('.jackpot-amount-content__number');

    expect(amount.text()).to.eq('€1.000.000');
  });

  describe('when the size is not defined (default small)', () => {
    it('should render the title for the small size', () => {
      tStub.withArgs('eurojackpot.jackpotAmountTitle.small').returns('JACKPOT');
      const wrapper = shallowMount(EurojackpotAmount, { propsData, mocks });
      const title = wrapper.find('.jackpot-amount-content__title');

      expect(title.text()).to.eq('JACKPOT');
    });

    it('should render the title with the "small" class', () => {
      const wrapper = shallowMount(EurojackpotAmount, { propsData, mocks });
      const title = wrapper.find('.jackpot-amount-content__title');

      expect(title.classes()).to.include('jackpot-amount-content__title--small');
    });

    it('should render the amount with the "small" class', () => {
      const wrapper = shallowMount(EurojackpotAmount, { propsData, mocks });
      const amount = wrapper.find('.jackpot-amount-content__number');

      expect(amount.classes()).to.include('jackpot-amount-content__number--small');
    });
  });

  describe('when the size is large', () => {
    beforeEach(() => {
      propsData.size = 'large';
    });

    it('should render the title for the large size', () => {
      tStub.withArgs('eurojackpot.jackpotAmountTitle.large').returns('PLAY FOR');
      const wrapper = shallowMount(EurojackpotAmount, { propsData, mocks });
      const title = wrapper.find('.jackpot-amount-content__title');

      expect(title.text()).to.eq('PLAY FOR');
    });

    it('should render the title with the "large" class', () => {
      const wrapper = shallowMount(EurojackpotAmount, { propsData, mocks });
      const title = wrapper.find('.jackpot-amount-content__title');

      expect(title.classes()).to.include('jackpot-amount-content__title--large');
    });

    it('should render the amount with the "large" class', () => {
      const wrapper = shallowMount(EurojackpotAmount, { propsData, mocks });
      const amount = wrapper.find('.jackpot-amount-content__number');

      expect(amount.classes()).to.include('jackpot-amount-content__number--large');
    });
  });
});
