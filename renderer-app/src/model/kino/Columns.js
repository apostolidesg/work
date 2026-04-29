import KinoConstants from '../../util/kino/Constants';
import Utilities from '../../util/Utilities';

export default class Columns {
  constructor(columnsModel) {
    this.columns = Utilities.arraySort(columnsModel?.panels?.[0]?.selection || []);
    this.value = (columnsModel?.multipliers || 0) * 0.5 || '';
    this.columnsAmount = columnsModel
      ? Utilities.constructAmountFromSet(this.value, KinoConstants.ODD_EVEN_COLUMNS_AMOUNTS)
      : [];
  }

  resetColumns() {
    this.columns = [];
    this.columnsAmount = [];
  }

  calculateValue() {
    if (this.columns.length === 0) {
      this.value = 0.0;
    } else if (this.columnsAmount.length !== 0) {
      this.value =
        this.columnsAmount.reduce(function (acc, val) {
          return acc + val;
        }) * this.columns.length;
    }
    return this.value;
  }

  isFilled() {
    return this.columns.length > 0 && this.columnsAmount.length > 0;
  }
}
