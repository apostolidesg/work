import PlaceBetError from '../../../../src/model/PlaceBetError';

describe('PlaceBetError', () => {
  it('should create a PlaceBetError object with default values', () => {
    const placeBetError = new PlaceBetError();
    expect(placeBetError.errorCode).to.eq('GENERIC');
    expect(placeBetError.modal.type).to.eq('INFO');
    expect(placeBetError.modal.configuration.title).to.eq('placeBetErrorTitle');
    expect(placeBetError.modal.configuration.type).to.eq('ERROR');
    expect(placeBetError.modal.configuration.icon).to.eql({ icon: 'times' });
    expect(placeBetError.modal.configuration.message.translationLabel).to.eq('placeBetErrorMessage');
  });

  it('should create a PlaceBetError object with hal unavailable', () => {
    const placeBetError = PlaceBetError.halUnavailable();
    expect(placeBetError.errorCode).to.eq('HAL_UNAVAILABLE');
    expect(placeBetError.modal.type).to.eq('INFO');
    expect(placeBetError.modal.configuration.title).to.eq('technicalProblemTitle');
    expect(placeBetError.modal.configuration.type).to.eq('ERROR');
    expect(placeBetError.modal.configuration.icon).to.eql({ icon: 'times' });
    expect(placeBetError.modal.configuration.message.translationLabel).to.eq('technicalProblem');
  });

  it('should create a PlaceBetError object with printer unavailable', () => {
    const placeBetError = PlaceBetError.printerUnavailable();
    expect(placeBetError.errorCode).to.eq('PRINTER_UNAVAILABLE');
    expect(placeBetError.modal.type).to.eq('INFO');
    expect(placeBetError.modal.configuration.title).to.eq('printerErrorTitle');
    expect(placeBetError.modal.configuration.type).to.eq('ERROR');
    expect(placeBetError.modal.configuration.icon).to.eql({ icon: 'times' });
    expect(placeBetError.modal.configuration.message.translationLabel).to.eq('printerErrorMessage');
  });

  it('should create a PlaceBetError object with access token error', () => {
    const placeBetError = PlaceBetError.getAccessTokenError();
    expect(placeBetError.errorCode).to.eq('GET_ACCESS_TOKEN');
    expect(placeBetError.modal.type).to.eq('INFO');
    expect(placeBetError.modal.configuration.title).to.eq('warningModalTitle');
    expect(placeBetError.modal.configuration.type).to.eq('ERROR');
    expect(placeBetError.modal.configuration.icon).to.eql({ icon: 'times' });
    expect(placeBetError.modal.configuration.message.translationLabel).to.eq('operationFailedWarningMessage');
  });

  it('should create a PlaceBetError object with insufficient balance', () => {
    const placeBetError = PlaceBetError.fromResponse({ data: { errorId: 'BALANCE_INSUFFICIENT' } });
    expect(placeBetError.errorCode).to.eq('BALANCE_INSUFFICIENT');
    expect(placeBetError.modal.type).to.eq('INFO');
    expect(placeBetError.modal.configuration.title).to.eq('informationModalTitle');
    expect(placeBetError.modal.configuration.type).to.eq('INFO');
    expect(placeBetError.modal.configuration.icon).to.eql({ icon: 'info' });
    expect(placeBetError.modal.configuration.message.translationLabel).to.eq('balanceWarningModalMessage');
  });

  it('should create a PlaceBetError object with max cap', () => {
    const placeBetError = PlaceBetError.fromResponse({ data: { description: 'errorCode:870069' } });
    expect(placeBetError.errorCode).to.eq('MAX_CAP');
    expect(placeBetError.modal.type).to.eq('WAGER_CAP');
    expect(placeBetError.modal.configuration).to.be.undefined;
  });

  it('should create a PlaceBetError object with max consecutive draws', () => {
    const placeBetError = PlaceBetError.fromResponse({ data: { description: 'errorCode:870019' } });
    expect(placeBetError.errorCode).to.eq('MAX_CONSECUTIVE_DRAWS');
    expect(placeBetError.modal.type).to.eq('INFO');
    expect(placeBetError.modal.configuration.title).to.eq('placeBetErrorTitle');
    expect(placeBetError.modal.configuration.type).to.eq('ERROR');
    expect(placeBetError.modal.configuration.icon).to.eql({ icon: 'times' });
    expect(placeBetError.modal.configuration.message.translationLabel).to.eq('maxConsecutiveDrawsErrorMessage');
  });

  it('should create a PlaceBetError object with generic error', () => {
    const placeBetError = PlaceBetError.fromResponse({});
    expect(placeBetError.errorCode).to.eq('GENERIC');
    expect(placeBetError.modal.type).to.eq('INFO');
    expect(placeBetError.modal.configuration.title).to.eq('placeBetErrorTitle');
    expect(placeBetError.modal.configuration.type).to.eq('ERROR');
    expect(placeBetError.modal.configuration.icon).to.eql({ icon: 'times' });
    expect(placeBetError.modal.configuration.message.translationLabel).to.eq('placeBetErrorMessage');
  });

  it('should create a PlaceBetError object with draw unavailable', () => {
    const placeBetError = PlaceBetError.fromResponse({ data: { errorId: 'UNAVAILABLE_DRAW_ERROR' } });
    expect(placeBetError.errorCode).to.eq('DRAW_UNAVAILABLE');
    expect(placeBetError.modal.type).to.eq('INFO');
    expect(placeBetError.modal.configuration.title).to.eq('placeBetErrorTitle');
    expect(placeBetError.modal.configuration.type).to.eq('ERROR');
    expect(placeBetError.modal.configuration.icon).to.eql({ icon: 'times' });
    expect(placeBetError.modal.configuration.message.translationLabel).to.eq('placeBetUnavailableWarningMessage');
  });
});
