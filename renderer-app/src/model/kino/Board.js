import Constants from '../../util/Constants';
import Utilities from '../../util/Utilities';

export default class Board {
  constructor(area, betModel) {
    const betType = betModel?.betType;

    this.activeArea = area === 1;
    this.pickedNumbers = this.quickPickSelections(betModel) || [];
    this.filled = this.pickedNumbers.length > 0;
    this.gameType = this.pickedNumbers.length;
    this.kinoBonusActive = Utilities.isBetTypeKinoBonus(betType);
    this.kinoClose2WinActive = Utilities.isBetTypeClose2Win(betType);
    this.multiplier = betModel?.multipliers || 1;
    this.quickPick = !!betModel?.quickPick;
    this.value = this.calculateValue();
    this.selectedMultipliers = Utilities.constructAmountFromSet(this.multiplier, Constants.MULTIPLIERS_SET);
  }

  quickPickSelections(betModel) {
    if (betModel?.quickPick) {
      let pickedNumbers = [];
      const selectionLength = betModel?.panels?.[0]?.selection?.length || 0;
      for (let i = 0; i < selectionLength; i++) {
        let number = Utilities.getRandomInt(1, 80);
        while (pickedNumbers.includes(number)) {
          number = Utilities.getRandomInt(1, 80);
        }
        pickedNumbers.push(number);
      }
      pickedNumbers = Utilities.arraySort(pickedNumbers);
      return pickedNumbers;
    }
    return betModel?.panels?.[0]?.selection || [];
  }

  calculateValue() {
    let value = 0.5;
    if (this.gameType === 0 && this.pickedNumbers.length === 0) return 0.0;

    value = value * this.multiplier;
    const gameMultiplier = 1 + (this.kinoBonusActive ? 1 : 0) + (this.kinoClose2WinActive ? 1 : 0);
    return value * gameMultiplier;
  }

  refreshValue() {
    this.value = this.calculateValue();
  }

  toggleNumber(number) {
    if (this.pickedNumbers.includes(number)) {
      this.pickedNumbers = [...this.pickedNumbers.filter((n) => n !== number)];
    } else if (this.pickedNumbers.length < 12) {
      this.pickedNumbers = [...this.pickedNumbers, number].sort((a, b) => a - b);
    }

    this.gameType = this.pickedNumbers.length;
    this.kinoClose2WinActive = Constants.KINO_CLOSE_2_WIN_GAMES.includes(this.gameType)
      ? this.kinoClose2WinActive
      : false;
    this.kinoBonusActive = this.gameType === 0 ? false : this.kinoBonusActive;
    this.quickPick = false;
    this.filled = this.gameType > 0;
    this.value = this.calculateValue();
  }

  quickPickNumbers(gameType) {
    this.pickedNumbers = [];
    for (let i = 0; i < gameType; i++) {
      let number = Utilities.getRandomInt(1, 80);
      while (this.pickedNumbers.includes(number)) {
        number = Utilities.getRandomInt(1, 80);
      }
      this.pickedNumbers.push(number);
    }
    this.pickedNumbers = Utilities.arraySort(this.pickedNumbers);
    this.quickPick = true;
    this.gameType = this.pickedNumbers.length;
    this.kinoClose2WinActive = Constants.KINO_CLOSE_2_WIN_GAMES.includes(this.gameType)
      ? this.kinoClose2WinActive
      : false;
    this.filled = true;
    this.value = this.calculateValue();
  }

  resetArea() {
    this.filled = false;
    this.gameType = 0;
    this.pickedNumbers = [];
    this.multiplier = 1;
    this.selectedMultipliers = Utilities.constructAmountFromSet(this.multiplier, Constants.MULTIPLIERS_SET);
    this.kinoBonusActive = false;
    this.kinoClose2WinActive = false;
    this.quickPick = false;
    this.value = this.calculateValue();
  }

  toggleMultiplier(multipliers) {
    this.selectedMultipliers = Utilities.toggleNumberInArray(
      multipliers,
      this.selectedMultipliers,
      Constants.MULTIPLIERS_SET
    );
    this.selectedMultipliers.length === 0 && this.selectedMultipliers.push(Constants.MULTIPLIERS_SET[0]);
    this.multiplier = Utilities.arraySum(this.selectedMultipliers);
    this.refreshValue();
  }

  isDirty() {
    return this.filled || this.kinoBonusActive || this.kinoClose2WinActive || this.multiplier > 1;
  }
}
