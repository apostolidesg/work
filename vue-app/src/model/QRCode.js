/* eslint-disable */
import Util from "../util/Utilities";

export default class QRCode {

constructor() {


    // --------------------------- HEADER ---------------------------------
    // ID,text
    this.id = "@ID,KENO";

    // Game Code - GM,1100 for kino
    this.gameCode = "@GM,1100";

    // “UUID,text”, where text is the UUID string of the mobile device that the QR barcode is created
    this.uuid = "@UUID,";

    // “QRID,text”, where text is the QRID string that defines the QR barcode
    this.qrid = "@QRID,";

    // “ORIGIN,n”, where n can take the value 0 if the QR barcode is created from the mobile application or 1 if it is created
    // from the internet site). Note, that if the “ORIGIN” token is missing the defaults value is 0, i.e.,
    // the QR barcode is generated from a mobile application.
    this.originInfo = "@ORIGIN,0";

    // --------------------------- BODY ---------------------------------
    // (“A,n”, where n can take a value within the range 0-5
    this.areaNumber = "@A,";

    // “S,n1”, where n1 can take values within the range 1-12
    this.gameTypeSystem = "@S,";

    // Upper Area (“U,v1,v2,…,v(n)”, where v can take values within the range 1-80 and n is the number of selected numbers
    this.pickedNumbersArea = "@U,";

    // Quick Pick (“QP”)
    this.quickPick = "@QP";

    // Multiplier (“MP,n1”)
    this.mult = "@MP,";

    // Kino Bonus (SK)
    this.kinoBonus = "@SK";

    // --------------------------- FOOTER ---------------------------------
    // Consecutive Draws “CD,n1”
    this.consecDraws = "@CD,";

    // Future Draws “FD,n1”
    this.futureDraws = "@FD,";

    // Side Bet Columns(“SBET_CLMNS,n1,n2,…,ni” where ni can take one of the following values: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    this.sideBetColumns = "@SBET_CLMNS,";

    // Side Bet Columns Amount(“SBET_CLMNS_AMNT,n1,n2,…ni” where ni can take one of the following values: 1, 2, 3, 5, 10, 15, 20, 30, 50, 100)
    this.sideBetColumnsAmount = "@SBET_CLMNS_AMNT,";

    // Side Bet Odd-Even(“SBET_OE,n1” where n1 can take one of the following values: O for odd, E for even, EQ for draw
    this.sideBetOddEven = "@SBET_OE,";

    //Side Bet Odd-Even Amount(“SBET_OE_AMNT,n1,n2,…,ni” where ni can take one of the following values: 1, 2, 3, 5, 10, 15, 20, 30, 50, 100)
    this.sideBetOddEvenAmount = "@SBET_OE_AMNT,";
  }

  constructQRCode(betslip, terminalId) {
    //Construct header
    let qrCodeValue = this.id
      + this.gameCode
      + this.uuid +  terminalId + "_" + new Date().getTime()
      + this.qrid + Util.getRandomAlphanumeric(16, '0123456789abcdefghijklmnopqrstuvwxyz-')
      + this.originInfo
      + "^";

    //Construct body
    for (let i = 0; i < betslip.bet_areas.length; i++) {
      if (betslip.bet_areas[i].filled) {
        //Set AreaNumber, GameType and PickedNumbersArea
        qrCodeValue += this.areaNumber + i
          + this.gameTypeSystem + betslip.bet_areas[i].gameType
          + this.pickedNumbersArea + betslip.bet_areas[i].pickedNumbers.join(",");

        //Set Multiplier
        qrCodeValue += this.mult + betslip.bet_areas[i].multiplier;

        //Set Kino Bonus
        if (betslip.bet_areas[i].kinoBonusActive) {
          qrCodeValue += this.kinoBonus;
        }
      }
    }
    qrCodeValue += "^";

    //Construct Footer
    let consecutiveDraws = (typeof betslip.consecutiveDraws === 'undefined' || betslip.consecutiveDraws === null) ? 1 : betslip.consecutiveDraws;
    qrCodeValue += this.consecDraws + consecutiveDraws;
    let columnsExist = (!(typeof betslip.columnsGame === 'undefined' || betslip.columnsGame === null || betslip.columnsGame.columns.length === 0));
    if (columnsExist) {
      let columnsBet = betslip.columnsGame.columns.sort(function (a, b) {
        return a - b;
      }).join(",");
      let columnsAmount = betslip.columnsGame.columnsAmount.sort(function (a, b) {
        return a - b;
      }).join(",");
      qrCodeValue += this.sideBetColumns + columnsBet;
      qrCodeValue += this.sideBetColumnsAmount + columnsAmount;
    }


    let oddEvensExist = (!(typeof betslip.oddEvenGame === 'undefined' || betslip.oddEvenGame === null || betslip.oddEvenGame.oddEven.length === 0));

    if (oddEvensExist) {
      if (betslip.oddEvenGame.oddEven === "odd") {
        qrCodeValue += this.sideBetOddEven + "O";
      }
      else if (betslip.oddEvenGame.oddEven === "even") {
        qrCodeValue += this.sideBetOddEven + "E";
      }
      else if (betslip.oddEvenGame.oddEven === "draw") {
        qrCodeValue += this.sideBetOddEven + "EQ";
      }

      qrCodeValue += this.sideBetOddEvenAmount + betslip.oddEvenGame.oddEvenAmount.sort(function (a, b) {
        return a - b;
      }).join(",");
    }

    return qrCodeValue;
  }
}
