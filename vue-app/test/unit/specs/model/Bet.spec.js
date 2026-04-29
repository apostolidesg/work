import Bet from '../../../../src/model/Bet';

describe('Bet model', () => {
  it("should calculate the bet's value correctly", () => {
    const bet = new Bet(1);
    bet.gameType = 2;
    bet.pickedNumbers.push(1, 2);
    bet.multiplier = 2;

    expect(bet.calculateValue()).to.eql(1);
  });

  it("should calculate the bet's value correctly when no numbers are picked", () => {
    const bet = new Bet(1);
    bet.gameType = 0;
    bet.multiplier = 2;

    expect(bet.calculateValue()).to.eql(0);
  });

  it("should refresh the bet's value successfully", () => {
    const bet = new Bet(1);
    bet.gameType = 2;
    bet.pickedNumbers.push(1, 2);
    bet.multiplier = 2;

    const betValue = bet.calculateValue();
    bet.refreshValue();
    expect(bet.value).to.eql(betValue);
  });

  it('should reset the bet when reset area is called', () => {
    const bet = new Bet(1);
    bet.gameType = 2;
    bet.multiplier = 2;

    bet.resetArea();
    expect(bet.pickedNumbers).to.be.empty;
    expect(bet.multiplier).to.eql(1);
    expect(bet.gameType).to.eql(0);
  });

  it('should create a bet according to a given model object', () => {
    const betModel = {
      betType: 1,
      multipliers: 27,
      panels: [
        {
          requested: 0,
          selection: [1, 2, 3, 4],
        },
      ],
      quickPick: false,
    };
    const bet = new Bet(1, betModel);

    expect(bet.activeArea).to.eql(true);
    expect(bet.pickedNumbers).to.eql([1, 2, 3, 4]);
    expect(bet.filled).to.eql(true);
    expect(bet.gameType).to.eql(4);
    expect(bet.kinoBonusActive).to.eql(false);
    expect(bet.kinoClose2WinActive).to.eql(false);
    expect(bet.multiplier).to.eql(27);
    expect(bet.quickPick).to.eql(false);
    expect(bet.value).to.eql(13.5);
    expect(bet.selectedMultipliers).to.eql([20, 6, 1]);
  });

  it('should set the kino bonus active when the bet type is 2', () => {
    const betModel = {
      betType: 2,
      multipliers: 27,
      panels: [
        {
          requested: 0,
          selection: [1, 2, 3, 4],
        },
      ],
      quickPick: false,
    };
    const bet = new Bet(1, betModel);

    expect(bet.kinoBonusActive).to.eql(true);
    expect(bet.kinoClose2WinActive).to.eql(false);
  });

  it('should set the kino bonus and close 2 win active when the bet type is 25', () => {
    const betModel = {
      betType: 25,
      multipliers: 27,
      panels: [
        {
          requested: 0,
          selection: [1, 2, 3, 4],
        },
      ],
      quickPick: false,
    };
    const bet = new Bet(1, betModel);

    expect(bet.kinoBonusActive).to.eql(true);
    expect(bet.kinoClose2WinActive).to.eql(true);
  });

  it('should set the kino bonus false and close 2 win true when the bet type is 24', () => {
    const betModel = {
      betType: 24,
      multipliers: 27,
      panels: [
        {
          requested: 0,
          selection: [1, 2, 3, 4],
        },
      ],
      quickPick: false,
    };
    const bet = new Bet(1, betModel);

    expect(bet.kinoBonusActive).to.eql(false);
    expect(bet.kinoClose2WinActive).to.eql(true);
  });
});
