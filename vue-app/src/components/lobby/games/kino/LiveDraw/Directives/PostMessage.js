import LoggerService from '../../../../../../util/LoggerService';

export default {
  bind(element, {value}) {},
  update(element, {value: postMessageConfig}) {
    element.contentWindow.postMessage(postMessageConfig, '*');
    LoggerService.logOlisoftIframeSentEvent(postMessageConfig);
  },
  unbind() {}
}
