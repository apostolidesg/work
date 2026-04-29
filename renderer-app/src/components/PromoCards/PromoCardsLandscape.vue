<script setup>
import { ref, computed, watch } from 'vue';
import PromoCardsLandscapePanel from './PromoCardsLandscapePanel.vue';
import { useConfigText } from '../../composables/useConfigText';

const props = defineProps({
  games: {
    type: Array,
    required: true,
  },
  wheelSrc: {
    type: String,
    default: '',
  },
  fallbackWheelSrc: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['select-slip', 'select-numbers']);

const { tConfig } = useConfigText();

const activeTab = ref('tzoker');
const hasUserSelectedTab = ref(false);

const tabs = computed(() => props.games.map((game) => game.id));

const gamesById = computed(() => Object.fromEntries(props.games.map((game) => [game.id, game])));

const activeLandscapeGame = computed(() => {
  if (props.games.length === 0) return null;
  return gamesById.value[activeTab.value] || props.games[0];
});

const setActiveTab = (tabId) => {
  hasUserSelectedTab.value = true;
  activeTab.value = tabId;
};

watch(
  tabs,
  (newTabs) => {
    if (!newTabs.length) return;
    if (!hasUserSelectedTab.value) {
      activeTab.value = newTabs[0];
      return;
    }
    if (!newTabs.includes(activeTab.value)) {
      activeTab.value = newTabs[0];
    }
  },
  { immediate: true }
);

const handleSlipSelection = (amount, columns) => {
  emit('select-slip', amount, columns);
};

const handleNumberSelection = (amount) => {
  emit('select-numbers', amount);
};
</script>

<template>
  <PromoCardsLandscapePanel
    :tabs="games"
    :active-tab="activeTab"
    :active-game="activeLandscapeGame"
    :title="tConfig('promo.promotionalText')"
    :wheel-src="wheelSrc"
    :fallback-wheel-src="fallbackWheelSrc"
    @select-tab="setActiveTab"
    @select-slip="handleSlipSelection"
    @select-numbers="handleNumberSelection" />
</template>

<style scoped></style>
