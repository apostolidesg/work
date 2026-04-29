/* eslint-disable class-methods-use-this */

export default class EventHandlerService {
  initializeEventHandlers(eventHandlers) {
    for (let i = 0; i < eventHandlers.length; i++) {
      const eventHandler = eventHandlers[i];
      window.electronAPI.onMainProcessEvent(eventHandler.eventType, eventHandler.logic);
    }
  }
}
