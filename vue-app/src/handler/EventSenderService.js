import EventTypes from './EventTypes';

export default {
  /**
   * Send Sync Requests
   *
   * @param eventType eventType
   * @param data
   */
  async sendSyncRequest(eventType, ...data) {
    const { electronAPI = {} } = window;
    let response;
    switch (eventType) {
      case EventTypes.TERMINAL_NAME_EVENT_TYPE:
        response = await electronAPI.invokeMain(EventTypes.TERMINAL_NAME_EVENT_TYPE);
        break;
      case EventTypes.PRINTER_STATUS_EVENT_TYPE:
        response = await electronAPI.invokeMain(EventTypes.PRINTER_STATUS_EVENT_TYPE);
        break;
      case EventTypes.BCR_STATUS_EVENT_TYPE:
        response = await electronAPI.invokeMain(EventTypes.BCR_STATUS_EVENT_TYPE);
        break;
      case EventTypes.HAL_INITIALIZED_EVENT_TYPE:
        response = await electronAPI.invokeMain(EventTypes.HAL_INITIALIZED_EVENT_TYPE);
        break;
      case EventTypes.APP_VERSION:
        response = await electronAPI.invokeMain(EventTypes.APP_VERSION);
        break;
      case EventTypes.LOAD_CONFIGURATION:
        response = await electronAPI.invokeMain(EventTypes.LOAD_CONFIGURATION);
        break;
      case EventTypes.REQUEST_ISECURE_HASH:
        response = await electronAPI.invokeMain(EventTypes.REQUEST_ISECURE_HASH, data[0]);
        break;
      case EventTypes.REQUEST_CRC:
        response = await electronAPI.invokeMain(EventTypes.REQUEST_CRC, data[0]);
        break;
      case EventTypes.GET_ENV_SYNC:
        response = await electronAPI.invokeMain(EventTypes.GET_ENV_SYNC);
        break;
      default:
        console.error(`Event type is not supported:${eventType}`);
        return undefined;
    }

    return response;
  },

  /**
   *  Send Async requests
   *
   * @param eventType eventType
   * @param data
   */
  sendAsyncRequest(eventType, ...data) {
    const { electronAPI = {} } = window;

    switch (eventType) {
      case EventTypes.PRINT_EVENT_TYPE:
        electronAPI.sendMain(EventTypes.PRINT_EVENT_TYPE, data[0]);
        break;
      case EventTypes.SWITCH_APPLICATION:
        electronAPI.sendMain(EventTypes.SWITCH_APPLICATION);
        break;
      case EventTypes.SWITCH_APPLICATION_ACK:
        let eventData;
        
        if (Array.isArray(data) && data.length > 0) {
          eventData = data[0];
        }

        electronAPI.sendMain(EventTypes.SWITCH_APPLICATION_ACK, eventData);
        break;
      case EventTypes.SWITCH_APPLICATION_NACK:
        electronAPI.sendMain(EventTypes.SWITCH_APPLICATION_NACK);
        break;
      case EventTypes.SEND_REQUEST:
        electronAPI.sendMain(EventTypes.SEND_REQUEST, data[0], data[1], ...data.slice(2));
        break;
      case EventTypes.OLISOFT_IFRAME_EVENT: {
        const [loggerMessageObject] = data;
        electronAPI.sendMain(EventTypes.OLISOFT_IFRAME_EVENT, loggerMessageObject);
        break;
      }
      case EventTypes.LOG_FROM_RENDERER:
        electronAPI.sendMain(EventTypes.LOG_FROM_RENDERER, data[0], data[1]);
        break;
      case EventTypes.RENDERER_READY:
        electronAPI.sendMain(EventTypes.RENDERER_READY);
        break;
      default:
        console.error(`Event type is not supported:${eventType}`);
    }
  },
};
