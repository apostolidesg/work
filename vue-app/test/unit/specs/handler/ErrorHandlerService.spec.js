import ErrorHandlerService from "../../../../src/handler/ErrorHandlerService.js";
import Betslip from "../../../../src/model/Betslip";

describe('ErrorHandlerService Handler', ()=> {

  it("should not throw error for valid betslip [betArea:2|filled:true|GameType:2|Numbers:1,2|Mult:4|KinoBonus:false] && [betArea:4|filled:true|GameType:1|Numbers:2|Mult:10|KinoBonus:true]", () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].pickedNumbers.push(1);
    betslip.bet_areas[0].pickedNumbers.push(2);
    betslip.bet_areas[0].multiplier = 4;
    betslip.bet_areas[0].filled = true;

    betslip.addNewBet();
    betslip.bet_areas[1].gameType = 1;
    betslip.bet_areas[1].pickedNumbers.push(2);
    betslip.bet_areas[1].multiplier = 10;
    betslip.bet_areas[1].kinoBonusActive = true;
    betslip.bet_areas[1].filled = true;
    expect(ErrorHandlerService.validateBetslip(betslip).length).to.eql(0);
  });

  it("should not throw error for valid betslip [OddEven:odd|OddEvenAmount:40] && Consecutive Draws : 20", () => {
    const betslip = new Betslip();
    betslip.oddEvenGame.oddEven = "odd";
    betslip.oddEvenGame.oddEvenAmount.push(40);
    betslip.consecutiveDraws = 20;
    expect(ErrorHandlerService.validateBetslip(betslip).length).to.eql(0);
  });

  it("should not throw error for valid betslip [betArea:1|filled:true|GameType:2|Numbers:1,2] && [Columns:1,2|ColumnsAmount:4,40]", () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].pickedNumbers.push(1);
    betslip.bet_areas[0].pickedNumbers.push(2);
    betslip.bet_areas[0].filled = true;
    betslip.columnsGame.columns.push(1);
    betslip.columnsGame.columns.push(2);
    betslip.columnsGame.columnsAmount.push(4);
    betslip.columnsGame.columnsAmount.push(40);
    expect(ErrorHandlerService.validateBetslip(betslip).length).to.eql(0);
  });

  it("should throw error for invalid betslip [betArea:2|filled:true|GameType:2|Numbers:1|Mult:4|KinoBonus:false]", () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].pickedNumbers.push(1);
    betslip.bet_areas[0].multiplier = 4;
    betslip.bet_areas[0].filled = true;
    expect(ErrorHandlerService.validateBetslip(betslip).length).to.eql(1);
  });

  it("should throw error for invalid betslip [OddEven:odd|OddEvenAmount:0]", () => {
    const betslip = new Betslip();
    betslip.oddEvenGame.oddEven = "odd";
    betslip.oddEvenGame.oddEvenAmount = [];
    expect(ErrorHandlerService.validateBetslip(betslip).length).to.eql(1);
  });

  it("should throw error for invalid betslip [Columns:odd|ColumnsAmount:]", () => {
    const betslip = new Betslip();
    betslip.columnsGame.columnsAmount = [];
    betslip.columnsGame.columns.push(1);
    expect(ErrorHandlerService.validateBetslip(betslip).length).to.eql(1);
  });

  it("should throw error when betslip is empty", () => {
    const betslip = new Betslip();
    expect(ErrorHandlerService.validateBetslip(betslip).length).to.eql(1);
  });

});
