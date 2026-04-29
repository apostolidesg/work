import FireblazeConstants from '../../util/fireblazeConstants';
import Utilities from '../../util/Utilities';
import max from 'ramda/src/max';
import FireblazeBetslipUtilities from '../../util/fireblazeBetslipUtils';

export default class Board {
  constructor({
    betType = FireblazeConstants.BET_TYPES.DEFAULT,
    panels = [{ selection: [], quickPick: false }],
    multipliers = [FireblazeConstants.DEFAULT_MULTIPLIERS],
  } = {}) {
    this.panels = panels;
    this.betType = betType;
    this.multipliers = Array.isArray(multipliers)
      ? multipliers
      : Utilities.constructAmountFromSet(multipliers, FireblazeConstants.MULTIPLIERS_SET[this.betType]);
  }

  setNumber(number) {
    if (number <= FireblazeConstants.BOARD_NUMBERS.MAX && number > 0) {
      this.panels[0].quickPick && this.disableQuickPick();
      this.panels[0].selection = Utilities.toggleNumberInArray(number, this.panels[0].selection);
    }
  }

  setMultipliers(multiplier) {
    if (FireblazeConstants.MULTIPLIERS_SET[this.betType].includes(multiplier)) {
      this.multipliers = Utilities.toggleNumberInArray(multiplier, this.multipliers);
      this.multipliers.length === 0 &&
        (this.multipliers = Utilities.toggleNumberInArray(FireblazeConstants.DEFAULT_MULTIPLIERS, this.multipliers));
    }
  }

  addQuickPick() {
    const numbersToPick = this.betType
      ? FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT[this.betType]
      : max(this.panels[0].selection.length, FireblazeConstants.BOARD_NUMBERS.MIN);
    this.panels[0].selection = Utilities.getUniqueRandomArray(
      1,
      FireblazeConstants.BOARD_NUMBERS.MAX,
      numbersToPick
    ).sort((a, b) => a - b);
    this.enableQuickPick();
  }

  enableQuickPick() {
    this.panels[0].quickPick = true;
  }

  disableQuickPick() {
    this.panels[0].quickPick = false;
  }

  setBetType(betType) {
    if (this.betType !== betType) {
      this.reset();
      this.betType = betType;
    }
    this.disableQuickPick();
  }

  reset() {
    this.betType = FireblazeConstants.BET_TYPES.DEFAULT;
    this.panels = [{ selection: [], quickPick: false }];
    this.multipliers = [FireblazeConstants.DEFAULT_MULTIPLIERS];
  }

  isEmpty() {
    return this.panels[0].selection.length === 0 && this.betType === FireblazeConstants.BET_TYPES.DEFAULT;
  }

  isValid() {
    return FireblazeBetslipUtilities.isBoardValid(this);
  }
}
