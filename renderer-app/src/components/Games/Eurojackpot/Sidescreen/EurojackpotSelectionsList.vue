<script setup>
import { computed, getCurrentInstance } from 'vue';
import EurojackpotSelections from './EurojackpotSelections.vue';
import AddBoardButton from '@/components/Common/AddBoardButton.vue';
import EurojackpotConstants from '@/util/eurojackpot/Constants.js';
import { useEurojackpot } from '@/composables/useEurojackpot';

const { betslip, selectedBoardIndex, getBoardCost, addBoard, removeBoard, setSelectedBoardIndex } = useEurojackpot();

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;

const boards = computed(() => betslip.value?.wager?.boards || []);

const isBoardsArrayFull = computed(() => {
  return boards.value.length >= EurojackpotConstants.MAX_BOARDS;
});

const isAddBoardButtonDisabled = computed(() => {
  return !betslip.value?.isValidBetslip();
});

const handleDeleteBoard = (boardIndex) => {
  removeBoard(boardIndex);
};

const handleSelectBoard = (index) => {
  setSelectedBoardIndex(index);
};

const handleAddBoard = () => {
  addBoard();
};
</script>

<template>
  <div class="eurojackpot-selections-list">
    <EurojackpotSelections
      v-for="(board, index) in boards"
      :key="`eurojackpot-selection-${index}`"
      :index="index"
      :board="board"
      :cost="getBoardCost(index)"
      :selected="index === selectedBoardIndex"
      @delete="handleDeleteBoard(index)"
      @select="handleSelectBoard(index)" />
    <AddBoardButton
      v-if="!isBoardsArrayFull"
      :disabled="isAddBoardButtonDisabled"
      theme="eurojackpot"
      @click="handleAddBoard">
      {{ t('eurojackpot.addNewBoard') }}
    </AddBoardButton>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-selections-list {
  @apply atw:flex atw:flex-col atw:items-center;
}

.eurojackpot-selections-list > *:not(:last-child) {
  @apply atw:mb-2.5;
}
</style>
