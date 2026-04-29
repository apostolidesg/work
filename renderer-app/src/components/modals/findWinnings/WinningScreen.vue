<script setup>
import { computed } from 'vue';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import Constants from '@/util/Constants';
import { useOrientation } from '@/composables/useOrientation';
import { FW_LOADING_CONFIG, FW_SPINNER_CONFIG } from '@/config/loaderConfigs';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const GAME_TYPES = ['POWERSPIN', 'KINO', 'EUROJACKPOT', 'FIREBLAZE', 'TZOKER'];

const props = defineProps({
  getNetAmount: {
    type: String,
    default: '0',
  },
  getGrossAmount: {
    type: String,
    default: '0',
  },
  getTaxAmount: {
    type: String,
    default: '0',
  },
  hasFutureDraws: Boolean,
  isSpecialWinnings: Boolean,
  isHighWinnings: Boolean,
  isPrinterAvailable: Boolean,
  canRollover: Boolean,
  isRolloverAvailable: Boolean,
  isRolloverAndReplayAvailable: Boolean,
  canReplay: Boolean,
  loadingDrawInfo: Boolean,
  showTimeLeftToEnterTimeFrame: Boolean,
  timeLeftToEnterTimeFrame: {
    type: String,
    default: '0',
  },
  shouldEnableCountdownComponent: Boolean,
  isRolloverAndInsertBetslipToSessionAvailable: Boolean,
  isInsertBetslipToSessionButtonDisabled: Boolean,
  shouldDisplayButtons: Boolean,
  loading: Boolean,
  isSystem: Boolean,
  gameType: {
    type: String,
    default: 'DEFAULT',
  },
});

defineEmits(['close', 'rollover', 'rolloverAndReplay', 'replay', 'rolloverAddTicketToBucket']);

const { isVertical } = useOrientation();

const showButtons = computed(() => props.shouldDisplayButtons && !props.loading);

const showAddTobucketToast = computed(() => {
  return props.isPrinterAvailable && (props.loadingDrawInfo || props.showTimeLeftToEnterTimeFrame);
});

const isHighOrSpecialWinnings = computed(() => {
  return props.isHighWinnings || props.isSpecialWinnings;
});

const highOrSpecialWinningsText = computed(() => {
  return props.isSpecialWinnings
    ? Constants.FIND_WINNINGS.MESSAGES.SPECIAL_WIN
    : Constants.FIND_WINNINGS.MESSAGES.HIGH_WIN;
});

const validSSBTGameType = computed(() => {
  return GAME_TYPES.includes(props.gameType) ? props.gameType : 'DEFAULT';
});
</script>
<template>
  <section>
    <div class="fwCloseButtonRow">
      <button
        type="button"
        class="fwCloseButton"
        :class="`fwCloseButton--${validSSBTGameType}`"
        @click="$emit('close')"></button>
    </div>
    <h3 :class="`find-winnings-header--${validSSBTGameType}`">{{ $t('findWinnings.header.WON') }}</h3>
    <template v-if="!isSpecialWinnings">
      <h2 :class="`winnings-amount__title--${validSSBTGameType}`">{{ $t('findWinnings.totalWon') }}</h2>
      <div class="winnings-amount" :class="`winnings-amount--${validSSBTGameType}`">{{ getNetAmount }} &euro;</div>
      <div class="outer">
        <div class="winnings-amounts" :class="`winnings-amounts__${validSSBTGameType}`">
          <div :class="`winnings-amounts__${validSSBTGameType}--gross`">
            <span> {{ $t('findWinnings.gross') }}</span>
            <div>{{ getGrossAmount }} &euro;</div>
          </div>
          <div :class="`winnings-amounts__${validSSBTGameType}--tax`">
            <span> {{ $t('findWinnings.tax') }}</span>
            <div>{{ getTaxAmount }} &euro;</div>
          </div>
        </div>
      </div>
    </template>
    <div v-if="hasFutureDraws" class="winnings-amount__future-draws">
      {{ $t('findWinnings.futureDraws') }}
    </div>
    <div v-if="isHighOrSpecialWinnings" class="winnings-amount__special-winnings">
      {{ $t(highOrSpecialWinningsText) }}
    </div>
    <div v-if="!isPrinterAvailable && canRollover">
      {{ $t('findWinnings.rolloverPrinterError') }}
    </div>
    <div v-if="isSystem">{{ $t('kinoSystemMessage') }}</div>
    <Loading :active="loading" v-bind="FW_LOADING_CONFIG" class="atw:relative!" />
    <div v-if="showButtons" class="ctas">
      <div class="ctas__secondary">
        <button
          v-if="isRolloverAvailable"
          type="button"
          class="winnings-amount__button"
          :class="`winnings-amount__button--${validSSBTGameType}`"
          :disabled="!isPrinterAvailable"
          @click="$emit('rollover')">
          {{ $t('rollover') }}
        </button>
        <button
          v-if="isRolloverAndReplayAvailable"
          type="button"
          class="winnings-amount__button"
          :class="`winnings-amount__button--${validSSBTGameType}`"
          :disabled="!isPrinterAvailable"
          @click="$emit('rolloverAndReplay')">
          {{ $t('rolloverAndReplay') }}
        </button>
        <button
          v-if="!isRolloverAvailable && !isRolloverAndReplayAvailable && canReplay && !isVertical"
          type="button"
          class="winnings-amount__button"
          :class="`winnings-amount__button--${validSSBTGameType}`"
          :disabled="!isPrinterAvailable"
          @click="$emit('replay')">
          {{ $t('replayWager') }}
        </button>
      </div>
      <div v-if="isRolloverAndInsertBetslipToSessionAvailable" class="ctas__primary">
        <div v-if="showAddTobucketToast" class="add-to-bucket__toast">
          <template v-if="loadingDrawInfo">{{ $t('searchingCurrentDrawInfo') }}</template>
          <template v-if="showTimeLeftToEnterTimeFrame">
            <div class="add-to-bucket__toast-time-message">
              <div class="add-to-bucket__toast-time-message--left">{{ $t('addBetslipToSessionAvailableIn') }}</div>
              <div class="add-to-bucket__toast-time-message--right">{{ timeLeftToEnterTimeFrame }}</div>
            </div>
          </template>
          <FontAwesomeIcon class="add-to-bucket__toast-arrow" :icon="faSortDown" />
        </div>
        <button
          type="button"
          class="winnings-amount__button winnings-amount__button--primary"
          :disabled="isInsertBetslipToSessionButtonDisabled"
          @click="$emit('rolloverAddTicketToBucket')">
          <Loading class="atw:p-2" :active="loadingDrawInfo" v-bind="FW_SPINNER_CONFIG" />
          {{ $t('addWagerToSession') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.fwCloseButtonRow {
  @apply atw:relative atw:p-[15px] atw:h-[33px] atw:w-full;
}

.fwCloseButton {
  @apply atw:absolute atw:w-10 atw:h-[43px] atw:border-0 atw:cursor-pointer atw:z-99 atw:m-0 atw:-mt-2.5 atw:p-px atw:right-[0.3em] atw:align-top;
}

.fwCloseButton--POWERSPIN {
  background: url('../../../assets/close-white.png') transparent no-repeat center;
  background-size: 27px;
}

.fwCloseButton--KINO {
  background: url('../../../assets/close-black.png') center transparent no-repeat;
  background-size: 27px;
}

.fwCloseButton--EUROJACKPOT {
  background: url('../../../assets/close-yellow.png') transparent no-repeat center;
  background-size: 27px;
}

.fwCloseButton--FIREBLAZE {
  background: url('../../../assets/close-white.png') transparent no-repeat center;
  background-size: 27px;
}

.fwCloseButton--TZOKER {
  background: url('../../../assets/close-white.png') transparent no-repeat center;
  background-size: 27px;
}

.fwCloseButton--DEFAULT {
  background: url('../../../assets/close-white.png') transparent no-repeat center;
  background-size: 27px;
}

.find-winnings-header--KINO {
  @apply atw:text-[2.6rem] atw:font-bold;
  text-decoration: solid;
  -webkit-text-stroke: 1.3px white;
  text-shadow: 0px 0px 6px #000;
}

.find-winnings-header--DEFAULT,
.find-winnings-header--POWERSPIN,
.find-winnings-header--FIREBLAZE,
.find-winnings-header--TZOKER {
  @apply atw:text-[2.6rem] atw:font-bold atw:leading-[2.3rem];
}

.find-winnings-header--EUROJACKPOT {
  @apply atw:text-[1.9rem] atw:font-bold atw:leading-[2.2rem];
}

.winnings-amount {
  @apply atw:pb-5 atw:font-black;
}

.winnings-amount--DEFAULT,
.winnings-amount--POWERSPIN,
.winnings-amount--FIREBLAZE,
.winnings-amount--TZOKER {
  @apply atw:leading-[3.7rem] atw:text-[3.3rem];
}

.winnings-amount--KINO {
  @apply atw:leading-20 atw:text-[4.5rem] atw:tracking-[-5px];
  -webkit-text-stroke: 1.5px white;
  text-shadow: 0px 0px 7px #000;
}

.winnings-amount--EUROJACKPOT {
  @apply atw:leading-[3.7rem] atw:font-bold atw:text-[3.1rem];
}

.outer {
  @apply atw:flex atw:justify-center atw:items-center;
}

.winnings-amounts {
  @apply atw:flex atw:justify-around atw:items-center atw:py-[7px] atw:font-bold atw:rounded-[5px];
}

.winnings-amounts__KINO {
  background: #ffffff30;
}

.winnings-amounts__KINO--gross,
.winnings-amounts__KINO--tax {
  @apply atw:px-[30px];
}

.winnings-amounts__KINO--gross {
  @apply atw:border-r-2 atw:border-r-[#af9544];
}

.winnings-amounts__KINO--gross > div,
.winnings-amounts__KINO--tax > div {
  @apply atw:pt-2.5 atw:text-[2rem] atw:leading-8;
}

.winnings-amounts__DEFAULT,
.winnings-amounts__POWERSPIN,
.winnings-amounts__FIREBLAZE,
.winnings-amounts__TZOKER {
  @apply atw:w-full atw:justify-center;
}

.winnings-amounts__DEFAULT--gross,
.winnings-amounts__DEFAULT--tax,
.winnings-amounts__POWERSPIN--gross,
.winnings-amounts__POWERSPIN--tax,
.winnings-amounts__FIREBLAZE--gross,
.winnings-amounts__FIREBLAZE--tax,
.winnings-amounts__TZOKER--gross,
.winnings-amounts__TZOKER--tax {
  @apply atw:border atw:border-white atw:bg-powerspin atw:py-2.5 atw:px-[30px] atw:mr-2.5 atw:w-[230px];
  border-radius: inherit;
}

.winnings-amounts__DEFAULT--gross span,
.winnings-amounts__DEFAULT--tax span,
.winnings-amounts__POWERSPIN--gross span,
.winnings-amounts__POWERSPIN--tax span,
.winnings-amounts__FIREBLAZE--gross span,
.winnings-amounts__FIREBLAZE--tax span,
.winnings-amounts__TZOKER--gross span,
.winnings-amounts__TZOKER--tax span {
  @apply atw:font-normal atw:tracking-[2px];
}

.winnings-amounts__DEFAULT--gross div,
.winnings-amounts__DEFAULT--tax div,
.winnings-amounts__POWERSPIN--gross div,
.winnings-amounts__POWERSPIN--tax div,
.winnings-amounts__FIREBLAZE--gross div,
.winnings-amounts__FIREBLAZE--tax div,
.winnings-amounts__TZOKER--gross div,
.winnings-amounts__TZOKER--tax div {
  @apply atw:pt-2.5 atw:text-[2rem] atw:leading-8;
}

.winnings-amounts__EUROJACKPOT {
  @apply atw:w-full atw:justify-center;
}

.winnings-amounts__EUROJACKPOT--gross,
.winnings-amounts__EUROJACKPOT--tax {
  @apply atw:rounded-[10px] atw:bg-transparent atw:border atw:border-white atw:mr-2.5 atw:p-[5px] atw:w-[180px];
}

.winnings-amounts__EUROJACKPOT--gross span,
.winnings-amounts__EUROJACKPOT--tax span {
  @apply atw:font-normal atw:leading-3.5 atw:text-base;
}

.winnings-amounts__EUROJACKPOT--gross div,
.winnings-amounts__EUROJACKPOT--tax div {
  @apply atw:text-[1.5rem] atw:font-extrabold;
}

.winnings-amount__title--KINO {
  @apply atw:text-[1.5rem] atw:py-[15px] atw:font-bold;
}

.winnings-amount__title--DEFAULT,
.winnings-amount__title--POWERSPIN,
.winnings-amount__title--FIREBLAZE,
.winnings-amount__title--TZOKER {
  @apply atw:py-[15px] atw:text-[1.5rem] atw:font-normal atw:leading-[18px] atw:tracking-[1px];
}

.winnings-amount__title--EUROJACKPOT {
  @apply atw:text-base atw:py-[15px] atw:font-normal;
}

.winnings-amount__future-draws,
.winnings-amount__special-winnings {
  @apply atw:-mx-4 atw:my-[15px] atw:p-2.5 atw:text-[1.2rem] atw:font-bold;
  background: #ffffff30;
}

.winnings-amount__button {
  @apply atw:bg-transparent atw:border-2 atw:rounded-[5px] atw:py-[15px] atw:px-2.5 atw:font-bold atw:m-0.5 atw:relative;
}

.winnings-amount__button--DEFAULT,
.winnings-amount__button--POWERSPIN,
.winnings-amount__button--FIREBLAZE,
.winnings-amount__button--TZOKER {
  @apply atw:border-white atw:text-white atw:font-normal;
}

.winnings-amount__button--EUROJACKPOT {
  @apply atw:border-2 atw:border-[#fae291] atw:text-white atw:font-normal atw:text-[0.9rem] atw:rounded-[10px];
  background: linear-gradient(180deg, #000000 10.22%, #2e2c21 78.25%), linear-gradient(0deg, #fae291, #fae291);
}

.ctas {
  @apply atw:flex atw:justify-between atw:pt-[45px] atw:pr-[15px] atw:pb-2.5 atw:pl-[15px];
}

.ctas__secondary button:disabled {
  @apply atw:opacity-70;
}

.ctas__primary {
  @apply atw:text-right atw:relative;
}

.add-to-bucket__toast {
  @apply atw:absolute atw:right-0 atw:bottom-[65px] atw:w-[260px] atw:rounded-[5px] atw:p-[5px] atw:text-center atw:text-white atw:text-[0.8rem] atw:z-1 atw:bg-[#08658e];
}

.add-to-bucket__toast-arrow {
  @apply atw:absolute atw:right-[3px] atw:-bottom-2.5 atw:text-[2rem] atw:text-[#08658e];
}

.add-to-bucket__toast-time-message {
  @apply atw:flex atw:flex-row atw:items-center atw:justify-center atw:flex-nowrap;
}

.add-to-bucket__toast-time-message--left {
  @apply atw:text-left atw:flex-2 atw:leading-4;
}

.add-to-bucket__toast-time-message--right {
  @apply atw:flex-1 atw:text-[1.4rem];
}

.winnings-amount__button--primary {
  @apply atw:bg-black atw:text-white atw:w-[65%] atw:py-[3px] atw:px-2.5;
}

.winnings-amount__button--primary:disabled {
  @apply atw:bg-[#ccc];
}
</style>
