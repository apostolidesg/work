/**
 * Global betslip utility functions
 * Shared functions used across multiple games
 */

/**
 * Returns product range for combination calculations
 * Helper function for combinations()
 *
 * @param {number} a - Start of range
 * @param {number} b - End of range
 * @returns {number} Product of range
 */
const productRange = (a, b) => {
  let prd = a;
  let i = a;

  while (i++ < b) {
    prd *= i;
  }
  return prd;
};

/**
 * Returns number of possible combinations
 * where "n" is the total set of possibilities
 * and "r" is the number of combinations we're interested in
 *
 * Used for Eurojackpot cost calculations and potentially other games
 *
 * @param {number} n - Total set of possibilities
 * @param {number} r - Number of combinations
 * @returns {number} Number of combinations
 */
const combinations = (n, r) => {
  if (n === r) return 1;
  r = r < n - r ? n - r : r;
  return productRange(r + 1, n) / productRange(1, n - r);
};

export default {
  combinations,
};
