import OddEven from "../../../../src/model/OddEven";

describe('OddEven.js', function () {

  it('should reset itself', function () {
    let oddEven = new OddEven();
    oddEven.oddEven = 'odd';
    oddEven.oddEvenAmount.push(1);
    oddEven.value = oddEven.calculateValue();

    oddEven.resetOddEven();
    expect(oddEven).to.eql(new OddEven());
  });

  it('should calculate its value correctly when the game is valid', function () {
    let oddEven = new OddEven();
    oddEven.oddEven = 'odd';
    oddEven.oddEvenAmount.push(1);

    expect(oddEven.calculateValue()).to.eql(1);
  });

  it('should calculate its value correctly when the game is not valid', function () {
    let oddEven = new OddEven();

    expect(oddEven.calculateValue()).to.eql(0);
  });

});
