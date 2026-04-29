import Betslip from '../../../model/kino/Betslip';

const state = () => ({
  betslip: new Betslip(),
  activeAreaIndex: 0,
  readyBetslipsNumbers: 0,
});

export default state;
