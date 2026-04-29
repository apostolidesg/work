import PowerspinConstants from '../../util/powerspin/Constants';
import Constants from '../../util/Constants';
import Wheel from './Wheel';
import betslipUtils from '../../util/powerspin/BetslipUtils';
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
      [PowerspinConstants.GAME_CATEGORY.NUMBER, PowerspinConstants.GAME_CATEGORY.SYMBOL].includes(currentGameCategory)
    ) {
      currentWheel.categories[currentGameCategory].boards[0] = new Board(board);
      if (
        currentGameCategory === PowerspinConstants.GAME_CATEGORY.NUMBER &&
        board.extendedBetting?.additionalRequested
      ) {
        currentWheel.categories[currentGameCategory].boards[0].panels[0].requested = currentWheel.categories[
          currentGameCategory
        ].boards[0].panels[0].requested.concat(board.extendedBetting?.additionalRequested);
      }
      if (currentGameCategory === PowerspinConstants.GAME_CATEGORY.NUMBER) {
        currentWheel.categories[currentGameCategory].boards[0].quickPick =
          currentWheel.categories[currentGameCategory].boards[0].panels[0].quickPick || false;
        delete currentWheel.categories[currentGameCategory].boards[0].panels[0].quickPick;
        delete currentWheel.categories[currentGameCategory].boards[0].panels[0].QPSelections;
      }
    } else {
      currentWheel.categories[currentGameCategory].boards.push(new Board(board));
      if (board.extendedBetting?.betTypes) {
        board.extendedBetting.betTypes.forEach((betType) => {
          const newBoard = new Board(board);
          newBoard.setBetType(betType);
          currentWheel.categories[currentGameCategory].boards.push(newBoard);
        });
      }
      currentWheel.categories[currentGameCategory].multipliers = isCombo
        ? [PowerspinConstants.DEFAULT_MULTIPLIERS]
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

    if (currentGameCategory === PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL) {
      markets.categories[currentGameCategory].boards[0] = new Board(board);
    } else {
      markets.categories[currentGameCategory].boards.push(new Board(board));
      if (board.extendedBetting?.betTypes) {
        board.extendedBetting.betTypes.forEach((betType) => {
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

const calculateComboMultiplierNumber = ({ multipliers, boards } = {}) => {
  if (boards.length === 0) return PowerspinConstants.DEFAULT_MULTIPLIERS;
  const wagerComboMultipliers = Array.isArray(multipliers) ? multipliers[0] : multipliers;
  const isCombo = !!boards[0].extendedBetting?.systems;

  if (isCombo && wagerComboMultipliers > PowerspinConstants.DEFAULT_MULTIPLIERS) {
    return wagerComboMultipliers;
  }
  if (isCombo && wagerComboMultipliers === PowerspinConstants.DEFAULT_MULTIPLIERS) {
    const firstBoardMultiplier = boards[0].multipliers;
    return Array.isArray(firstBoardMultiplier) ? firstBoardMultiplier[0] : firstBoardMultiplier;
  }
  return PowerspinConstants.DEFAULT_MULTIPLIERS;
};

export default class Betslip {
  constructor(wagerModel) {
    this.gameType = Constants.GENERAL_GAME_TYPES.POWERSPIN;
    this.wager = {
      wheels: [new Wheel()],
      markets: new Markets(),
      participatingDraws: { multipleDraws: 1 },
      comboMultipliers: [PowerspinConstants.DEFAULT_MULTIPLIERS],
    };
    this.promotionInfo = null;
    this.isecure = [];
    if (wagerModel) {
      const wheelsBoards = wagerModel.boards.filter((board) =>
        PowerspinConstants.WHEELS_ILOT_GAMETYPES.includes(board.betType)
      );
      const marketsBoards = wagerModel.boards.filter((board) =>
        PowerspinConstants.MARKETS_ILOT_GAMETYPES.includes(board.betType)
      );
      if (wheelsBoards.length > 0) {
        this.wager.wheels = generateWheelsFromWagerBoards({ boards: wheelsBoards });
      }
      if (marketsBoards.length > 0) {
        this.wager.markets = generateMarketsFromWagerBoards({ boards: marketsBoards });
      }
      this.wager.participatingDraws.multipleDraws = wagerModel?.participatingDraws?.multipleDraws ?? 1;
      this.wager.comboMultipliers = Utilities.constructAmountFromSet(
        calculateComboMultiplierNumber({ multipliers: wagerModel.multipliers, boards: wheelsBoards }),
        PowerspinConstants.MULTIPLIERS_SET
      );
    }
  }

  isWheelsEmpty() {
    return !this.wager.wheels.some((wheel) => !wheel.isEmpty());
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
      PowerspinConstants.MULTIPLIERS_SET
    );
    if (this.wager.comboMultipliers.length === 0) {
      this.wager.comboMultipliers.push(PowerspinConstants.MULTIPLIERS_SET[0]);
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
