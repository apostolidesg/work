<script setup>
import { computed } from 'vue';

import powerSpinOn from '@/assets/powerspin/powerspin-logo-ON.png';
import powerSpinOff from '@/assets/powerspin/powerspin-logo-OFF.png';

const props = defineProps({
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const activeImg = computed(() => (props.isSelected ? powerSpinOn : powerSpinOff));
</script>

<template>
  <img :src="activeImg" alt="powerspin logo" class="powerspin-logo" />
</template>

<style scoped>
.powerspin-logo {
  cursor: pointer;
}
</style>
