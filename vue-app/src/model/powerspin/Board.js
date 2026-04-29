import powerspinConstants from '../../util/powerspinConstants';
import Utilities from '../../util/Utilities';

export default class Board {
  constructor({
    betType = undefined,
    panels = [{ requested: [], selection: [] }],
    quickPick = false,
    multipliers = powerspinConstants.DEFAULT_MULTIPLIERS,
  } = {}) {
    this.betType = betType;
    this.panels = panels;
    !Array.isArray(this.panels[0].requested) && (this.panels[0].requested = [this.panels[0].requested]);
    if (
      this.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER ||
      this.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL
    ) {
      this.panels[0].requested.length === 0 && (this.panels[0].requested = [powerspinConstants.DEFAULT_REQUESTED]);
    }
    this.quickPick = quickPick;
    this.multipliers = Array.isArray(multipliers)
      ? multipliers
      : Utilities.constructAmountFromSet(multipliers, powerspinConstants.MULTIPLIERS_SET);
    this.extendedBetting = { systems: [{ id: null, index: [] }] };
  }

  reset() {
    this.panels = [{ requested: [], selection: [] }];
    if (
      this.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER ||
      this.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL
    ) {
      this.panels[0].requested = [powerspinConstants.DEFAULT_REQUESTED];
    } else if (this.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL) {
      this.betType = undefined;
    }
    this.multipliers = [powerspinConstants.DEFAULT_MULTIPLIERS];
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
      case powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER:
        return (
          this.panels[0].selection.length === 0 &&
          (this.panels[0].requested.length === 0 ||
            (this.panels[0].requested.length === 1 && this.panels[0].requested[0] === 1))
        );
      case powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL:
        return this.panels[0].selection.length === 0;
      default:
        return this.betType == null;
    }
  }

  toggleMultipliers(multipliers = powerspinConstants.DEFAULT_MULTIPLIERS) {
    this.multipliers = Utilities.toggleNumberInArray(multipliers, this.multipliers, powerspinConstants.MULTIPLIERS_SET);
    this.multipliers.length === 0 && this.multipliers.push(powerspinConstants.DEFAULT_MULTIPLIERS);
  }

  getMultiplierNumber() {
    return this.multipliers.reduce((acc, val) => acc + val);
  }
}
