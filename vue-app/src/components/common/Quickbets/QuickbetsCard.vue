<template>
  <div class="quickbets-cards">
    <div
      class="quickbets-cards__card"
      :class="[`quickbets-cards--${theme}`, card.modifier]"
      v-for="(card, index) in loopingItems"
      :key="index"
    >
      <KinoQuickbetsCard
        v-if="theme === Constants.THEMES.KINO"
        :card="card"
        :index="index"
        :data-testid="`kino-card-${index}`"
      />
      <PowerspinQuickbetsCard
        v-if="theme === Constants.THEMES.POWERSPIN"
        :card="card"
        :betslip="powerspinBetslip"
        :data-testid="`powerspin-card-${index}`"
      />
      <button v-if="canReshuffle" class="quickbets-cards__card-button" @click="reshuffle">
        <img width="50" src="@/assets/shuffle@2x.png" alt="Quick Pick" />
      </button>
    </div>
  </div>
</template>

<script>
import moduleTypes from '@/store/modules/types';
import { mapState, mapGetters, mapActions } from 'vuex';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';
import Constants from '@/util/Constants';
import powerspinModuleTypes from '@/store/modules/PowerspinBetslipStoreModule/types';
import betslipUtils from '@/util/betslipUtils';
import KinoQuickbetsCard from '@/components/common/Quickbets/KinoQuickbetsCard.vue';
import PowerspinQuickbetsCard from '@/components/common/Quickbets/PowerspinQuickbetsCard.vue';
import PowerspinConstants from '@/util/powerspinConstants';

export default {
  name: 'QuickbetsCards',
  props: {
    theme: {
      type: String,
      default: Constants.THEMES.KINO,
    },
  },
  components: {
    KinoQuickbetsCard,
    PowerspinQuickbetsCard,
  },
  methods: {
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      addQuickPick: powerspinModuleTypes.actions.QUICK_PICK_CLICKED,
      generatePowerspinRandomColor: powerspinModuleTypes.actions.GENERATE_RANDOM_COLOR,
    }),
    reshuffle() {
      if (this.theme === Constants.THEMES.POWERSPIN) {
        if (this.hasPowerspinBetslipNumbers) {
          this.addQuickPick({ wheelIndex: 0 });
        } else if (this.hasPowerspinBetslipColor) {
          this.generatePowerspinRandomColor({ wheelIndex: 0 });
        }
      }
    },
  },
  computed: {
    ...mapState(moduleTypes.KINO_GAME_STORE_MODULE, {
      betslip: kinoGameModuleTypes.state.BETSLIP,
    }),
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      powerspinBetslip: powerspinModuleTypes.getters.GET_ACTIVE_BETSLIP,
    }),
    canReshuffle() {
      return (
        this.theme === Constants.THEMES.POWERSPIN && (this.hasPowerspinBetslipNumbers || this.hasPowerspinBetslipColor)
      );
    },
    hasPowerspinBetslipNumbers() {
      return !betslipUtils.isWheelCategoryEmpty(
        this.powerspinBetslip.wager.wheels[0].categories[PowerspinConstants.GAME_CATEGORY.NUMBER]
      );
    },
    hasPowerspinBetslipColor() {
      return !betslipUtils.isWheelCategoryEmpty(
        this.powerspinBetslip.wager.wheels[0].categories[PowerspinConstants.GAME_CATEGORY.COLOR]
      );
    },
    loopingItems() {
      const wheelCategories = Object.values(this.powerspinBetslip.wager.wheels[0].categories).filter(
        (category) => !betslipUtils.isWheelCategoryEmpty(category)
      );

      return this.theme === Constants.THEMES.KINO ? this.betslip.bet_areas : wheelCategories;
    },
    Constants() {
      return Constants;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss-utils/kino/mixins.scss';
@import '@/scss-utils/powerspin/mixins.scss';

.quickbets-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;

  &--kino {
    @include kino-card;
  }

  @media (max-width: 1500px) {
    width: 100%;
    max-width: 1070px;
  }

  &__card {
    height: 400px;
    width: auto;
    flex: 1;
    max-width: 300px;
    min-width: 235px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    &-button {
      position: absolute;
      top: 50%;
      right: 25px;
      transform: translateY(-50%);
      position: absolute;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 99;
    }

    @media (max-width: 1500px) {
      min-width: 250px;
    }

    padding: 0.5rem;
    text-align: center;
    // Default styles (which are currently kino-specific)
    background: linear-gradient(
      to bottom,
      var(--color-kino-card-bg-yellow-alpha),
      var(--color-kino-card-bg-yellow-warm-alpha)
    );
    box-shadow: 0 4px 10px var(--color-black-alpha-30);
  }

  &--powerspin {
    @include powerspin-card;
    max-width: 750px;
  }
}
</style>
