import { ref, computed, onBeforeUnmount } from 'vue';
import { useFloating, offset, flip, shift, autoUpdate, arrow as floatingArrow } from '@floating-ui/vue';

const activePopover = ref(null);
let isListening = false;

const handleGlobalPointerDown = (e) => {
  activePopover.value?.handleOutside(e);
};

const startListening = () => {
  if (!isListening) {
    document.addEventListener('pointerdown', handleGlobalPointerDown);
    isListening = true;
  }
};

const stopListening = () => {
  if (isListening && !activePopover.value) {
    document.removeEventListener('pointerdown', handleGlobalPointerDown);
    isListening = false;
  }
};

const register = (id, close, handleOutside) => {
  if (activePopover.value && activePopover.value.id !== id) {
    activePopover.value.close();
  }
  activePopover.value = { id, close, handleOutside };
  startListening();
};

const unregister = (id) => {
  if (activePopover.value?.id === id) {
    activePopover.value = null;
  }
  stopListening();
};

const ARROW_HALF_SIZE = 4;

const ORIGIN_MAP = {
  bottom: (v, fallback) => ({ x: v != null ? `${v + ARROW_HALF_SIZE}px` : fallback, y: 'top' }),
  top: (v, fallback) => ({ x: v != null ? `${v + ARROW_HALF_SIZE}px` : fallback, y: 'bottom' }),
  right: (v, fallback) => ({ x: 'left', y: v != null ? `${v + ARROW_HALF_SIZE}px` : fallback }),
  left: (v, fallback) => ({ x: 'right', y: v != null ? `${v + ARROW_HALF_SIZE}px` : fallback }),
};

const ALIGN_FALLBACK = { start: '0%', end: '100%' };

const ARROW_EDGE = {
  bottom: { top: '-4px' },
  top: { bottom: '-4px' },
  right: { left: '-4px' },
  left: { right: '-4px' },
};

export function usePopover({ placement = 'bottom', arrow = true } = {}) {
  const id = Symbol('popover');
  const isOpen = ref(false);
  const triggerRef = ref(null);
  const virtualTriggerRef = ref(null);
  const popoverRef = ref(null);
  const arrowRef = ref(null);

  const referenceRef = computed(() => virtualTriggerRef.value || triggerRef.value);

  const {
    x,
    y,
    placement: resolvedPlacement,
    middlewareData,
    isPositioned,
  } = useFloating(referenceRef, popoverRef, {
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(arrow ? 12 : 8),
      flip(),
      shift({ padding: 5 }),
      arrow ? floatingArrow({ element: arrowRef }) : null,
    ].filter(Boolean),
  });

  const floatingStyles = computed(() => {
    if (!isPositioned.value) {
      return { position: 'absolute', top: '', left: '' };
    }

    const [base, align] = (resolvedPlacement.value || placement).split('-');
    const arrowData = middlewareData.value.arrow;
    const arrowVal = base === 'bottom' || base === 'top' ? arrowData?.x : arrowData?.y;
    const fallback = ALIGN_FALLBACK[align] ?? '50%';
    const origin = ORIGIN_MAP[base]?.(arrowVal, fallback) ?? { x: 'center', y: 'center' };
    return {
      position: 'absolute',
      left: `${x.value ?? 0}px`,
      top: `${y.value ?? 0}px`,
      transformOrigin: `${origin.x} ${origin.y}`,
    };
  });

  const arrowStyles = computed(() => {
    const arrowData = middlewareData.value.arrow;
    const [base] = (resolvedPlacement.value || placement).split('-');
    return {
      position: 'absolute',
      left: arrowData?.x != null ? `${arrowData.x}px` : '',
      top: arrowData?.y != null ? `${arrowData.y}px` : '',
      ...ARROW_EDGE[base],
    };
  });

  const handleOutside = (e) => {
    const isInsideTrigger =
      triggerRef.value?.contains(e.target) ||
      (virtualTriggerRef.value instanceof HTMLElement && virtualTriggerRef.value.contains(e.target));
    if (isInsideTrigger || popoverRef.value?.contains(e.target)) return;
    close();
  };

  const open = (e) => {
    if (e?.currentTarget && e.currentTarget instanceof HTMLElement) {
      virtualTriggerRef.value = e.currentTarget;
    } else if (e?.target && e.target instanceof HTMLElement) {
      virtualTriggerRef.value = e.target;
    } else {
      virtualTriggerRef.value = null;
    }
    register(id, close, handleOutside);
    isOpen.value = true;
  };

  const close = () => {
    if (!isOpen.value) return;
    isOpen.value = false;
    unregister(id);
  };

  const toggle = (e) => (isOpen.value ? close() : open(e));

  onBeforeUnmount(close);

  return {
    isOpen,
    floatingStyles,
    arrowStyles,
    isPositioned,
    triggerRef,
    popoverRef,
    arrowRef,
    open,
    close,
    toggle,
  };
}
