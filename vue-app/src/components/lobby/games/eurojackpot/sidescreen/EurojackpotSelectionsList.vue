<template>
  <div class="eurojackpot-selections-list">
    <EurojackpotSelections
      v-for="(board, index) in boards"
      :key="`eurojackpot-selection-${index}`"
      :index="index"
      :board="board"
      :cost="boardCost({ index })"
      :selected="index === selectedIndex"
      @delete="deleteBoard({ boardIndex: index })"
      @select="setIndex({ selectedBoardIndex: index })"
    />
    <AddBoardButton
      v-if="!isBoardsArrayFull"
      @click="addBoard"
      theme="eurojackpot"
      :disabled="isAddBoardButtonDisabled"
    >
      {{ $t('eurojackpot.addNewBoard') }}
    </AddBoardButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import eurojackpotGameStoreModuleTypes from '../../../../../store/modules/EurojackpotStoreModule/types';
import EurojackpotSelections from './EurojackpotSelections.vue';
import AddBoardButton from '../../../../common/AddBoardButton.vue';
import EurojackpotConstants from '../../../../../util/eurojackpotConstants';
import modalEventConstants from '../../../../../util/modalEventConstants';
import dialogModalMessages from '../../../../../util/dialogModalMessages';

export default {
  name: 'EurojackpotSelectionsList',
  components: { AddBoardButton, EurojackpotSelections },
  computed: {
    ...mapGetters(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      betslip: eurojackpotGameStoreModuleTypes.getters.GET_BETSLIP,
      getBoardCost: eurojackpotGameStoreModuleTypes.getters.GET_BOARD_COST,
      selectedIndex: eurojackpotGameStoreModuleTypes.getters.GET_SELECTED_BOARD_INDEX,
    }),
    boards() {
      return this.betslip.wager.boards;
    },
    isBoardsArrayFull() {
      return this.boards.length === EurojackpotConstants.MAX_BOARDS;
    },
    isAddBoardButtonDisabled() {
      return !this.betslip.isValidBetslip();
    },
  },
  methods: {
    ...mapActions(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      addBoard: eurojackpotGameStoreModuleTypes.actions.ADD_BOARD,
      removeBoard: eurojackpotGameStoreModuleTypes.actions.REMOVE_BOARD,
      setIndex: eurojackpotGameStoreModuleTypes.actions.SET_SELECTED_BOARD_INDEX,
    }),
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
.eurojackpot-selections-list {
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
