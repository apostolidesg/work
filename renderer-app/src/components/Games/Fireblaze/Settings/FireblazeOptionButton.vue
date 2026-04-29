<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);
</script>

<template>
  <button
    class="fireblaze-option-button"
    :class="[{ 'fireblaze-option-button--active': active }, { 'fireblaze-option-button--disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.fireblaze-option-button {
  @apply atw:w-full atw:border-none atw:cursor-pointer;
  padding: 0.5em 1em;
  font-size: 1.25em;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
  color: var(--fireblaze-color-primary-white);
  background: var(--fireblaze-gradient-purple);
  border-radius: 8px;
  position: relative;
  z-index: 1;
}

.fireblaze-option-button--active {
  background: var(--fireblaze-gradient-light-gold);
}

.fireblaze-option-button--active::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border-radius: 8px;
  background: var(--fireblaze-gradient-dark-pink);
  z-index: -1;
}

.fireblaze-option-button--disabled {
  @apply atw:cursor-not-allowed;
  opacity: 0.5;
  pointer-events: none;
}
</style>
