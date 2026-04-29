<script setup>
import { computed, useSlots } from 'vue';

const slots = useSlots();

const showSettings = computed(() => !!slots.settings);
</script>

<template>
  <div class="play-area-layout">
    <div v-if="showSettings" class="play-area-layout__settings">
      <slot name="settings"></slot>
    </div>
    <div class="play-area-layout__play-area">
      <slot></slot>
    </div>
    <div class="play-area-layout__side-screen">
      <slot name="sidescreen"></slot>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.play-area-layout {
  @apply atw:w-full atw:h-full atw:flex atw:flex-row;
  background-color: #1a1a1a;
}

.play-area-layout__settings {
  flex: 0.5;
  background-color: #252525;
}

.play-area-layout__play-area {
  flex: 2;
  background-color: #1a1a1a;
}

.play-area-layout__side-screen {
  flex: 0.5;
  background-color: #252525;
}
</style>
