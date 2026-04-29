/**
 * Eurojackpot-specific constants
 * Game-specific values for Eurojackpot game
 */
export default {
  BOARD_NUMBERS: {
    MAIN: {
      MIN: 5,
      MAX: 50,
    },
    EURO_NUMBERS: {
      MIN: 2,
      MAX: 12,
    },
  },
  DEFAULT_MULTIPLIERS: 1,
  MAX_BOARDS: 6,
  BET_TYPES: {
    DEFAULT: 1,
  },
  SYSTEMS: {
    45: { numbers: 7, columns: 5 },
    35: { numbers: 8, columns: 6 },
    34: { numbers: 9, columns: 9 },
    25: { numbers: 9, columns: 30 },
    24: { numbers: 10, columns: 14 },
    23: { numbers: 10, columns: 51 },
    15: { numbers: 11, columns: 22 },
    14: { numbers: 12, columns: 38 },
    13: { numbers: 13, columns: 54 },
    12: { numbers: 15, columns: 118 },
  },
  DRAW_DAYS: [2, 5], // Tuesday and Friday
  MAX_NUMBERS_PER_ROW_ON_PRINT: 12,
  JACKPOT_COMPONENT_SIZE: {
    SMALL: 'small',
    LARGE: 'large',
  },
  DRAW_INFORMATION_DELAY_MILLIS: 20000, // 20 seconds
  STATISTICS_SELECTIONS: {
    OCCURRENCES: 'OCCURRENCES',
    NONE: 'NONE',
    DELAYS: 'DELAYS',
  },
  DRAW_STATUS: {
    FETCHING_INFO: 'FETCHING_INFO',
    SALES_OPEN: 'SALES_OPEN',
    SALES_CLOSED: 'SALES_CLOSED',
  },
  FIRST_DRAW_ID: 1,
  MAX_CONSECUTIVE_DRAWS: 52,
};
