import { ref, watch, onBeforeUnmount } from 'vue';

export function useModal(initialState = false) {
  const isOpen = ref(initialState);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  watch(isOpen, (open) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = open ? 'hidden' : '';
    }
  });

  onBeforeUnmount(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  });

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

export function useModals(modalNames) {
  const modals = {};

  modalNames.forEach((name) => {
    modals[name] = useModal(false);
  });

  const closeAll = () => {
    Object.values(modals).forEach((modal) => modal.close());
  };

  return {
    modals,
    closeAll,
  };
}
