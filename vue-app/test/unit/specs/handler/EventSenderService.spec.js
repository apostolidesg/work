import EventSenderService from '../../../../src/handler/EventSenderService';

describe('EventSenderService Handler', () => {
  beforeEach(() => {
    window.require = function() {
      return true;
    };
  });

  afterEach(() => {
    delete window.require;
  });

  it('should return error when sendSyncRequest is called with wrong eventType', async () => {
    const response = await EventSenderService.sendSyncRequest('WrongEventType', 'data1');
    expect(response).to.be.undefined;
  });

  it('should return error when sendAsyncRequest is called with wrong eventType', () => {
    expect(EventSenderService.sendAsyncRequest('WrongEventType', 'data1')).to.be.undefined;
  });

  // it("should return error when sendSyncRequest is called with wrong eventType", () => {
  //   let spy = sinon.spy(ipcRenderer, 'sendSync');
  //   EventSenderService.IPC_RENDERER_ENABLED = true;
  //   EventSenderService.sendSyncRequest(EventTypes.PRINT_BETSLIP_SYNC_EVENT_TYPE, "data1");
  //   expect(spy.called).to.be.true;
  // });
  //
  // it("should return error when sendSyncRequest is called with wrong eventType", () => {
  //   EventSenderService.IPC_RENDERER_ENABLED = true;
  //   EventSenderService.sendSyncRequest(EventTypes.TERMINAL_NAME_EVENT_TYPE, "data1");
  // });
  //
  // it("should return error when sendSyncRequest is called with wrong eventType", () => {
  //   EventSenderService.IPC_RENDERER_ENABLED = true;
  //   EventSenderService.sendSyncRequest(EventTypes.SWITCH_APPLICATION, "data1");
  // });
  //
  // it("should return error when sendAsyncRequest is called with wrong eventType", () => {
  //   EventSenderService.IPC_RENDERER_ENABLED = true;
  //   EventSenderService.sendAsyncRequest(EventTypes.SESSION_DURATION_EVENT_TYPE, "data1");
  // });
  //
  // it("should return error when sendAsyncRequest is called with wrong eventType", () => {
  //   EventSenderService.IPC_RENDERER_ENABLED = true;
  //   EventSenderService.sendAsyncRequest(EventTypes.PRINT_BETSLIP_ASYNC_EVENT_TYPE, "data1");
  // });
});
