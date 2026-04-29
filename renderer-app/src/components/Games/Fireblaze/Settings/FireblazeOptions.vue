<script setup>
import { getCurrentInstance } from 'vue';
import { useFireblaze } from '@/composables/useFireblaze';
import FireblazeConstants from '@/util/fireblaze/Constants';
import FireblazeOptionButton from './FireblazeOptionButton.vue';

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;

const props = defineProps({
  activeBetType: {
    type: Number,
    default: null,
  },
});

defineEmits(['bet-type-click']);

const betTypes = FireblazeConstants.BET_TYPES;

const { betslip } = useFireblaze();

function isBetTypeDisabled(betType) {
  return betslip.value?.wager?.boards?.some(
    (board) => board.betType === betType && board.betType !== props.activeBetType
  );
}

function betTypeToId(betType) {
  return FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT[betType];
}
</script>

<template>
  <div class="fireblaze-options">
    <div class="fireblaze-options__header">
      <div class="fireblaze-options__header-title">{{ t('fireblaze.options') }}</div>
      <div class="fireblaze-options__header-info">{{ t('fireblaze.optionsInfo') }}</div>
    </div>
    <div class="fireblaze-options__numbers">
      <div v-for="betType in betTypes" :key="betType" class="fireblaze-options__numbers--item">
        <FireblazeOptionButton
          :id="`fireblaze-system-btn-${betTypeToId(betType)}`"
          :active="betType === activeBetType"
          :disabled="isBetTypeDisabled(betType)"
          @click="$emit('bet-type-click', { betType })">
          {{ t(`fireblaze.optionLabels.${betType}`) }}
        </FireblazeOptionButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.fireblaze-options {
  @apply atw:flex atw:flex-col;
  gap: 0.5em;
}

.fireblaze-options__header-title {
  font-weight: 700;
}

.fireblaze-options__header-info {
  min-height: 75px;
}

.fireblaze-options__numbers {
  @apply atw:flex atw:flex-col;
  margin: 1em 0;
}

.fireblaze-options__numbers--item {
  margin-bottom: 1em;
}
</style>
