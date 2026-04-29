import { shallowMount } from '@vue/test-utils';
import BetSelections from '../../../src/components/lobby/games/kino/sidescreen/BetSelections.vue';
import OptionDialog from '../../../src/components/modals/OptionDialog.vue';
import Betslip from '../../../src/model/Betslip';
import BetObj from '../../../src/model/Bet';

describe('BetSelections', () => {
  let propsData;
  let stubs;

  beforeEach(() => {
    propsData = {
      bet_area: {
        pickedNumbers: [1, 2, 3, 4, 5],
      },
      id: 1,
    };

    stubs = {
      BaseClearButton: {
        name: 'BaseClearButton',
        template: '<button></button>',
        props: ['disabled'],
        emits: ['click'],
      },
    };
  });

  it('should render the component', () => {
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    expect(wrapper.exists()).to.be.true;
  });

  it('should render a delete button disabled if no numbers are selected', () => {
    propsData.bet_area.pickedNumbers = [];
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    const deleteButton = wrapper.findComponent({ name: stubs.BaseClearButton.name });
    expect(deleteButton.exists()).to.be.true;
    expect(deleteButton.props().disabled).to.be.true;
  });

  it('should render a delete button enabled if numbers are selected', () => {
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    const deleteButton = wrapper.findComponent({ name: stubs.BaseClearButton.name });
    expect(deleteButton.exists()).to.be.true;
    expect(deleteButton.props().disabled).to.be.false;
  });

  it('should render the selected numbers', () => {
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    const selectedNumbers = wrapper.findAll('.kino-preview-number');
    expect(selectedNumbers.length).to.equal(propsData.bet_area.pickedNumbers.length);
  });

  it('should render the bet amount', () => {
    propsData.bet_area.value = 10;
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    const betAmount = wrapper.find('.kino-preview-info__amount-value');
    expect(betAmount.text()).to.equal('10,00€');
  });

  it('should render the kinobunus indicator when selected', () => {
    propsData.bet_area.kinoBonusActive = true;
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    const kinoBonus = wrapper.find('#sidescreen_preview_bet_1_kinoBonus');
    expect(kinoBonus.isVisible()).to.be.true;
  });

  it('should not show the kinobunus indicator when not selected', () => {
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    const kinoBonus = wrapper.find('#sidescreen_preview_bet_1_kinoBonus');
    expect(kinoBonus.isVisible()).to.be.false;
  });

  it('should render the kinoClose2Win indicator when selected', () => {
    propsData.bet_area.kinoClose2WinActive = true;
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    const kinoBonus = wrapper.find('#sidescreen_preview_bet_1_kinoClose2Win');
    expect(kinoBonus.isVisible()).to.be.true;
  });

  it('should not show the kinoClose2Win indicator when not selected', () => {
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    const kinoBonus = wrapper.find('#sidescreen_preview_bet_1_kinoClose2Win');
    expect(kinoBonus.isVisible()).to.be.false;
  });

  it('should emit a click event when the component is clicked', () => {
    const wrapper = shallowMount(BetSelections, {
      propsData,
      stubs,
    });

    wrapper.trigger('click');
    expect(wrapper.emitted('click')).to.exist;
  });
});
