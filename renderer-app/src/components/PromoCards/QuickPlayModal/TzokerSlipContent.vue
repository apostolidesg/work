<script setup>
import { computed, toRef } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useConfigText } from '../../../composables/useConfigText';
import { useJackpotSlip } from '../../../composables/useJackpotSlip';
import { useTzoker } from '../../../composables/useTzoker';
import KinoSection from './KinoSection.vue';
import tzokerLogo from '../../../assets/logos/tzoker-logo.png';

library.add(faXmark);

// TODO: Enable in Kino and implement in next task/sprint
const kinoAvailable = false;

const props = defineProps({
  slipAmount: {
    type: Number,
    required: true,
  },
  columns: {
    type: Number,
    default: 1,
  },
  index: {
    type: Number,
    default: 0,
  },
  orientation: {
    type: String,
    default: 'HORIZONTAL',
  },
  modalHeight: {
    type: Number,
    default: null,
  },
  isPortrait: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['submit', 'close']);
const { tConfig } = useConfigText();

const { cartBoards, betslipCost, clearAllBoards, shuffleBoard, quickPick, addBoardToCart, getBoardCost } = useTzoker();

const tzokerConfig = {
  cartBoards,
  betslipCost,
  clearAllBoards,
  shuffleBoard,
  getBoardCost,
  addRandomBoard: () => {
    quickPick({ mainCount: 5, tzokerCount: 1 });
    addBoardToCart();
  },
  mapBoard: (board, index) => ({
    id: board.getId(),
    mainNumbers: [...board.mainNumbers],
    bonusNumbers: [board.tzokerNumbers?.[0] ?? null],
    cost: getBoardCost(index + 1),
  }),
};

const tzokerColumnCount = computed(() => {
  const val = tConfig(
    `${props.orientation.toUpperCase()}.JACKPOT_GAMES_AREA.TZOKER.READY_BETSLIPS.BETSLIP_${props.index + 1}.tzoker`
  );
  const num = Number(val);
  return Number.isFinite(num) && num >= 20 ? num : null;
});

const isLargeColumnMode = computed(() => tzokerColumnCount.value !== null);

const { KINO_PRICES, boards, kinoEnabled, kinoPrice, kinoNumbers, totalCost } = useJackpotSlip(
  tzokerConfig,
  toRef(props, 'columns'),
  toRef(props, 'slipAmount'),
  isLargeColumnMode
);

const displayTotal = computed(() => {
  if (tzokerColumnCount.value !== null) return tzokerColumnCount.value;
  return totalCost.value.toFixed(2);
});

const handleSubmit = () => {
  emit('submit', {
    boards: boards.value,
    kinoEnabled: kinoEnabled.value,
    kinoNumbers: kinoNumbers.value,
    kinoPrice: kinoPrice.value,
    slipCost: props.slipAmount,
    kinoCost: kinoEnabled.value ? kinoPrice.value : 0,
    totalCost: totalCost.value,
  });
};
</script>

<template>
  <div class="tzoker-slip">
    <div class="tzoker-slip__header">
      <img :src="tzokerLogo" alt="Tzoker" class="atw:w-[195px] atw:h-[77px]" />
      <button type="button" class="tzoker-slip__close-btn" aria-label="Close modal" @click="emit('close')">
        <FontAwesomeIcon :icon="['fas', 'xmark']" size="lg" class="atw:w-4 atw:h-4" />
      </button>
    </div>

    <div class="tzoker-slip__boards-scroll">
      <div class="atw:flex atw:flex-col atw:gap-4" role="list" :aria-label="$t('tzoker.boardsLabel')">
        <article v-for="board in boards" :key="board.id" role="listitem" class="tzoker-slip__board">
          <div>
            <p class="tzoker-slip__board-title">{{ $t('slips.tzoker.choices') }}</p>
            <p class="tzoker-slip__board-subtitle">
              5 + 1 {{ $t('slips.tzoker.boardDescription') }} €{{ board.cost.toFixed(2) }}
            </p>
          </div>

          <div class="atw:flex atw:items-center">
            <div class="atw:flex atw:gap-2 atw:items-center" role="group" :aria-label="`Board ${board.id} numbers`">
              <div
                v-for="num in board.mainNumbers"
                :key="`main-${num}`"
                role="img"
                :aria-label="`Number ${num}`"
                class="tzoker-slip__number tzoker-slip__number--main">
                {{ num }}
              </div>

              <template v-if="!isLargeColumnMode">
                <div aria-hidden="true" class="tzoker-slip__number-divider" />
                <div
                  role="img"
                  :aria-label="`Tzoker number ${board.bonusNumbers[0]}`"
                  class="tzoker-slip__number tzoker-slip__number--tzoker">
                  {{ board.bonusNumbers[0] }}
                </div>
              </template>

              <div v-else class="tzoker-slip__large-column" style="width: 80px; height: 48px">
                <div aria-hidden="true" class="tzoker-slip__large-column-circle tzoker-slip__large-column-circle--1" />
                <div aria-hidden="true" class="tzoker-slip__large-column-circle tzoker-slip__large-column-circle--2" />
                <div aria-hidden="true" class="tzoker-slip__large-column-circle tzoker-slip__large-column-circle--3" />
                <span class="tzoker-slip__large-column-label">+{{ tzokerColumnCount }}</span>
              </div>
            </div>

            <button
              type="button"
              class="tzoker-slip__shuffle-btn"
              :aria-label="`Shuffle board ${board.id}`"
              @click="shuffleBoard(board.id)">
              <img src="../../../assets/icons/shuffle@2x.svg" alt="Shuffle" class="atw:w-[50px] atw:h-[50px]" />
            </button>
          </div>
        </article>
      </div>

      <!-- TODO: Enable in next task/sprint -->
      <KinoSection
        v-if="kinoAvailable"
        v-model:selected-kino-number="kinoPrice"
        :kino-numbers="kinoNumbers"
        :kino-number-options="KINO_PRICES" />
    </div>

    <div class="tzoker-slip__footer">
      <div class="atw:flex atw:items-center atw:justify-between atw:mb-4">
        <span class="atw:font-semibold atw:text-black atw:text-4xl">{{ $t('slips.tzoker.total') }}</span>
        <span class="atw:font-bold atw:text-black atw:text-4xl">€{{ displayTotal }}</span>
      </div>
      <button type="button" class="tzoker-slip__submit-btn" @click="handleSubmit">
        {{ $t('slips.tzoker.submitSlipCost') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.tzoker-slip {
  @apply atw:flex atw:flex-col atw:w-full atw:h-full;
}

.tzoker-slip__header {
  @apply atw:flex atw:items-center atw:justify-between atw:p-5 atw:flex-shrink-0;
}

.tzoker-slip__boards-scroll {
  @apply atw:flex atw:flex-col atw:gap-6 atw:px-5 atw:overflow-y-auto atw:flex-1 atw:min-h-0;
  overscroll-behavior: contain;
}

.tzoker-slip__close-btn {
  @apply atw:z-10 atw:w-15 atw:h-15 atw:rounded-full atw:flex atw:items-center atw:justify-center atw:bg-gray-100 atw:hover:bg-gray-200 atw:transition-colors atw:cursor-pointer atw:border-0;
}

.tzoker-slip__board {
  @apply atw:rounded-2xl atw:py-3 atw:px-6 atw:bg-[#fafafa] atw:shadow-[0_4px_8px_rgba(0,0,0,0.1)];
}

.tzoker-slip__board-title {
  @apply atw:m-0 atw:text-[20px] atw:font-semibold atw:leading-normal atw:tracking-[0.07px] atw:uppercase atw:text-[#1E1F24];
}

.tzoker-slip__board-subtitle {
  @apply atw:m-0 atw:mt-0.5 atw:text-[22px] atw:font-semibold atw:leading-normal atw:tracking-[0.07px] atw:text-[#868686];
}

.tzoker-slip__number {
  @apply atw:w-12 atw:h-12 atw:rounded-full atw:flex atw:items-center atw:justify-center atw:text-xl atw:font-bold atw:flex-shrink-0 atw:select-none;
}

.tzoker-slip__number--main {
  @apply atw:text-white atw:bg-[#43a9ec];
}

.tzoker-slip__number--tzoker {
  @apply atw:bg-[#FDE43E] atw:text-[#111111];
}

.tzoker-slip__number-divider {
  @apply atw:w-0.5 atw:h-12 atw:flex-shrink-0 atw:rounded-[1px] atw:mx-1 atw:bg-[#d0d0d0];
}

.tzoker-slip__large-column {
  @apply atw:relative atw:flex atw:items-center atw:flex-shrink-0 atw:select-none;
}

.tzoker-slip__large-column-circle {
  @apply atw:absolute atw:rounded-full;
  width: 48px;
  height: 48px;
}

.tzoker-slip__large-column-circle--1 {
  @apply atw:bg-[#FFD37F];
  left: 28px;
  z-index: 1;
}

.tzoker-slip__large-column-circle--2 {
  @apply atw:bg-[#FFB626];
  left: 22px;
  z-index: 2;
}

.tzoker-slip__large-column-circle--3 {
  @apply atw:bg-[#FFA800];
  left: 15px;
  z-index: 3;
}

.tzoker-slip__large-column-label {
  @apply atw:relative atw:z-10 atw:w-full atw:text-center atw:text-[20px] atw:font-bold atw:text-[#111111];
}

.tzoker-slip__shuffle-btn {
  @apply atw:w-[48px] atw:ml-10 atw:h-[48px] atw:rounded-full atw:flex atw:items-center atw:justify-center atw:transition-opacity atw:hover:opacity-70 atw:cursor-pointer atw:border-0 atw:flex-shrink-0 atw:bg-[#e0e0e0];
}

.tzoker-slip__footer {
  @apply atw:px-10 atw:pb-10 atw:pt-4 atw:flex-shrink-0 atw:border-t atw:border-gray-100;
}

.tzoker-slip__submit-btn {
  @apply atw:rounded-full atw:hover:opacity-90 atw:transition-opacity atw:w-full atw:cursor-pointer atw:border-2 atw:h-[80px] atw:text-white atw:text-[28px] atw:font-bold atw:bg-[#00ab4d] atw:border-[#00ab4d];
}

*::-webkit-scrollbar {
  width: 16px;
}
*::-webkit-scrollbar-track {
  background: white;
}
*::-webkit-scrollbar-thumb {
  background-color: white;
  border: 2px solid gray;
}
</style>
