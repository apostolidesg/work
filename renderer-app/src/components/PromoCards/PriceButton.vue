<script setup>
import { computed } from 'vue';
import { PRICE_BUTTON_STYLES, PROMO_CARDS_CONFIG } from '../../config/promoCardsConfig';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';
import { useConfigText } from '../../composables/useConfigText';
import { useModalService } from '@/composables/useModalService';
import QuickPlayModal from './QuickPlayModal/QuickPlayModal.vue';

const props = defineProps({
  label: {
    type: [Number, String],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  columns: {
    type: Number,
    default: 1,
  },
  index: {
    type: Number,
    default: 0,
  },
  orientation: {
    type: String,
    default: 'HORIZONTAL',
  },
  gameType: {
    type: String,
    required: true,
    validator: (v) => typeof v === 'string' && v.length > 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  fluid: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'landscape'].includes(v),
  },
  backgroundImage: {
    type: String,
    default: '',
  },
  borderColor: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '',
  },
  hideLabelInDescription: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['select']);
const { tConfig } = useConfigText();
const { open, close } = useModalService();

const QUICKPLAY_GAME_TYPES = ['tzoker', 'eurojackpot'];
const isQuickPlayGame = computed(() => QUICKPLAY_GAME_TYPES.includes(props.gameType?.toLowerCase()));

const tzokerValue = computed(() => {
  const val = tConfig(
    `${props.orientation.toUpperCase()}.JACKPOT_GAMES_AREA.${props.gameType.toUpperCase()}.READY_BETSLIPS.BETSLIP_${props.index + 1}.tzoker`
  );
  const num = Number(val);
  return Number.isFinite(num) ? num : null;
});

const styles = computed(() => {
  return PRICE_BUTTON_STYLES[props.gameType] || PRICE_BUTTON_STYLES.tzoker;
});

const gameConfig = computed(() => {
  return PROMO_CARDS_CONFIG.styles.priceButton[props.gameType] || PROMO_CARDS_CONFIG.styles.priceButton.tzoker;
});

const sizeClasses = computed(() => {
  if (props.fluid) {
    return 'atw:flex-1 atw:min-w-0';
  }
  if (props.compact) {
    return 'atw:w-[clamp(110px,30vw,130px)] atw:h-[8.75rem]';
  }
  return 'atw:w-[clamp(150px,40vw,250px)] atw:h-[8.75rem]';
});

const outerStyle = computed(() => {
  const background =
    props.backgroundImage ||
    gameConfig.value.background ||
    'linear-gradient(45deg, rgb(244, 190, 62), rgb(245, 230, 129), rgb(244, 190, 62), rgb(255, 220, 100))';
  const border = props.borderColor || gameConfig.value.border || 'rgb(35, 162, 220)';
  const color = props.textColor || gameConfig.value.textColor || 'rgb(0, 0, 0)';

  return {
    backgroundImage: background,
    backgroundSize: '200% 200%',
    borderColor: border,
    color: color,
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    animation: 'gradientShift 3s ease infinite',
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    pointerEvents: props.disabled ? 'none' : 'auto',
    padding: '0.5rem',
  };
});

const descriptionStyle = computed(() => ({
  color:
    props.variant === 'landscape' && props.textColor ? props.textColor : styles.value?.descriptionColor || '#000000',
}));

const buttonText = computed(() =>
  tConfig(
    `${props.orientation.toUpperCase()}.JACKPOT_GAMES_AREA.${props.gameType.toUpperCase()}.READY_BETSLIPS.BETSLIP_${props.index + 1}.text`
  )
);

const ariaLabel = computed(() => {
  return `Select ${buttonText.value} for ${props.amount}€`;
});

const labelStyle = computed(() => {
  if (props.variant === 'landscape') {
    return {
      color: props.textColor || styles.value?.descriptionColor || '#000000',
      background: 'none',
      WebkitBackgroundClip: 'initial',
      WebkitTextFillColor: 'currentColor',
      backgroundClip: 'initial',
      filter: 'none',
    };
  }

  return {
    background: styles.value?.textGradient || PROMO_CARDS_CONFIG.styles.priceButton.label.background,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: styles.value?.textShadow || PROMO_CARDS_CONFIG.styles.priceButton.label.filter,
  };
});

const handleClick = () => {
  if (props.disabled) return;

  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_PRICE_BUTTON_CLICKED, {
    game_type: props.gameType,
    amount: props.amount,
    columns: props.columns,
  });

  if (isQuickPlayGame.value) {
    open(QuickPlayModal, {
      gameType: props.gameType,
      amount: props.amount,
      columns: props.columns,
      index: props.index,
      orientation: props.orientation,
      tzoker: tzokerValue.value,
    });
  }
};
</script>

<template>
  <button
    type="button"
    class="atw:rounded-2xl atw:transition-opacity atw:border-2 atw:p-[2px] atw:min-w-0 atw:min-h-[8.75rem] atw:portrait:w-[min(42vw,220px)] atw:portrait:h-[clamp(110px,18vh,140px)]"
    :class="[
      sizeClasses,
      disabled
        ? 'atw:cursor-not-allowed atw:pointer-events-none atw:opacity-50'
        : 'atw:cursor-pointer hover:atw:opacity-90',
    ]"
    :style="outerStyle"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :aria-haspopup="isQuickPlayGame ? 'dialog' : undefined"
    :aria-disabled="disabled"
    @click="handleClick">
    <div
      class="atw:rounded-[14px] atw:w-full atw:h-full atw:flex atw:flex-col atw:items-center atw:justify-center atw:bg-transparent">
      <span
        class="atw:block atw:w-full atw:text-center atw:text-[16px] atw:font-bold atw:leading-[1.2] atw:mb-0 atw:portrait:text-[16px] atw:portrait:leading-[1.1] atw:portrait:whitespace-normal atw:break-words atw:portrait:w-[150%] atw:portrait:mx-[-25%] atw:portrait:max-w-none"
        :style="descriptionStyle">
        {{ buttonText }}
      </span>
      <span
        class="atw:font-bold atw:leading-[84px] atw:portrait:text-[clamp(36px,9vw,56px)] atw:portrait:leading-[1.05]"
        :class="compact ? 'atw:text-5xl' : 'atw:text-[65px]'"
        :style="labelStyle">
        {{ amount }}€
      </span>
    </div>
  </button>
</template>

<style scoped>
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
