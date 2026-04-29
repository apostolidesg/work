import sinon from 'sinon';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import FireblazeSelections from '../../../../src/components/lobby/games/fireblaze/sideScreen/FireblazeSelections.vue';

describe('FireblazeSelections', () => {
  Vue.prototype.$eventHub = new Vue();
  let localVue;
  let sandbox;
  let stubs;
  let propsData;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();

    stubs = {
      BaseClearButton: {
        name: 'BaseClearButton',
        template: '<button></button>',
        props: ['theme', 'disabled'],
        emits: ['click'],
      },
    };

    propsData = {
      board: {
        panels: [{ selection: [3, 7, 15, 22] }],
        betType: '1',
        isEmpty: sandbox.stub().returns(false),
      },
      selected: true,
      cost: 10,
      index: 1,
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render the component', () => {
    const wrapper = shallowMount(FireblazeSelections, { localVue, stubs, propsData });
    expect(wrapper.exists()).to.be.true;
  });

  it('should display the correct cost amount', () => {
    const wrapper = shallowMount(FireblazeSelections, { localVue, stubs, propsData });
    expect(wrapper.find('.fireblaze-selections__header-cost').text()).to.equal('10€');
  });

  it('should display the correct system label', () => {
    const wrapper = shallowMount(FireblazeSelections, { localVue, stubs, propsData });
    expect(wrapper.find('.fireblaze-selections__header-system').text()).to.equal('Αριθμός');
  });

  it('should display the correct main numbers', () => {
    const wrapper = shallowMount(FireblazeSelections, { localVue, stubs, propsData });
    const numberElements = wrapper.findAll('.fireblaze-selections__number');
    expect(numberElements.length).to.equal(4);
    expect(numberElements.at(0).text()).to.equal('3');
    expect(numberElements.at(1).text()).to.equal('7');
    expect(numberElements.at(2).text()).to.equal('15');
    expect(numberElements.at(3).text()).to.equal('22');
  });

  it('should emit delete event when BaseClearButton is clicked', () => {
    const wrapper = shallowMount(FireblazeSelections, { localVue, stubs, propsData });
    wrapper.findComponent({ name: 'BaseClearButton' }).vm.$emit('click');
    expect(wrapper.emitted('delete')).to.be.ok;
  });

  it('should emit select event when selection is clicked', () => {
    const wrapper = shallowMount(FireblazeSelections, { localVue, stubs, propsData });
    wrapper.find('.fireblaze-selections__wrapper').trigger('click');
    expect(wrapper.emitted('select')).to.be.ok;
  });

  it('should disable delete button when board is empty and index is 0', () => {
    propsData.board.isEmpty.returns(true);
    propsData.index = 0;
    const wrapper = shallowMount(FireblazeSelections, { localVue, stubs, propsData });
    expect(wrapper.findComponent({ name: 'BaseClearButton' }).props('disabled')).to.be.true;
  });
});
