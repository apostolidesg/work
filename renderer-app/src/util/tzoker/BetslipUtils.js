import TzokerConstants from './Constants';
import BetslipUtils from '@/util/BetslipUtils';

const factorial = (n) => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

const combinations = (n, r) => {
  if (r > n || r < 0) return 0;
  if (r === 0 || r === n) return 1;
  return factorial(n) / (factorial(r) * factorial(n - r));
};

const generateUniqueRandomNumbers = (min, max, count, exclude = []) => {
  const excludeSet = new Set(exclude);
  const available = [];

  for (let i = min; i <= max; i++) {
    if (!excludeSet.has(i)) {
      available.push(i);
    }
  }

  const result = [];
  const pool = [...available];

  for (let i = 0; i < count && pool.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(randomIndex, 1)[0]);
  }

  return result.sort((a, b) => a - b);
};

const generateMainQuickPick = (count = TzokerConstants.BOARD_NUMBERS.MAIN.MIN_VALID_LENGTH) => {
  const { MIN, MAX } = TzokerConstants.BOARD_NUMBERS.MAIN;
  return generateUniqueRandomNumbers(MIN, MAX, count);
};

const generateTzokerQuickPick = (count = TzokerConstants.BOARD_NUMBERS.TZOKER.MIN_VALID_LENGTH) => {
  const { MIN, MAX } = TzokerConstants.BOARD_NUMBERS.TZOKER;
  return generateUniqueRandomNumbers(MIN, MAX, count);
};

const generateFullQuickPick = ({ mainCount = 5, tzokerCount = 1 } = {}) => {
  return {
    mainNumbers: generateMainQuickPick(mainCount),
    tzokerNumbers: generateTzokerQuickPick(tzokerCount),
  };
};

const isMainPanelValid = (selection, systemId = null) => {
  const count = selection.length;
  if (systemId) {
    const systemConfig = TzokerConstants.SYSTEMS[systemId];
    return systemConfig && count === systemConfig.numbers;
  }
  return count >= TzokerConstants.BOARD_NUMBERS.MAIN.MIN_VALID_LENGTH;
};

const isTzokerPanelValid = (selection) => {
  return selection.length >= TzokerConstants.BOARD_NUMBERS.TZOKER.MIN_VALID_LENGTH;
};

const isBoardValid = (board) => {
  const mainNumbers = board.panels?.[0]?.selection || [];
  const tzokerNumbers = board.panels?.[1]?.selection || [];
  return isMainPanelValid(mainNumbers, board.systemId) && isTzokerPanelValid(tzokerNumbers);
};

const isBoardEmpty = (board) => {
  const mainNumbers = board.panels?.[0]?.selection || [];
  const tzokerNumbers = board.panels?.[1]?.selection || [];
  return mainNumbers.length === 0 && tzokerNumbers.length === 0 && !board.systemId;
};

const calculateBoardCost = (board) => {
  const mainNumbers = board.panels?.[0]?.selection?.length || 0;
  const tzokerNumbers = board.panels?.[1]?.selection?.length || 0;
  const systemId = board.systemId;

  if (mainNumbers < 5 || tzokerNumbers < 1) {
    return 0;
  }

  if (systemId) {
    const systemConfig = TzokerConstants.SYSTEMS[systemId];
    if (!systemConfig || mainNumbers !== systemConfig.numbers) {
      return 0;
    }
    return TzokerConstants.BASE_COST * systemConfig.columns * tzokerNumbers;
  }

  const mainCombinations = combinations(mainNumbers, 5);
  const totalColumns = mainCombinations * tzokerNumbers;
  return totalColumns * TzokerConstants.BASE_COST;
};

const calculateBetslipCost = (boards, consecutiveDraws = 1) => {
  const totalBaseCost = boards
    .filter((board) => isBoardValid(board))
    .reduce((acc, board) => acc + calculateBoardCost(board), 0);

  return totalBaseCost * consecutiveDraws;
};

const isConsecutiveDrawsValid = (draws) => {
  return draws >= TzokerConstants.PARTICIPATING_DRAWS.MIN && draws <= TzokerConstants.PARTICIPATING_DRAWS.MAX;
};

const isSystemValid = (systemId) => {
  return Object.keys(TzokerConstants.SYSTEMS).includes(String(systemId));
};

export default {
  combinations,
  factorial,
  generateUniqueRandomNumbers,
  generateMainQuickPick,
  generateTzokerQuickPick,
  generateFullQuickPick,
  isMainPanelValid,
  isTzokerPanelValid,
  isBoardValid,
  isBoardEmpty,
  calculateBoardCost,
  calculateBetslipCost,
  isConsecutiveDrawsValid,
  isSystemValid,
};
