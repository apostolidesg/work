<template>
  <div class="fireblaze-play-area">
    <div class="fireblaze-play-area__main">
      <FireblazeNumbersSelections
        :selected-numbers="numbersSelections"
        :selected-option-id="selectedOptionId"
        :numbers="getNumbers"
        @toggle-number="toggleNumber({ selection: $event })"
      />
      <FireblazeStakesSelections
        :selectedStakes="stakesSelections"
        :stakes="multipliersSet"
        @select-stake="selectStakes({ multiplier: $event })"
      />
    </div>
    <div class="fireblaze-play-area__footer">
      <div class="fireblaze-play-area__statistics">
        <div class="fireblaze-play-area__statistics-title">
          {{ $t('fireblaze.statistics.title') }}
        </div>
        <TristateSwitch
          :options="switchOptions"
          :leftLabel="$t('fireblaze.statistics.occurrences')"
          :rightLabel="$t('fireblaze.statistics.delays')"
          v-model="getStatistics"
        />
      </div>
      <div v-if="areStatisticsEnabled" class="fireblaze-play-area__alert">
        <div class="fireblaze-play-area__alert-text">{{ statisticsAlertText }}</div>
      </div>
      <div class="fireblaze-play-area__footer-clear">
        <BaseClearButton
          id="fireblaze-play-area-clear-betslip-btn"
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
import FireblazeNumbersSelections from './FireblazeNumbersSelections.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import fireblazeModuleTypes from '../../../../../store/modules/FireblazeStoreModule/types';
import FireblazeConstants from '../../../../../util/fireblazeConstants';
import FireblazeStakesSelections from './FireblazeStakesSelections.vue';
import TristateSwitch from '../../../../common/TristateSwitch.vue';
import BaseClearButton from '../../../../common/BaseClearButton.vue';
import modalEventConstants from '../../../../../util/modalEventConstants';
import dialogModalMessages from '../../../../../util/dialogModalMessages';
import Constants from '../../../../../util/Constants';

export default {
  name: 'FireblazePlayArea',
  components: { BaseClearButton, TristateSwitch, FireblazeStakesSelections, FireblazeNumbersSelections },
  created() {
    this.getStatisticsTemp();
    this.switchOptions = Object.values(FireblazeConstants.STATISTICS_SELECTIONS);
  },
  computed: {
    ...mapState(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, ['statistics', 'statisticsSelection']),
    ...mapGetters(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      getSelectedBoard: fireblazeModuleTypes.getters.GET_SELECTED_BOARD,
      getSelectedBoardIndex: fireblazeModuleTypes.getters.GET_SELECTED_BOARD_INDEX,
    }),
    numbersSelections() {
      return this.getSelectedBoard?.panels[0]?.selection || [];
    },
    stakesSelections() {
      return this.getSelectedBoard?.multipliers || [];
    },
    selectedOptionId() {
      return (
        FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT[this.getSelectedBoard?.betType] ||
        FireblazeConstants.BET_TYPES.DEFAULT
      );
    },
    multipliersSet() {
      const multipliers =
        FireblazeConstants.MULTIPLIERS_SET[this.getSelectedBoard?.betType] ||
        FireblazeConstants.MULTIPLIERS_SET_DEFAULT;
      return multipliers.map((item) => ({ multiplier: item }));
    },
    getNumbers() {
      const statistics = this.statistics?.numbers;

      return Array.from(
        {
          length: FireblazeConstants.BOARD_NUMBERS.MAX,
        },
        (_, i) => {
          const number = i + 1;
          let stat = null;

          switch (this.statisticsSelection) {
            case FireblazeConstants.STATISTICS_SELECTIONS.OCCURRENCES:
              stat = (statistics && statistics[number] && statistics[number]?.occurrences) || 0;
              break;
            case FireblazeConstants.STATISTICS_SELECTIONS.DELAYS:
              stat = (statistics && statistics[number] && statistics[number]?.delays) || 0;
              break;
            default:
              break;
          }

          return { number, stat };
        }
      );
    },
    getStatistics: {
      get() {
        return this.statisticsSelection;
      },
      set(value) {
        this.setStatisticsSelection({ selection: value });
      },
    },
    areStatisticsEnabled() {
      return this.getStatistics !== FireblazeConstants.STATISTICS_SELECTIONS.NONE;
    },
    statisticsAlertText() {
      const drawRange = Constants.DRAW_RANGE.FIREBLAZE;
      const drawDelay = Constants.DRAW_DAYS;
      if (this.statisticsSelection === FireblazeConstants.STATISTICS_SELECTIONS.OCCURRENCES) {
        return this.$t('fireblaze.statistics.alert.occurences', { drawRange }, drawRange);
      }
      if (this.statisticsSelection === FireblazeConstants.STATISTICS_SELECTIONS.DELAYS) {
        return this.$t('fireblaze.statistics.alert.delays', { drawDelay }, drawDelay);
      }
      return '';
    },
    clearButtonDisabled() {
      return this.getSelectedBoard.isEmpty();
    },
  },
  methods: {
    ...mapActions(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      setSelection: fireblazeModuleTypes.actions.SET_SELECTION,
      setMultiplier: fireblazeModuleTypes.actions.SET_MULTIPLIER,
      setStatisticsSelection: fireblazeModuleTypes.actions.SET_STATISTICS_SELECTION,
      getStatisticsTemp: fireblazeModuleTypes.actions.GET_STATISTICS,
      removeBoard: fireblazeModuleTypes.actions.REMOVE_BOARD,
    }),
    toggleNumber({ selection }) {
      this.setSelection({ selection });
    },
    selectStakes({ multiplier }) {
      this.setMultiplier({ multiplier });
    },
    clearBoard() {
      this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.deleteArea, () => {
        this.removeBoard({ boardIndex: this.getSelectedBoardIndex });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../../../scss-utils/fireblaze/colors';

.fireblaze-play-area {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: $color-primary-white;
  font-size: 1em;
  padding: 3em 1.5em 2em;
  background: $gradient-dark-red;

  &__main {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2em;

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

  &__alert {
    display: flex;
    flex: 1;
    align-items: end;

    &-text {
      font-size: 13.5px;
      font-weight: 900;
      background-color: $color-third-dark-red;
      padding: 0.25em 1em;
      border-radius: 20px;
    }
  }
}
</style>
