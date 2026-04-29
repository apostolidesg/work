import { shallowMount } from '@vue/test-utils';
import QuickbetsPanel from '@/components/digitalAssistant/Quickbets.vue';

describe('QuickbetsPanel.vue', () => {
  let wrapper;

  const factory = (propsData = {}) => {
    return shallowMount(QuickbetsPanel, {
      propsData,
      stubs: {
        QuickbetsHeader: { template: '<div class="stub-header"></div>' },
        QuickbetsCards: { template: '<div class="stub-cards"></div>' },
        QuickbetsFooter: { template: '<div class="stub-footer"></div>' },
      },
    });
  };

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it('renders default theme when no prop is provided', () => {
    wrapper = factory();
    expect(wrapper.classes()).to.include('quickbets--kino');
  });

  it('renders QuickbetsHeader component', () => {
    wrapper = factory();
    expect(wrapper.find('.stub-header').exists()).to.be.true;
  });

  it('renders QuickbetsCards component', () => {
    wrapper = factory();
    expect(wrapper.find('.stub-cards').exists()).to.be.true;
  });
  

  it('renders QuickbetsFooter component', () => {
    wrapper = factory();
    expect(wrapper.find('.stub-footer').exists()).to.be.true;
  });
});
