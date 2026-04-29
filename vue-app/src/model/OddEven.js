/* eslint-disable */
import Constants from '@/util/Constants';
import Util from '@/util/Utilities';
import {get} from 'lodash';
export default class OddEven {

    constructor(oddEvenModel) {
        const oddEvenIndex = get(oddEvenModel, 'betType') - 3;
        this.oddEven = Constants.ODD_EVEN_VALUES[oddEvenIndex] || '';
        this.value = get(oddEvenModel, 'multipliers') * 0.5 || '';
        this.oddEvenAmount = oddEvenModel ? Util.constructAmountFromSet(this.value, Constants.ODD_EVEN_COLUMNS_AMOUNTS) : [];
    }

  resetOddEven() {
    this.oddEven ='';
    this.oddEvenAmount = [];
    this.value = '';
  }

  calculateValue(){
        if(this.oddEven === '') {
          this.value = 0.0;
        }
        else if(this.oddEvenAmount.length !== 0){
          this.value =this.oddEvenAmount.reduce(function(acc, val) { return acc + val; });
        }
        return this.value;
  }

  isFilled() {
    return this.oddEven !== '';
  }
}
