import Betslip from '../../../model/fireblaze/Betslip';
import FireblazeConstants from '../../../util/fireblazeConstants';

const state = {
  betslip: new Betslip(),
  selectedBoardIndex: 0,
  statistics: null,
  statisticsSelection: FireblazeConstants.STATISTICS_SELECTIONS.NONE,
};

export default state;
