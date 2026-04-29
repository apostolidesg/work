<template>
  <div class="fireblaze-options">
    <div class="fireblaze-options__header">
      <div class="fireblaze-options__header-title">{{ $t('fireblaze.options') }}</div>
      <div class="fireblaze-options__header-info">{{ $t('fireblaze.optionsInfo') }}</div>
    </div>
    <div class="fireblaze-options__numbers">
      <div v-for="betType in betTypes" :key="betType" class="fireblaze-options__numbers--item">
        <FireblazeOptionButton
          :id="`fireblaze-system-btn-${betTypeToId(betType)}`"
          @click="handleBetTypeClick(betType)"
          :active="betType === activeBetType"
          :disabled="isBetTypeDisabled(betType)"
        >
          {{ $t(`fireblaze.optionLabels.${betType}`) }}
        </FireblazeOptionButton>
      </div>
    </div>
  </div>
</template>

<script>
import FireblazeConstants from '../../../../../util/fireblazeConstants';
import FireblazeOptionButton from './FireblazeOptionButton.vue';
import { mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import fireblazeModuleTypes from '../../../../../store/modules/FireblazeStoreModule/types';

export default {
  name: 'FireblazeOptions',
  props: {
    activeBetType: {
      type: Number,
      default: null,
    },
  },
  components: { FireblazeOptionButton },
  data() {
    return {
      betTypes: FireblazeConstants.BET_TYPES,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      getBetslip: fireblazeModuleTypes.getters.GET_BETSLIP,
    }),
  },
  methods: {
    handleBetTypeClick(betType) {
      this.$emit('bet-type-click', { betType });
    },
    isBetTypeDisabled(betType) {
      return this.getBetslip.wager.boards.some(
        (board) => board.betType === betType && board.betType !== this.activeBetType
      );
    },
    betTypeToId(betType) {
      return FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT[betType];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/fireblaze/colors';

.fireblaze-options {
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  &__header {
    &-title {
      font-weight: 700;
    }
    &-info {
      min-height: 75px;
    }
  }

  &__numbers {
    display: flex;
    flex-direction: column;
    margin: 1em 0;

    &--item {
      margin-bottom: 1em;
    }
  }
}
</style>
