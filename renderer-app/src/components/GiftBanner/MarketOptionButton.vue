<template>
  <div class="atw:flex atw:flex-col atw:items-center atw:flex-1">
    <button
      type="button"
      class="atw:group atw:relative atw:w-full atw:overflow-hidden atw:rounded-2xl atw:py-6 atw:transition-all"
      :style="buttonStyle"
      :aria-pressed="selected"
      @click="handleSelect">
      <div class="atw:flex atw:flex-col atw:items-center atw:gap-2">
        <div
          class="atw:flex atw:h-12 atw:w-12 atw:items-center atw:justify-center atw:rounded-full"
          :style="iconContainerStyle">
          <template v-if="option.id === 'color'">
            <div class="atw:flex atw:gap-1">
              <div class="atw:h-2 atw:w-2 atw:rounded-full atw:bg-red-500" />
              <div class="atw:h-2 atw:w-2 atw:rounded-full atw:bg-green-500" />
              <div class="atw:h-2 atw:w-2 atw:rounded-full atw:bg-blue-500" />
            </div>
          </template>
          <template v-else-if="option.id === 'number'">
            <span class="atw:text-xl atw:font-bold atw:text-white">1-24</span>
          </template>
          <template v-else-if="option.id === 'symbol'">
            <img
              :src="symbolSrc"
              alt="Symbol market"
              class="atw:h-12 atw:w-12 atw:object-contain"
              loading="lazy"
              decoding="async" />
          </template>
        </div>
        <span :style="labelStyle">{{ $t(option.label) }}</span>
      </div>
    </button>
    <p :style="payoutStyle">{{ $t('win') }} {{ option.payout }}</p>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';
const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  symbolSrc: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['select']);
const colors = {
  text: '#1F2937',
};
const gradients = {
  color: {
    active: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
    icon: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
    border: '#22C55E',
    shadow: '0 8px 24px rgba(34, 197, 94, 0.4)',
    payoutColor: '#22C55E',
  },
  number: {
    active: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    icon: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    border: '#EF4444',
    shadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
    payoutColor: '#EF4444',
  },
  symbol: {
    active: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    icon: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    border: '#3B82F6',
    shadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
    payoutColor: '#3B82F6',
  },
};
const currentGradient = computed(() => gradients[props.option.id]);
const buttonStyle = computed(() => ({
  background: props.selected ? currentGradient.value.active : 'transparent',
  border: `3px solid ${props.selected ? currentGradient.value.border : '#E0E0E0'}`,
  fontSize: '20px',
  fontWeight: '700',
  color: props.selected ? '#FFFFFF' : colors.text,
  boxShadow: props.selected ? currentGradient.value.shadow : 'none',
}));
const iconContainerStyle = computed(() => ({
  background: props.selected ? 'rgba(255, 255, 255, 0.2)' : currentGradient.value.icon,
}));
const labelStyle = computed(() => ({
  fontSize: '20px',
  fontWeight: '700',
  color: props.selected ? '#FFFFFF' : colors.text,
}));
const payoutStyle = computed(() => ({
  fontSize: '16px',
  fontWeight: '600',
  color: currentGradient.value.payoutColor,
  marginTop: '12px',
  textAlign: 'center',
}));

const handleSelect = () => {
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_MARKET_OPTION_CLICKED, {
    market_type: props.option.id,
    market_label: props.option.label,
    payout: props.option.payout,
    was_selected: props.selected,
  });
  emit('select');
};
</script>
