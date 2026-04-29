<script setup>
import { computed, getCurrentInstance } from 'vue';
import BaseClearButton from '@/components/Common/BaseClearButton.vue';
import { useEurojackpot } from '@/composables/useEurojackpot';

const props = defineProps({
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
});

const emit = defineEmits(['select', 'delete']);

const { isActiveDrawExtra } = useEurojackpot();

const instance = getCurrentInstance();
const t = (key, params) => instance?.proxy?.$t(key, params) ?? key;

const mainNumbers = computed(() => props.board.panels[0].selection);
const euroNumbers = computed(() => props.board.panels[1].selection);

const selectionClass = computed(() => {
  if (props.selected) {
    return 'eurojackpot-selections--selected';
  }
  return isActiveDrawExtra.value ? 'eurojackpot-selections--unselected-extra' : 'eurojackpot-selections--unselected';
});

const isDeleteDisabled = computed(() => {
  return props.board.isEmpty() && props.index === 0;
});

const handleDelete = () => {
  emit('delete');
};
</script>

<template>
  <div :id="`ejp-selections-${index}`" :class="['eurojackpot-selections', selectionClass]" @click="emit('select')">
    <div class="eurojackpot-selections__wrapper">
      <div class="eurojackpot-selections__header">
        <div>
          {{ t('eurojackpot.amount') }}: <span class="eurojackpot-selections__header-cost">{{ cost }}&euro;</span>
        </div>
        <div v-if="board.systemId" class="eurojackpot-selections__header-system">
          {{ t('eurojackpot.systemLabel', { system: board.systemId }) }}
        </div>
      </div>
      <div class="eurojackpot-selections__content">
        <div class="eurojackpot-selections__numbers">
          <span
            v-for="(mainNumber, idx) in mainNumbers"
            :key="`selection-main-number-${idx}`"
            class="eurojackpot-selections__number eurojackpot-selections__number--main">
            {{ mainNumber }}
          </span>
          <span v-if="euroNumbers.length > 0" class="eurojackpot-selections__star">&star;</span>
          <span
            v-for="(euroNumber, idx) in euroNumbers"
            :key="`selection-euro-number-${idx}`"
            class="eurojackpot-selections__number eurojackpot-selections__number--euro">
            {{ euroNumber }}
          </span>
        </div>
        <div class="eurojackpot-selections__delete">
          <BaseClearButton
            :id="`ejp-selections-delete-${index}`"
            theme="yellow"
            :disabled="isDeleteDisabled"
            @click="handleDelete" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-selections {
  @apply atw:w-full atw:flex atw:items-end atw:cursor-pointer;
  border: 2px solid var(--ejp-color-button-main);
  border-radius: 10px;
}

.eurojackpot-selections--selected {
  background: var(--ejp-gradient-dark);
}

.eurojackpot-selections--unselected {
  @apply atw:bg-transparent;
}

.eurojackpot-selections--unselected-extra {
  background: #2c2718cc;
}

.eurojackpot-selections__wrapper {
  @apply atw:flex atw:flex-col atw:grow;
}

.eurojackpot-selections__header {
  @apply atw:flex atw:flex-row atw:justify-between atw:text-white;
  padding: 8px 8px 0 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
}

.eurojackpot-selections__header-cost {
  @apply atw:font-bold;
}

.eurojackpot-selections__header-system {
  @apply atw:font-bold;
}

.eurojackpot-selections__content {
  @apply atw:flex atw:flex-row;
}

.eurojackpot-selections__numbers {
  @apply atw:flex atw:items-center atw:flex-wrap atw:flex-1;
  margin-top: 15px;
  margin-bottom: 4px;
  padding: 0 8px 8px 8px;
  gap: 4px;
  min-height: 30px;
}

.eurojackpot-selections__number {
  @apply atw:flex atw:justify-center atw:items-center atw:p-0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: var(--ejp-color-secondary-black);
  font-weight: 700;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  margin-right: 4px;
  margin-bottom: 4px;
}

.eurojackpot-selections__number--main {
  background-color: var(--ejp-color-button-main);
}

.eurojackpot-selections__number--euro {
  background-color: var(--ejp-color-button-euro);
}

.eurojackpot-selections__star {
  font-size: 30px;
  line-height: 1;
  color: var(--ejp-color-button-euro);
}

.eurojackpot-selections__delete {
  @apply atw:flex atw:items-end;
}

.eurojackpot-selections__delete :deep(.base-clear-button__btn) {
  margin-right: 4px;
  margin-bottom: 8px;
}
</style>
