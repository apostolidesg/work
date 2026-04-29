<template>
  <div class="eurojackpot-play-area">
    <div class="eurojackpot-play-area__main">
      <EurojackpotNumbersSelections
        :selected-numbers="mainNumberSelections"
        :selected-system-id="selectedSystemId"
        type="main"
        :numbers="getNumbers('main')"
        @toggle-number="toggleMainNumber({ mainSelection: $event })"
      />
      <EurojackpotNumbersSelections
        :selected-numbers="euroNumberSelections"
        type="euro"
        :numbers="getNumbers('euro')"
        @toggle-number="toggleEuroNumber({ euroSelection: $event })"
      />
    </div>
    <div class="eurojackpot-play-area__footer">
      <div class="eurojackpot-play-area__statistics">
        <div class="eurojackpot-play-area__statistics-title">
          {{ $t('eurojackpot.statistics.title') }}
        </div>
        <TristateSwitch
          :options="switchOptions"
          :leftLabel="$t('eurojackpot.statistics.occurrences')"
          :rightLabel="$t('eurojackpot.statistics.delays')"
          v-model="statisticsSelection"
        />
      </div>
      <div class="eurojackpot-play-area__footer-clear">
        <BaseClearButton
          id="ejp-play-area-clear-betslip-btn"
          @click="clearBoard"
          top-label="clear"
          theme="white"
          :disabled="clearButtonDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EurojackpotNumbersSelections from './EurojackpotNumbersSelections.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import eurojackpotModuleTypes from '../../../../../store/modules/EurojackpotStoreModule/types';
import BaseClearButton from '../../../../common/BaseClearButton.vue';
import modalEventConstants from '../../../../../util/modalEventConstants';
import dialogModalMessages from '../../../../../util/dialogModalMessages';
import TristateSwitch from '../../../../common/TristateSwitch.vue';
import EurojackpotConstants from '../../../../../util/eurojackpotConstants';

export default {
  name: 'EurojackpotPlayArea',
  components: { TristateSwitch, BaseClearButton, EurojackpotNumbersSelections },
  created() {
    this.switchOptions = Object.values(EurojackpotConstants.STATISTICS_SELECTIONS);
  },
  computed: {
    ...mapGetters(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      getSelectedBoard: eurojackpotModuleTypes.getters.GET_SELECTED_BOARD,
    }),
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      getStatisticsSelection: (state) => state.statisticsSelection,
      getStatistics: (state) => state.statistics,
    }),
    mainNumberSelections() {
      return this.getSelectedBoard.panels[0].selection;
    },
    euroNumberSelections() {
      return this.getSelectedBoard.panels[1].selection;
    },
    selectedSystemId() {
      return this.getSelectedBoard.systemId;
    },
    clearButtonDisabled() {
      return this.getSelectedBoard.isEmpty();
    },
    statisticsSelection: {
      get() {
        return this.getStatisticsSelection;
      },
      set(value) {
        this.setStatisticsSelection({ selection: value });
      },
    },
  },
  methods: {
    ...mapActions(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      toggleMainNumber: eurojackpotModuleTypes.actions.SET_MAIN_SELECTION,
      toggleEuroNumber: eurojackpotModuleTypes.actions.SET_EURO_SELECTION,
      resetBoard: eurojackpotModuleTypes.actions.CLEAR_SELECTED_BOARD,
      setStatisticsSelection: eurojackpotModuleTypes.actions.SET_STATISTICS_SELECTION,
    }),
    clearBoard() {
      this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.deleteArea, () => {
        this.resetBoard();
      });
    },
    getNumbers(type) {
      const length =
        type === 'main'
          ? EurojackpotConstants.BOARD_NUMBERS.MAIN.MAX
          : EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MAX;

      const statistics = type === 'main' ? this.getStatistics?.mainNumbers : this.getStatistics?.euroNumbers;

      return Array.from(
        {
          length,
        },
        (_, i) => {
          const number = i + 1;
          let stat = null;

          switch (this.getStatisticsSelection) {
            case EurojackpotConstants.STATISTICS_SELECTIONS.OCCURRENCES:
              stat = (statistics && statistics[number] && statistics[number]?.occurrences) || 0;
              break;
            case EurojackpotConstants.STATISTICS_SELECTIONS.DELAYS:
              stat = (statistics && statistics[number] && statistics[number]?.delays) || 0;
              break;
            default:
              break;
          }

          return { number, stat };
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
.eurojackpot-play-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
      margin-bottom: 25px;
    }
  }
  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &-clear {
      display: inline-flex;
      flex-direction: column;
      font-size: 12px;
      font-weight: 900;
      font-family: 'Roboto', sans-serif;

      ::v-deep .base-clear-button__trash {
        font-size: 40px;
        color: #eadcc0;
      }
    }
  }

  &__statistics {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-title {
      font-size: 13.5px;
      font-weight: 900;
      font-family: 'Roboto', sans-serif;
      color: white;
      border-bottom: 1px solid rgba(234, 220, 192, 0.3);
      padding-bottom: 5px;
    }
  }
}
</style>
