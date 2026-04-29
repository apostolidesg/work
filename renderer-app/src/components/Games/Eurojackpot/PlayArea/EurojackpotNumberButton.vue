<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    required: true,
  },
  theme: {
    type: String,
    default: 'main',
    validator: (value) => ['main', 'euro'].includes(value),
  },
});

const slots = useSlots();

const showInfo = computed(() => !!slots.info);

const classes = computed(() => ({
  'eurojackpot-number-button--euro': props.theme === 'euro' && !props.active,
  'eurojackpot-number-button--euro-active': props.theme === 'euro' && props.active,
  'eurojackpot-number-button--main': props.theme === 'main' && !props.active,
  'eurojackpot-number-button--main-active': props.theme === 'main' && props.active,
}));
</script>

<template>
  <button class="eurojackpot-number-button" :class="classes">
    <span class="eurojackpot-number-button__number"><slot></slot></span>
    <span v-if="showInfo" class="eurojackpot-number-button__info"><slot name="info"></slot></span>
  </button>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-number-button {
  @apply atw:relative atw:flex atw:items-center atw:justify-center atw:p-0 atw:cursor-pointer;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid;
  background-color: var(--ejp-color-primary-black);
  color: var(--color-primary-white);
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.eurojackpot-number-button:hover {
  opacity: 0.85;
}

.eurojackpot-number-button--main {
  border-color: var(--ejp-color-button-euro);
}

.eurojackpot-number-button--main-active {
  border-color: var(--ejp-color-button-main);
  background-color: var(--ejp-color-button-main);
}

.eurojackpot-number-button--main-active .eurojackpot-number-button__number,
.eurojackpot-number-button--main-active .eurojackpot-number-button__info {
  color: var(--ejp-color-primary-black);
}

.eurojackpot-number-button--euro {
  border-color: var(--ejp-color-button-euro);
}

.eurojackpot-number-button--euro-active {
  border-color: var(--ejp-color-button-euro);
  background-color: var(--ejp-color-button-euro);
}

.eurojackpot-number-button--euro-active .eurojackpot-number-button__number,
.eurojackpot-number-button--euro-active .eurojackpot-number-button__info {
  color: var(--ejp-color-primary-black);
}

.eurojackpot-number-button__number {
  @apply atw:text-center atw:font-bold;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  line-height: 1;
}

.eurojackpot-number-button__info {
  @apply atw:absolute atw:w-full atw:text-center atw:font-bold;
  color: var(--ejp-color-button-euro);
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  line-height: 1;
  bottom: 8px;
  left: 0;
}
</style>
