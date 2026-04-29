import { shallowMount } from '@vue/test-utils';
import MarketsOptionsSelection from '../../../src/components/lobby/games/Powerspin/MainScreen/MarketsOptionsSelection';
import sinon from 'sinon';

describe('MarketsOptionsSelection', () => {
  let propsData;
  let stubs;
  let mocks;
  const tStub = sinon.stub();

  beforeEach(() => {
    propsData = {
      options: [
        { value: 1, title: 'option_1' },
        { value: 2, title: 'option_2' },
      ],
      optionsSelected: [1],
    };

    stubs = {
      RoundedBorderedButton: {
        name: 'RoundedBorderedButton',
        props: ['active', 'value'],
        template: '<div class="rounded-bordered-button-stub"></div>',
      },
    };

    mocks = {
      $t: tStub,
    };
  });

  afterEach(() => {
    tStub.resetBehavior();
  });

  it('should render the RoundedBorderedButtons based on the options prop', () => {
    const wrapper = shallowMount(MarketsOptionsSelection, { propsData, stubs, mocks });

    const btns = wrapper.findAllComponents({ name: stubs.RoundedBorderedButton.name });
    expect(btns.length).to.eq(2);
  });

  it('should add the correct title to each option', () => {
    tStub.withArgs(propsData.options[0].title).returns('Option 1');
    tStub.withArgs(propsData.options[1].title).returns('Option 2');
    const wrapper = shallowMount(MarketsOptionsSelection, { propsData, stubs, mocks });

    const btns = wrapper.findAllComponents({ name: stubs.RoundedBorderedButton.name });
    expect(btns.at(0).props().value).to.eql('Option 1');
    expect(btns.at(1).props().value).to.eql('Option 2');
  });

  it('should activate each option based on the optionsSelected prop', () => {
    const wrapper = shallowMount(MarketsOptionsSelection, { propsData, stubs, mocks });

    const btns = wrapper.findAllComponents({ name: stubs.RoundedBorderedButton.name });
    expect(btns.at(0).props().active).to.be.true;
    expect(btns.at(1).props().active).to.be.false;
  });

  it('should emit an option-clicked event when an options is clicked', () => {
    const wrapper = shallowMount(MarketsOptionsSelection, { propsData, stubs, mocks });
    const btns = wrapper.findAllComponents({ name: stubs.RoundedBorderedButton.name });
    btns.at(0).vm.$emit('click')

    expect(wrapper.emitted()['option-clicked'][0]).to.eql([propsData.options[0].value]);
  });
});
