import Columns from '../../../../src/model/Columns';

describe('Columns.js', () => {
  it('should reset its itself', () => {
    const columns = new Columns();
    columns.columns.push(1, 2, 3);
    columns.columnsAmount.push(2);

    columns.resetColumns();

    expect(columns).to.eql(new Columns());
  });

  it('should calculate its value correctly a single amount has been played', () => {
    const columns = new Columns();
    columns.columns.push(1, 2, 3);
    columns.columnsAmount = [2];

    expect(columns.calculateValue()).to.eql(6);
  });

  it('should calculate its value correctly when multiple amounts have been played', () => {
    const columns = new Columns();
    columns.columns.push(1, 2, 3);
    columns.columnsAmount = [2, 4];

    expect(columns.calculateValue()).to.eql(18);
  });

  it('should construct itself from a given model object', () => {
    const columnsModel = {
      panels: [
        {
          requested: 0,
          selection: [1, 4, 3, 2],
        },
      ],
      multipliers: 2,
    };
    const columns = new Columns(columnsModel);

    expect(columns.columns).to.eql([1, 2, 3, 4]);
    expect(columns.value).to.eql(1);
    expect(columns.columnsAmount).to.eql([1]);
  });
});
