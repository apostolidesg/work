<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :aria-pressed="ariaPressed"
    :aria-expanded="ariaExpanded"
    :aria-controls="ariaControls"
    :aria-haspopup="ariaHaspopup"
    class="atw:flex atw:items-center atw:justify-center atw:rounded-full atw:transition-colors atw:focus-visible:outline atw:focus-visible:outline-offset-2"
    :class="[sizeClasses, variantClasses, { 'atw:cursor-not-allowed atw:opacity-50': disabled }]"
    @click="$emit('click', $event)">
    <slot>
      <FontAwesomeIcon v-if="icon" :icon="icon" :class="iconSizeClasses" aria-hidden="true" />
    </slot>
  </button>
</template>
<script setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps({
  icon: {
    type: [Object, Array, String],
    default: null,
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'ghost', 'primary'].includes(v),
  },
  ariaLabel: {
    type: String,
    required: true,
  },
  ariaPressed: {
    type: Boolean,
    default: undefined,
  },
  ariaExpanded: {
    type: Boolean,
    default: undefined,
  },
  ariaControls: {
    type: String,
    default: undefined,
  },
  ariaHaspopup: {
    type: [Boolean, String],
    default: undefined,
  },
});
defineEmits(['click']);
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'atw:w-8 atw:h-8',
    md: 'atw:w-10 atw:h-10',
    lg: 'atw:w-12 atw:h-12',
  };
  return sizes[props.size];
});
const iconSizeClasses = computed(() => {
  const sizes = {
    sm: 'atw:w-4 atw:h-4',
    md: 'atw:w-5 atw:h-5',
    lg: 'atw:w-6 atw:h-6',
  };
  return sizes[props.size];
});
const variantClasses = computed(() => {
  const variants = {
    default:
      'atw:bg-[#F5F5F5] atw:border-2 atw:border-[#E0E0E0] atw:hover:bg-[#EBEBEB] atw:text-[#111111] atw:focus-visible:outline-[#111111]',
    ghost: 'atw:bg-transparent atw:hover:bg-gray-100 atw:text-gray-600 atw:focus-visible:outline-gray-400',
    primary: 'atw:bg-[#1D4757] atw:hover:bg-[#163845] atw:text-white atw:focus-visible:outline-[#1D4757]',
  };
  return variants[props.variant];
});
</script>
