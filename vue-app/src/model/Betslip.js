/* eslint-disable */
import OddEven from "./OddEven";
import Columns from "./Columns";
import Bet from "./Bet";
import ErrorHandlerService from '../handler/ErrorHandlerService'
import Constants from "../util/Constants";
import BetslipUtils from "../util/betslipUtils";
import {get, map} from 'lodash';

const NUMBER_BET_TYPES = [
  Constants.ILOT_GAMETYPES.BET_WITHOUT_KINO_BONUS,
  Constants.ILOT_GAMETYPES.BET_WITH_KINO_BONUS,
  Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN,
  Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN_AND_KINO_BONUS
]
export default class Betslip {

  constructor(wagerModel)
  {
    this.bet_areas = [];
    this.bet_areas.push(new Bet(1));
    this.consecutiveDraws = 1;
    this.oddEvenGame = new OddEven();
    this.columnsGame = new Columns();
    this.iSecureTokens = [];
    if (wagerModel) {
      const wagerBoards = get(wagerModel, 'boards') || [];
      const betAreasFromModel = wagerBoards.filter(board => NUMBER_BET_TYPES.includes(board.betType));
      const oddEvenGameFromModel = wagerBoards.find(board => board.betType === Constants.ILOT_GAMETYPES.ODD || board.betType === Constants.ILOT_GAMETYPES.EVEN || board.betType === Constants.ILOT_GAMETYPES.DRAW);
      const columnsGameFromModel = wagerBoards.find(board => board.betType === Constants.ILOT_GAMETYPES.COLUMNS);
      this.bet_areas = betAreasFromModel.length ? map(betAreasFromModel, (board, i) => new Bet(i + 1, board)) : this.bet_areas;
      this.consecutiveDraws = get(wagerModel, 'participatingDraws.multipleDraws');
      this.oddEvenGame = oddEvenGameFromModel ? new OddEven(oddEvenGameFromModel) : this.oddEvenGame;
      this.columnsGame = columnsGameFromModel ? new Columns(columnsGameFromModel) : this.columnsGame;
    }
    this.value = this.calculateValue();
  }

  addNewBet(){
    if(this.bet_areas.length < 6)
      this.bet_areas.push(new Bet());
  }

  removeBet(index){
    if( this.bet_areas.length > 1){
      this.bet_areas.splice(index, 1);
    } else {
      this.bet_areas[0].resetArea();
    }
  }

  setConsecutiveDraws(draws){
    this.consecutiveDraws = draws;
    this.value = this.calculateValue();
  }

  calculateValue()
  {
    let totalValue = 0.0;
    for (let area in this.bet_areas)
      totalValue += this.bet_areas[area].value;

    this.value = (totalValue + this.oddEvenGame.calculateValue() + this.columnsGame.calculateValue()) * this.consecutiveDraws;

    return this.value;
  }

  refreshValue()
  {
    this.value = this.calculateValue();
  }

  clearBetslipArea(area)
  {
    this.bet_areas[area - 1].resetArea();
  }

  //TODO: Remove argument
  clearBetslip()
  {
    this.bet_areas = [];
    for (let i = 1; i < 7; i++)
    {
      this.bet_areas.push(new Bet(i));
    }
    this.consecutiveDraws = 1;
    this.oddEvenGame = new OddEven();
    this.columnsGame = new Columns();
    this.value = this.calculateValue();
  }

  //TODO: Remove argument
  isValidBetslip(betslip)
  {
    let errors = ErrorHandlerService.validateBetslip(betslip || this);
    return errors.length === 0;
  }

  ilotFormat()
  {
    let ilotFormattedBetslip = {
      gameType: 'KINO',
      isecure: this.iSecureTokens,
      wager: {
        boards: [],
        participatingDraws: {
          multipleDraws: this.consecutiveDraws
        }
      }
    };

    for (let area of this.bet_areas)
    {
      if (area.filled)
      {
        ilotFormattedBetslip.wager.boards.push({
          betType: BetslipUtils.getBetTypeFromKinoBoard(area),
          multipliers: area.multiplier,
          panels: [
            {
              selection: area.pickedNumbers
            }],
          quickPick: area.quickPick
        });
      }
    }

    if (this.oddEvenGame.isFilled())
    {
      let gameType = null;

      switch (this.oddEvenGame.oddEven)
      {
        case 'odd':
          gameType = Constants.ILOT_GAMETYPES.ODD;
          break;
        case 'even':
          gameType = Constants.ILOT_GAMETYPES.EVEN;
          break;
        case 'draw':
          gameType = Constants.ILOT_GAMETYPES.DRAW;
          break;
      }

      ilotFormattedBetslip.wager.boards.push({
        betType: gameType,
        multipliers: this.oddEvenGame.value*2,
        panels: [
          {
            requested: 0,
            selection: []
          }
        ]
      });
    }

    if (this.columnsGame.isFilled())
      ilotFormattedBetslip.wager.boards.push({
        betType: Constants.ILOT_GAMETYPES.COLUMNS,
        multipliers: this.columnsGame.columnsAmount.reduce(function(acc, val) { return acc + val; }) * 2,
        panels: [
          {
            selection: this.columnsGame.columns
          }
        ]
      });

    return JSON.stringify(ilotFormattedBetslip, null, 7);
  }

  isFilled() {
    return this.betAreasFilled() || this.oddEvenGame.isFilled() || this.columnsGame.isFilled() || this.consecutiveDraws !== 1;
  }

  betAreasFilled() {
    return !!this.bet_areas.find(area => area.filled);
  }

  setISecureTokens(iSecureTokens){
    this.iSecureTokens = iSecureTokens;
  }

}
