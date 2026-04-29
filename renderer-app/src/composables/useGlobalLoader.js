import { ref, computed } from 'vue';

const pending = ref(0);

const isVisible = computed(() => pending.value > 0);

const show = () => {
  pending.value += 1;
};

const hide = () => {
  pending.value = Math.max(0, pending.value - 1);
};

const withLoader = async (task) => {
  show();
  try {
    return await task();
  } finally {
    hide();
  }
};

export function useGlobalLoader() {
  return { isVisible, show, hide, withLoader };
}
