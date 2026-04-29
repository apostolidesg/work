export default {
  /**
   * Creates an array of numbers to be printed. It adds leading 0 to the numbers and adds extra empty spots to the end
   * of the array depending on the max numbers allowed on each row
   *
   * @example
   * const input = [1,2,3,4]
   * constructNumbersForPrint(input, 6)
   * // returns {rows:1, numbers: ["01", "02", "03", "04", "--","--"]}
   *
   * const input = [1,2,3,4,5]
   * constructNumbersForPrint(input, 4)
   * // returns {rows:2, numbers: ["01", "02", "03", "04", "05", "--", "--", "--"]}
   *
   * const input = [1,2,3,4,5]
   * constructNumbersForPrint(input, 5)
   * // returns {rows:2, numbers: ["01", "02", "03", "04", "05"]}
   *
   * @param input {Number[]} The array of selections
   * @param maxPerRow {Number} The max number of items per row
   * */
  constructNumbersForPrint: (input, maxPerRow) => {
    const rows = Math.ceil(input.length / maxPerRow);
    const emptySpots = rows * maxPerRow - input.length;
    const numbers = input
      .map((number) => number.toString().padStart(2, '0'))
      .concat([...Array(emptySpots)].map((_) => '--'));

    return { rows, numbers };
  },
};
