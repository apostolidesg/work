import { shallowMount } from '@vue/test-utils';
import NumberSelection from '../../../src/components/lobby/games/Powerspin/MainScreen/NumberSelection.vue';

describe('NumberSelection', () => {
  let propsData;
  let stubs;

  beforeEach(() => {
    propsData = {
      showHeader: true,
      isStreched: true,
      textTheme: 'black',
      idSuffix: 'sufix',
      numberBoardPanel: {
        requested: [1],
        selection: [1, 2],
      },
    };
    stubs = {
      RandomButton: {
        name: 'RandomButton',
        props: ['theme'],
        template: '<div class="random-button-stab"></div>',
      },
      RoundedBorderedButton: {
        name: 'RoundedBorderedButton',
        props: ['theme', 'textTheme', 'value', 'active'],
        template: '<div class="rounded-bordered-button-stab"></div>',
      },
    };
  });
  it('should render RoundedBorderedButton components', () => {
    const wrapper = shallowMount(NumberSelection, { stubs, propsData });
    expect(wrapper.findAll('.rounded-bordered-button-stab')).to.have.length(31);
  });
  it('should not render the RandomButton component if there is no listener on the random-pick-click event', () => {
    const wrapper = shallowMount(NumberSelection, { stubs, propsData });
    expect(wrapper.find('.random-button-stab').exists()).to.be.false;
  });
  it('should render the RandomButton component if there is listener on the random-pick-click event', () => {
    const wrapper = shallowMount(NumberSelection, { stubs, propsData, listeners: { 'random-pick-click': () => {} } });
    expect(wrapper.find('.random-button-stab').exists()).to.be.true;
  });
  it('should have the proper RoundedBorderedButton components active', () => {
    const wrapper = shallowMount(NumberSelection, { stubs, propsData });
    const roundedBorderedButtons = wrapper.findAllComponents({ name: stubs.RoundedBorderedButton.name });
    const expectedActiveButtons = [0, 7, 8];
    const expectedInactiveButton = [...Array(31).keys()].filter(index => !expectedActiveButtons.includes(index));

    expectedActiveButtons.forEach(index => expect(roundedBorderedButtons.at(index).props().active).to.be.true);
    expectedInactiveButton.forEach(index => expect(roundedBorderedButtons.at(index).props().active).to.be.false);
  });
  it('should emit a requested-number-click event when a requested number is clicked', () => {
    const wrapper = shallowMount(NumberSelection, { stubs, propsData });
    const roundedBorderedButtons = wrapper.findAllComponents({ name: stubs.RoundedBorderedButton.name });
    roundedBorderedButtons.at(0).vm.$emit('click');
    expect(wrapper.emitted('requested-number-click')[0]).to.eql([1]);
  });
  it('should emit a column-number-click event when a selected number is clicked', () => {
    const wrapper = shallowMount(NumberSelection, { stubs, propsData });
    const roundedBorderedButtons = wrapper.findAllComponents({ name: stubs.RoundedBorderedButton.name });
    roundedBorderedButtons.at(7).vm.$emit('click');
    expect(wrapper.emitted('column-number-click')[0]).to.eql([1]);
  });
  it('should emit a random-pick-click event when RandomButton is clicked', () => {
    const wrapper = shallowMount(NumberSelection, { stubs, propsData, listeners: { 'random-pick-click': () => {} } });
    wrapper.findComponent({ name: stubs.RandomButton.name }).vm.$emit('random-button-clicked');
    expect(wrapper.emitted()['random-pick-click']).not.to.be.undefined;
  });
});
