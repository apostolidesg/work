<script setup>
import { computed } from 'vue';
import symbolIcon from '@/assets/powerspin/symbol.svg';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const itemStyle = computed(() => {
  return props.type === 'symbol-board' ? { backgroundImage: `url(${symbolIcon})` } : {};
});
</script>

<template>
  <div
    class="powerspin-sidescreen-selection-item"
    :class="`powerspin-sidescreen-selection-item__${type}`"
    :style="itemStyle">
    <slot />
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.powerspin-sidescreen-selection-item {
  margin: 2px;
}

.powerspin-sidescreen-selection-item__simple-number-board-red,
.powerspin-sidescreen-selection-item__simple-number-board-green,
.powerspin-sidescreen-selection-item__simple-number-board-blue {
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

.powerspin-sidescreen-selection-item__simple-number-board-red {
  background: #e2091c;
}

.powerspin-sidescreen-selection-item__simple-number-board-green {
  background: #019642;
}

.powerspin-sidescreen-selection-item__simple-number-board-blue {
  background: #01509f;
}

.powerspin-sidescreen-selection-item__under-board,
.powerspin-sidescreen-selection-item__over-board {
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

.powerspin-sidescreen-selection-item__under-board {
  background: #ffffff;
  border: 2px solid #faad29;
  color: #333e45;
  padding-top: 2px;
}

.powerspin-sidescreen-selection-item__over-board {
  background: #333e45;
  border: 2px solid #333e45;
  color: #faad29;
  padding-top: 2px;
}

.powerspin-sidescreen-selection-item__color-board-red,
.powerspin-sidescreen-selection-item__color-board-green,
.powerspin-sidescreen-selection-item__color-board-blue {
  font-weight: 600;
  font-size: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  padding: 4px 20px;
  color: #ffffff;
  border-radius: 50px;
}

.powerspin-sidescreen-selection-item__color-board-red {
  background: #e2091c;
}

.powerspin-sidescreen-selection-item__color-board-green {
  background: #009641;
}

.powerspin-sidescreen-selection-item__color-board-blue {
  background: #01509f;
}

.powerspin-sidescreen-selection-item__symbol-board {
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  align-content: center;
  text-align: center;
  width: 25px;
  height: 25px;
}

.powerspin-sidescreen-selection-item__markets-board {
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
  padding: 4px 10px;
}
</style>
