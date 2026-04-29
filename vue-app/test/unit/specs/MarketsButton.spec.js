import { shallowMount } from '@vue/test-utils';
import MarketsButton from '../../../src/components/common/MarketsButton.vue';
import sinon from 'sinon';
import Vue from 'vue';

describe('MarketsButton component', () => {
  Vue.prototype.$eventHub = new Vue();
  let stubs;
  let propsData;
  let mocks;

  beforeEach(() => {
    propsData = {
      active: true,
    };

    mocks = {
      $t: sinon.stub().callsFake(() => {
        return 'ΕΠΙΠΛΕΟΝ ΑΓΟΡΕΣ';
      }),
    };
  });

  it('renders button with active class when active prop is true', () => {
    const wrapper = shallowMount(MarketsButton, { stubs, propsData, mocks });
    expect(wrapper.classes()).contain('button_active');
  });

  it('renders button with active class when inactive prop is false', () => {
    const wrapper = shallowMount(MarketsButton, {
      stubs,
      mocks,
      propsData: {
        active: false,
      },
    });

    expect(wrapper.classes()).contain('button_inactive');
  });

  it('emits click event when button is clicked', () => {
    const wrapper = shallowMount(MarketsButton, { stubs, propsData, mocks });
    const emitStub = sinon.stub(wrapper.vm, '$emit');

    wrapper.trigger('click');

    expect(emitStub.calledOnceWith('click')).to.be.true;
  });

  it('displays correct text inside the button', () => {
    const wrapper = shallowMount(MarketsButton, { stubs, propsData, mocks });
    expect(wrapper.find('.markets-button__text').text()).to.eq('ΕΠΙΠΛΕΟΝ ΑΓΟΡΕΣ');
  });
});
