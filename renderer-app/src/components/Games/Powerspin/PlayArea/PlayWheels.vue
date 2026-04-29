<script setup>
import { computed } from 'vue';
import { usePowerspin } from '@/composables/usePowerspin';
import SinglePlay from './SinglePlay.vue';

const { wheelsLength } = usePowerspin();

function hasSeparator(index) {
  return wheelsLength.value > 1 && index < wheelsLength.value - 1;
}

function separatorColor(index) {
  return index === 0 ? 'green' : 'red';
}
</script>

<template>
  <div class="play-wheels">
    <SinglePlay
      v-for="(_, index) in wheelsLength"
      :key="index"
      :wheel-index="index"
      :has-separator="hasSeparator(index)"
      :separator-color="separatorColor(index)" />
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.play-wheels {
  @apply atw:flex atw:flex-row atw:h-full;
}
</style>
