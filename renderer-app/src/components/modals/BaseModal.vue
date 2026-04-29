<script setup>
import { computed } from 'vue';
const props = defineProps({
  width: {
    type: [Number, String],
    default: 600,
  },
  height: {
    type: [Number, String],
    default: null,
  },
  padding: {
    type: Number,
    default: 48,
  },
  backgroundOpacity: {
    type: Number,
    default: 100,
    validator: (value) => value >= 0 && value <= 100,
  },
});

const modalStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  padding: `${props.padding}px`,
  backgroundColor: `rgba(255, 255, 255, ${props.backgroundOpacity / 100})`,
}));
</script>

<template>
  <div class="modal" :style="modalStyle">
    <header v-if="$slots.header" class="modal__header">
      <slot name="header" />
    </header>

    <section class="modal__body">
      <slot />
    </section>

    <footer v-if="$slots.footer" class="modal__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.modal {
  @apply atw:relative atw:rounded-3xl atw:flex atw:flex-col atw:max-h-[calc(100vh-48px)];
}

.modal__header {
  @apply atw:p-4 atw:font-semibold atw:text-center;
}

.modal__body {
  @apply atw:overflow-y-auto;
}

.modal__footer {
  @apply atw:p-4 atw:flex atw:justify-center atw:gap-6;
}
</style>
