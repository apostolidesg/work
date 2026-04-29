import { shallowMount } from '@vue/test-utils';
import EurojackpotSelections from '../../../../src/components/lobby/games/eurojackpot/sidescreen/EurojackpotSelections.vue';
import { expect } from 'chai';
import sinon from 'sinon';

describe('EurojackpotSelections', () => {
  let stubs;
  let propsData;
  let tStub;
  let isBoardEmptyStub;
  let mocks;

  beforeEach(() => {
    tStub = sinon.stub();
    isBoardEmptyStub = sinon.stub().returns(false);
    tStub.withArgs('eurojackpot.systemLabel', { system: '45' }).returns('S45');

    stubs = {
      BaseClearButton: {
        name: 'BaseClearButton',
        template: `<button class="base-clear-button" @click="$listeners['click']"></button>`,
      },
    };

    propsData = {
      board: {
        panels: [{ selection: [1, 2, 3] }, { selection: [4, 5] }],
        isEmpty: isBoardEmptyStub,
      },
      selected: false,
      cost: 10,
      index: 0,
    };

    mocks = {
      $t: tStub,
    };
  });

  afterEach(() => {
    tStub.resetBehavior();
    isBoardEmptyStub.resetBehavior();
  });

  it('renders the component with selected class when selected prop is true', () => {
    const wrapper = shallowMount(EurojackpotSelections, {
      propsData: {
        ...propsData,
        selected: true,
      },
      stubs,
      mocks,
    });
    expect(wrapper.classes('eurojackpot-selections--selected')).to.be.true;
  });

  it('renders the component with unselected class when selected prop is false', () => {
    const wrapper = shallowMount(EurojackpotSelections, { propsData, stubs });
    expect(wrapper.classes('eurojackpot-selections--unselected')).to.be.true;
  });

  it('emits "select" event when clicked', async () => {
    const wrapper = shallowMount(EurojackpotSelections, { propsData, stubs });
    const clickableWrapper = wrapper.find('.eurojackpot-selections__wrapper');
    await clickableWrapper.trigger('click');
    expect(wrapper.emitted()).to.have.property('select');
  });

  it('emits "delete" event when BaseClearButton clicked', async () => {
    const wrapper = shallowMount(EurojackpotSelections, { propsData, stubs });
    const clearButton = wrapper.findComponent(stubs.BaseClearButton);
    await clearButton.trigger('click');
    expect(wrapper.emitted()).to.have.property('delete');
  });

  it('renders the cost with the correct value', () => {
    const wrapper = shallowMount(EurojackpotSelections, { propsData, stubs, mocks });
    const costValue = wrapper.find('.eurojackpot-selections__header-cost');
    expect(costValue.text()).to.contain('10€');
  });

  it('renders the system with the correct value', () => {
    const wrapper = shallowMount(EurojackpotSelections, {
      propsData: { ...propsData, board: { ...propsData.board, systemId: '45' } },
      stubs,
      mocks,
    });

    const systemValue = wrapper.find('.eurojackpot-selections__header-system');
    expect(systemValue.text()).to.contain('S45');
  });

  it('renders the right amount of numbers', () => {
    const wrapper = shallowMount(EurojackpotSelections, { propsData, stubs });
    const numberButtons = wrapper.findAll('.eurojackpot-selections__number');
    expect(numberButtons.length).to.be.eql(
      propsData.board.panels[0].selection.length + propsData.board.panels[1].selection.length
    );
  });

  it('renders the proper main numbers', () => {
    const wrapper = shallowMount(EurojackpotSelections, { propsData, stubs });
    const numberButtons = wrapper.findAll('.eurojackpot-selections__number--main');
    propsData.board.panels[0].selection.forEach((number, index) => {
      const button = numberButtons.at(index);
      expect(button.text()).to.be.eql(number.toString());
    });
  });

  it('renders the proper euro numbers', () => {
    const wrapper = shallowMount(EurojackpotSelections, { propsData, stubs });
    const numberButtons = wrapper.findAll('.eurojackpot-selections__number--euro');
    propsData.board.panels[1].selection.forEach((number, index) => {
      const button = numberButtons.at(index);
      expect(button.text()).to.be.eql(number.toString());
    });
  });
});
