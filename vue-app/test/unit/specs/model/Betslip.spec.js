import Betslip from '../../../../src/model/Betslip';
import Bet from '../../../../src/model/Bet';

describe('Betslip.js', () => {
  it('should calculate its total value correctly', () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].multiplier = 1;
    betslip.bet_areas[0].pickedNumbers.push(1, 2);
    betslip.bet_areas[0].filled = true;
    betslip.bet_areas[0].refreshValue();

    expect(betslip.calculateValue()).to.eql(0.5);
  });

  it("should refresh it's value succesfully", () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].pickedNumbers.push(1, 2);
    betslip.bet_areas[0].filled = true;

    const betslipValue = betslip.calculateValue();
    betslip.refreshValue();
    expect(betslip.value).to.eql(betslipValue);
  });

  it('should reset an bet area', () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].pickedNumbers.push(1, 2);
    betslip.bet_areas[0].filled = true;

    betslip.clearBetslipArea(1);
    expect(betslip.bet_areas[0]).to.eql(new Bet(1));
  });

  it('should check if a betslip is valid', () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].pickedNumbers.push(1, 2);
    betslip.bet_areas[0].filled = true;

    expect(betslip.isValidBetslip(betslip)).to.be.true;
  });

  it('should check if a betslip is not valid', () => {
    const betslip = new Betslip();
    betslip.bet_areas[0].gameType = 2;
    betslip.bet_areas[0].pickedNumbers.push(1);
    betslip.bet_areas[0].filled = true;

    expect(betslip.isValidBetslip(betslip)).to.be.false;
  });
});
