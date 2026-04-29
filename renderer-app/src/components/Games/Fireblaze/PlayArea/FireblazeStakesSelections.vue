<script setup>
import { getCurrentInstance } from 'vue';
import Constants from '@/util/Constants';

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;

const props = defineProps({
  selectedStakes: {
    type: Array,
    required: true,
  },
  stakes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['select-stake']);

function isStakeActive(stake) {
  return props.selectedStakes.includes(stake);
}

function toggleStake(stake) {
  emit('select-stake', stake);
}

function getStake(multiplier) {
  return multiplier * Constants.BASIC_BETTING_AMOUNT;
}
</script>

<template>
  <div class="fireblaze-stakes-selection">
    <span class="fireblaze-stakes-selection__title">{{ t('multiplier') }}</span>
    <div class="fireblaze-stakes-selection__stakes">
      <button
        v-for="{ multiplier } in stakes"
        :id="`fireblaze-stake-btn-${multiplier}`"
        :key="multiplier"
        class="fireblaze-stakes-selection__stakes-button"
        :class="{ 'fireblaze-stakes-selection__stakes-button--active': isStakeActive(multiplier) }"
        @click="toggleStake(multiplier)">
        <span class="fireblaze-stakes-selection__stakes-button--number"> {{ getStake(multiplier) }}&euro; </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.fireblaze-stakes-selection {
  display: flex;
  flex-direction: column;
  margin: 4em 0 2em;
}

.fireblaze-stakes-selection__title {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 1em 0;
  color: var(--fireblaze-color-primary-white);
}

.fireblaze-stakes-selection__stakes {
  display: flex;
  justify-content: center;
  gap: 0.7em;
}

.fireblaze-stakes-selection__stakes-button {
  width: 52px;
  height: 48px;
  border: none;
  position: relative;
  z-index: 1;
  background: var(--fireblaze-color-primary-white);
  cursor: pointer;
}

.fireblaze-stakes-selection__stakes-button::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: linear-gradient(180deg, #531eef 0%, #a556f7 99.99%);
  z-index: -1;
}

.fireblaze-stakes-selection__stakes-button--active {
  background: var(--fireblaze-gradient-light-gold);
}

.fireblaze-stakes-selection__stakes-button--active::before {
  background: var(--fireblaze-gradient-dark-pink);
}

.fireblaze-stakes-selection__stakes-button--number {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 900;
  line-height: 23px;
  letter-spacing: 0;
  text-align: center;
  color: var(--fireblaze-color-primary-white);
}
</style>
