import Board from './Board';
import max from 'ramda/src/max';
import Utilities from '../../util/Utilities';
import Mappings from '../../util/Mappings';
import powerspinConstants from '../../util/powerspinConstants';
import betslipUtils from '../../util/betslipUtils';

export default class Wheel {
  constructor() {
    this.categories = {
      [powerspinConstants.GAME_CATEGORY.NUMBER]: {
        type: powerspinConstants.GAME_CATEGORY.NUMBER,
        boards: [new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER })],
      },
      [powerspinConstants.GAME_CATEGORY.SYMBOL]: {
        type: powerspinConstants.GAME_CATEGORY.SYMBOL,
        boards: [new Board()],
      },
      [powerspinConstants.GAME_CATEGORY.COLOR]: {
        type: powerspinConstants.GAME_CATEGORY.COLOR,
        multipliers: [powerspinConstants.DEFAULT_MULTIPLIERS],
        boards: [],
      },
      [powerspinConstants.GAME_CATEGORY.OVER_UNDER]: {
        type: powerspinConstants.GAME_CATEGORY.OVER_UNDER,
        multipliers: [powerspinConstants.DEFAULT_MULTIPLIERS],
        boards: [],
      },
    };
  }

  getNumberBoard() {
    return this.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0];
  }

  getSymbolBoard() {
    return this.categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards[0];
  }

  getColorBoards() {
    return this.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards;
  }

  getOverUnderBoards() {
    return this.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards;
  }

  getAllBoards() {
    return [this.getNumberBoard(), this.getSymbolBoard(), ...this.getColorBoards(), ...this.getOverUnderBoards()];
  }

  isEmpty() {
    return !(
      powerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.some(
        gameCategory => !this.categories[gameCategory].boards[0].isEmpty()
      ) ||
      powerspinConstants.MULTIPLE_BOARD_GAME_CATEGORIES.some(
        gameCategory => this.categories[gameCategory].boards.length !== 0
      )
    );
  }

  setRequestedNumber(requested = 0) {
    this.getNumberBoard().panels[0].requested = Utilities.toggleNumberInArray(
      requested,
      this.getNumberBoard().panels[0].requested
    );
    if (this.getNumberBoard().panels[0].requested.length === 0) {
      this.getNumberBoard().panels[0].requested.push(powerspinConstants.REQUESTED_NUMBERS[0]);
    }
  }

  setColumnNumber(number) {
    if (
      number <= powerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE &&
      number >= powerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE
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
    if (powerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.includes(gameCategory)) {
      this.categories[gameCategory].boards[0].setBetType(
        this.categories[gameCategory].boards[0].betType ? null : betType
      );
    } else if (powerspinConstants.MULTIPLE_BOARD_GAME_CATEGORIES.includes(gameCategory)) {
      betslipUtils.toggleGameTypeOnMultiBoardCategory(this.categories[gameCategory], gameCategory, betType);
    }
  }

  toggleMultipliers(gameCategory, multipliers = powerspinConstants.DEFAULT_MULTIPLIERS) {
    if (powerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.includes(gameCategory)) {
      this.categories[gameCategory].boards[0].toggleMultipliers(multipliers);
    } else if (powerspinConstants.MULTIPLE_BOARD_GAME_CATEGORIES.includes(gameCategory)) {
      betslipUtils.toggleMultipliersOnMultiBoardCategory(this.categories[gameCategory], multipliers);
    }
  }

  addQuickPick() {
    const numbersToPick = max(
      this.getNumberBoard().panels[0].selection.length,
      Math.max(...this.getNumberBoard().panels[0].requested)
    );
    this.getNumberBoard().panels[0].selection = Utilities.getUniqueRandomArray(
      1,
      powerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE,
      numbersToPick || powerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE
    ).sort((a, b) => a - b);
    this.getNumberBoard().enableQuickPick();
  }

  reset() {
    Object.values(this.categories).forEach(category => betslipUtils.resetWheelCategory(category));
  }
}
