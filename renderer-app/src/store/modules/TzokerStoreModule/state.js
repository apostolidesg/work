import Betslip from '@/model/tzoker/Betslip';
import TzokerConstants from '@/util/tzoker/Constants';

const state = () => ({
  betslip: new Betslip(),
  selectedBoardIndex: null,
  statistics: null,
  statisticsSelection: TzokerConstants.STATISTICS_SELECTIONS.NONE,
});

export default state;
