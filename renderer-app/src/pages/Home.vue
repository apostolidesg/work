<template>
  <div class="atw:h-full atw:w-full atw:portrait:p-6 atw:landscape:p-0 atw:box-border">
    <PromoCards v-if="isEasyMode" class="atw:h-full atw:w-full" @open-slip-modal="handleOpenSlipModal" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PromoCards from '../components/PromoCards/PromoCards.vue';

const route = useRoute();
const isEasyMode = computed(() => route.name.startsWith('easy'));

const handleOpenSlipModal = (amount, columns) => {
  console.log('Opening slip modal with:', { amount, columns });
  // TODO: Implement slip modal logic
};
</script>
