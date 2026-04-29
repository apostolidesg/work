/* eslint-disable */
import Constants from '@/util/Constants';
import Util from '@/util/Utilities';
import {get} from 'lodash';
export default class Columns {

    constructor(columnsModel) {
        this.columns = Util.arraySort(get(columnsModel, 'panels[0].selection') || []);
        this.value = get(columnsModel, 'multipliers') * 0.5 || '';
        this.columnsAmount = columnsModel ? Util.constructAmountFromSet(this.value, Constants.ODD_EVEN_COLUMNS_AMOUNTS) : [];
    }

    resetColumns(){
        this.columns=[];
        this.columnsAmount = [];
    }

    calculateValue(){
        if(this.columns.length === 0) {
          this.value = 0.0;
        }
        else if(this.columnsAmount.length !== 0) {
          this.value = this.columnsAmount.reduce(function(acc, val) { return acc + val; }) * this.columns.length;
        }
        return this.value;
    }

    isFilled(){
      return this.columns.length > 0 && this.columnsAmount.length > 0;
    }
}
