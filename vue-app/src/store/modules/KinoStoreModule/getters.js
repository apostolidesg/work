import types from './types';

const getters = {
  [types.getters.GET_ACTIVE_BET_AREA]: ({ activeAreaIndex, betslip }) => betslip.bet_areas[activeAreaIndex],
  [types.getters.GET_BETSLIP_COST]: ({ betslip }) => betslip.calculateValue(),
  [types.getters.GET_CONSECUTIVE_DRAWS]: ({ betslip }) => betslip.consecutiveDraws,
  [types.getters.GET_READY_BETSLIPS_NUMBERS]: ({ readyBetslipsNumbers }) => readyBetslipsNumbers,
};

export default getters;
