<template>
  <div :id="`ejp-selections-${index}`" :class="['eurojackpot-selections', selectionClass]">
    <div class="eurojackpot-selections__wrapper" @click="selectSelection">
      <div class="eurojackpot-selections__header">
        <div>
          {{ $t('eurojackpot.amount') }}: <span class="eurojackpot-selections__header-cost">{{ cost }}&euro;</span>
        </div>
        <div v-if="system" class="eurojackpot-selections__header-system">
          {{ $t('eurojackpot.systemLabel', { system }) }}
        </div>
      </div>
      <div class="eurojackpot-selections__content">
        <div class="eurojackpot-selections__numbers">
          <span
            v-for="(mainNumber, index) in mainNumbers"
            :key="`selection-main-number-${index}`"
            class="eurojackpot-selections__number eurojackpot-selections__number--main"
            >{{ mainNumber }}</span
          >
          <span class="eurojackpot-selections__star" v-if="euroNumbers.length > 0">&star;</span>
          <span
            v-for="(euroNumber, index) in euroNumbers"
            :key="`selection-euro-number-${index}`"
            class="eurojackpot-selections__number eurojackpot-selections__number--euro"
            >{{ euroNumber }}</span
          >
        </div>
        <div class="eurojackpot-selections__delete_btn">
          <BaseClearButton
            :id="`ejp-selections-delete-${index}`"
            theme="yellow"
            @click="deleteSelection"
            :disabled="isDeleteDisabled"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EurojackpotNumberButton from '../mainscreen/EurojackpotNumberButton.vue';
import BaseClearButton from '../../../../common/BaseClearButton.vue';
import { mapState } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';

export default {
  name: 'EurojackpotSelections',
  components: { BaseClearButton, EurojackpotNumberButton },
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
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, ['isActiveDrawExtra']),
    selectionClass() {
      const unselectedClass = this.isActiveDrawExtra ? 'unselected--extra' : 'unselected';
      return `eurojackpot-selections--${this.selected ? 'selected' : unselectedClass}`;
    },
    euroNumbers() {
      return this.board.panels[1].selection;
    },
    mainNumbers() {
      return this.board.panels[0].selection;
    },
    system() {
      return this.board.systemId;
    },
    isDeleteDisabled() {
      return this.board.isEmpty() && this.index === 0;
    },
  },
  methods: {
    deleteSelection() {
      this.$emit('delete');
    },
    selectSelection() {
      this.$emit('select');
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../../../scss-utils/eurojackpot/colors.scss';

.eurojackpot-selections {
  width: 100%;
  display: flex;
  align-items: flex-end;
  &--selected {
    background: $color-gradient-dark;
  }
  &--unselected {
    background: transparent;
  }
  &--unselected--extra {
    background: #2c2718cc;
  }
  border: 2px solid #fae291;
  border-radius: 10px;
  &__wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  &__content {
    display: flex;
    flex-direction: row;
  }
  &__numbers {
    display: flex;
    margin-top: 15px;
    margin-bottom: 4px;
    padding: 0 8px 8px 8px;
    align-items: center;
    gap: 4px;
    min-height: 30px;
    flex-wrap: wrap;
    flex: 1;

    & > * {
      margin-right: 4px;
      margin-bottom: 4px;
    }
  }
  &__number {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    padding: 0;
    color: $color-secondary-black;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    &--main {
      background-color: $color-button-main;
    }
    &--euro {
      background-color: $color-button-euro;
    }
  }
  &__star {
    font-size: 30px;
    line-height: 1;
    color: $color-button-euro;
  }
  &__delete_btn {
    display: flex;
    align-items: flex-end;
  }
  &__header {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 8px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &-cost {
      font-weight: bold;
    }

    &-system {
      font-weight: bold;
    }
  }
}
::v-deep .base-clear-button__btn {
  margin-right: 4px;
  margin-bottom: 8px;
}
</style>
