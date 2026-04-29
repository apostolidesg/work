<template>
  <div :id="`fireblaze-selections-${index}`" :class="['fireblaze-selections', selectionClass]">
    <div class="fireblaze-selections__wrapper" @click="emitSelect">
      <div class="fireblaze-selections__header">
        <div>
          {{ $t('fireblaze.amount') }}: <span class="fireblaze-selections__header-cost">{{ cost }}&euro;</span>
        </div>
        <div class="fireblaze-selections__header-system">
          {{ $t(`fireblaze.optionLabels.${board.betType}`) }}
        </div>
      </div>
      <div class="fireblaze-selections__content">
        <div class="fireblaze-selections__numbers">
          <div
            v-for="(mainNumber, index) in mainNumbers"
            :key="`selection-main-number-${index}`"
            class="fireblaze-selections__number"
          >
            {{ mainNumber }}
          </div>
        </div>
        <div class="fireblaze-selections__delete-btn">
          <BaseClearButton
            :id="`fireblaze-selections-delete-${index}`"
            theme="white"
            @click="emitDelete"
            :disabled="isDeleteDisabled"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseClearButton from '../../../../common/BaseClearButton.vue';

export default {
  name: 'FireblazeSelections',
  components: { BaseClearButton },
  props: {
    board: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    cost: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    selectionClass() {
      return `fireblaze-selections--${this.selected ? 'selected' : 'unselected'}`;
    },
    isDeleteDisabled() {
      return this.board.isEmpty() && this.index === 0;
    },
    mainNumbers() {
      return this.board.panels[0].selection;
    },
  },
  methods: {
    emitDelete() {
      this.$emit('delete');
    },
    emitSelect() {
      this.$emit('select');
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../../../scss-utils/fireblaze/colors.scss';

.fireblaze-selections {
  position: relative;
  border-radius: 10px;
  padding: 0.5em;
  z-index: 1;
  background: $color-primary-white;
  margin-bottom: 0.5em;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: $gradient-dark-pink;
    border-radius: 10px;
    z-index: -1;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  &--selected {
    background: $gradient-light-gold;

    &::before {
      background: $gradient-dark-pink;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    &-cost,
    &-system {
      font-weight: 700;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__numbers {
    display: flex;
    flex-wrap: wrap;
  }
  &__number {
    position: relative;
    min-width: 35px;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    padding: 0.5em;
    border-radius: 50%;
    z-index: 1;
    background: $gradient-light-gold;
    margin: 0.1em;

    &::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      right: 2px;
      bottom: 2px;
      background: $gradient-dark-pink;
      border-radius: 50%;
      z-index: -1;
    }
  }
}
</style>
