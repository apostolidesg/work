/**
 * Kino-specific constants
 * Game-specific values for Kino game
 */
export default {
  BOARD_NUMBERS: {
    MAIN: {
      MIN: 1,
      MAX: 80,
      DEFAULT_LENGTH: 6,
    },
  },
  MULTIPLIERS_SET: [1, 2, 3, 4, 5, 6, 8, 10, 20, 40],
  ODD_EVEN_COLUMNS_AMOUNTS: [1, 2, 3, 5, 10, 15, 20, 30, 50, 100],
  ODD_EVEN_VALUES: ['odd', 'even', 'draw'],
  KINO_GAMES: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  KINO_CLOSE_2_WIN_GAMES: [2, 3, 4, 5, 6, 7, 8, 9],
  MAX_KINO_WINNING_AMOUNT: 1000000,
  MAX_KINO_BONUS_WINNING_AMOUNT: 2000000,
  KINO_MAX_CONSECUTIVE_DRAWS_VALUE: 800,
};
