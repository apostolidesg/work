import Betslip from '@/model/fireblaze/Betslip';
import FireblazeConstants from '@/util/fireblaze/Constants';

const state = () => ({
  betslip: new Betslip(),
  selectedBoardIndex: 0,
  statistics: null,
  statisticsSelection: FireblazeConstants.STATISTICS_SELECTIONS.NONE,
});

export default state;
