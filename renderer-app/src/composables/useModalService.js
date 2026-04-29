import { ref, markRaw } from 'vue';
import InfoModal from '@/components/modals/InfoModal.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

const stack = ref([]);

let id = 0;

export function useModalService() {
  const open = (component, props = {}) => {
    const modalId = id++;
    const { onClose = null, listeners = {}, ...componentProps } = props;

    const modal = {
      id: modalId,
      component: markRaw(component),
      props: componentProps,
      onClose,
      listeners,
      timer: null,
      closable: props.closable ?? true,
    };

    stack.value.push(modal);

    if (props.duration) {
      modal.timer = setTimeout(() => {
        closeById(modalId);
      }, props.duration);
    }

    return modalId;
  };

  const runOnClose = (modal) => {
    if (modal?.timer) clearTimeout(modal.timer);
    modal?.onClose?.();
  };

  const close = () => {
    const modal = stack.value.pop();
    runOnClose(modal);
  };

  const closeById = (modalId) => {
    const index = stack.value.findIndex((m) => m.id === modalId);

    if (index !== -1) {
      const modal = stack.value[index];

      runOnClose(modal);

      stack.value.splice(index, 1);
    }
  };

  const closeAll = () => {
    stack.value.forEach((modal) => {
      runOnClose(modal);
    });
    stack.value.splice(0);
  };

  const info = (options) => {
    open(InfoModal, { ...options });
  };

  const confirm = (options) => {
    return new Promise((resolve) => {
      open(ConfirmModal, {
        ...options,
        onConfirm() {
          resolve(true);
        },
        onCancel() {
          resolve(false);
        },
      });
    });
  };

  return {
    stack,
    open,
    close,
    closeById,
    closeAll,
    info,
    confirm,
  };
}
