<script setup>
import { computed, useSlots } from 'vue';
import SidescreenLayout from './SidescreenLayout.vue';
import ConsecutiveDraws from './ConsecutiveDraws.vue';
import SubmitWagerButton from './SubmitWagerButton.vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (value) => ['light', 'dark'].includes(value),
  },
  betslipCost: {
    type: Number,
    default: 0,
  },
  isBetslipValid: {
    type: Boolean,
    default: false,
  },
  maxConsecutiveDraws: {
    type: Number,
    default: 52,
  },
  consecutiveDraws: {
    type: Number,
    default: 1,
  },
  isActiveDrawExtra: {
    type: Boolean,
    default: false,
  },
  gameType: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['submit', 'update:consecutiveDraws']);

const slots = useSlots();

const hasHeader = computed(() => !!slots.header);
const hasStatic = computed(() => !!slots.static);

const handleConsecutiveDrawsChange = (value) => {
  emit('update:consecutiveDraws', value);
};

const handleSubmit = () => {
  emit('submit');
};
</script>

<template>
  <div class="base-sidescreen">
    <SidescreenLayout :theme="theme" :is-active-draw-extra="isActiveDrawExtra" :game-type="gameType">
      <template v-if="hasHeader" #header>
        <slot name="header"></slot>
      </template>

      <template #default>
        <slot></slot>
      </template>

      <template v-if="hasStatic" #static>
        <slot name="static"></slot>
      </template>

      <template #footer>
        <ConsecutiveDraws
          :model-value="consecutiveDraws"
          :theme="theme"
          :max="maxConsecutiveDraws"
          class="base-sidescreen__consecutive-draws"
          @update:model-value="handleConsecutiveDrawsChange" />
        <SubmitWagerButton :cost="betslipCost" :disabled="!isBetslipValid" @click="handleSubmit" />
      </template>
    </SidescreenLayout>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.base-sidescreen {
  @apply atw:h-full;
}

.base-sidescreen__consecutive-draws {
  @apply atw:mb-4;
}
</style>
