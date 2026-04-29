<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);
</script>

<template>
  <button
    class="eurojackpot-system-button"
    :class="{ 'eurojackpot-system-button--active': active }"
    @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-system-button {
  @apply atw:text-center atw:cursor-pointer;
  width: 52px;
  height: 48px;
  color: var(--ejp-color-secondary-black);
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 900;
  line-height: normal;
  border: 2px solid var(--ejp-color-secondary-brown);
  border-radius: 4px;
  background: linear-gradient(to bottom, var(--ejp-color-secondary-gold), var(--ejp-color-primary-gold));
  transition:
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
}

.eurojackpot-system-button:hover {
  opacity: 0.9;
}

.eurojackpot-system-button--active {
  border-color: var(--ejp-color-primary-brown);
  background: var(--ejp-color-third-gold);
}
</style>
