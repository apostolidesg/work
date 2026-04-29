import WinningsCalculator from '../../util/WinningsCalculator';
import ifElse from 'ramda/es/ifElse';
import curry from 'ramda/es/curry';
import compose from 'ramda/es/compose';

const isWinningMatch = (winningNumbers) => (selectedNumber) => winningNumbers.includes(selectedNumber);

const getWinningNumbers = (playedNumbers, isWinningMatchCallback) => playedNumbers.filter(isWinningMatchCallback);

const betHasKinoBonusNumber = (bonusNumber, winningPlayedNumbers) =>
  bonusNumber && winningPlayedNumbers.includes(bonusNumber);

const reconstructBoards = (wagerId, boards) => boards.map((board) => ({ ...board, wagerId }));

const mergeBoards = (acc, { wagerId, boards = [] }) => acc.concat(reconstructBoards(wagerId, boards));

const extractBoards = (playerBetslips) => playerBetslips.reduce(mergeBoards, []);

const calcBetExtraOptions = ({ playedNumbers, winningNumbers, bonusNumber }) => {
  const winningPlayedNumbers = getWinningNumbers(playedNumbers, isWinningMatch(winningNumbers));
  const hasKinoBonusNumber = betHasKinoBonusNumber(bonusNumber, winningPlayedNumbers);
  return { winningPlayedNumbers, hasKinoBonusNumber };
};

const getBetExtraOptionsDefaults = () => ({ winningPlayedNumbers: [], hasKinoBonusNumber: false });

const getBetExtraOptions = ({ betType, playedNumbers, winningNumbers, bonusNumber }) =>
  ifElse(
    WinningsCalculator.checkIsBet,
    calcBetExtraOptions,
    getBetExtraOptionsDefaults
  )({ betType, playedNumbers, winningNumbers, bonusNumber });

const getWinningsCalculatorOptions = (
  {
    currentDrawWinningNumbers: winningNumbers,
    currentDrawBonusNumber: bonusNumber,
    currentDrawWinningColumn: winningColumn,
    currentDrawWinningOddEvenDraw: winningOddEvenDraw,
  },
  { betType, selection: playedNumbers, multipliers: multiplier }
) => {
  const { hasKinoBonusNumber, winningPlayedNumbers } = getBetExtraOptions({
    betType,
    playedNumbers,
    winningNumbers,
    bonusNumber,
  });
  return {
    betType,
    multiplier,
    playedNumbers,
    hasKinoBonusNumber,
    winningColumn,
    winningOddEvenDraw,
    lengthOfWinningNumbers: winningPlayedNumbers.length,
    winningPlayedNumbers,
  };
};

const formatBoard = (board, winningPlayedNumbers, hasKinoBonusNumber, winningAmount) => ({
  ...board,
  winningSelection: winningPlayedNumbers,
  hasKinoBonusNumber,
  winningAmount,
});

const calcBoardWinningAmountAll = (options) => WinningsCalculator.calculateWinnings(options);

const hasWinningNumbers = ({ lengthOfWinningNumbers }) => lengthOfWinningNumbers > 0;

const calcBoardWinningAmountBetsOnly = (options) =>
  WinningsCalculator.checkIsBet(options) && hasWinningNumbers(options)
    ? WinningsCalculator.calculateWinnings(options)
    : 0;

const calcBoardWinningAmount = (calcSimpleBetsOnly, options) =>
  ifElse(() => calcSimpleBetsOnly, calcBoardWinningAmountBetsOnly, calcBoardWinningAmountAll)(options);

const getFormattedBoard = (calcSimpleBetsOnly, board, { winningPlayedNumbers, ...options }) =>
  compose(curry(formatBoard)(board, winningPlayedNumbers, options.hasKinoBonusNumber), calcBoardWinningAmount)(
    calcSimpleBetsOnly,
    options
  );

const isWinningBoard = ({ winningAmount }) => winningAmount > 0;
const isFutureWinningBoard = ({ winningAmount, winningSelection }) =>
  winningAmount === 0 && winningSelection.length > 0;
const isNoWinningFutureBoard = (formattedBoard) =>
  !isWinningBoard(formattedBoard) && !isFutureWinningBoard(formattedBoard);

const addToBoardsArray = (boardsArray, formattedBoard) => [...boardsArray, formattedBoard];

const calcBoardsArray = (evaluationFn, formattedBoard, boardsArray) =>
  ifElse(evaluationFn, curry(addToBoardsArray)(boardsArray), () => [...boardsArray])(formattedBoard);

const addToTotalWinningAmount = (totalWinningAmount, { winningAmount }) => totalWinningAmount + winningAmount;

const sortByWinningAmount = ({ winningAmount: waA }, { winningAmount: waB }) => waB - waA;
const sortByWinningNumbers = ({ winningSelection: wsA }, { winningSelection: wsB }) => wsB.length - wsA.length;

const calcBoardsResult = (
  { winningBoards, futureWinningBoards, nonWinningBoards, totalWinningAmount },
  formattedBoard
) => {
  winningBoards = calcBoardsArray(isWinningBoard, formattedBoard, winningBoards).sort(sortByWinningAmount);
  futureWinningBoards = calcBoardsArray(isFutureWinningBoard, formattedBoard, futureWinningBoards).sort(
    sortByWinningNumbers
  );
  nonWinningBoards = calcBoardsArray(isNoWinningFutureBoard, formattedBoard, nonWinningBoards);
  totalWinningAmount = addToTotalWinningAmount(totalWinningAmount, formattedBoard);
  return { winningBoards, futureWinningBoards, nonWinningBoards, totalWinningAmount };
};

const calcBoardsReducer = (calcSimpleBetsOnly, currentDrawValues, boardsResult, board) =>
  compose(
    curry(calcBoardsResult)(boardsResult),
    curry(getFormattedBoard)(calcSimpleBetsOnly, board),
    getWinningsCalculatorOptions
  )(currentDrawValues, board);

const WorkerWinningsCalculator = ({ playerBetslips, calcSimpleBetsOnly, ...currentDrawValues }) =>
  extractBoards(playerBetslips)
    .reverse()
    .reduce(curry(calcBoardsReducer)(calcSimpleBetsOnly, currentDrawValues), {
      winningBoards: [],
      futureWinningBoards: [],
      nonWinningBoards: [],
      totalWinningAmount: 0,
    });

export default WorkerWinningsCalculator;
