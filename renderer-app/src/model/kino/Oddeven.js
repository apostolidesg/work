import KinoConstants from '../../util/kino/Constants';
import Utilities from '../../util/Utilities';

export default class OddEven {
  constructor(oddEvenModel) {
    const oddEvenIndex = (oddEvenModel?.betType || 0) - 3;
    this.oddEven = KinoConstants.ODD_EVEN_VALUES[oddEvenIndex] || '';
    this.value = (oddEvenModel?.multipliers || 0) * 0.5 || '';
    this.oddEvenAmount = oddEvenModel
      ? Utilities.constructAmountFromSet(this.value, KinoConstants.ODD_EVEN_COLUMNS_AMOUNTS)
      : [];
  }

  resetOddEven() {
    this.oddEven = '';
    this.oddEvenAmount = [];
    this.value = '';
  }

  calculateValue() {
    if (this.oddEven === '') {
      this.value = 0.0;
    } else if (this.oddEvenAmount.length !== 0) {
      this.value = this.oddEvenAmount.reduce(function (acc, val) {
        return acc + val;
      });
    }
    return this.value;
  }

  isFilled() {
    return this.oddEven !== '';
  }
}
