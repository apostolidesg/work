<template>
  <div class="fireblaze-stakes-selection">
    <span class="fireblaze-stakes-selection__title">{{ $t('multiplier') }}</span>
    <div class="fireblaze-stakes-selection__stakes">
      <button
        v-for="{ multiplier, stat } in stakes"
        :id="`fireblaze-stake-btn-${multiplier}`"
        class="fireblaze-stakes-selection__stakes-button"
        :class="{ 'fireblaze-stakes-selection__stakes-button--active': isStakeActive(multiplier) }"
        @click="toggleStake(multiplier)"
      >
        <span class="fireblaze-stakes-selection__stakes-button--number">
          {{ getStake(multiplier) }}€
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import Constants from '../../../../../util/Constants';

export default {
  name: 'FireblazeStakesSelections',
  components: {},
  props: {
    selectedStakes: {
      type: Array,
      required: true,
    },
    stakes: {
      type: Array,
      required: true,
    },
  },
  computed: {},
  methods: {
    isStakeActive(stake) {
      return this.selectedStakes.includes(stake);
    },
    toggleStake(stake) {
      this.$emit('select-stake', stake);
    },
    getStake(multiplier) {
      return multiplier * Constants.BASIC_BETTING_AMOUNT;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../../../scss-utils/fireblaze/colors';
.fireblaze-stakes-selection {
  display: flex;
  flex-direction: column;
  margin: 4em 0 2em;

  &__title {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 900;
    text-transform: uppercase;
    margin: 1em 0;
  }

  &__stakes {
    display: flex;
    justify-content: center;
    gap: 0.7em;

    &-button {
      width: 52px;
      height: 48px;
      border: none;
      position: relative;
      z-index: 1;
      background: $color-primary-white;

      &::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        right: 2px;
        bottom: 2px;
        background: linear-gradient(180deg, #531eef 0%, #a556f7 99.99%);
        z-index: -1;
      }

      &--active {
        background: $gradient-light-gold;

        &::before {
          background: $gradient-dark-pink;
        }
      }

      &--number {
        font-family: Roboto, serif;
        font-size: 18px;
        font-weight: 900;
        line-height: 23px;
        letter-spacing: 0;
        text-align: center;
        color: $color-primary-white;
      }
    }
  }
}
</style>
