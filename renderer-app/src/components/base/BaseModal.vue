<template>
  <Teleport to="body">
    <Transition
      enter-active-class="atw:transition-opacity atw:duration-200 atw:ease-out"
      leave-active-class="atw:transition-opacity atw:duration-150 atw:ease-in"
      enter-from-class="atw:opacity-0"
      leave-to-class="atw:opacity-0">
      <div
        v-if="open"
        ref="backdropRef"
        class="atw:fixed atw:inset-0 atw:flex atw:items-center atw:justify-center atw:backdrop-blur-[8px]"
        :style="backdropStyle"
        @click="handleBackdropClick">
        <Transition
          enter-active-class="atw:transition-all atw:duration-200 atw:ease-out"
          leave-active-class="atw:transition-all atw:duration-150 atw:ease-in"
          enter-from-class="atw:opacity-0 atw:scale-95"
          leave-to-class="atw:opacity-0 atw:scale-95">
          <div
            v-if="open"
            ref="modalRef"
            class="atw:relative atw:rounded-3xl atw:bg-white atw:shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
            :style="modalStyle"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="ariaLabelledby"
            :aria-describedby="ariaDescribedby"
            :aria-label="ariaLabel"
            @click.stop>
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue';
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  width: {
    type: [Number, String],
    default: 600,
  },
  padding: {
    type: Number,
    default: 48,
  },
  zIndex: {
    type: Number,
    default: 100,
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
  backgroundOpacity: {
    type: Number,
    default: 100,
    validator: (value) => value >= 0 && value <= 100,
  },
  ariaLabelledby: {
    type: String,
    default: null,
  },
  ariaDescribedby: {
    type: String,
    default: null,
  },
  ariaLabel: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(['close']);
const backdropRef = ref(null);
const modalRef = ref(null);
const backdropStyle = computed(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: props.zIndex,
}));
const modalStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  padding: `${props.padding}px`,
  backgroundColor: `rgba(255, 255, 255, ${props.backgroundOpacity / 100})`,
}));
const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('close');
  }
};
watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});
</script>
