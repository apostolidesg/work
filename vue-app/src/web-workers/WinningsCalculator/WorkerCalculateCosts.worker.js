import WorkerWinningsCalculator from './WorkerWinningsCalculator';
import tryCatch from 'ramda/es/tryCatch';

onmessage = ({ data }) => {
  const {
    playerBetslips = [],
    currentDrawWinningNumbers = [],
    currentDrawBonusNumber = null,
    currentDrawWinningColumn = null,
    currentDrawWinningOddEvenDraw = null,
    calcSimpleBetsOnly = true,
  } = tryCatch(JSON.parse, () => ({}))(data);
  const totalCost = WorkerWinningsCalculator({
    playerBetslips,
    currentDrawWinningNumbers,
    currentDrawBonusNumber,
    currentDrawWinningColumn,
    currentDrawWinningOddEvenDraw,
    calcSimpleBetsOnly,
  });
  postMessage(totalCost);
};

export default WorkerWinningsCalculator;
