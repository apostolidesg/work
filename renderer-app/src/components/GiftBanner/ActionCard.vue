<template>
  <button
    type="button"
    class="atw:flex atw:h-32 atw:flex-col atw:items-center atw:justify-center atw:gap-3 atw:rounded-2xl atw:border-2 atw:bg-gradient-to-b atw:shadow-lg atw:transition atw:hover:-translate-y-1 atw:focus-visible:outline atw:focus-visible:outline-2 atw:focus-visible:outline-offset-2"
    :class="colorClasses">
    <div
      class="atw:flex atw:h-14 atw:w-14 atw:items-center atw:justify-center atw:rounded-full atw:bg-gradient-to-br"
      :class="iconContainerClasses">
      <FontAwesomeIcon :icon="icon" class="atw:h-7 atw:w-7 atw:text-white" aria-hidden="true" />
    </div>
    <span class="atw:text-lg atw:font-semibold atw:text-gray-900">{{ label }}</span>
  </button>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  icon: {
    type: [String, Array, Object],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'blue',
    validator: (v) => ['blue', 'green'].includes(v),
  },
});
const colorClasses = computed(() => {
  const colors = {
    blue: 'atw:border-[#0055FF] atw:from-white atw:to-[#F0F9FF] atw:shadow-[0_8px_20px_rgba(0,85,255,0.15)] atw:focus-visible:outline-[#0055FF]',
    green:
      'atw:border-[#00AB4D] atw:from-white atw:to-[#F0FFF4] atw:shadow-[0_8px_20px_rgba(0,171,77,0.15)] atw:focus-visible:outline-[#00AB4D]',
  };
  return colors[props.color];
});
const iconContainerClasses = computed(() => {
  const colors = {
    blue: 'atw:from-[#0055FF] atw:to-[#0040CC]',
    green: 'atw:from-[#00AB4D] atw:to-[#008A3E]',
  };
  return colors[props.color];
});
</script>
