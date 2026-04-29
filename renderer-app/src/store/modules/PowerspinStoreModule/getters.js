import types from './types';
import betslipUtils from '@/util/powerspin/BetslipUtils';
import PowerspinConstants from '@/util/powerspin/Constants';

const getters = {
  [types.getters.GET_BETSLIP_ARRAY]: ({ betslipArray }) => betslipArray,

  [types.getters.GET_SELECTED_BETSLIP_INDEX]: ({ selectedBetslipIndex }) => selectedBetslipIndex,

  [types.getters.GET_SELECTED_BETSLIP]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex];
  },

  [types.getters.GET_CONSECUTIVE_DRAWS]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex]?.wager?.participatingDraws?.multipleDraws || 1;
  },

  [types.getters.GET_MODE]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex]?.mode || 'wheels';
  },

  [types.getters.GET_IS_COMBO]: ({ betslipArray, selectedBetslipIndex }) => {
    const betslip = betslipArray[selectedBetslipIndex];
    return betslip?.wager?.wheels?.length > 1;
  },

  [types.getters.GET_WHEELS]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex]?.wager?.wheels || [];
  },

  [types.getters.GET_WHEELS_LENGTH]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex]?.wager?.wheels?.length || 0;
  },

  [types.getters.GET_WHEEL]:
    ({ betslipArray, selectedBetslipIndex }) =>
    ({ wheelIndex }) => {
      return betslipArray[selectedBetslipIndex]?.wager?.wheels?.[wheelIndex];
    },

  [types.getters.GET_MARKETS]: ({ betslipArray, selectedBetslipIndex }) => {
    return betslipArray[selectedBetslipIndex]?.wager?.markets;
  },

  [types.getters.GET_IS_BETSLIP_EMPTY]: ({ betslipArray, selectedBetslipIndex }) => {
    const betslip = betslipArray[selectedBetslipIndex];
    return betslip ? betslip.isEmpty() : true;
  },

  [types.getters.GET_IS_BETSLIP_VALID]: ({ betslipArray, selectedBetslipIndex }) => {
    const betslip = betslipArray[selectedBetslipIndex];
    return betslip ? betslip.isValidBetslip() : false;
  },

  [types.getters.GET_CATEGORY_COST]:
    () =>
    ({ category }) => {
      const columnsNumber = betslipUtils.calculateCategoryColumnsNumber({ category, isCombo: false });
      const multipliers = category.multipliers ||
        category.boards[0]?.multipliers || [PowerspinConstants.DEFAULT_MULTIPLIERS];
      const categoryMultiplier = Array.isArray(multipliers) ? multipliers.reduce((sum, m) => sum + m, 0) : multipliers;
      return columnsNumber * categoryMultiplier * PowerspinConstants.BASIC_BETTING_AMOUNT;
    },

  [types.getters.GET_WHEEL_COST]:
    (state, localGetters) =>
    ({ wheel }) => {
      return Object.values(wheel.categories).reduce(
        (acc, category) => acc + localGetters[types.getters.GET_CATEGORY_COST]({ category }),
        0
      );
    },

  [types.getters.GET_WHEELS_COST]:
    (state, localGetters) =>
    ({ betslip }) => {
      if (betslip.wager.wheels.length > 1) {
        return (
          betslipUtils.calculateWheelsComboBoardsNumber({ wheels: betslip.wager.wheels }) *
          betslip.getMultiplierNumber() *
          PowerspinConstants.BASIC_BETTING_AMOUNT
        );
      }
      return localGetters[types.getters.GET_WHEEL_COST]({ wheel: betslip.wager.wheels[0] });
    },

  [types.getters.GET_MARKETS_COST]:
    (state, localGetters) =>
    ({ markets }) => {
      return Object.values(markets.categories).reduce(
        (acc, category) => acc + localGetters[types.getters.GET_CATEGORY_COST]({ category }),
        0
      );
    },

  [types.getters.GET_BETSLIP_COST]: ({ betslipArray, selectedBetslipIndex }, localGetters) => {
    const betslip = betslipArray[selectedBetslipIndex];
    if (!betslip) return 0;

    const wheelsCost = localGetters[types.getters.GET_WHEELS_COST]({ betslip });
    const marketsCost = localGetters[types.getters.GET_MARKETS_COST]({ markets: betslip.wager.markets });
    const draws = betslip.wager.participatingDraws?.multipleDraws || 1;

    return (wheelsCost + marketsCost) * draws;
  },

  [types.getters.GET_TOTAL_COST]: ({ betslipArray }, localGetters) => {
    return betslipArray.reduce((total, betslip) => {
      if (!betslip || betslip.isEmpty()) return total;

      const wheelsCost = localGetters[types.getters.GET_WHEELS_COST]({ betslip });
      const marketsCost = localGetters[types.getters.GET_MARKETS_COST]({ markets: betslip.wager.markets });
      const draws = betslip.wager.participatingDraws?.multipleDraws || 1;

      return total + (wheelsCost + marketsCost) * draws;
    }, 0);
  },

  [types.getters.GET_QUICKPLAY_BETSLIP_DATA]: ({ quickplayBetslipData }) => quickplayBetslipData,
};

export default getters;
