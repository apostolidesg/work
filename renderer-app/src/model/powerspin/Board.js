import PowerspinConstants from '../../util/powerspin/Constants';
import Utilities from '../../util/Utilities';

export default class Board {
  constructor({
    betType = undefined,
    panels = [{ requested: [], selection: [] }],
    quickPick = false,
    multipliers = PowerspinConstants.DEFAULT_MULTIPLIERS,
  } = {}) {
    this.betType = betType;
    this.panels = panels;
    !Array.isArray(this.panels[0].requested) && (this.panels[0].requested = [this.panels[0].requested]);
    if (
      this.betType === PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER ||
      this.betType === PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL
    ) {
      this.panels[0].requested.length === 0 && (this.panels[0].requested = [PowerspinConstants.DEFAULT_REQUESTED]);
    }
    this.quickPick = quickPick;
    this.multipliers = Array.isArray(multipliers)
      ? multipliers
      : Utilities.constructAmountFromSet(multipliers, PowerspinConstants.MULTIPLIERS_SET);
    this.extendedBetting = { systems: [{ id: null, index: [] }] };
  }

  reset() {
    this.panels = [{ requested: [], selection: [] }];
    if (
      this.betType === PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER ||
      this.betType === PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL
    ) {
      this.panels[0].requested = [PowerspinConstants.DEFAULT_REQUESTED];
    } else if (this.betType === PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL) {
      this.betType = undefined;
    }
    this.multipliers = [PowerspinConstants.DEFAULT_MULTIPLIERS];
    this.extendedBetting = { systems: [{ id: null, index: [] }] };
    this.quickPick = false;
  }

  setBetType(betType) {
    this.betType = betType;
  }

  enableQuickPick() {
    this.quickPick = true;
  }

  disableQuickPick() {
    this.quickPick = false;
  }

  isEmpty() {
    switch (this.betType) {
      case PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER:
        return (
          this.panels[0].selection.length === 0 &&
          (this.panels[0].requested.length === 0 ||
            (this.panels[0].requested.length === 1 && this.panels[0].requested[0] === 1))
        );
      case PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL:
        return this.panels[0].selection.length === 0;
      default:
        return this.betType == null;
    }
  }

  toggleMultipliers(multipliers = PowerspinConstants.DEFAULT_MULTIPLIERS) {
    this.multipliers = Utilities.toggleNumberInArray(multipliers, this.multipliers, PowerspinConstants.MULTIPLIERS_SET);
    this.multipliers.length === 0 && this.multipliers.push(PowerspinConstants.DEFAULT_MULTIPLIERS);
  }

  getMultiplierNumber() {
    return this.multipliers.reduce((acc, val) => acc + val, 0);
  }
}
