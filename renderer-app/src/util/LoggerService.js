import EventSenderService from '@/util/handler/EventSenderService';
import EventTypes from '@/util/handler/EventTypes';

const loggerTitles = {
  SENT_EVENT_MESSAGE: 'SENT_EVENT_MESSAGE',
  RECEIVED_EVENT_MESSAGE: 'RECEIVED_EVENT_MESSAGE',
};

const isDevelopmentMode = () => import.meta.env.DEV;

const stringify = (body) => JSON.stringify(body);

const logToElectron = (eventType = '', title = '', body = '', shouldStringify = false) => {
  isDevelopmentMode() && console.warn(title, body);
  const bodyValue = shouldStringify ? stringify(body) : body;
  eventType && EventSenderService.sendAsyncRequest(eventType, { title, body: bodyValue });
};

export const logOlisoftIframeSentEvent = (body) => {
  logToElectron(EventTypes.OLISOFT_IFRAME_EVENT, loggerTitles.SENT_EVENT_MESSAGE, body, true);
};

export const logOlisoftIframeReceivedEvent = (body) => {
  logToElectron(EventTypes.OLISOFT_IFRAME_EVENT, loggerTitles.RECEIVED_EVENT_MESSAGE, body, true);
};

export const logToMainProcess = (title, body) => {
  logToElectron(EventTypes.LOG_FROM_RENDERER, title, body, true);
};
