export default {
  bind(element, {value}) {},
  update(element, {value: shouldReload}) {
    shouldReload && (element.src += ''); // Due to cross origin restrictions we cannot reload the iframe
  },
  unbind() {}
}
