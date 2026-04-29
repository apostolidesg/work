import powerspinConstants from '../../util/powerspinConstants';
import Board from './Board';
import Utilities from '../../util/Utilities';
import Mappings from '../../util/Mappings';
import betslipUtils from '../../util/betslipUtils';

export default class Markets {
  constructor() {
    this.categories = {
      [powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL]: {
        type: powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL,
        boards: [new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL })],
      },
      [powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL]: {
        type: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
        multipliers: [powerspinConstants.DEFAULT_MULTIPLIERS],
        boards: [],
      },
      [powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER]: {
        multipliers: [powerspinConstants.DEFAULT_MULTIPLIERS],
        type: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER,
        boards: [],
      },
    };
  }

  getNumberOnWheelBoard() {
    return this.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0];
  }

  getWheelsWithSymbolBoards() {
    return this.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards;
  }

  getWheelsWithNumberBoards() {
    return this.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards;
  }

  getAllBoards() {
    return [this.getNumberOnWheelBoard(), ...this.getWheelsWithSymbolBoards(), ...this.getWheelsWithNumberBoards()];
  }

  isEmpty() {
    return !(
      powerspinConstants.SINGLE_BOARD_MARKET_CATEGORIES.some(
        gameCategory => !this.categories[gameCategory].boards[0].isEmpty()
      ) ||
      powerspinConstants.MULTIPLE_BOARD_MARKET_CATEGORIES.some(
        gameCategory => this.categories[gameCategory].boards.length !== 0
      )
    );
  }

  setNumberOnWheel(number) {
    if (
      number <= powerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE &&
      number >= powerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE
    ) {
      this.getNumberOnWheelBoard().panels[0].selection = Utilities.toggleNumberInArray(
        number,
        this.getNumberOnWheelBoard().panels[0].selection
      );
    }
  }

  toggleMarketGameType(betType) {
    const gameCategory = Mappings.POWERSPIN_BET_TYPE_TO_GAME_CATEGORY[betType];
    if (powerspinConstants.MULTIPLE_BOARD_MARKET_CATEGORIES.includes(gameCategory)) {
      betslipUtils.toggleGameTypeOnMultiBoardCategory(this.categories[gameCategory], gameCategory, betType);
    }
  }

  toggleMultipliers(gameCategory, multipliers = powerspinConstants.DEFAULT_MULTIPLIERS) {
    if (powerspinConstants.SINGLE_BOARD_MARKET_CATEGORIES.includes(gameCategory)) {
      this.categories[gameCategory].boards[0].toggleMultipliers(multipliers);
    } else if (powerspinConstants.MULTIPLE_BOARD_MARKET_CATEGORIES.includes(gameCategory)) {
      betslipUtils.toggleMultipliersOnMultiBoardCategory(this.categories[gameCategory], multipliers);
    }
  }

  reset() {
    Object.values(this.categories).forEach(category => betslipUtils.resetMarketCategory(category));
  }
}
