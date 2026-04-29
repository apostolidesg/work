<template>
  <div class="fireblaze-selections-list">
    <FireblazeSelections
      v-for="(board, index) in boards"
      :key="`eurojackpot-selection-${index}`"
      :index="index"
      :board="board"
      :cost="boardCost({ index })"
      :selected="index === selectedIndex"
      @delete="deleteBoard({ boardIndex: index })"
      @select="checkIfEmptyAndSetIndex({ selectedBoardIndex: index })"
    />
    <AddBoardButton v-if="!isBoardsArrayFull" @click="addBoard" theme="fireblaze" :disabled="isAddBoardButtonDisabled">
      {{ $t('eurojackpot.addNewBoard') }}
    </AddBoardButton>
  </div>
</template>

<script>
import FireblazeSelections from './FireblazeSelections.vue';
import { mapGetters, mapActions } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import FireblazeStoreModuleTypes from '../../../../../store/modules/FireblazeStoreModule/types';
import modalEventConstants from '../../../../../util/modalEventConstants';
import dialogModalMessages from '../../../../../util/dialogModalMessages';
import AddBoardButton from '../../../../common/AddBoardButton.vue';
import FireblazeConstants from '../../../../../util/fireblazeConstants';

export default {
  name: 'FireblazeSelectionsList',
  components: { AddBoardButton, FireblazeSelections },
  computed: {
    ...mapGetters(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      betslip: FireblazeStoreModuleTypes.getters.GET_BETSLIP,
      getBoardCost: FireblazeStoreModuleTypes.getters.GET_BOARD_COST,
      selectedIndex: FireblazeStoreModuleTypes.getters.GET_SELECTED_BOARD_INDEX,
    }),
    boards() {
      return this.betslip.wager.boards;
    },
    isBoardsArrayFull() {
      return this.boards.length === FireblazeConstants.MAX_BOARDS;
    },
    isAddBoardButtonDisabled() {
      return !this.betslip.isValidBetslip();
    },
  },
  methods: {
    ...mapActions(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      removeBoard: FireblazeStoreModuleTypes.actions.REMOVE_BOARD,
      addBoard: FireblazeStoreModuleTypes.actions.ADD_BOARD,
      setIndex: FireblazeStoreModuleTypes.actions.SET_SELECTED_BOARD_INDEX,
    }),
    checkIfEmptyAndSetIndex({ selectedBoardIndex }) {
      if (this.boards[this.selectedIndex].panels[0].selection.length > 0) {
        this.setIndex({ selectedBoardIndex });
      }
    },
    boardCost({ index }) {
      return this.getBoardCost({ index });
    },
    deleteBoard({ boardIndex }) {
      if (this.boards[boardIndex].isEmpty()) {
        this.removeBoard({ boardIndex });
      } else {
        this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.deleteArea, () => {
          this.removeBoard({ boardIndex });
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../../../scss-utils/fireblaze/colors.scss';

.fireblaze-selections-list {
  display: flex;
  flex-direction: column;

  ::v-deep .add-board-button__fireblaze {
    border: solid 2px $color-primary-white;
  }
}
</style>
