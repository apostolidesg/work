import { cloneDeep } from 'lodash';
import powerspinConstants from './powerspinConstants';
import Constants from './Constants';
import max from 'ramda/src/max';
import Board from '../model/powerspin/Board';
import Utilities from './Utilities';
import Vue from 'vue';

/**
 * Returns minimum numbers selected boolean status
 *
 * @param board
 * @returns {boolean}
 */
const areMinimumNumbersSelected = ({ board }) => {
  return (
    board.panels[0].selection.length >= powerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE &&
    board.panels[0].selection.length >= max(board.panels[0].selection.length, Math.max(...board.panels[0].requested)) &&
    board.panels[0].requested.length > 0
  );
};

/**
 * Returns maximum numbers selected boolean status
 *
 * @param board
 * @returns {boolean}
 */
const areMaximumNumbersSelected = ({ board }) => {
  return board.panels[0].selection.length <= powerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE;
};

/**
 * Returns selected requested numbers boolean status
 *
 * @param board
 * @returns {boolean}
 */
const areValidRequestedNumbersSelected = ({ board }) => {
  return (
    board.panels[0].requested.length === 0 ||
    !board.panels[0].requested.some((number) => !powerspinConstants.REQUESTED_NUMBERS.includes(number))
  );
};

/**
 * Returns validity of betType selected
 *
 * @param board
 * @returns {boolean}
 */
const isValidBetType = ({ board }) => {
  return !!Object.values(powerspinConstants.ILOT_GAMETYPES).includes(board.betType);
};

/**
 * The validity status of given powerspin board
 *
 * @param board
 * @returns {boolean}
 */
const isColumnValid = ({ board }) => {
  if (!board) return false;
  switch (board.betType) {
    case powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER:
    case powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL:
      return (
        isValidBetType({ board }) &&
        areMinimumNumbersSelected({ board }) &&
        areMaximumNumbersSelected({ board }) &&
        areValidRequestedNumbersSelected({ board })
      );
    default:
      return !!board.betType;
  }
};

/**
 * The validity status of given powerspin wheel
 *
 * @param wheel
 * @returns {boolean}
 */
const isWheelValid = ({ wheel }) => {
  const boards = wheel.getAllBoards();
  return (
    boards.filter((board) => !board.isEmpty()).length >= 1 &&
    !boards.filter((board) => !board.isEmpty()).some((board) => !isColumnValid({ board }))
  );
};

/**
 * The validity status of given powerspin markets model
 *
 * @param markets
 * @returns {boolean}
 */
const isMarketsValid = ({ markets }) => {
  const boards = markets.getAllBoards();
  return !boards.filter((board) => !board.isEmpty()).some((board) => !isColumnValid({ board }));
};

const productRange = (a, b) => {
  let prd = a;
  let i = a;

  while (i++ < b) {
    prd *= i;
  }
  return prd;
};

/**
 * Returns number of possible combinations
 * where "n" is the total set of possibilities
 * and "r" is the number of combinations we're interested in
 *
 * @params {number} n
 * @params {number} r
 * @returns {number}
 */
const combinations = (n, r) => {
  if (n === r) return 1;
  r = r < n - r ? n - r : r;
  return productRange(r + 1, n) / productRange(1, n - r);
};

/**
 * Returns simple array of boards out of combinations of boards array
 *
 * @param combinationsArray
 * @returns {Array}
 */
const extractBoardsFromCombinationArray = (combinationsArray) =>
  combinationsArray.reduce((acc, boardArray) => acc.concat(boardArray), []);

/**
 * Returns a number of possible columns for given category.
 * used in category cost calculations
 *
 * @param category
 * @param isCombo
 * @returns {number}
 */
const calculateCategoryColumnsNumber = ({ category = {}, isCombo = false } = {}) => {
  switch (category.type) {
    case powerspinConstants.GAME_CATEGORY.NUMBER:
    case powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL:
      if (category.boards[0].isEmpty() || !isColumnValid({ board: category.boards[0] })) return 0;
      return !isCombo && category.boards[0].panels[0].requested.length > 0
        ? category.boards[0].panels[0].requested.reduce(
            (acc, requested) => acc + combinations(category.boards[0].panels[0].selection.length, requested),
            0
          )
        : category.boards[0].panels[0].selection.length;
    case powerspinConstants.GAME_CATEGORY.SYMBOL:
    case powerspinConstants.GAME_CATEGORY.COLOR:
    case powerspinConstants.GAME_CATEGORY.OVER_UNDER:
    case powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER:
    case powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL:
      return category.boards.filter((board) => isColumnValid({ board })).length;
    default:
      return 0;
  }
};

/**
 * Checks if an array of wheels contains invalid wheels
 *
 * @param wheels Array
 * @returns {boolean}
 */
const areWheelsValid = (wheels) => {
  return wheels.filter((wheel) => !wheel.isEmpty()).length > 0
    ? !wheels.some((wheel) => !isWheelValid({ wheel }))
    : true;
};

/**
 * The validity status of given betslip
 *
 * @param board
 * @returns {boolean}
 */
const isBetslipValid = ({ betslip }) => {
  return (
    betslip.gameType === Constants.GENERAL_GAME_TYPES.POWERSPIN &&
    !betslip.isEmpty() &&
    areWheelsValid(betslip.wager.wheels) &&
    isMarketsValid({ markets: betslip.wager.markets }) &&
    betslip.wager.participatingDraws.multipleDraws > 0
  );
};

/**
 * Cartesian approach to generate wheel combo combinations
 *
 * @param wheels
 * @returns {array}
 */
const generateComboCombinations = ({ wheels }) => {
  return wheels.reduce((a, b) => a.reduce((r, v) => r.concat(b.map((w) => [].concat(v, w))), []));
};

/**
 * Return the number of possible cartesian combinations of boards
 * used in cost calculation to avoid generating full cartesian combinations
 *
 * @param wheels
 * @returns {number}
 */
const calculateWheelsComboBoardsNumber = ({ wheels }) =>
  wheels.reduce(
    (acc, wheel) =>
      acc *
      Object.values(wheel.categories).reduce(
        (catAcc, category) => catAcc + calculateCategoryColumnsNumber({ category, isCombo: true }),
        0
      ),
    1
  );

/**
 * Combines multiple board bet types to one board.
 * When betting either Color Zone or Over/Under and selecting more than 1 choices the bet is recommended to have `betTypes` in
 * `extendedBetting` instead of additional board combinations.
 * So the maximum board count that we can have is 4 x 4 x 4 = 64 which will be when we bet on all 4 bet zones (Number, Symbol,
 * Color, Over/Under) on all 3 wheels (4x4x4).
 *
 * @param boards
 * @returns {Array}
 */
const combineBoardBetTypes = ({ boards }) => {
  if (boards.length <= 1) return boards;
  return boards.reduce((acc, board) => {
    acc.length === 0
      ? acc.push((board.extendedBetting.betTypes = []) && board)
      : acc[0].extendedBetting.betTypes.push(board.betType);
    return acc;
  }, []);
};

/**
 * Creates new array of boards formatted as per ilot requirements
 *
 * @param wheels
 * @returns {Array}
 */
const spreadBoardsFromWheel = ({ wheel }) => {
  return [
    wheel.getNumberBoard(),
    wheel.getSymbolBoard(),
    ...combineBoardBetTypes({ boards: wheel.getColorBoards() }),
    ...combineBoardBetTypes({ boards: wheel.getOverUnderBoards() }),
  ]
    .filter((board) => !board.isEmpty())
    .reduce((acc, board) => {
      const newBoard = cloneDeep(board);
      newBoard.panels[0].requested = newBoard.panels[0].requested.sort((a, b) => b - a);
      newBoard.multipliers = board.getMultiplierNumber();
      const additionalRequested = newBoard.panels[0].requested.slice(1);
      additionalRequested.length > 0 && (newBoard.extendedBetting.additionalRequested = additionalRequested);
      const defaultRequestedValue = board.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER ? 1 : 0;
      newBoard.panels[0].requested = newBoard.panels[0].requested[0]
        ? newBoard.panels[0].requested[0]
        : defaultRequestedValue;
      if (newBoard.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER && newBoard.quickPick) {
        newBoard.panels[0].quickPick = newBoard.quickPick;
        newBoard.panels[0].QPSelections = newBoard.panels[0].selection.length;
      }
      delete newBoard.quickPick;
      acc.push(newBoard);
      return acc;
    }, []);
};

/**
 * Creates a new array of boards that are related to the Additional Markets formatted for the ilot requirements.
 *
 * @description The requirement is to send the boards of multi board categories (WHEELS_WITH_SYMBOL and WHEELS_WITH_NUMBER)
 * in one board using the extendedBetting property. For the NUMBER_ON_WHEEL category the requested property on the first
 * (and only ) panel should be set to 1 and for the other categories to 0.
 * In addition, the multipliers of each category should be sent as a property of the board and as a reduced
 * number (not an array). Finally, the quick pick property although it's not relevant for the markets it should be sent
 * as property to the NUMBER_ON_WHEEL category board.
 *
 *
 * @example
 * [
 *   { betType: 34, multipliers: 1, panels: [{ selection: [13], requested: 1, quickPick: false }] },
 *   { betType: 31, multipliers: 2, panels: [{ selection: [], requested: 0 }], extendedBetting: { betTypes: [30] },},
 *   { betType: 33, multipliers: 3, panels: [{ selection: [], requested: 0 }], extendedBetting: { betTypes: [32] },}
 * ]
 *
 * @param markets {Markets} A Markets class
 * @return Board[] An array of Board Objects
 *
 * */
const spreadBoardsFromMarkets = ({ markets }) => {
  return [
    markets.getNumberOnWheelBoard(),
    ...combineBoardBetTypes({ boards: markets.getWheelsWithSymbolBoards() }),
    ...combineBoardBetTypes({ boards: markets.getWheelsWithNumberBoards() }),
  ]
    .filter((board) => !board.isEmpty())
    .map((board) => {
      const newBoard = cloneDeep(board);
      newBoard.multipliers = board.getMultiplierNumber();
      newBoard.panels[0].requested =
        board.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL ? 1 : 0;
      if (newBoard.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL) {
        newBoard.panels[0].quickPick = false;
      }
      delete newBoard.quickPick;

      return newBoard;
    });
};

/**
 * Generates combo boards for proper ilot formatting, sets extendedBetting properties such as system id, indexes etc
 *
 * @param wheels
 * @param indexedBoardId whether boardId should be sequential
 * @param comboMultiplier the multiplier number that the user selected for the whole betslip
 * @returns {Array}
 */
const generateComboBoards = ({ wheels, indexedBoardId, comboMultiplier }) => {
  let boardIdIndex = 1;
  return extractBoardsFromCombinationArray(
    generateComboCombinations({
      wheels: wheels.map((wheel) => spreadBoardsFromWheel({ wheel })),
    })
      .map((combination) =>
        combination
          .filter((board) => !board.isEmpty())
          .map((board, index) => {
            board.extendedBetting.systems[0].id = index + 1;
            return { ...board, ...(indexedBoardId && { boardId: boardIdIndex++ }) };
          })
      )
      .map((combination) => {
        const indexes = combination.reduce((acc, board) => acc.push(board.boardId) && acc, []);
        return combination.map((board) => {
          const boardClone = {
            ...board,
            multipliers: comboMultiplier,
            panels: [
              {
                ...board.panels[0],
                requested: 1,
              },
            ],
          };
          const { ...formattedExtendedBetting } = boardClone.extendedBetting;
          delete formattedExtendedBetting.additionalRequested;
          return {
            ...boardClone,
            extendedBetting: {
              ...formattedExtendedBetting,
              systems: [{ id: formattedExtendedBetting.systems[0].id, index: indexes }],
            },
          };
        });
      })
  );
};

const generateWheelBoards = ({ wheels = [], indexedBoardId = true, comboMultiplier = 1 }) => {
  return wheels.length > 1
    ? generateComboBoards({ wheels, indexedBoardId, comboMultiplier })
    : spreadBoardsFromWheel({ wheel: wheels[0] }).map((board, index) => ({
        ...(delete board.extendedBetting.systems &&
          Object.keys(board.extendedBetting).length === 0 &&
          delete board.extendedBetting),
        ...board,
        ...(indexedBoardId && { boardId: index + 1 }),
      }));
};

const generateMarketsBoards = ({ markets, indexedBoardId = true, startAtIndex = 0 }) => {
  return spreadBoardsFromMarkets({ markets }).map((board, index) => ({
    ...(delete board.extendedBetting.systems &&
      Object.keys(board.extendedBetting).length === 0 &&
      delete board.extendedBetting),
    ...board,
    ...(indexedBoardId && { boardId: startAtIndex + index + 1 }),
  }));
};

/**
 * Returns ilot formatted betslip
 *
 * @param betslip
 * @param indexedBoardId whether boardId should be sequential
 * @returns {Object}
 */
const formatIlotBetslip = ({ betslip, indexedBoardId = true }) => {
  const wheelBoards = generateWheelBoards({
    wheels: betslip.wager.wheels,
    indexedBoardId,
    comboMultiplier: betslip.getMultiplierNumber(),
  });
  const marketBoards = generateMarketsBoards({
    markets: betslip.wager.markets,
    indexedBoardId,
    startAtIndex: wheelBoards.length,
  });

  return {
    ...betslip,
    wager: {
      multipliers: powerspinConstants.DEFAULT_MULTIPLIERS,
      participatingDraws: betslip.wager.participatingDraws,
      boards: [...wheelBoards, ...marketBoards],
    },
  };
};

/**
 * Returns whether wheel category is empty
 *
 * @param category
 * @returns {Boolean}
 */
const isWheelCategoryEmpty = (category) => {
  return powerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.includes(category.type)
    ? category.boards[0].isEmpty()
    : category.boards.length === 0;
};

/**
 * Returns whether a markets category is empty
 *
 * @param category
 * @returns {Boolean}
 */
const isMarketsCategoryEmpty = (category) => {
  return powerspinConstants.SINGLE_BOARD_MARKET_CATEGORIES.includes(category.type)
    ? category.boards[0].isEmpty()
    : category.boards.length === 0;
};

/**
 * Resets wheel category based on board structure of the category
 *
 * @param category
 * @returns {void}
 */
const resetWheelCategory = (category) => {
  if (powerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.includes(category.type)) {
    category.boards[0].reset();
  } else {
    category.boards = [];
    category.multipliers = [powerspinConstants.DEFAULT_MULTIPLIERS];
  }
};

/**
 * Resets markets category based on board structure of the category
 *
 * @param category
 * @returns {void}
 */
const resetMarketCategory = (category) => {
  if (powerspinConstants.SINGLE_BOARD_MARKET_CATEGORIES.includes(category.type)) {
    category.boards[0].reset();
  } else {
    category.boards = [];
    category.multipliers = [powerspinConstants.DEFAULT_MULTIPLIERS];
  }
};

/**
 * Returns the sorting function for the multi board categories
 *
 * @param category
 * @return {Function}
 */
const getBoardSortingFn = (category) => (board1, board2) =>
  category === powerspinConstants.GAME_CATEGORY.COLOR ||
  category === powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER
    ? board1.betType - board2.betType
    : board2.betType - board1.betType;

/**
 * Adds a board or removes if exists from a multi board category based on the betType
 *
 * @param category The category object to manipulate
 * @param categoryName The name of the category
 * @param betType The ILOT bet type to toggle
 */
const toggleGameTypeOnMultiBoardCategory = (category, categoryName, betType) => {
  const foundIndex = category.boards.findIndex((board) => board.betType === betType);
  if (foundIndex > -1) {
    category.boards.splice(foundIndex, 1);
  } else {
    category.boards.push(new Board({ betType, multipliers: category.multipliers }));
    category.boards.sort(getBoardSortingFn(categoryName));
  }
};

/**
 * Toggles the multipliers of a multi board category
 *
 * @param category The category object
 * @param multipliers The multiplier to toggle
 * */
const toggleMultipliersOnMultiBoardCategory = (category, multipliers) => {
  category.multipliers = Utilities.toggleNumberInArray(
    multipliers,
    category.multipliers,
    powerspinConstants.MULTIPLIERS_SET
  );
  category.multipliers.length === 0 && category.multipliers.push(powerspinConstants.DEFAULT_MULTIPLIERS);
  category.boards.forEach((board) => board.toggleMultipliers(multipliers));
};

/**
 * Returns the bet type based on the kino board
 *
 * @param board The kino board
 * @return {number} The bet type
 */
const getBetTypeFromKinoBoard = (board) => {
  const kinoBonus = board.kinoBonusActive;
  const kinoClose2Win = board.kinoClose2WinActive;

  if (kinoBonus && kinoClose2Win) {
    return Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN_AND_KINO_BONUS;
  }
  if (kinoBonus) {
    return Constants.ILOT_GAMETYPES.BET_WITH_KINO_BONUS;
  }
  if (kinoClose2Win) {
    return Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN;
  }
  return Constants.ILOT_GAMETYPES.BET_WITHOUT_KINO_BONUS;
};

/**
 *
 * @param {*} betslip
 * @returns number
 * @description Calculates the betslip price based on the wagered wheels and participating draws.
 */
const calculateBetslipPrice = (betslip, includeConsecutiveDraws = true) => {
  const wheelCategories = Object.values(betslip.wager.wheels[0].categories).filter(
    (category) => !isWheelCategoryEmpty(category)
  );

  const consecutiveDraws = betslip.wager.participatingDraws.multipleDraws;
  const comboMultipliers = betslip.wager.comboMultipliers;

  const returnValue = wheelCategories.reduce((acc, category) => {
    return (
      acc +
      calculateCategoryColumnsNumber({ category }) *
        powerspinConstants.BASIC_BETTING_AMOUNT *
        (category.multipliers ? category.multipliers : category.boards[0].multipliers).reduce((sum, val) => sum + val)
    );
  }, 0);

  if (includeConsecutiveDraws) {
    return returnValue * consecutiveDraws * comboMultipliers;
  }

  return returnValue.toFixed(2);
};

const getBetslipCardTitle = (betslip, card) => {
  let returnInfo = '';

  const drawCount = `<span class='powerspin-quickbets-cards__card-title--number'>${betslip.wager.participatingDraws.multipleDraws}</span>`;

  if (card.type === powerspinConstants.GAME_CATEGORY.NUMBER) {
    const numberSelections = betslip.wager.wheels[0].getNumberBoard().panels[0].selection;
    returnInfo += Vue.i18n.translate('quickbets.randomNumbers', {
      count: `<span class='powerspin-quickbets-cards__card-title--number'>${numberSelections.length}</span>`,
    }, numberSelections.length);
  }

  if (card.type === powerspinConstants.GAME_CATEGORY.SYMBOL) {
    returnInfo += ` ${Vue.i18n.translate('quickbets.symbolInDraws', { count: drawCount })}`;
  }

  if (card.type === powerspinConstants.GAME_CATEGORY.OVER_UNDER) {
    returnInfo += ` ${Vue.i18n.translate('quickbets.overInDraws', { count: drawCount })}`;
    returnInfo += ` ${Vue.i18n.translate('quickbets.underInDraws', { count: drawCount })}`;
  }

  if (card.type === powerspinConstants.GAME_CATEGORY.COLOR) {
    returnInfo += ` ${Vue.i18n.translate('quickbets.colorInDraws', { count: drawCount })}`;
  }

  if (betslip.wager.participatingDraws.multipleDraws > 1) {
    returnInfo += ` ${Vue.i18n.translate('quickbets.consecutiveDraws', { count: drawCount })}`;
  }

  return returnInfo.trim();
};

export default {
  formatIlotBetslip,
  calculateCategoryColumnsNumber,
  getBetslipCardTitle,
  calculateBetslipPrice,
  isBetslipValid,
  calculateWheelsComboBoardsNumber,
  isWheelCategoryEmpty,
  isMarketsCategoryEmpty,
  resetWheelCategory,
  isColumnValid,
  getBoardSortingFn,
  resetMarketCategory,
  toggleGameTypeOnMultiBoardCategory,
  toggleMultipliersOnMultiBoardCategory,
  combinations,
  getBetTypeFromKinoBoard,
};
