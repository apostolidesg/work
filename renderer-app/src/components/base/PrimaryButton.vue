<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'success', 'ghost', 'outlined'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  shape: {
    type: String,
    default: 'rounded',
    validator: (v) => ['rounded', 'pill'].includes(v),
  },
});

defineEmits(['click']);

const sizeClasses = computed(() => ({
  'primary-button--sm': props.size === 'sm',
  'primary-button--md': props.size === 'md',
  'primary-button--lg': props.size === 'lg',
}));

const shapeClasses = computed(() => ({
  'primary-button--rounded': props.shape === 'rounded',
  'primary-button--pill': props.shape === 'pill',
}));

const variantClasses = computed(() => ({
  'primary-button--primary': props.variant === 'primary',
  'primary-button--secondary': props.variant === 'secondary',
  'primary-button--success': props.variant === 'success',
  'primary-button--ghost': props.variant === 'ghost',
  'primary-button--outlined': props.variant === 'outlined',
}));
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="primary-button"
    :class="[sizeClasses, variantClasses, shapeClasses, { 'primary-button--disabled': disabled }]"
    @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.primary-button {
  @apply atw:flex atw:items-center atw:justify-center atw:gap-3 atw:transition-all atw:focus-visible:outline atw:focus-visible:outline-offset-2;
}

.primary-button--sm {
  @apply atw:px-4 atw:py-2 atw:text-sm;
}

.primary-button--md {
  @apply atw:px-6 atw:py-3 atw:text-base;
}

.primary-button--lg {
  @apply atw:px-7 atw:py-3 atw:text-lg;
}

.primary-button--rounded {
  @apply atw:rounded-xl;
}

.primary-button--pill {
  @apply atw:rounded-full;
}

.primary-button--primary {
  @apply atw:bg-[#1D4757] atw:text-white atw:border atw:border-white atw:hover:bg-[#163845] atw:focus-visible:outline-[#1D4757];
}

.primary-button--secondary {
  @apply atw:bg-gray-100 atw:text-gray-900 atw:border atw:border-gray-200 atw:hover:bg-gray-200 atw:focus-visible:outline-gray-400;
}

.primary-button--success {
  @apply atw:text-white atw:border-2 atw:border-[#00AB4D] atw:bg-gradient-to-br atw:from-[#00AB4D] atw:via-[#00ab4d] atw:to-[#006f31] atw:shadow-[0_10px_30px_rgba(0,171,77,0.35)] atw:hover:translate-y-[-1px] atw:focus-visible:outline-[#00AB4D];
}

.primary-button--ghost {
  @apply atw:bg-transparent atw:text-gray-700 atw:hover:bg-gray-100 atw:focus-visible:outline-gray-400;
}

.primary-button--outlined {
  @apply atw:bg-transparent atw:text-white atw:border atw:border-white;
}

.primary-button--disabled {
  @apply atw:cursor-not-allowed atw:opacity-60;
}
</style>
