import Board from './Board';
import Utilities from '../../util/Utilities';
import Mappings from '../../util/Mappings';
import PowerspinConstants from '../../util/powerspin/Constants';
import betslipUtils from '../../util/powerspin/BetslipUtils';

export default class Wheel {
  constructor() {
    this.categories = {
      [PowerspinConstants.GAME_CATEGORY.NUMBER]: {
        type: PowerspinConstants.GAME_CATEGORY.NUMBER,
        boards: [new Board({ betType: PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER })],
      },
      [PowerspinConstants.GAME_CATEGORY.SYMBOL]: {
        type: PowerspinConstants.GAME_CATEGORY.SYMBOL,
        boards: [new Board()],
      },
      [PowerspinConstants.GAME_CATEGORY.COLOR]: {
        type: PowerspinConstants.GAME_CATEGORY.COLOR,
        multipliers: [PowerspinConstants.DEFAULT_MULTIPLIERS],
        boards: [],
      },
      [PowerspinConstants.GAME_CATEGORY.OVER_UNDER]: {
        type: PowerspinConstants.GAME_CATEGORY.OVER_UNDER,
        multipliers: [PowerspinConstants.DEFAULT_MULTIPLIERS],
        boards: [],
      },
    };
  }

  getNumberBoard() {
    return this.categories[PowerspinConstants.GAME_CATEGORY.NUMBER].boards[0];
  }

  getSymbolBoard() {
    return this.categories[PowerspinConstants.GAME_CATEGORY.SYMBOL].boards[0];
  }

  getColorBoards() {
    return this.categories[PowerspinConstants.GAME_CATEGORY.COLOR].boards;
  }

  getOverUnderBoards() {
    return this.categories[PowerspinConstants.GAME_CATEGORY.OVER_UNDER].boards;
  }

  getAllBoards() {
    return [this.getNumberBoard(), this.getSymbolBoard(), ...this.getColorBoards(), ...this.getOverUnderBoards()];
  }

  isEmpty() {
    return !(
      PowerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.some(
        (gameCategory) => !this.categories[gameCategory].boards[0].isEmpty()
      ) ||
      PowerspinConstants.MULTIPLE_BOARD_GAME_CATEGORIES.some(
        (gameCategory) => this.categories[gameCategory].boards.length !== 0
      )
    );
  }

  setRequestedNumber(requested = 0) {
    this.getNumberBoard().panels[0].requested = Utilities.toggleNumberInArray(
      requested,
      this.getNumberBoard().panels[0].requested
    );
    if (this.getNumberBoard().panels[0].requested.length === 0) {
      this.getNumberBoard().panels[0].requested.push(PowerspinConstants.REQUESTED_NUMBERS[0]);
    }
  }

  setColumnNumber(number) {
    if (
      number <= PowerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE &&
      number >= PowerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE
    ) {
      this.getNumberBoard().quickPick && this.getNumberBoard().disableQuickPick();
      this.getNumberBoard().panels[0].selection = Utilities.toggleNumberInArray(
        number,
        this.getNumberBoard().panels[0].selection
      );
    }
  }

  toggleGameType(betType) {
    const gameCategory = Mappings.POWERSPIN_BET_TYPE_TO_GAME_CATEGORY[betType];
    if (PowerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.includes(gameCategory)) {
      this.categories[gameCategory].boards[0].setBetType(
        this.categories[gameCategory].boards[0].betType ? null : betType
      );
    } else if (PowerspinConstants.MULTIPLE_BOARD_GAME_CATEGORIES.includes(gameCategory)) {
      betslipUtils.toggleGameTypeOnMultiBoardCategory(this.categories[gameCategory], gameCategory, betType);
    }
  }

  toggleMultipliers(gameCategory, multipliers = PowerspinConstants.DEFAULT_MULTIPLIERS) {
    if (PowerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.includes(gameCategory)) {
      this.categories[gameCategory].boards[0].toggleMultipliers(multipliers);
    } else if (PowerspinConstants.MULTIPLE_BOARD_GAME_CATEGORIES.includes(gameCategory)) {
      betslipUtils.toggleMultipliersOnMultiBoardCategory(this.categories[gameCategory], multipliers);
    }
  }

  addQuickPick() {
    const numbersToPick = Math.max(
      this.getNumberBoard().panels[0].selection.length,
      Math.max(...this.getNumberBoard().panels[0].requested, 0)
    );
    this.getNumberBoard().panels[0].selection = Utilities.getUniqueRandomArray(
      1,
      PowerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE,
      numbersToPick || PowerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE
    ).sort((a, b) => a - b);
    this.getNumberBoard().enableQuickPick();
  }

  reset() {
    Object.values(this.categories).forEach((category) => betslipUtils.resetWheelCategory(category));
  }

  resetCategory(categoryType) {
    if (this.categories[categoryType]) {
      betslipUtils.resetWheelCategory(this.categories[categoryType]);
    }
  }
}
