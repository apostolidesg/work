<script setup>
import { computed } from 'vue';

import minusLight from '@/assets/icons/minus-icon.png';
import plusLight from '@/assets/icons/plus-icon.png';
import minusDark from '@/assets/icons/minus-icon_dark.png';
import plusDark from '@/assets/icons/plus-icon_dark.png';

const IMG_MAPPER = {
  minus_light: minusLight,
  plus_light: plusLight,
  minus_dark: minusDark,
  plus_dark: plusDark,
};

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['minus', 'plus'].includes(value),
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value),
  },
});

defineEmits(['click']);

const imageSrc = computed(() => {
  return IMG_MAPPER[`${props.type}_${props.theme}`];
});
</script>

<template>
  <button class="min-plus-button" @click="$emit('click')">
    <img :src="imageSrc" :alt="type" width="36" />
  </button>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.min-plus-button {
  @apply atw:p-0 atw:inline-flex atw:items-center atw:justify-center atw:border-none atw:bg-transparent atw:cursor-pointer;
  width: 36px;
  height: 36px;
  margin: 0 5px;
}

.min-plus-button:hover {
  opacity: 0.8;
}
</style>
