import QrCode from "../../../../src/model/QRCode.js";
import Betslip from "../../../../src/model/Betslip";

describe('QRCode Model', ()=> {

  it("should create correct qrcode string when [betArea:1|filled:true|GameType:2|Numbers:1,2]", () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].activeArea = true;
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].multiplier = 1;
    betslip.bet_areas[0].pickedNumbers.push(1);
    betslip.bet_areas[0].pickedNumbers.push(2);
    betslip.bet_areas[0].filled = true;
    let qrCode = new QrCode();
    let QrCodeOutcome = qrCode.constructQRCode(betslip, "ssbt_01");
    expect(QrCodeOutcome).to.contain("@A,0@S,2@U,1,2@MP,1");
    expect(QrCodeOutcome).not.to.contain("@SK");
  });

  it("should create correct qrcode string when [betArea:1|filled:true|GameType:2|Numbers:1,2] && [betArea:6|filled:true|GameType:1|Numbers:80]", () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].activeArea = true;
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].multiplier = 1;
    betslip.bet_areas[0].pickedNumbers.push(1);
    betslip.bet_areas[0].pickedNumbers.push(2);
    betslip.bet_areas[0].filled = true;

    betslip.addNewBet();
    betslip.bet_areas[1].activeArea = true;
    betslip.bet_areas[1].gameType = 1;
    betslip.bet_areas[1].multiplier = 1;
    betslip.bet_areas[1].pickedNumbers.push(80);
    betslip.bet_areas[1].filled = true;
    let qrCode = new QrCode();
    let QrCodeOutcome = qrCode.constructQRCode(betslip, "ssbt_01");
    expect(QrCodeOutcome).to.contain("@A,0@S,2@U,1,2@MP,1@A,1@S,1@U,80@MP,1");
    expect(QrCodeOutcome).not.to.contain("@SK");
  });

  it("should create correct qrcode string when [betArea:1|filled:true|GameType:2|Numbers:1,2|Mult:4|KinoBonus:true]", () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].activeArea = true;
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].pickedNumbers.push(1);
    betslip.bet_areas[0].pickedNumbers.push(2);
    betslip.bet_areas[0].multiplier = 4;
    betslip.bet_areas[0].kinoBonusActive = true;
    betslip.bet_areas[0].filled = true;
    let qrCode = new QrCode();
    let QrCodeOutcome = qrCode.constructQRCode(betslip, "ssbt_01");
    expect(QrCodeOutcome).to.contain("@A,0@S,2@U,1,2@MP,4@SK");
  });

  it("should create correct qrcode string when [betArea:2|filled:true|GameType:2|Numbers:1,2|Mult:4|KinoBonus:false] && [betArea:4|filled:true|GameType:1|Numbers:2|Mult:10|KinoBonus:true]", () => {
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
    let qrCode = new QrCode();
    let QrCodeOutcome = qrCode.constructQRCode(betslip, "ssbt_01");
    expect(QrCodeOutcome).to.contain("@A,0@S,2@U,1,2@MP,4@A,1@S,1@U,2@MP,10@SK");
  });

  it("should create correct qrcode string when [betArea:1|filled:true|GameType:2|Numbers:1,2] && Consecutive Draws : 100", () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].multiplier = 1;
    betslip.bet_areas[0].pickedNumbers.push(1);
    betslip.bet_areas[0].pickedNumbers.push(2);
    betslip.bet_areas[0].filled = true;
    betslip.consecutiveDraws = 100;
    let qrCode = new QrCode();
    let QrCodeOutcome = qrCode.constructQRCode(betslip, "ssbt_01");
    expect(QrCodeOutcome).to.contain("@A,0@S,2@U,1,2@MP,1^@CD,100");
  });

  it("should create correct qrcode string when [betArea:1|filled:true|GameType:2|Numbers:1,2] && [Columns:1,2|ColumnsAmount:4,40]", () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].multiplier = 1;
    betslip.bet_areas[0].pickedNumbers.push(1);
    betslip.bet_areas[0].pickedNumbers.push(2);
    betslip.bet_areas[0].filled = true;
    betslip.columnsGame.columns.push(1);
    betslip.columnsGame.columns.push(2);
    betslip.columnsGame.columnsAmount.push(4);
    betslip.columnsGame.columnsAmount.push(40);
    let qrCode = new QrCode();
    let QrCodeOutcome = qrCode.constructQRCode(betslip, "ssbt_01");
    expect(QrCodeOutcome).to.contain("A,0@S,2@U,1,2@MP,1^@CD,1@SBET_CLMNS,1,2@SBET_CLMNS_AMNT,4,40");
  });

  it("should create correct qrcode string when [OddEven:odd|OddEvenAmount:40] && Consecutive Draws : 20", () => {
    const betslip = new Betslip();
    betslip.oddEvenGame.oddEven = "odd";
    betslip.oddEvenGame.oddEvenAmount.push(40);
    betslip.consecutiveDraws = 20;
    let qrCode = new QrCode();
    let QrCodeOutcome = qrCode.constructQRCode(betslip, "ssbt_01");
    expect(QrCodeOutcome).to.contain("@CD,20@SBET_OE,O@SBET_OE_AMNT,40");
  });

  it("should create correct qrcode string when [OddEven:draw|OddEvenAmount:20]", () => {
    const betslip = new Betslip();
    betslip.oddEvenGame.oddEven = "draw";
    betslip.oddEvenGame.oddEvenAmount.push(20);
    let qrCode = new QrCode();
    let QrCodeOutcome = qrCode.constructQRCode(betslip, "ssbt_01");
    expect(QrCodeOutcome).to.contain("@CD,1@SBET_OE,EQ@SBET_OE_AMNT,20");
  });

  it("should create correct qrcode string when [OddEven:even|OddEvenAmount:10]", () => {
    const betslip = new Betslip();
    betslip.oddEvenGame.oddEven = "even";
    betslip.oddEvenGame.oddEvenAmount.push(10);
    let qrCode = new QrCode();
    let QrCodeOutcome = qrCode.constructQRCode(betslip, "ssbt_01");
    expect(QrCodeOutcome).to.contain("@CD,1@SBET_OE,E@SBET_OE_AMNT,10");
  });

});
