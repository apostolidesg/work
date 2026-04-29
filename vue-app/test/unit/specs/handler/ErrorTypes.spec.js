import ErrorTypes from '../../../../src/handler/ErrorTypes.js'
import sinon from 'sinon'

describe('ErrorTypes.js', function () {

  it('should prepare an Error Type object correctly', function () {
    let spy = sinon.spy(ErrorTypes, 'prepareErrorTypeObject');

    try {
      spy(null, 'Test Error');
    } catch (e) {
    }
    expect(spy.threw()).to.be.true;
  });
});
