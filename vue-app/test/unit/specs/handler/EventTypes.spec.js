import EventTypes from '../../../../src/handler/EventTypes.js'
import sinon from 'sinon'

describe('EventTypes.js', function () {

  it('should prepare an Event Type object correctly', function () {
    let spy = sinon.spy(EventTypes, 'prepareEventHandlerObject');

    try {
      spy(null, 'Test Error');
    } catch (e) {
    }
    expect(spy.threw()).to.be.true;
  });
});
