import EventSenderService from '../handler/EventSenderService'
import EventTypes from '../handler/EventTypes'
import store from '../store/store'
import moduleTypes from '../store/modules/types'
import configurationStoreModuleTypes from '../store/modules/ConfigurationStoreModule/types'

const loggerTitles = {
  SENT_EVENT_MESSAGE: 'SENT_EVENT_MESSAGE',
  RECEIVED_EVENT_MESSAGE: 'RECEIVED_EVENT_MESSAGE',
}

const isIpcRendererEnabled = () => store.getters[`${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationStoreModuleTypes.getters.IS_IPC_RENDERER_ENABLED}`]
const isDevelopmentMode = () => store.getters[`${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationStoreModuleTypes.getters.IS_DEVELOPMENT_MODE}`]

const stringify = body => JSON.stringify(body)

const logToElectron = (eventType = '', title = '', body = '', shouldStringify = false) => {
  const bodyValue = shouldStringify ? stringify(body) : body
  isDevelopmentMode() && console.warn(title, bodyValue)
  eventType && isIpcRendererEnabled() && EventSenderService.sendAsyncRequest(eventType, { title, body: bodyValue })
}

const logOlisoftIframeSentEvent = body => {
  logToElectron(EventTypes.OLISOFT_IFRAME_EVENT, loggerTitles.SENT_EVENT_MESSAGE, body, true)
}

const logOlisoftIframeReceivedEvent = body => {
  logToElectron(EventTypes.OLISOFT_IFRAME_EVENT, loggerTitles.RECEIVED_EVENT_MESSAGE, body, true)
}

export const logToMainProcess = (title, body) => {
  logToElectron(EventTypes.LOG_FROM_RENDERER, title, body, true)
}

export default {
  logOlisoftIframeSentEvent,
  logOlisoftIframeReceivedEvent,
  logToMainProcess,
}
