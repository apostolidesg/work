import { ref, computed } from 'vue';
import Constants from '@/util/Constants';

const BREAKPOINT_HORIZONTAL = 1200;
const BREAKPOINT_SMALL_HORIZONTAL = 1600;

export function useOrientation() {
  const width = ref(window.innerWidth);

  const isSmallHorizontal = computed(
    () => width.value > BREAKPOINT_HORIZONTAL && width.value <= BREAKPOINT_SMALL_HORIZONTAL
  );
  const isHorizontal = computed(() => width.value > BREAKPOINT_SMALL_HORIZONTAL);
  const isVertical = computed(() => width.value <= BREAKPOINT_HORIZONTAL);
  const orientation = computed(() =>
    isVertical.value ? Constants.SSBT_ORIENTATION.VERTICAL : Constants.SSBT_ORIENTATION.HORIZONTAL
  );

  return {
    isSmallHorizontal,
    isHorizontal,
    isVertical,
    orientation,
    width,
  };
}
