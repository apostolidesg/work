/* eslint-disable */
import Constants from '@/util/Constants';
import Util from '@/util/Utilities';
import {get, isEmpty} from 'lodash';
export default class Bet{


  constructor(area, betModel){
    const betType = get(betModel, 'betType');

    this.activeArea = area === 1;
    this.pickedNumbers = this.quickPickSelections(betModel) || [];
    this.filled = !isEmpty(this.pickedNumbers);
    this.gameType = this.pickedNumbers.length;
    this.kinoBonusActive = Util.isBetTypeKinoBonus(betType);
    this.kinoClose2WinActive = Util.isBetTypeClose2Win(betType);
    this.multiplier = get(betModel, 'multipliers') || 1;
    this.quickPick = !!get(betModel, 'quickPick');
    this.value = this.calculateValue();
    this.selectedMultipliers = Util.constructAmountFromSet(this.multiplier, Constants.MULTIPLIERS_SET);
  }

  quickPickSelections (betModel) {
    if(!!get(betModel, 'quickPick')) {
      let pickedNumbers = []
      for (let i = 0; i < get(betModel, 'panels[0].selection').length; i++) {
        let number = Util.getRandomInt(1, 80);
        while (pickedNumbers.includes(number)) {
          number = Util.getRandomInt(1, 80);
        }
        pickedNumbers.push(number);
      }
      pickedNumbers = Util.arraySort(pickedNumbers);
      return pickedNumbers;
    }
    return get(betModel, 'panels[0].selection');
  }


  calculateValue(){
    let value = 0.5;
    if(this.gameType === 0 && this.pickedNumbers.length === 0)
      return 0.0;

    value = (value * this.multiplier);
    const gameMultiplier = 1 + (this.kinoBonusActive ? 1 : 0) + (this.kinoClose2WinActive ? 1 : 0);
    return value * gameMultiplier;
  }

  refreshValue(){
	  this.value=this.calculateValue();
  }

  toggleNumber(number){
    if(this.pickedNumbers.includes(number)){
      this.pickedNumbers = [...this.pickedNumbers.filter(n => n !== number)];
    }
    else if(this.pickedNumbers.length < 12){
      this.pickedNumbers = [...this.pickedNumbers, number].sort((a, b) => a - b);
    }

    this.gameType = this.pickedNumbers.length;
    this.kinoClose2WinActive = Constants.KINO_CLOSE_2_WIN_GAMES.includes(this.gameType) ? this.kinoClose2WinActive : false;
    this.kinoBonusActive = this.gameType === 0 ? false : this.kinoBonusActive;
    this.quickPick = false;
    this.filled = this.gameType > 0;
    this.value = this.calculateValue();
  }

  quickPickNumbers(gameType){
    this.pickedNumbers = []
    for (let i = 0; i < gameType; i++) {
      let number = Util.getRandomInt(1, 80);
      while (this.pickedNumbers.includes(number)) {
        number = Util.getRandomInt(1, 80);
      }
      this.pickedNumbers.push(number);
    }
    this.pickedNumbers = Util.arraySort(this.pickedNumbers);
    this.quickPick = true;
    this.gameType = this.pickedNumbers.length;
    this.kinoClose2WinActive = Constants.KINO_CLOSE_2_WIN_GAMES.includes(this.gameType) ? this.kinoClose2WinActive : false;
    this.filled = true;
    this.value = this.calculateValue();
  }

  resetArea(){
    this.filled = false;
    this.gameType=0;
    this.pickedNumbers=[];
    this.multiplier=1;
    this.selectedMultipliers=Util.constructAmountFromSet(this.multiplier, Constants.MULTIPLIERS_SET);
    this.kinoBonusActive=false;
    this.kinoClose2WinActive=false;
    this.quickPick=false;
    this.value=this.calculateValue();
  }

  toggleMultiplier(multipliers){
    this.selectedMultipliers = Util.toggleNumberInArray(multipliers, this.selectedMultipliers, Constants.MULTIPLIERS_SET);
    this.selectedMultipliers.length === 0 && this.selectedMultipliers.push(Constants.MULTIPLIERS_SET[0]);
    this.multiplier = Util.arraySum(this.selectedMultipliers);
    this.refreshValue();
  }

  isDirty(){
    return this.filled || this.kinoBonusActive || this.kinoClose2WinActive || this.multiplier > 1;
  }
}
