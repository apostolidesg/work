import PowerspinConstants from '../../util/powerspin/Constants';
import Board from './Board';
import Utilities from '../../util/Utilities';
import Mappings from '../../util/Mappings';
import betslipUtils from '../../util/powerspin/BetslipUtils';

export default class Markets {
  constructor() {
    this.categories = {
      [PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL]: {
        type: PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL,
        boards: [new Board({ betType: PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL })],
      },
      [PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL]: {
        type: PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
        multipliers: [PowerspinConstants.DEFAULT_MULTIPLIERS],
        boards: [],
      },
      [PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER]: {
        type: PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER,
        multipliers: [PowerspinConstants.DEFAULT_MULTIPLIERS],
        boards: [],
      },
    };
  }

  getNumberOnWheelBoard() {
    return this.categories[PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0];
  }

  getWheelsWithSymbolBoards() {
    return this.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards;
  }

  getWheelsWithNumberBoards() {
    return this.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards;
  }

  getAllBoards() {
    return [this.getNumberOnWheelBoard(), ...this.getWheelsWithSymbolBoards(), ...this.getWheelsWithNumberBoards()];
  }

  isEmpty() {
    return !(
      PowerspinConstants.SINGLE_BOARD_MARKET_CATEGORIES.some(
        (gameCategory) => !this.categories[gameCategory].boards[0].isEmpty()
      ) ||
      PowerspinConstants.MULTIPLE_BOARD_MARKET_CATEGORIES.some(
        (gameCategory) => this.categories[gameCategory].boards.length !== 0
      )
    );
  }

  setNumberOnWheel(number) {
    if (
      number <= PowerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE &&
      number >= PowerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE
    ) {
      this.getNumberOnWheelBoard().panels[0].selection = Utilities.toggleNumberInArray(
        number,
        this.getNumberOnWheelBoard().panels[0].selection
      );
    }
  }

  toggleMarketGameType(betType) {
    const gameCategory = Mappings.POWERSPIN_BET_TYPE_TO_GAME_CATEGORY[betType];
    if (PowerspinConstants.MULTIPLE_BOARD_MARKET_CATEGORIES.includes(gameCategory)) {
      betslipUtils.toggleGameTypeOnMultiBoardCategory(this.categories[gameCategory], gameCategory, betType);
    }
  }

  toggleMultipliers(gameCategory, multipliers = PowerspinConstants.DEFAULT_MULTIPLIERS) {
    if (PowerspinConstants.SINGLE_BOARD_MARKET_CATEGORIES.includes(gameCategory)) {
      this.categories[gameCategory].boards[0].toggleMultipliers(multipliers);
    } else if (PowerspinConstants.MULTIPLE_BOARD_MARKET_CATEGORIES.includes(gameCategory)) {
      betslipUtils.toggleMultipliersOnMultiBoardCategory(this.categories[gameCategory], multipliers);
    }
  }

  reset() {
    Object.values(this.categories).forEach((category) => betslipUtils.resetMarketCategory(category));
  }
}
