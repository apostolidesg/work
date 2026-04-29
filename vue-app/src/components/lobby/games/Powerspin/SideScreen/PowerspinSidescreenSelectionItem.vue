<template>
  <div
    class="powerspin-sidescreen-selection-item"
    :class="`powerspin-sidescreen-selection-item__${type}`"
    :style="itemStyle"
  >
    <slot />
  </div>
</template>

<script>
import symbolIcon from '../../../../../assets/power-spin/symbol.svg';

export default {
  name: 'PowerspinSidescreenSelectionItem',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    itemStyle() {
      return this.type === 'symbol-board' ? { 'background-image': `url(${symbolIcon})` } : {};
    },
  },
};
</script>

<style lang="scss" scoped>
.powerspin-sidescreen-selection-item {
  margin: 2px;

  &__simple-number-board-red,
  &__simple-number-board-green,
  &__simple-number-board-blue {
    box-sizing: border-box;
    font-weight: 600;
    font-size: 12px;
    border-radius: 50%;
    color: #ffffff;
    display: inline-block;
    text-align: center;
    line-height: 25px;
    width: 25px;
    height: 25px;
  }

  &__simple-number-board-red {
    background: #e2091c;
  }

  &__simple-number-board-green {
    background: #019642;
  }

  &__simple-number-board-blue {
    background: #01509f;
  }

  &__under-board,
  &__over-board {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  &__under-board {
    background: #ffffff;
    border: 2px solid #faad29;
    color: #333e45;
    padding-top: 2px;
  }

  &__over-board {
    background: #333e45;
    border: 2px solid #333e45;
    color: #faad29;
    padding-top: 2px;
  }

  &__color-board-red,
  &__color-board-green,
  &__color-board-blue {
    font-weight: 600;
    font-size: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    padding: 4px 20px 4px 20px;
    color: #ffffff;
    border-radius: 50px;
  }

  &__color-board-red {
    background: #e2091c;
  }

  &__color-board-green {
    background: #009641;
  }

  &__color-board-blue {
    background: #01509f;
  }

  &__symbol-board {
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    align-content: center;
    text-align: center;
    width: 25px;
    height: 25px;
  }

  &__markets-board {
    width: 100px;
    border-radius: 50px;
    background-color: var(--magenta);
    font-weight: 600;
    font-size: 12px;
    color: var(--white);
    line-height: 11.5px;
    text-align: center;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px 4px 10px;
  }
}
</style>
