import EurojackpotConstants from '../../util/eurojackpotConstants';
import Utilities from '../../util/Utilities';
import max from 'ramda/src/max';
import EurojackpotBetslipUtilities from '../../util/eurojackpotBetslipUtilities';

export default class Board {
  constructor({
    betType = EurojackpotConstants.BET_TYPES.DEFAULT,
    panels = [{ selection: [] }, { selection: [] }],
    quickPick = false,
    multipliers = EurojackpotConstants.DEFAULT_MULTIPLIERS,
    systemId = null,
  } = {}) {
    this.panels = panels;
    this.betType = betType;
    this.quickPick = quickPick;
    this.multipliers = multipliers;
    this.systemId = systemId;
  }

  setMainNumber(number) {
    if (number <= EurojackpotConstants.BOARD_NUMBERS.MAIN.MAX && number > 0) {
      this.quickPick && this.disableQuickPick();
      this.panels[0].selection = Utilities.toggleNumberInArray(number, this.panels[0].selection);
    }
  }

  setEuroNumber(number) {
    if (number <= EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MAX && number > 0) {
      this.quickPick && this.disableQuickPick();
      this.panels[1].selection = Utilities.toggleNumberInArray(number, this.panels[1].selection);
    }
  }

  addQuickPick() {
    const mainNumbersToPick = this.systemId
      ? EurojackpotConstants.SYSTEMS[this.systemId].numbers
      : max(this.panels[0].selection.length, EurojackpotConstants.BOARD_NUMBERS.MAIN.MIN);
    const euroNumbersToPick = max(this.panels[1].selection.length, EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MIN);
    this.panels[0].selection = Utilities.getUniqueRandomArray(
      1,
      EurojackpotConstants.BOARD_NUMBERS.MAIN.MAX,
      mainNumbersToPick
    ).sort((a, b) => a - b);
    this.panels[1].selection = Utilities.getUniqueRandomArray(
      1,
      EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MAX,
      euroNumbersToPick
    ).sort((a, b) => a - b);
    this.enableQuickPick();
  }

  enableQuickPick() {
    this.quickPick = true;
  }

  disableQuickPick() {
    this.quickPick = false;
  }

  setSystemId(systemId) {
    if (systemId && !EurojackpotConstants.SYSTEMS[systemId]) {
      return;
    }

    this.systemId = this.systemId !== systemId ? systemId : null;
    this.disableQuickPick();
  }

  reset() {
    this.betType = EurojackpotConstants.BET_TYPES.DEFAULT;
    this.panels = [{ selection: [] }, { selection: [] }];
    this.quickPick = false;
    this.multipliers = EurojackpotConstants.DEFAULT_MULTIPLIERS;
    this.systemId = null;
  }

  isEmpty() {
    return this.panels[0].selection.length === 0 && this.panels[1].selection.length === 0 && !this.systemId;
  }

  isValid() {
    return EurojackpotBetslipUtilities.isBoardValid(this);
  }
}
