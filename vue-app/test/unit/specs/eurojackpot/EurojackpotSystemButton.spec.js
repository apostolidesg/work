import EurojackpotSystemButton from '../../../../src/components/lobby/games/eurojackpot/settings/EurojackpotSystemButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('In EurojackpotSystemButton.vue component', () => {
  let propsData;
  let slots;

  beforeEach(() => {
    propsData = {
      active: false,
    };

    slots = {
      default: '45',
    };
  });

  it('should render the number in the default slot with deactivate style', () => {
    const wrapper = shallowMount(EurojackpotSystemButton, { propsData, slots });
    const buttonElm = wrapper.find('.eurojackpot-system-button');

    expect(buttonElm.exists()).to.be.true;
    expect(wrapper.text()).to.contain('45');
  });

  it('should render the number in the default slot with activate style', () => {
    const wrapper = shallowMount(EurojackpotSystemButton, {
      propsData: { ...propsData, active: true },
      slots,
    });
    const activeButtonElm = wrapper.find('.eurojackpot-system-button--active');

    expect(activeButtonElm.exists()).to.be.true;
    expect(wrapper.text()).to.contain('45');
  });

  it('emits click event when button is clicked', async () => {
    const wrapper = shallowMount(EurojackpotSystemButton, { propsData, slots });
    const button = wrapper.find('.eurojackpot-system-button');

    await button.trigger('click');

    expect(wrapper.emitted('click')).to.be.ok;
  });
});
