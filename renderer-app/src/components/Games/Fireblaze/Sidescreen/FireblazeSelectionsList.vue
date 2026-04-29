<script setup>
import { computed, getCurrentInstance } from 'vue';
import { useFireblaze } from '@/composables/useFireblaze';
import { useModalService } from '@/composables/useModalService';
import FireblazeConstants from '@/util/fireblaze/Constants';
import AddBoardButton from '@/components/Common/AddBoardButton.vue';
import FireblazeSelections from './FireblazeSelections.vue';

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;

const { confirm } = useModalService();

const { betslip, selectedBoardIndex, getBoardCost, removeBoard, addBoard, setSelectedBoardIndex } = useFireblaze();

const boards = computed(() => betslip.value?.wager?.boards || []);

const isBoardsArrayFull = computed(() => boards.value.length === FireblazeConstants.MAX_BOARDS);

const isAddBoardButtonDisabled = computed(() => !betslip.value?.isValidBetslip());

async function deleteBoard(boardIndex) {
  if (boards.value[boardIndex].isEmpty()) {
    removeBoard(boardIndex);
  } else {
    const confirmed = await confirm({ message: 'deleteArea' });
    if (confirmed) {
      removeBoard(boardIndex);
    }
  }
}

function checkIfEmptyAndSetIndex(index) {
  if (boards.value[selectedBoardIndex.value]?.panels[0]?.selection?.length > 0) {
    setSelectedBoardIndex(index);
  }
}
</script>

<template>
  <div class="fireblaze-selections-list">
    <FireblazeSelections
      v-for="(board, index) in boards"
      :key="`fireblaze-selection-${index}`"
      :index="index"
      :board="board"
      :cost="getBoardCost(index)"
      :selected="index === selectedBoardIndex"
      @delete="deleteBoard(index)"
      @select="checkIfEmptyAndSetIndex(index)" />
    <AddBoardButton v-if="!isBoardsArrayFull" theme="fireblaze" :disabled="isAddBoardButtonDisabled" @click="addBoard">
      {{ t('eurojackpot.addNewBoard') }}
    </AddBoardButton>
  </div>
</template>

<style scoped>
.fireblaze-selections-list {
  display: flex;
  flex-direction: column;
}

.fireblaze-selections-list :deep(.add-board-button) {
  border: solid 2px var(--fireblaze-color-primary-white);
  color: var(--fireblaze-color-primary-white);
  background: transparent;
}
</style>
