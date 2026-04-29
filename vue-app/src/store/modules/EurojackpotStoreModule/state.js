import Betslip from '../../../model/eurojackpot/Betslip';
import EurojackpotConstants from '../../../util/eurojackpotConstants';

const state = {
  betslip: new Betslip(),
  selectedBoardIndex: 0,
  salesStatus: EurojackpotConstants.DRAW_STATUS.FETCHING_INFO,
  activeDrawApiTimeout: null,
  activeDrawId: null,
  activeDrawTime: null,
  salesCloseTime: null,
  jackpotAmount: null,
  statistics: null,
  statisticsSelection: EurojackpotConstants.STATISTICS_SELECTIONS.NONE,
  isActiveDrawExtra: false,
};

export default state;
