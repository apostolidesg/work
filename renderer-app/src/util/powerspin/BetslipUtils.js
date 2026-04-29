import cloneDeep from 'lodash.clonedeep';
import PowerspinConstants from './Constants';
import Board from '../../model/powerspin/Board';
import Utilities from '../Utilities';

const cloneBoard = (board) => cloneDeep(board);

const combinations = (n, r) => {
  if (n === r) return 1;
  r = r < n - r ? n - r : r;

  const productRange = (a, b) => {
    let prd = a;
    let i = a;
    while (i++ < b) {
      prd *= i;
    }
    return prd;
  };

  return productRange(r + 1, n) / productRange(1, n - r);
};

const areMinimumNumbersSelected = ({ board }) => {
  const selection = board.panels?.[0]?.selection || [];
  const requested = board.panels?.[0]?.requested || [];

  return (
    selection.length >= PowerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE &&
    selection.length >= Math.max(selection.length, Math.max(...requested, 0)) &&
    requested.length > 0
  );
};

const areMaximumNumbersSelected = ({ board }) => {
  const selection = board.panels?.[0]?.selection || [];
  return selection.length <= PowerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE;
};

const areValidRequestedNumbersSelected = ({ board }) => {
  const requested = board.panels?.[0]?.requested || [];
  return requested.length === 0 || !requested.some((number) => !PowerspinConstants.REQUESTED_NUMBERS.includes(number));
};

const isValidBetType = ({ board }) => {
  return !!Object.values(PowerspinConstants.ILOT_GAMETYPES).includes(board.betType);
};

const isColumnValid = ({ board }) => {
  if (!board) return false;

  switch (board.betType) {
    case PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER:
    case PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL:
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

const isWheelValid = ({ wheel }) => {
  const boards = wheel.getAllBoards();
  return (
    boards.filter((board) => !board.isEmpty()).length >= 1 &&
    !boards.filter((board) => !board.isEmpty()).some((board) => !isColumnValid({ board }))
  );
};

const isMarketsValid = ({ markets }) => {
  const boards = markets.getAllBoards();
  return !boards.filter((board) => !board.isEmpty()).some((board) => !isColumnValid({ board }));
};

const calculateCategoryColumnsNumber = ({ category = {}, isCombo = false } = {}) => {
  switch (category.type) {
    case PowerspinConstants.GAME_CATEGORY.NUMBER:
    case PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL:
      if (category.boards[0].isEmpty() || !isColumnValid({ board: category.boards[0] })) return 0;
      return !isCombo && category.boards[0].panels[0].requested.length > 0
        ? category.boards[0].panels[0].requested.reduce(
            (acc, requested) => acc + combinations(category.boards[0].panels[0].selection.length, requested),
            0
          )
        : category.boards[0].panels[0].selection.length;
    case PowerspinConstants.GAME_CATEGORY.SYMBOL:
    case PowerspinConstants.GAME_CATEGORY.COLOR:
    case PowerspinConstants.GAME_CATEGORY.OVER_UNDER:
    case PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER:
    case PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL:
      return category.boards.filter((board) => isColumnValid({ board })).length;
    default:
      return 0;
  }
};

const calculateWheelCost = ({ wheel, isCombo = false, columnCost = 0.5 }) => {
  const categories = Object.values(wheel.categories);

  return categories.reduce((acc, category) => {
    const columnsNumber = calculateCategoryColumnsNumber({ category, isCombo });
    const multipliers = category.multipliers || [PowerspinConstants.DEFAULT_MULTIPLIERS];
    const categoryMultiplier = multipliers.reduce((sum, m) => sum + m, 0);

    return acc + columnsNumber * categoryMultiplier * columnCost;
  }, 0);
};

const calculateMarketsCost = ({ markets, columnCost = 0.5 }) => {
  const categories = Object.values(markets.categories);

  return categories.reduce((acc, category) => {
    const columnsNumber = calculateCategoryColumnsNumber({ category, isCombo: false });
    const multipliers = category.multipliers || [PowerspinConstants.DEFAULT_MULTIPLIERS];
    const categoryMultiplier = multipliers.reduce((sum, m) => sum + m, 0);

    return acc + columnsNumber * categoryMultiplier * columnCost;
  }, 0);
};

const areWheelsValid = (wheels) => {
  return wheels.filter((wheel) => !wheel.isEmpty()).length > 0
    ? !wheels.filter((wheel) => !wheel.isEmpty()).some((wheel) => !isWheelValid({ wheel }))
    : false;
};

const calculateWheelsComboBoardsNumber = ({ wheels }) => {
  return wheels.reduce((acc, wheel) => {
    const wheelBoardsNumber = Object.values(wheel.categories).reduce((categoryAcc, category) => {
      return categoryAcc + calculateCategoryColumnsNumber({ category, isCombo: true });
    }, 0);
    return acc * (wheelBoardsNumber || 1);
  }, 1);
};

const toggleGameTypeOnMultiBoardCategory = (category, gameCategory, betType) => {
  const existingBoardIndex = category.boards.findIndex((board) => board.betType === betType);
  if (existingBoardIndex !== -1) {
    category.boards.splice(existingBoardIndex, 1);
  } else {
    const newBoard = new Board({ betType });
    newBoard.multipliers = [...category.multipliers];
    category.boards.push(newBoard);
    category.boards.sort(getBoardSortingFn(gameCategory));
  }
};

const toggleMultipliersOnMultiBoardCategory = (category, multipliers) => {
  category.multipliers = Utilities.toggleNumberInArray(
    multipliers,
    category.multipliers,
    PowerspinConstants.MULTIPLIERS_SET
  );
  if (category.multipliers.length === 0) {
    category.multipliers.push(PowerspinConstants.DEFAULT_MULTIPLIERS);
  }
  category.boards.forEach((board) => {
    board.multipliers = [...category.multipliers];
  });
};

const resetWheelCategory = (category) => {
  if (PowerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.includes(category.type)) {
    category.boards[0].reset();
  } else {
    category.boards = [];
    category.multipliers = [PowerspinConstants.DEFAULT_MULTIPLIERS];
  }
};

const resetMarketCategory = (category) => {
  if (PowerspinConstants.SINGLE_BOARD_MARKET_CATEGORIES.includes(category.type)) {
    category.boards[0].reset();
  } else {
    category.boards = [];
    category.multipliers = [PowerspinConstants.DEFAULT_MULTIPLIERS];
  }
};

const generateComboCombinations = ({ wheels }) => {
  return wheels.reduce((a, b) => a.reduce((r, v) => r.concat(b.map((w) => [].concat(v, w))), []));
};

const extractBoardsFromCombinationArray = (combinationsArray) =>
  combinationsArray.reduce((acc, boardArray) => acc.concat(boardArray), []);

const combineBoardBetTypes = ({ boards }) => {
  if (boards.length <= 1) return boards;
  return boards.reduce((acc, board) => {
    if (acc.length === 0) {
      board.extendedBetting.betTypes = [];
      acc.push(board);
    } else {
      acc[0].extendedBetting.betTypes.push(board.betType);
    }
    return acc;
  }, []);
};

const spreadBoardsFromWheel = ({ wheel }) => {
  return [
    wheel.getNumberBoard(),
    wheel.getSymbolBoard(),
    ...combineBoardBetTypes({ boards: wheel.getColorBoards() }),
    ...combineBoardBetTypes({ boards: wheel.getOverUnderBoards() }),
  ]
    .filter((board) => !board.isEmpty())
    .reduce((acc, board) => {
      const newBoard = cloneBoard(board);
      newBoard.panels[0].requested = newBoard.panels[0].requested.sort((a, b) => b - a);
      newBoard.multipliers = board.getMultiplierNumber();
      const additionalRequested = newBoard.panels[0].requested.slice(1);
      additionalRequested.length > 0 && (newBoard.extendedBetting.additionalRequested = additionalRequested);
      const defaultRequestedValue = board.betType === PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER ? 1 : 0;
      newBoard.panels[0].requested = newBoard.panels[0].requested[0]
        ? newBoard.panels[0].requested[0]
        : defaultRequestedValue;
      if (newBoard.betType === PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER && newBoard.quickPick) {
        newBoard.panels[0].quickPick = newBoard.quickPick;
        newBoard.panels[0].QPSelections = newBoard.panels[0].selection.length;
      }
      delete newBoard.quickPick;
      acc.push(newBoard);
      return acc;
    }, []);
};

const generateComboBoards = ({ wheels, indexedBoardId, comboMultiplier }) => {
  let boardIdIndex = 1;
  return extractBoardsFromCombinationArray(
    generateComboCombinations({
      wheels: wheels.map((wheel) => spreadBoardsFromWheel({ wheel })),
    })
      .map((combination) =>
        combination.map((board, index) => {
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

const spreadBoardsFromMarkets = ({ markets }) => {
  return [
    markets.getNumberOnWheelBoard(),
    ...combineBoardBetTypes({ boards: markets.getWheelsWithSymbolBoards() }),
    ...combineBoardBetTypes({ boards: markets.getWheelsWithNumberBoards() }),
  ]
    .filter((board) => !board.isEmpty())
    .map((board) => {
      const newBoard = cloneBoard(board);
      newBoard.multipliers = board.getMultiplierNumber();
      newBoard.panels[0].requested =
        board.betType === PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL ? 1 : 0;
      if (newBoard.betType === PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL) {
        newBoard.panels[0].quickPick = false;
      }
      delete newBoard.quickPick;

      return newBoard;
    });
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
      multipliers: PowerspinConstants.DEFAULT_MULTIPLIERS,
      participatingDraws: betslip.wager.participatingDraws,
      boards: [...wheelBoards, ...marketBoards],
    },
  };
};

const getBoardSortingFn = (category) => (board1, board2) =>
  category === PowerspinConstants.GAME_CATEGORY.COLOR ||
  category === PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER
    ? board1.betType - board2.betType
    : board2.betType - board1.betType;

const isWheelCategoryEmpty = (category) => {
  return PowerspinConstants.SINGLE_BOARD_GAME_CATEGORIES.includes(category.type)
    ? category.boards[0].isEmpty()
    : category.boards.length === 0;
};

const isMarketsCategoryEmpty = (category) => {
  return PowerspinConstants.SINGLE_BOARD_MARKET_CATEGORIES.includes(category.type)
    ? category.boards[0].isEmpty()
    : category.boards.length === 0;
};

const isBetslipValid = ({ betslip }) => {
  const hasValidWheels = areWheelsValid(betslip.wager.wheels);
  const hasValidMarkets = isMarketsValid({ markets: betslip.wager.markets });
  const hasMarketsSelections = !betslip.wager.markets.isEmpty();

  return hasValidWheels || (hasMarketsSelections && hasValidMarkets);
};

export default {
  combinations,
  areMinimumNumbersSelected,
  areMaximumNumbersSelected,
  areValidRequestedNumbersSelected,
  isValidBetType,
  isColumnValid,
  isWheelValid,
  isMarketsValid,
  calculateCategoryColumnsNumber,
  calculateWheelCost,
  calculateMarketsCost,
  calculateWheelsComboBoardsNumber,
  areWheelsValid,
  isBetslipValid,
  formatIlotBetslip,
  getBoardSortingFn,
  isWheelCategoryEmpty,
  isMarketsCategoryEmpty,
  toggleGameTypeOnMultiBoardCategory,
  toggleMultipliersOnMultiBoardCategory,
  resetWheelCategory,
  resetMarketCategory,
};
