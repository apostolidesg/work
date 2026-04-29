<script setup>
import { computed, getCurrentInstance } from 'vue';
import BaseClearButton from '@/components/Common/BaseClearButton.vue';

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;

const props = defineProps({
  board: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  cost: {
    type: Number,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['delete', 'select']);

const selectionClass = computed(() => `fireblaze-selections--${props.selected ? 'selected' : 'unselected'}`);

const isDeleteDisabled = computed(() => props.board.isEmpty() && props.index === 0);

const mainNumbers = computed(() => props.board.panels[0].selection);
</script>

<template>
  <div :id="`fireblaze-selections-${index}`" :class="['fireblaze-selections', selectionClass]">
    <div class="fireblaze-selections__wrapper" @click="emit('select')">
      <div class="fireblaze-selections__header">
        <div>
          {{ t('fireblaze.amount') }}:
          <span class="fireblaze-selections__header-cost">{{ cost }}&euro;</span>
        </div>
        <div class="fireblaze-selections__header-system">
          {{ t(`fireblaze.optionLabels.${board.betType}`) }}
        </div>
      </div>
      <div class="fireblaze-selections__content">
        <div class="fireblaze-selections__numbers">
          <div
            v-for="(mainNumber, i) in mainNumbers"
            :key="`selection-main-number-${i}`"
            class="fireblaze-selections__number">
            {{ mainNumber }}
          </div>
        </div>
        <div class="fireblaze-selections__delete-btn">
          <BaseClearButton
            :id="`fireblaze-selections-delete-${index}`"
            theme="white"
            :disabled="isDeleteDisabled"
            @click.stop="emit('delete')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fireblaze-selections {
  position: relative;
  border-radius: 10px;
  padding: 0.5em;
  z-index: 1;
  background: var(--fireblaze-color-primary-white);
  margin-bottom: 0.5em;
}

.fireblaze-selections::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: var(--fireblaze-gradient-dark-pink);
  border-radius: 10px;
  z-index: -1;
}

.fireblaze-selections__wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  cursor: pointer;
}

.fireblaze-selections--selected {
  background: var(--fireblaze-gradient-light-gold);
}

.fireblaze-selections--selected::before {
  background: var(--fireblaze-gradient-dark-pink);
}

.fireblaze-selections__header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.fireblaze-selections__header-cost,
.fireblaze-selections__header-system {
  font-weight: 700;
}

.fireblaze-selections__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fireblaze-selections__numbers {
  display: flex;
  flex-wrap: wrap;
}

.fireblaze-selections__number {
  position: relative;
  min-width: 35px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  padding: 0.5em;
  border-radius: 50%;
  z-index: 1;
  background: var(--fireblaze-gradient-light-gold);
  margin: 0.1em;
}

.fireblaze-selections__number::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: var(--fireblaze-gradient-dark-pink);
  border-radius: 50%;
  z-index: -1;
}
</style>
