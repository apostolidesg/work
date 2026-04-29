import { createLocalVue, shallowMount } from '@vue/test-utils';
import OptionDialog from '../../../src/components/modals/OptionDialog.vue';
import Vue from 'vue';
import modalEventConstants from '../../../src/util/modalEventConstants';
import sinon from 'sinon';

describe('OptionDialog.vue', () => {
  Vue.prototype.$eventHub = new Vue();
  const instance = new Vue();
  const localVue = createLocalVue();
  let wrapper;

  const stubs = {
    InfoModalFooterButton: {
      name: 'InfoModalFooterButton',
      template: '<div><slot></slot></div>',
    },
    InfoModalWrapper: {
      name: 'InfoModalWrapper',
      template: '<div><slot name="body"></slot><slot name="footer"></slot></div>',
    },
    InfoModalBodyDefault: {
      name: 'InfoModalBodyDefault',
      template: '<div></div>',
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(OptionDialog, {
      localVue,
      stubs,
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it('should be visible when a new event has been received', () => {
    const event = {
      title: 'Test Title',
      message: 'This is a test title.',
      icon: 'icon',
      callback() {},
    };
    instance.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, event);
    expect(wrapper.vm.isVisible).to.be.true;
  });

  it('should close when No button is pressed', () => {
    const event = {
      title: 'Test Title',
      message: 'This is a test title.',
      icon: 'icon',
      callback() {},
    };
    instance.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, event);

    wrapper
      .findAllComponents({ name: stubs.InfoModalFooterButton.name })
      .at(0)
      .vm.$emit('click');
    expect(wrapper.vm.isVisible).to.be.false;
    expect(wrapper.vm.event).to.be.null;
  });

  it('should close and execute the callback function when Yes button is pressed', () => {
    const cb = sinon.spy();

    const event = {
      title: 'Test Title',
      message: 'This is a test title.',
      icon: 'icon',
    };
    instance.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, event, () => cb());
    wrapper
      .findAllComponents({ name: stubs.InfoModalFooterButton.name })
      .at(1)
      .vm.$emit('click');
    expect(wrapper.vm.isVisible).to.be.false;
    expect(Object.keys(wrapper.vm.event).length).to.eql(0);
    expect(cb.called).to.true;
  });
});
