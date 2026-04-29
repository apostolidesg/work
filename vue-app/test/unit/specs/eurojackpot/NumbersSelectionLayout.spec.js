import NumbersSelectionLayout from '../../../../src/components/lobby/games/eurojackpot/mainscreen/NumbersSelectionLayout.vue';
import { shallowMount } from '@vue/test-utils';

describe('NumbersSelectionLayout', () => {
  it('should render correct contents on the default slot', () => {
    const wrapper = shallowMount(NumbersSelectionLayout, {
      slots: {
        default: '<div class="test">Test</div>',
      },
    });

    const defaultSlotWrapper = wrapper.find('.number-selection-layout__number-wrapper');

    expect(defaultSlotWrapper.exists()).to.be.true;
    expect(defaultSlotWrapper.text()).to.equal('Test');
  });

  it('should render correct contents on the titlePrefix slot', () => {
    const wrapper = shallowMount(NumbersSelectionLayout, {
      slots: {
        titlePrefix: '<div class="test">Test</div>',
      },
    });

    const prefixTextSlotWrapper = wrapper.find('.number-selection-layout__header-prefix');

    expect(prefixTextSlotWrapper.exists()).to.be.true;
    expect(prefixTextSlotWrapper.text()).to.equal('Test');
  });

  it('should render correct contents on the titleNumbers slot', () => {
    const wrapper = shallowMount(NumbersSelectionLayout, {
      slots: {
        titleNumbers: '<div class="test">Test</div>',
      },
    });

    const numbersTextSlotWrapper = wrapper.find('.number-selection-layout__header-numbers');

    expect(numbersTextSlotWrapper.exists()).to.be.true;
    expect(numbersTextSlotWrapper.text()).to.equal('Test');
  });
});
