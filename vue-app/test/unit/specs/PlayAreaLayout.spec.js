import PlayAreaLayout from '../../../src/components/common/layouts/PlayAreaLayout.vue';
import { shallowMount } from '@vue/test-utils';

describe('PlayAreaLayout Component', () => {
  it('should render the default slot', () => {
    const wrapper = shallowMount(PlayAreaLayout, {
      slots: {
        default: '<div class="test-default-slot"></div>',
      },
    });

    const defaultSlotWrapper = wrapper.find('.play-area-layout__play-area');

    expect(defaultSlotWrapper.find('.test-default-slot').exists()).to.be.true;
  });

  it('should render the sidescreen slot', () => {
    const wrapper = shallowMount(PlayAreaLayout, {
      slots: {
        sidescreen: '<div class="test-sidescreen-slot"></div>',
      },
    });

    const sidescreenSlotWrapper = wrapper.find('.play-area-layout__side-screen');

    expect(sidescreenSlotWrapper.find('.test-sidescreen-slot').exists()).to.be.true;
  });

  it('should render the settings slot', () => {
    const wrapper = shallowMount(PlayAreaLayout, {
      slots: {
        settings: '<div class="test-settings-slot"></div>',
      },
    });

    const settingsSlotWrapper = wrapper.find('.play-area-layout__settings');

    expect(settingsSlotWrapper.find('.test-settings-slot').exists()).to.be.true;
  });

  it('should not render the settings wrapper if there is no such slot', () => {
    const wrapper = shallowMount(PlayAreaLayout, {
      slots: {
        default: '<div class="test-default-slot"></div>',
      },
    });

    const settingsSlotWrapper = wrapper.find('.play-area-layout__settings');

    expect(settingsSlotWrapper.exists()).to.be.false;
  });
});
