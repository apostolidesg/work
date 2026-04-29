import Constants from './Constants';
import Mappings from './Mappings';
import Utilities from './Utilities';
import { curry, cond, ifElse, T, compose } from 'ramda/es';

const checkIsBet = ({betType}) => Utilities.isBet(betType);
const checkIsOddEvenDraw = ({betType}) => Utilities.isOddEvenDraw(betType);
const checkIsColumn = ({betType}) => Utilities.isColumn(betType);

const calculateWinningsResult = (multiplier, winningYield) => (multiplier * Constants.BASIC_BETTING_AMOUNT) * winningYield;
const isKinoBonusActive = ({betType, hasKinoBonusNumber}) => hasKinoBonusNumber && Utilities.isBetTypeKinoBonus(betType);
const zeroWinningResult = () => 0;

const recalculateWinningResult = (winningResult, winningLimit) => Math.min(winningResult, winningLimit);
const getWinningLimit = isKinoBonusActive => isKinoBonusActive ? Constants.MAX_KINO_BONUS_WINNING_AMOUNT : Constants.MAX_KINO_WINNING_AMOUNT;
const checkWinningResult = ({betType, hasKinoBonusNumber}, winningResult) => compose(
  curry(recalculateWinningResult)(winningResult),
  getWinningLimit,
  isKinoBonusActive
)({betType, hasKinoBonusNumber});

const getYieldForWinningNumbers = ({ lengthOfWinningNumbers, playedNumbers, betType }, betPayTableYields) => {
  const isClose2WinSelected = Utilities.isBetTypeClose2Win(betType);
  const isClose2WinGame = isClose2WinSelected && playedNumbers.length - lengthOfWinningNumbers === 1;
  return (
    (betPayTableYields[lengthOfWinningNumbers] || 0) +
    (isClose2WinGame ? Constants.PAY_TABLES.C2W[playedNumbers.length] : 0)
  );
};
const getYieldsFromBetPayTable = (playedNumbers, betPayTable) => betPayTable[playedNumbers.length];
const getBetPayTable = isKinoBonusActive => isKinoBonusActive ? Constants.PAY_TABLES.KINOBONUS : Constants.PAY_TABLES.KINO;
const getBetPayTableYields = ({betType, hasKinoBonusNumber, playedNumbers}) => compose(
  curry(getYieldsFromBetPayTable)(playedNumbers),
  getBetPayTable,
  isKinoBonusActive
)({betType, hasKinoBonusNumber});

const calculateBetWinnings = ({betType, playedNumbers, lengthOfWinningNumbers, multiplier, hasKinoBonusNumber}) => compose(
  curry(checkWinningResult)({betType, hasKinoBonusNumber}),
  curry(calculateWinningsResult)(multiplier),
  curry(getYieldForWinningNumbers)({lengthOfWinningNumbers, playedNumbers, betType}),
  getBetPayTableYields
)({betType, hasKinoBonusNumber, playedNumbers});

const getOddEvenDrawYield = betType => Mappings.ODD_EVEN_DRAW_TO_YIELD[betType];
const OddEvenDrawWinningsResult = ({betType, multiplier}) => compose(
  curry(calculateWinningsResult)(multiplier),
  getOddEvenDrawYield
)(betType);
const isWinningOddEvenDraw = ({betType, winningOddEvenDraw}) => betType === winningOddEvenDraw;
const calculateOddEvenDrawWinnings = ({betType, winningOddEvenDraw, multiplier}) => ifElse(
  isWinningOddEvenDraw,
  OddEvenDrawWinningsResult,
  zeroWinningResult
)({betType, winningOddEvenDraw, multiplier});

const isWinningColumn = ({playedNumbers, winningColumn}) => playedNumbers.includes(winningColumn);
const getColumnYield = () => Constants.COLUMNS_PAY;
const columnWinningsResult = ({multiplier}) => compose(
  curry(calculateWinningsResult)(multiplier),
  getColumnYield
)();

const calculateColumnWinnings = ({playedNumbers, winningColumn, multiplier}) => ifElse(
  isWinningColumn,
  columnWinningsResult,
  zeroWinningResult
)({playedNumbers, winningColumn, multiplier});

const calculateWinnings = ({playedNumbers, winningColumn, winningOddEvenDraw, multiplier, betType, lengthOfWinningNumbers, hasKinoBonusNumber}) => cond([
  [checkIsBet, calculateBetWinnings],
  [checkIsOddEvenDraw, calculateOddEvenDrawWinnings],
  [checkIsColumn, calculateColumnWinnings],
  [T, zeroWinningResult]
])({playedNumbers, winningColumn, winningOddEvenDraw, multiplier, betType, lengthOfWinningNumbers, hasKinoBonusNumber});

export default {
  checkIsBet,
  calculateBetWinnings,
  calculateOddEvenDrawWinnings,
  calculateColumnWinnings,
  calculateWinnings
};
