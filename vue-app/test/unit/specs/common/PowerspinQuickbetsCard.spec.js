import { shallowMount } from '@vue/test-utils';
import PowerspinQuickbetsCards from '@/components/common/Quickbets/PowerspinQuickbetsCard.vue';
import PowerspinConstants from '@/util/powerspinConstants';
import betslipUtils from '@/util/betslipUtils';
import sinon from 'sinon';

describe('PowerspinQuickbetsCards.vue', () => {
  let mocks;
  let betslip;
  let card;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mocks = {
      $t: sandbox.stub().callsFake((key) => key),
    };

    card = { type: PowerspinConstants.GAME_CATEGORY.NUMBER };

    betslip = {
      wager: {
        wheels: [
          {
            getNumberBoard: () => ({ panels: [{ selection: [1, 2, 3] }] }),
            getSymbolBoard: () => [{}],
            getOverUnderBoards: () => [{}],
            getColorBoards: () => [{ betType: PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN }],
            categories: {
              [PowerspinConstants.GAME_CATEGORY.NUMBER]: { boards: [{ multipliers: [1] }], multipliers: [1] },
              [PowerspinConstants.GAME_CATEGORY.SYMBOL]: { boards: [{ multipliers: [1] }], multipliers: [1] },
              [PowerspinConstants.GAME_CATEGORY.COLOR]: { boards: [{ multipliers: [1] }], multipliers: [1] },
              [PowerspinConstants.GAME_CATEGORY.OVER_UNDER]: { boards: [{ multipliers: [1] }], multipliers: [1] },
            },
          },
        ],
        participatingDraws: { multipleDraws: 2 },
      },
    };

    sandbox.stub(betslipUtils, 'isWheelCategoryEmpty').returns(false);
    sandbox.stub(betslipUtils, 'calculateCategoryColumnsNumber').returns(1);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders number selections with color classes', () => {
    const wrapper = shallowMount(PowerspinQuickbetsCards, { propsData: { card, betslip }, mocks });
    const numbers = wrapper.findAll('.powerspin-quickbets-cards__card-price-number');
    expect(numbers.length).to.equal(3);
    expect(numbers.at(0).text()).to.equal('1');
  });

  it('renders symbol image if SYMBOL board is not empty', () => {
    card.type = PowerspinConstants.GAME_CATEGORY.SYMBOL;
    const wrapper = shallowMount(PowerspinQuickbetsCards, { propsData: { card, betslip }, mocks });
    expect(wrapper.find('.powerspin-quickbets-cards__symbol').exists()).to.be.true;
  });

  it('renders color block if COLOR board is not empty', () => {
    card.type = PowerspinConstants.GAME_CATEGORY.COLOR;
    const wrapper = shallowMount(PowerspinQuickbetsCards, { propsData: { card, betslip }, mocks });
    expect(wrapper.find('.powerspin-quickbets-cards__color').exists()).to.be.true;
    expect(wrapper.find('.powerspin-quickbets-cards__color').text()).to.equal('powerspinColorCategories.green');
  });
});
