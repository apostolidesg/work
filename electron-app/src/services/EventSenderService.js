import { EventTypes } from '@/constants/EventTypes';
import { logger as mainLogger } from '@/util/Logger';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

export default class EventSenderService {
  sendAsyncRequest(window, eventType, ...data) {
    if (!window || !eventType) {
      logger.info(`Missing window or eventType, skipping sendAsyncRequest: ${JSON.stringify({ window, eventType })}`);
      return;
    }
    try {
      switch (eventType) {
        case EventTypes.SEND_REQUEST:
          {
            const requestType = data[0];
            /**
             * @type {import('axios').AxiosResponse<any, any>}
             */
            const response = data[1];
            const dataToSend = {
              success: response.success,
              status: response.status,
              statusText: response.statusText,
              data: response.data,
            };
            const additionalArgs = data[2];
            logger.info(
              `EventSenderService.sendAsyncRequest: ${eventType} ::: ` +
                `${requestType} ::: ` +
                `${JSON.stringify(dataToSend)} ::: ` +
                `${JSON.stringify(additionalArgs)}`,
            );
            window.webContents.send(eventType, requestType, dataToSend, ...data.slice(2));
          }
          break;
        default: {
          const dataToSend = data[0];
          logger.info(`EventSenderService.sendAsyncRequest: ${eventType} ::: ` + `${JSON.stringify(dataToSend)}`);
          window.webContents.send(eventType, dataToSend);
        }
      }
    } catch (error) {
      logger.error(
        `Error in EventSenderService.sendAsyncRequest:  ${eventType} ::: ` + `${JSON.stringify(error?.message)}`,
      );
      throw error instanceof Error ? error : new Error(JSON.stringify(error));
    }
  }
}
