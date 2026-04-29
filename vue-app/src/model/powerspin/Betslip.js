import powerspinConstants from '../../util/powerspinConstants';
import Constants from '../../util/Constants';
import Wheel from './Wheel';
import betslipUtils from '../../util/betslipUtils';
import { get } from 'lodash';
import Board from './Board';
import Mappings from '../../util/Mappings';
import Utilities from '../../util/Utilities';
import Markets from './Markets';

const generateWheelsFromWagerBoards = ({ boards }) => {
  const isCombo = !!boards[0].extendedBetting?.systems;
  return boards.reduce((acc, board) => {
    const wheelIndex = isCombo ? board.extendedBetting.systems[0].id - 1 : 0;
    !acc[wheelIndex] && (acc[wheelIndex] = new Wheel());

    const currentWheel = acc[wheelIndex];
    const currentGameCategory = Mappings.POWERSPIN_BET_TYPE_TO_GAME_CATEGORY[board.betType];
    const currentCategoryBoards = currentWheel.categories[currentGameCategory].boards;

    if (currentCategoryBoards.length > 0 && !currentCategoryBoards[0].isEmpty()) return acc;

    if (
      [powerspinConstants.GAME_CATEGORY.NUMBER, powerspinConstants.GAME_CATEGORY.SYMBOL].includes(currentGameCategory)
    ) {
      currentWheel.categories[currentGameCategory].boards[0] = new Board(board);
      if (
        currentGameCategory === powerspinConstants.GAME_CATEGORY.NUMBER &&
        board.extendedBetting?.additionalRequested
      ) {
        currentWheel.categories[currentGameCategory].boards[0].panels[0].requested = currentWheel.categories[
          currentGameCategory
        ].boards[0].panels[0].requested.concat(board.extendedBetting?.additionalRequested);
      }
      if (currentGameCategory === powerspinConstants.GAME_CATEGORY.NUMBER) {
        currentWheel.categories[currentGameCategory].boards[0].quickPick =
          currentWheel.categories[currentGameCategory].boards[0].panels[0].quickPick || false;
        delete currentWheel.categories[currentGameCategory].boards[0].panels[0].quickPick;
        delete currentWheel.categories[currentGameCategory].boards[0].panels[0].QPSelections;
      }
    } else {
      currentWheel.categories[currentGameCategory].boards.push(new Board(board));
      if (board.extendedBetting?.betTypes) {
        board.extendedBetting.betTypes.forEach(betType => {
          const newBoard = new Board(board);
          newBoard.setBetType(betType);
          currentWheel.categories[currentGameCategory].boards.push(newBoard);
        });
      }
      currentWheel.categories[currentGameCategory].multipliers = isCombo
        ? [powerspinConstants.DEFAULT_MULTIPLIERS]
        : currentWheel.categories[currentGameCategory].boards[0].multipliers;
      currentWheel.categories[currentGameCategory].boards.sort(betslipUtils.getBoardSortingFn(currentGameCategory));
    }
    return acc;
  }, []);
};

const generateMarketsFromWagerBoards = ({ boards }) => {
  return boards.reduce((markets, board) => {
    const currentGameCategory = Mappings.POWERSPIN_BET_TYPE_TO_GAME_CATEGORY[board.betType];
    const currentCategoryBoards = markets.categories[currentGameCategory].boards;

    if (currentCategoryBoards.length > 0 && !currentCategoryBoards[0].isEmpty()) return markets;

    if (currentGameCategory === powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL) {
      markets.categories[currentGameCategory].boards[0] = new Board(board);
    } else {
      markets.categories[currentGameCategory].boards.push(new Board(board));
      if (board.extendedBetting?.betTypes) {
        board.extendedBetting.betTypes.forEach(betType => {
          const newBoard = new Board(board);
          newBoard.setBetType(betType);
          markets.categories[currentGameCategory].boards.push(newBoard);
        });
      }
      markets.categories[currentGameCategory].multipliers =
        markets.categories[currentGameCategory].boards[0].multipliers;
      markets.categories[currentGameCategory].boards.sort(betslipUtils.getBoardSortingFn(currentGameCategory));
    }

    return markets;
  }, new Markets());
};

/**
 * @description Utility function to calculate the combo multiplier. After introducing the new powerspin additional
 * markets feature it came out that we must move the combo multipliers from the global level to the board level when
 * constructing the DTO (and keep the top level to the default (1)). On the other hand we have to keep the ability to
 * parse betslips that have been placed with the old way (combo multipliers on the top level of the wager object).
 * For that this utility function was introduced in order to manage the different scenarios
 * @param params {Object} An object containing the combo multipliers of the wager and an array with the boards that have wheel betTypes
 * @return {Number} The calculated multiplier number for each wager case
 * */
const calculateComboMultiplierNumber = ({ multipliers, boards } = {}) => {
  if (boards.length === 0) return powerspinConstants.DEFAULT_MULTIPLIERS;
  const wagerComboMultipliers = Array.isArray(multipliers) ? multipliers[0] : multipliers;
  const isCombo = !!boards[0].extendedBetting?.systems;

  if (isCombo && wagerComboMultipliers > powerspinConstants.DEFAULT_MULTIPLIERS) {
    return wagerComboMultipliers;
  }
  if (isCombo && wagerComboMultipliers === powerspinConstants.DEFAULT_MULTIPLIERS) {
    const firstBoardMultiplier = boards[0].multipliers;
    return Array.isArray(firstBoardMultiplier) ? firstBoardMultiplier[0] : firstBoardMultiplier;
  }
  return powerspinConstants.DEFAULT_MULTIPLIERS;
};

export default class Betslip {
  constructor(wagerModel) {
    this.gameType = Constants.GENERAL_GAME_TYPES.POWERSPIN;
    this.wager = {
      wheels: [new Wheel()],
      markets: new Markets(),
      participatingDraws: { multipleDraws: 1 },
      comboMultipliers: [powerspinConstants.DEFAULT_MULTIPLIERS],
    };
    this.promotionInfo = null;
    this.isecure = [];
    if (wagerModel) {
      const wheelsBoards = wagerModel.boards.filter(board =>
        powerspinConstants.WHEELS_ILOT_GAMETYPES.includes(board.betType)
      );
      const marketsBoards = wagerModel.boards.filter(board =>
        powerspinConstants.MARKETS_ILOT_GAMETYPES.includes(board.betType)
      );
      if (wheelsBoards.length > 0) {
        this.wager.wheels = generateWheelsFromWagerBoards({ boards: wheelsBoards });
      }
      if (marketsBoards.length > 0) {
        this.wager.markets = generateMarketsFromWagerBoards({ boards: marketsBoards });
      }
      this.wager.participatingDraws.multipleDraws = get(wagerModel, 'participatingDraws.multipleDraws');
      this.wager.comboMultipliers = Utilities.constructAmountFromSet(
        calculateComboMultiplierNumber({ multipliers: wagerModel.multipliers, boards: wheelsBoards }),
        powerspinConstants.MULTIPLIERS_SET
      );
    }
  }

  isWheelsEmpty() {
    return !this.wager.wheels.some(wheel => !wheel.isEmpty());
  }

  isEmpty() {
    return this.isWheelsEmpty() && this.wager.markets.isEmpty();
  }

  isValidBetslip() {
    return betslipUtils.isBetslipValid({ betslip: this });
  }

  setISecureTokens(iSecureTokens) {
    this.isecure = iSecureTokens;
  }

  toggleComboMultipliers(comboMultipliers) {
    this.wager.comboMultipliers = Utilities.toggleNumberInArray(
      comboMultipliers,
      this.wager.comboMultipliers,
      powerspinConstants.MULTIPLIERS_SET
    );
    if (this.wager.comboMultipliers.length === 0) {
      this.wager.comboMultipliers.push(powerspinConstants.MULTIPLIERS_SET[0]);
    }
  }

  getMultiplierNumber() {
    return this.wager.comboMultipliers.reduce((acc, val) => acc + val);
  }

  setConsecutiveDraws(consecutiveDraws) {
    this.wager.participatingDraws.multipleDraws = consecutiveDraws;
  }

  ilotFormat() {
    return betslipUtils.formatIlotBetslip({ betslip: this });
  }
}
