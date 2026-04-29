import { createLocalVue, shallowMount } from '@vue/test-utils';
import Warning from '../../../src/components/modals/InfoModal.vue';
import Vue from 'vue';
import modalEventConstants from '../../../src/util/modalEventConstants';

describe('Warning.vue', () => {
  Vue.prototype.$eventHub = new Vue();
  const instance = new Vue();
  const localVue = createLocalVue();
  let wrapper;
  const event = {
    title: 'Test Title',
    message: 'This is a test title.',
  };

  const EVENT_DEFAULTS = {
    title: '',
    type: '',
    icon: null,
    message: null,
  };

  beforeEach(() => {
    wrapper = shallowMount(Warning, {
      localVue,
      mocks: {
        InfoModalWrapper: {
          name: 'InfoModalWrapper',
          template: '<span></span>',
        },
      },
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it('should be visible when a new event has been received', () => {
    instance.$eventHub.$emit(modalEventConstants.OPEN.INFO, event);
    expect(wrapper.vm.isVisible).to.be.true;
  });

  it("should close when 'X' button is pressed", () => {
    instance.$eventHub.$emit(modalEventConstants.OPEN.INFO, event);
    wrapper.findComponent({ name: 'InfoModalWrapper' }).vm.$emit('close');
    expect(wrapper.vm.isVisible).to.be.false;
    expect(wrapper.vm.event).to.eql(EVENT_DEFAULTS);
  });
});
