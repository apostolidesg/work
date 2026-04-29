<script setup>
import { computed, onMounted, getCurrentInstance } from 'vue';
import { useFireblaze } from '@/composables/useFireblaze';
import { useModalService } from '@/composables/useModalService';
import FireblazeConstants from '@/util/fireblaze/Constants';
import Constants from '@/util/Constants';
import FireblazeNumbersSelections from './FireblazeNumbersSelections.vue';
import FireblazeStakesSelections from './FireblazeStakesSelections.vue';
import TristateSwitch from '@/components/Common/TristateSwitch.vue';
import BaseClearButton from '@/components/Common/BaseClearButton.vue';

const instance = getCurrentInstance();
const t = (key, params, count) => instance?.proxy?.$t(key, params, count) ?? key;

const { confirm } = useModalService();

const {
  selectedBoard,
  selectedBoardIndex,
  statistics,
  statisticsSelection,
  setSelection,
  setMultiplier,
  setStatisticsSelection,
  getStatistics: fetchStatistics,
  removeBoard,
} = useFireblaze();

const switchOptions = Object.values(FireblazeConstants.STATISTICS_SELECTIONS);

const numbersSelections = computed(() => selectedBoard.value?.panels[0]?.selection || []);

const stakesSelections = computed(() => selectedBoard.value?.multipliers || []);

const selectedOptionId = computed(
  () =>
    FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT[selectedBoard.value?.betType] || FireblazeConstants.BET_TYPES.DEFAULT
);

const multipliersSet = computed(() => {
  const multipliers =
    FireblazeConstants.MULTIPLIERS_SET[selectedBoard.value?.betType] || FireblazeConstants.MULTIPLIERS_SET_DEFAULT;
  return multipliers.map((item) => ({ multiplier: item }));
});

const getNumbers = computed(() => {
  const statsData = statistics.value?.numbers;

  return Array.from({ length: FireblazeConstants.BOARD_NUMBERS.MAX }, (_, i) => {
    const number = i + 1;
    let stat = null;

    switch (statisticsSelection.value) {
      case FireblazeConstants.STATISTICS_SELECTIONS.OCCURRENCES:
        stat = (statsData && statsData[number] && statsData[number]?.occurrences) || 0;
        break;
      case FireblazeConstants.STATISTICS_SELECTIONS.DELAYS:
        stat = (statsData && statsData[number] && statsData[number]?.delays) || 0;
        break;
      default:
        break;
    }

    return { number, stat };
  });
});

const currentStatisticsSelection = computed({
  get() {
    return statisticsSelection.value;
  },
  set(value) {
    setStatisticsSelection(value);
  },
});

const areStatisticsEnabled = computed(
  () => currentStatisticsSelection.value !== FireblazeConstants.STATISTICS_SELECTIONS.NONE
);

const statisticsAlertText = computed(() => {
  const drawRange = Constants.DRAW_RANGE.FIREBLAZE;
  const drawDelay = Constants.DRAW_DAYS;
  if (statisticsSelection.value === FireblazeConstants.STATISTICS_SELECTIONS.OCCURRENCES) {
    return t('fireblaze.statistics.alert.occurences', { drawRange }, drawRange);
  }
  if (statisticsSelection.value === FireblazeConstants.STATISTICS_SELECTIONS.DELAYS) {
    return t('fireblaze.statistics.alert.delays', { drawDelay }, drawDelay);
  }
  return '';
});

const clearButtonDisabled = computed(() => selectedBoard.value?.isEmpty() ?? true);

function toggleNumber(selection) {
  setSelection(selection);
}

function selectStakes(multiplier) {
  setMultiplier(multiplier);
}

async function clearBoard() {
  const confirmed = await confirm({ message: 'deleteArea' });
  if (confirmed) {
    removeBoard(selectedBoardIndex.value);
  }
}

onMounted(() => {
  fetchStatistics();
});
</script>

<template>
  <div class="fireblaze-play-area">
    <div class="fireblaze-play-area__main">
      <FireblazeNumbersSelections
        :selected-numbers="numbersSelections"
        :selected-option-id="selectedOptionId"
        :numbers="getNumbers"
        @toggle-number="toggleNumber" />
      <FireblazeStakesSelections
        :selected-stakes="stakesSelections"
        :stakes="multipliersSet"
        @select-stake="selectStakes" />
    </div>
    <div class="fireblaze-play-area__footer">
      <div class="fireblaze-play-area__statistics">
        <div class="fireblaze-play-area__statistics-title">
          {{ t('fireblaze.statistics.title') }}
        </div>
        <TristateSwitch
          :options="switchOptions"
          :left-label="t('fireblaze.statistics.occurrences')"
          :right-label="t('fireblaze.statistics.delays')"
          v-model="currentStatisticsSelection" />
      </div>
      <div v-if="areStatisticsEnabled" class="fireblaze-play-area__alert">
        <div class="fireblaze-play-area__alert-text">{{ statisticsAlertText }}</div>
      </div>
      <div class="fireblaze-play-area__footer-clear">
        <BaseClearButton
          id="fireblaze-play-area-clear-betslip-btn"
          top-label="clear"
          theme="white"
          :disabled="clearButtonDisabled"
          @click="clearBoard" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.fireblaze-play-area {
  @apply atw:flex atw:flex-col atw:justify-between atw:h-full;
  color: var(--fireblaze-color-primary-white);
  font-size: 1em;
  padding: 3em 1.5em 2em;
  background: var(--fireblaze-gradient-dark-red);
}

.fireblaze-play-area__main {
  @apply atw:relative atw:flex atw:flex-col;
}

.fireblaze-play-area__footer {
  @apply atw:flex atw:flex-row atw:justify-between;
  gap: 2em;
}

.fireblaze-play-area__statistics {
  @apply atw:flex atw:flex-col atw:justify-between;
}

.fireblaze-play-area__statistics-title {
  font-size: 13.5px;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
  color: white;
  border-bottom: 1px solid rgba(234, 220, 192, 0.3);
  padding-bottom: 5px;
}

.fireblaze-play-area__alert {
  @apply atw:flex atw:flex-1 atw:items-end;
}

.fireblaze-play-area__alert-text {
  font-size: 13.5px;
  font-weight: 900;
  background-color: var(--fireblaze-color-third-dark-red);
  padding: 0.25em 1em;
  border-radius: 20px;
}

.fireblaze-play-area__footer-clear {
  @apply atw:inline-flex atw:flex-col;
  font-size: 12px;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
}

.fireblaze-play-area__footer-clear :deep(.base-clear-button__trash) {
  font-size: 40px;
  color: #eadcc0;
}
</style>
