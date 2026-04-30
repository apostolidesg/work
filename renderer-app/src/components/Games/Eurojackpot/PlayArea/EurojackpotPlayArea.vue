<script setup>
import { computed, onMounted, getCurrentInstance } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import EurojackpotNumberSelections from './EurojackpotNumberSelections.vue';
import TristateSwitch from '@/components/Common/TristateSwitch.vue';
import EurojackpotConstants from '@/util/eurojackpot/Constants.js';
import { useEurojackpot } from '@/composables/useEurojackpot';

library.add(faTrashAlt);

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;

const {
  selectedBoard,
  statistics,
  statisticsSelection,
  setMainSelection,
  setEuroSelection,
  clearSelectedBoard,
  setStatisticsSelection,
  getStatistics,
} = useEurojackpot();

const mainNumberSelections = computed(() => selectedBoard.value?.panels[0]?.selection || []);
const euroNumberSelections = computed(() => selectedBoard.value?.panels[1]?.selection || []);
const selectedSystemId = computed(() => selectedBoard.value?.systemId || null);

const switchOptions = Object.values(EurojackpotConstants.STATISTICS_SELECTIONS);

const clearButtonDisabled = computed(() => {
  return selectedBoard.value?.isEmpty() ?? true;
});

const currentStatisticsSelection = computed({
  get() {
    return statisticsSelection.value;
  },
  set(value) {
    setStatisticsSelection(value);
  },
});

const getNumbers = (type) => {
  const length =
    type === 'main' ? EurojackpotConstants.BOARD_NUMBERS.MAIN.MAX : EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MAX;

  const statsData = type === 'main' ? statistics.value?.mainNumbers : statistics.value?.euroNumbers;

  return Array.from({ length }, (_, i) => {
    const number = i + 1;
    let stat = null;

    switch (statisticsSelection.value) {
      case EurojackpotConstants.STATISTICS_SELECTIONS.OCCURRENCES:
        stat = statsData?.[number]?.occurrences || 0;
        break;
      case EurojackpotConstants.STATISTICS_SELECTIONS.DELAYS:
        stat = statsData?.[number]?.delays || 0;
        break;
      default:
        break;
    }

    return { number, stat };
  });
};

const toggleMainNumber = (number) => {
  setMainSelection(number);
};

const toggleEuroNumber = (number) => {
  setEuroSelection(number);
};

const handleClearBoard = () => {
  clearSelectedBoard();
};

onMounted(() => {
  getStatistics();
});
</script>

<template>
  <div class="eurojackpot-play-area">
    <div class="eurojackpot-play-area__main">
      <EurojackpotNumberSelections
        :selected-numbers="mainNumberSelections"
        :selected-system-id="selectedSystemId"
        type="main"
        :numbers="getNumbers('main')"
        @toggle-number="toggleMainNumber" />
      <EurojackpotNumberSelections
        :selected-numbers="euroNumberSelections"
        type="euro"
        :numbers="getNumbers('euro')"
        @toggle-number="toggleEuroNumber" />
    </div>
    <div class="eurojackpot-play-area__footer">
      <div class="eurojackpot-play-area__statistics">
        <div class="eurojackpot-play-area__statistics-title">{{ t('eurojackpot.statistics.title') }}</div>
        <TristateSwitch
          :options="switchOptions"
          :left-label="t('eurojackpot.statistics.occurrences')"
          :right-label="t('eurojackpot.statistics.delays')"
          v-model="currentStatisticsSelection" />
      </div>
      <div class="eurojackpot-play-area__footer-clear">
        <div class="eurojackpot-play-area__clear-label">ΚΑΘΑΡΙΣΜΟΣ</div>
        <button class="eurojackpot-play-area__clear-button" :disabled="clearButtonDisabled" @click="handleClearBoard">
          <FontAwesomeIcon :icon="['far', 'trash-alt']" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-play-area {
  @apply atw:flex atw:flex-col atw:h-full;
}

.eurojackpot-play-area__main {
  @apply atw:flex atw:flex-col atw:flex-1;
}

.eurojackpot-play-area__main > *:not(:last-child) {
  @apply atw:mb-6;
}

.eurojackpot-play-area__footer {
  @apply atw:flex atw:flex-row atw:justify-between atw:mt-auto;
}

.eurojackpot-play-area__statistics {
  @apply atw:flex atw:flex-col atw:justify-between;
}

.eurojackpot-play-area__statistics-title {
  @apply atw:text-white atw:font-black atw:pb-1 atw:mb-2;
  font-family: 'Roboto', sans-serif;
  font-size: 13.5px;
  border-bottom: 1px solid rgba(234, 220, 192, 0.3);
}


.eurojackpot-play-area__footer-clear {
  @apply atw:inline-flex atw:flex-col atw:items-center atw:font-black;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: var(--ejp-color-button-main);
}

.eurojackpot-play-area__clear-label {
  @apply atw:mb-1;
}

.eurojackpot-play-area__clear-button {
  @apply atw:bg-transparent atw:border-none atw:cursor-pointer;
  font-size: 40px;
  color: var(--ejp-color-button-main);
  transition: opacity 0.2s;
}

.eurojackpot-play-area__clear-button:hover {
  opacity: 0.7;
}

.eurojackpot-play-area__clear-button:disabled {
  @apply atw:cursor-not-allowed;
  opacity: 0.3;
}
</style>
