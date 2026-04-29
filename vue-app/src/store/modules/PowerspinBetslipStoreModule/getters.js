import types from './types';
import betslipUtils from '../../../util/betslipUtils';
import powerspinConstants from '../../../util/powerspinConstants';

const getters = {
  [types.getters.GET_ILOT_BETSLIP_ARRAY]: ({ betslipArray }) => ({ indexedBoardId = true } = {}) => {
    return betslipArray.map(betslip => betslipUtils.formatIlotBetslip({ betslip, indexedBoardId }));
  },
  [types.getters.GET_ACTIVE_BETSLIP]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex];
  },
  [types.getters.GET_CONSECUTIVE_DRAWS]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex].wager.participatingDraws.multipleDraws;
  },
  [types.getters.GET_SELECTED_BETSLIP]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex];
  },
  [types.getters.GET_WHEEL]: ({ betslipArray, selectedBetslipIndex }) => ({ wheelIndex } = {}) => {
    return betslipArray[selectedBetslipIndex].wager.wheels[wheelIndex];
  },
  [types.getters.GET_WHEELS_LENGTH]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex].wager.wheels.length;
  },
  [types.getters.GET_CATEGORY_COST]: () => ({ category } = {}) => {
    return (
      betslipUtils.calculateCategoryColumnsNumber({ category }) *
      powerspinConstants.BASIC_BETTING_AMOUNT *
      (category.multipliers ? category.multipliers : category.boards[0].multipliers).reduce((acc, val) => acc + val)
    );
  },
  [types.getters.GET_WHEEL_COST]: ({ betslipArray }, localGetters) => ({ wheel } = {}) => {
    return Object.values(wheel.categories).reduce(
      (acc, category) => acc + localGetters[types.getters.GET_CATEGORY_COST]({ category }),
      0.0
    );
  },
  [types.getters.GET_WHEELS_COST]: (_, localGetters) => ({ betslip } = {}) => {
    return betslip.wager.wheels.length > 1
      ? betslipUtils.calculateWheelsComboBoardsNumber({ wheels: betslip.wager.wheels }) *
          betslip.getMultiplierNumber() *
          powerspinConstants.BASIC_BETTING_AMOUNT
      : localGetters[types.getters.GET_WHEEL_COST]({ wheel: betslip.wager.wheels[0] });
  },
  [types.getters.GET_BETSLIP_COST]: (_, localGetters) => ({ betslip } = {}) => {
    return (
      localGetters[types.getters.GET_WHEELS_COST]({ betslip }) * betslip.wager.participatingDraws.multipleDraws +
      localGetters[types.getters.GET_MARKETS_COST]({ markets: betslip.wager.markets }) *
        betslip.wager.participatingDraws.multipleDraws
    );
  },
  [types.getters.GET_BETSLIPS_COST]: ({ betslipArray }, localGetters) => {
    return betslipArray.reduce((acc, betslip) => acc + localGetters[types.getters.GET_BETSLIP_COST]({ betslip }), 0.0);
  },
  [types.getters.IS_BETSLIP_VALID]: ({ betslipArray }) => ({ betslipIndex }) => {
    return betslipUtils.isBetslipValid({ betslip: betslipArray[betslipIndex] });
  },
  [types.getters.GET_MARKETS]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex].wager.markets;
  },
  [types.getters.GET_MARKETS_COST]: (_, localGetters) => ({ markets } = {}) => {
    return Object.values(markets.categories).reduce(
      (acc, category) => acc + localGetters[types.getters.GET_CATEGORY_COST]({ category }),
      0.0
    );
  },
};

export default getters;
