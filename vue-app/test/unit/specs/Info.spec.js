import { createLocalVue, shallowMount } from '@vue/test-utils';
import Info from '../../../src/components/modals/InfoModalScrollable.vue';
import modalEventConstants from '../../../src/util/modalEventConstants';
import Vue from 'vue';

describe('Info.vue', () => {
  Vue.prototype.$eventHub = new Vue();
  const instance = new Vue();
  const localVue = createLocalVue();
  let wrapper;
  const event = {
    title: 'Test Title',
    message: 'This is a test title.',
  };

  const stubs = {
    InfoModalWrapper: {
      name: 'InfoModalWrapper',
      template: '<div><slot name="header"></slot><slot name="body"></slot></div>',
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(Info, {
      localVue,
      stubs,
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it('should be visible when a new event has been received', () => {
    instance.$eventHub.$emit(modalEventConstants.OPEN.INFO_SCROLLABLE, event);
    expect(wrapper.vm.isVisible).to.be.true;
  });

  it("should close when 'X' button is pressed", () => {
    instance.$eventHub.$emit(modalEventConstants.OPEN.INFO_SCROLLABLE, event);
    wrapper.findComponent({ name: stubs.InfoModalWrapper.name }).vm.$emit('close');
    expect(wrapper.vm.isVisible).to.be.false;
    expect(wrapper.vm.event).to.be.null;
  });
});
