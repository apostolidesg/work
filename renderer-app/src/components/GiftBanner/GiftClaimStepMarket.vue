<template>
  <div class="atw:w-full atw:space-y-8">
    <div class="atw:flex atw:flex-col atw:items-center atw:gap-4">
      <img
        :src="powerSpinSrc"
        alt="Powerspin logo"
        class="atw:h-20 atw:w-auto atw:object-contain atw:drop-shadow-md"
        loading="lazy"
        decoding="async" />
      <h2 class="atw:text-3xl atw:font-bold atw:text-gray-900">
        {{ $t('youHaveWon') }} {{ formatCurrency(betAmount) }} {{ $t('forA') }} Powerspin
      </h2>
      <p class="atw:text-lg atw:font-medium atw:text-gray-600">{{ $t('selectAMarketToPlay') }}</p>
    </div>
    <div class="atw:grid atw:w-full atw:gap-4 atw:md:grid-cols-3">
      <MarketOptionButton
        v-for="option in marketOptions"
        :key="option.id"
        :option="option"
        :selected="selectedMarket === option.id"
        :symbol-src="symbolSrc"
        @select="$emit('select-market', option.id)" />
    </div>
    <PrimaryButton variant="success" size="lg" class="atw:w-full" :disabled="!selectedMarket" @click="$emit('play')">
      {{ $t('playFor') }} {{ formatCurrency(betAmount) }}
    </PrimaryButton>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import PrimaryButton from '../base/PrimaryButton.vue';
import MarketOptionButton from './MarketOptionButton.vue';
import { useCurrency } from '../../composables/useCurrency';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

onMounted(() => {
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_GIFT_CLAIM_STEP_CLAIM_OPENED_STEP, {
    page_name: 'gift_claim_modal',
    step_name: 'market_selection',
  });
});

defineProps({
  powerSpinSrc: {
    type: String,
    required: true,
  },
  symbolSrc: {
    type: String,
    required: true,
  },
  marketOptions: {
    type: Array,
    required: true,
  },
  selectedMarket: {
    type: String,
    default: null,
  },
  betAmount: {
    type: Number,
    required: true,
  },
});
defineEmits(['select-market', 'play']);
const { formatSimple: formatCurrency } = useCurrency();
</script>
