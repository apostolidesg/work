<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import EventSenderService from '@/util/handler/EventSenderService';
import EventTypes from '@/util/handler/EventTypes';
import Constants from '@/util/Constants';
import { to } from '@/util/configLoader';
import { logToMainProcess } from '@/util/LoggerService';
import EventBusTypes from '@/constants/EventBusTypes';
import { useRouter, useRoute } from 'vue-router';
import { usePlayerSession } from '@/composables/usePlayerSession';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import WinningScreen from '@/components/modals/findWinnings/WinningScreen.vue';
import BaseModal from '@/components/modals/BaseModal.vue';
import IconButton from '@/components/base/IconButton.vue';
import PrimaryButton from '@/components/base/PrimaryButton.vue';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import emitter from '@/util/eventBus';
import Utilities from '@/util/Utilities';
import NextDrawInfoService from '@/util/NextDrawInfoService';
import TicketStatus from '@/model/TicketStatus';
import { FW_LOADING_CONFIG, FW_SPINNER_CONFIG } from '@/config/loaderConfigs';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

dayjs.extend(duration);

// TODO fix route names to match the actual routes router, route, inLobby

const GAMETYPE_TO_ROUTE = {
  [Constants.GENERAL_GAME_TYPES.KINO]: Constants.ROUTE_NAMES.KINO,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: Constants.ROUTE_NAMES.POWERSPIN,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: Constants.ROUTE_NAMES.EUROJACKPOT,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: Constants.ROUTE_NAMES.FIREBLAZE,
  [Constants.GENERAL_GAME_TYPES.TZOKER]: Constants.ROUTE_NAMES.TZOKER,
};

const GAMES_WITH_LIVE_DRAW = [Constants.GENERAL_GAME_TYPES.KINO, Constants.GENERAL_GAME_TYPES.POWERSPIN];

const GAME_TO_THEME_POSTFIX = {
  [Constants.GENERAL_GAME_TYPES.KINO]: 'kino',
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: 'powerspin',
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: 'eurojackpot',
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: 'fireblaze',
  [Constants.GENERAL_GAME_TYPES.TZOKER]: 'tzoker',
};

const ENABLE_BETSLIP_IMPORT_BEFORE_NEXT_DRAW_MILLIS = 150000;

const props = defineProps({
  prizeCheck: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

onMounted(() => {
  initFindWinnings();
  emitter.on(EventBusTypes.FIND_WINNINGS_WAGER_DETAILS, getWagerHandler);

  handleCountdownProgress();
  countdownController.value = Utilities.createDrawCountdown({
    // TODO check if the coundtown time is working as expected when submit a game is done
    getTimeToNextDraw: () => timeToNextDraw.value,
    onTick: () => {
      handleCountdownProgress();
    },
    onEnd: () => {
      finished.value = true;
      onCountDownEnd();
    },
  });

  countdownController.value.start();
});

onUnmounted(() => {
  emitter.off(EventBusTypes.FIND_WINNINGS_WAGER_DETAILS);
  clearAutoCloseFindWinningsTimer();
  initBeforeGetDrawInfo();

  if (countdownController.value) {
    countdownController.value.stop();
  }
});

const router = useRouter();
const route = useRoute();
const {
  getIsNotBetslipInSession,
  getIsActiveLiveDrawScreen,
  setNextDrawIdForImportedBetslip,
  clearNextDrawIdForImportedBetslip,
  disableLiveDrawScreen,
} = usePlayerSession();

const kinoSystemTicket_isSystem = ref(false);
const kinoSystemTicket_loading = ref(false);
const isPrinterAvailable = ref(false);
const autoCloseFindWinningsTimer = ref(null);
const isInsertBetslipToSessionInTimeFrame = ref(false);
const timeLeftToEnterTimeFrame = ref('');
const timeToNextDraw = ref(0);
const loadingDrawInfo = ref(false);
const routerName = ref('');
const finished = ref(false);
const countdownController = ref(null);
const currentGameType = ref(props.prizeCheck?.ticketStatus?.ticket?.gameType ?? '');

const scannedGameType = computed(() => currentGameType.value);

const ticketStatus = computed(() => props.prizeCheck?.ticketStatus?.ticket?.status);

const footerButtonsVisible = computed(() => {
  const status = ticketStatus.value;

  if (!status) return false;

  return (
    (Object.values(Constants.SSBT_GAME_TYPES).includes(scannedGameType.value) ||
      status === Constants.FIND_WINNINGS.TICKET_STATUS.BLOCKED ||
      status === Constants.FIND_WINNINGS.TICKET_STATUS.CANCELLED) &&
    status !== Constants.FIND_WINNINGS.TICKET_STATUS.COPY &&
    status !== Constants.FIND_WINNINGS.TICKET_STATUS.COPY_CLAIMED
  );
});

const checkAndReturnValue = (value, tier) => {
  if (tier === 'special') return '*****';

  const num = Number(value);

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const disableCountDownComponent = () => {
  timeToNextDraw.value = 0;
};

const disableIsInsertBetslipToSessionInTimeFrame = () => {
  isInsertBetslipToSessionInTimeFrame.value = false;
};

const enableIsInsertBetslipToSessionInTimeFrame = () => {
  isInsertBetslipToSessionInTimeFrame.value = true;
};

const getRemainingTimeMs = () => {
  if (!timeToNextDraw.value || !Number.isFinite(timeToNextDraw.value)) {
    return null;
  }

  return Math.max(0, timeToNextDraw.value - Date.now());
};

const checkIfInTime = ({ leftTimeMs } = {}) => {
  return leftTimeMs !== null && leftTimeMs <= ENABLE_BETSLIP_IMPORT_BEFORE_NEXT_DRAW_MILLIS;
};

const inTimeHandler = () => {
  !isInsertBetslipToSessionInTimeFrame.value && enableIsInsertBetslipToSessionInTimeFrame();
};

const calcTimeLeftToEnterTimeFrame = ({ leftTimeMs } = {}) => {
  const remainingMs = Math.max(0, leftTimeMs - ENABLE_BETSLIP_IMPORT_BEFORE_NEXT_DRAW_MILLIS);
  const totalSeconds = Math.floor(dayjs.duration(remainingMs).asSeconds());
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  timeLeftToEnterTimeFrame.value = `${minutes}:${seconds}`;
};

const handleCountdownProgress = () => {
  const leftTimeMs = getRemainingTimeMs();

  if (leftTimeMs === null) {
    disableIsInsertBetslipToSessionInTimeFrame();
    timeLeftToEnterTimeFrame.value = '';
    return;
  }

  if (checkIfInTime({ leftTimeMs })) {
    inTimeHandler();
  } else {
    calcTimeLeftToEnterTimeFrame({ leftTimeMs });
  }
};

const onCountDownEnd = () => {
  initBeforeGetDrawInfo();
};

const initBeforeGetDrawInfo = () => {
  disableCountDownComponent();
  disableIsInsertBetslipToSessionInTimeFrame();
  timeLeftToEnterTimeFrame.value = '';
};

const getDrawInfo = async () => {
  loadingDrawInfo.value = true;
  initBeforeGetDrawInfo();
  clearNextDrawIdForImportedBetslip();
  const { timeToNextDraw: timeToNextDrawValue = 0, nextDrawId = 0 } = await NextDrawInfoService.getNextDraw({
    retryConfig: { firstRequestDelay: 0, maxRetries: 2 },
    gameType: scannedGameType.value,
  });
  timeToNextDraw.value = timeToNextDrawValue;
  setNextDrawIdForImportedBetslip(nextDrawId);
  loadingDrawInfo.value = false;
};

const initFindWinnings = async () => {
  // this.$eventHub.$emit('findWinningsActive', true);  // TODO handle when findWinningsActive modal is active

  const [err, isPrinterStatusValid] = await to(
    EventSenderService.sendSyncRequest(EventTypes.PRINTER_STATUS_EVENT_TYPE)
  );
  if (!err) {
    isPrinterAvailable.value = isPrinterStatusValid;
  } else {
    logToMainProcess('SHOW_FIND_WINNINGS_ERROR', err);
  }

  routerName.value = GAMETYPE_TO_ROUTE[scannedGameType.value] || Constants.ROUTE_NAMES.LOBBY;
  triggerAutoCloseFindWinningsTimer();
  checkAndTriggerGetWager();
  isInsertBetslipToSessionAvailable.value &&
    Object.values(GAMETYPE_TO_ROUTE).includes(routerName.value) &&
    getDrawInfo();
};

const triggerAutoCloseFindWinningsTimer = () => {
  clearAutoCloseFindWinningsTimer();
  autoCloseFindWinningsTimer.value = setTimeout(closeFindWinnings, Constants.FIND_WINNINGS.AUTO_CLOSE_TIMEOUT);
};

const clearAutoCloseFindWinningsTimer = () => {
  clearTimeout(autoCloseFindWinningsTimer.value);
};

const checkAndTriggerGetWager = () => {
  footerButtonsVisible.value && isValidTicket.value && kinoSystemTicket_getWager({ wagerId: getSerialNumber.value });
};

const getWagerHandler = ({ gameType = '', kinoSystemEnabled = false } = {}) => {
  kinoSystemTicket_handler(kinoSystemEnabled);
  if (gameType === scannedGameType.value) return;
  currentGameType.value = gameType;
  routerName.value = GAMETYPE_TO_ROUTE[scannedGameType.value] || Constants.ROUTE_NAMES.LOBBY;
  isInsertBetslipToSessionAvailable.value &&
    Object.values(GAMETYPE_TO_ROUTE).includes(routerName.value) &&
    getDrawInfo();
};

const closeFindWinnings = () => {
  clearAutoCloseFindWinningsTimer();
  initBeforeGetDrawInfo();
  emit('close');
  kinoSystemTicket_reset();
  // this.$eventHub.$emit('findWinningsActive', false);  // TODO handle when findWinningsActive modal is active
};

const rollover = (doReplay = false) => {
  emitter.emit('rollover', { ticketStatus: getRolloverTicketStatus(), doReplay }); // TODO rollover event
  closeFindWinnings();
};

const replay = () => {
  inLobby.value || route.name !== routerName.value
    ? router.push({ name: routerName.value, params: { wagerId: getSerialNumber.value } })
    : emitter.emit('replayWager', { wagerId: getSerialNumber.value }); // TODO replayWager event
  if (getIsActiveLiveDrawScreen.value) {
    disableLiveDrawScreen();
  }
  closeFindWinnings();
};

const addToSession = ({ wagerId, callback }) => {
  emitter.emit(EventBusTypes.GET_WAGER, { barcode: wagerId, addWagerToPlayerBetslipSession: true }); // TODO getWager event
  callback();
};

const addToSessionFromLobby = async ({ wagerId, callback }) => {
  const navigationFailure = await router.push({
    name: routerName.value,
    params: { addWagerToPlayerBetslipSession: true, wagerId },
  });

  if (!navigationFailure) {
    callback();
  }
};

const addToPlayerBetslipSession = ({ callback = closeFindWinnings } = {}) => {
  const payload = { wagerId: getSerialNumber.value, callback };

  if (inLobby.value || shouldRedirect.value) {
    addToSessionFromLobby(payload);
    return;
  }

  addToSession(payload);
};

const rolloverAndAddToPlayerBetslipSession = () => {
  addToPlayerBetslipSession({ callback: rollover });
};

const shouldRedirect = computed(() => {
  const gameTypeRoute = GAMETYPE_TO_ROUTE[scannedGameType.value];
  return gameTypeRoute && route.name !== gameTypeRoute;
});

const loading = computed(() => kinoSystemTicket_loading.value);

const modalClasses = computed(() => ({
  [`winningTicketModal--${GAME_TO_THEME_POSTFIX[scannedGameType.value]} winningTicketModal`]: isWinningTicket.value,
}));

const showFooterButtons = computed(() => footerButtonsVisible.value && !loading.value);

const getSerialNumber = computed(() => {
  const { ticketStatus: { ticket: { serialNumber } = {} } = {} } = props.prizeCheck || {};
  return serialNumber;
});

const inLobby = computed(() => route.name === Constants.ROUTE_NAMES.LOBBY);

const shouldEnableCountdownComponent = computed(() => timeToNextDraw.value > 0);

const isInsertBetslipToSessionAvailable = computed(() => {
  return (
    props.prizeCheck &&
    props.prizeCheck.ticketStatus?.ticket.status !== Constants.FIND_WINNINGS.TICKET_STATUS.PENDING_PRIZE_BREAKDOWN &&
    isValidTicket.value &&
    GAMES_WITH_LIVE_DRAW.includes(scannedGameType.value) &&
    hasRemainingDraws.value &&
    getIsNotBetslipInSession.value({ serialNumber: getSerialNumber.value }) &&
    !kinoSystemTicket_isSystem.value
  );
});

const isRolloverAndInsertBetslipToSessionAvailable = computed(
  () => canRollover.value && isInsertBetslipToSessionAvailable.value
);

const isInsertBetslipToSessionButtonDisabled = computed(
  () => !isPrinterAvailable.value || !isInsertBetslipToSessionInTimeFrame.value || loadingDrawInfo.value
);

const isRolloverAvailable = computed(() => canRollover.value);

const isRolloverAndReplayAvailable = computed(() => canRollover.value && !kinoSystemTicket_isSystem.value);

const canRollover = computed(() => {
  const { ticketStatus: { tier, ticket: { status } = {} } = {} } = props.prizeCheck || {};
  return (
    Constants.FIND_WINNINGS.TIER.REGULAR_LIST.includes(tier) && status === Constants.FIND_WINNINGS.TICKET_STATUS.WON
  );
});

const isHighWinnings = computed(() => {
  const { ticketStatus: { tier } = {} } = props.prizeCheck || {};
  return props.prizeCheck && Constants.FIND_WINNINGS.TIER.SPECIAL_LIST[0] === tier;
});

const isSpecialWinnings = computed(() => {
  const { ticketStatus: { tier } = {} } = props.prizeCheck || {};
  return props.prizeCheck && Constants.FIND_WINNINGS.TIER.SPECIAL_LIST[1] === tier;
});

const canReplay = computed(() => isValidTicket.value && !kinoSystemTicket_isSystem.value);

const isValidTicket = computed(() => ticketStatus.value !== Constants.FIND_WINNINGS.TICKET_STATUS.INVALID);

const getNetAmount = computed(() =>
  checkAndReturnValue(props.prizeCheck.ticketStatus.ticket.net, props.prizeCheck.ticketStatus.tier)
);

const getGrossAmount = computed(() =>
  checkAndReturnValue(props.prizeCheck.ticketStatus.ticket.gross, props.prizeCheck.ticketStatus.tier)
);

const getTaxAmount = computed(() =>
  checkAndReturnValue(props.prizeCheck.ticketStatus.ticket.tax, props.prizeCheck.ticketStatus.tier)
);

const isWinningTicket = computed(() => ticketStatus.value === Constants.FIND_WINNINGS.TICKET_STATUS.WON);

const hasRemainingDraws = computed(() => props.prizeCheck?.ticketStatus?.ticket?.remainingDraws > 0);

const hasFutureDraws = computed(() => hasRemainingDraws.value && isWinningTicket.value);

const showTimeLeftToEnterTimeFrame = computed(
  () => shouldEnableCountdownComponent.value && isInsertBetslipToSessionButtonDisabled.value
);

const kinoSystemTicket_getWager = ({ wagerId = '' } = {}) => {
  // kinoSystemTicket_loading.value = true;
  emitter.emit(EventBusTypes.GET_WAGER, {
    barcode: wagerId,
    addWagerToPlayerBetslipSession: false,
    forFindWinnings: true,
  }); // TODO getWager event
};
const kinoSystemTicket_handler = (kinoSystemEnabled) => {
  kinoSystemTicket_loading.value = false;
  kinoSystemTicket_isSystem.value = kinoSystemEnabled;
};
const kinoSystemTicket_reset = () => {
  kinoSystemTicket_isSystem.value = false;
};

const getRolloverTicketStatus = () => {
  const originalTicketStatus = props.prizeCheck?.ticketStatus;
  const ticket = originalTicketStatus?.ticket;

  if (!originalTicketStatus || !ticket) {
    return originalTicketStatus;
  }

  const gameType = scannedGameType.value || ticket.gameType;

  if (ticket.gameType === gameType) {
    return originalTicketStatus;
  }

  return new TicketStatus({
    ...ticket,
    gameType,
  });
};
</script>

<template>
  <section :class="modalClasses">
    <div
      v-if="prizeCheck.isValid && prizeCheck.ticketStatus !== undefined && prizeCheck.ticketStatus !== null"
      class="atw:p-4">
      <WinningScreen
        v-if="isWinningTicket"
        :get-net-amount="getNetAmount"
        :get-gross-amount="getGrossAmount"
        :get-tax-amount="getTaxAmount"
        :has-future-draws="hasFutureDraws"
        :is-special-winnings="isSpecialWinnings"
        :is-high-winnings="isHighWinnings"
        :is-printer-available="isPrinterAvailable"
        :can-rollover="canRollover"
        :is-rollover-available="isRolloverAvailable"
        :is-rollover-and-replay-available="isRolloverAndReplayAvailable"
        :can-replay="canReplay"
        :loading-draw-info="loadingDrawInfo"
        :show-time-left-to-enter-time-frame="showTimeLeftToEnterTimeFrame"
        :time-left-to-enter-time-frame="timeLeftToEnterTimeFrame"
        :should-enable-countdown-component="shouldEnableCountdownComponent"
        :is-rollover-and-insert-betslip-to-session-available="isRolloverAndInsertBetslipToSessionAvailable"
        :is-insert-betslip-to-session-button-disabled="isInsertBetslipToSessionButtonDisabled"
        :should-display-buttons="footerButtonsVisible"
        :loading="loading"
        :is-system="kinoSystemTicket_isSystem"
        :game-type="scannedGameType"
        @close="closeFindWinnings"
        @rollover="rollover(false)"
        @rollover-and-replay="rollover(true)"
        @replay="replay"
        @rollover-add-ticket-to-bucket="rolloverAndAddToPlayerBetslipSession" />
      <BaseModal v-else>
        <template #header>
          <IconButton
            :icon="faXmark"
            size="lg"
            aria-label="Close find Winnings Modal"
            class="find-winnings-modal__close-button"
            @click="closeFindWinnings" />
          <h2 class="atw:text-lg">
            {{ $t('findWinnings.header.' + prizeCheck.ticketStatus.ticket.status, { amount: getNetAmount }) }}
          </h2>
        </template>

        <div v-if="kinoSystemTicket_isSystem" class="pb-4">{{ $t('kinoSystemMessage') }}</div>
        <Loading :active="loading" v-bind="FW_LOADING_CONFIG" class="atw:relative!" />

        <template v-if="showFooterButtons" #footer>
          <div class="atw:flex atw:flex-col atw:w-full atw:gap-2">
            <div class="atw:flex atw:gap-1">
              <PrimaryButton
                v-if="canReplay"
                class="atw:flex-1"
                shape="pill"
                size="md"
                :disabled="!isPrinterAvailable"
                @click="replay">
                {{ $t('replayWager') }}
              </PrimaryButton>

              <PrimaryButton v-if="isValidTicket" class="atw:flex-1" shape="pill" size="md" @click="closeFindWinnings">
                {{ $t('back') }}
              </PrimaryButton>
            </div>
            <div v-if="isInsertBetslipToSessionAvailable" class="atw:flex atw:flex-col">
              <div class="atw:text-center">
                <p v-if="loadingDrawInfo">{{ $t('searchingCurrentDrawInfo') }}</p>
                <p v-if="showTimeLeftToEnterTimeFrame">
                  {{ $t('addBetslipToSessionAvailableIn') }} {{ timeLeftToEnterTimeFrame }}
                </p>
              </div>

              <PrimaryButton
                class="atw:w-full"
                shape="pill"
                size="md"
                :disabled="isInsertBetslipToSessionButtonDisabled"
                @click="addToPlayerBetslipSession">
                <Loading class="atw:relative!" :active="loadingDrawInfo" v-bind="FW_SPINNER_CONFIG" />
                {{ $t('addWagerToSession') }}
              </PrimaryButton>
            </div>
          </div>
        </template>
      </BaseModal>
    </div>
    <BaseModal v-else-if="prizeCheck.error">
      <template #header>
        <IconButton
          :icon="faXmark"
          size="lg"
          aria-label="Close find Winnings Modal"
          class="find-winnings-modal__close-button"
          @click="closeFindWinnings" />
        <h2 class="atw:text-lg">
          {{ $t('findWinnings.errorOccurred') }}
        </h2>
      </template>
    </BaseModal>
  </section>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.find-winnings-modal__close-button {
  @apply atw:absolute atw:right-3 atw:top-3 atw:border atw:border-gray-200 atw:bg-white/90 atw:shadow-sm;
}

.winningTicketModal {
  @apply atw:w-[55%] atw:px-2.5 atw:pt-2.5 atw:text-center atw:bg-cover atw:flex atw:flex-col atw:rounded-[5px] atw:shadow-[0_0_10px_0_#000];
}

.winningTicketModal--kino {
  @apply atw:text-black atw:bg-[#f5b327] atw:bg-no-repeat;
  background-image: url('../../../assets/winning-modal-background.jpg');
}

.winningTicketModal--powerspin,
.winningTicketModal--fireblaze {
  @apply atw:text-white;
  background:
    linear-gradient(256.37deg, #2e1e93 4.39%, #131062 30.79%, #020744 98.32%), linear-gradient(0deg, #9c0960, #9c0960);
}

.winningTicketModal--eurojackpot {
  @apply atw:text-white;
  background: linear-gradient(256.37deg, #523d14 4.39%, #523d14 77.77%, #523d14 98.32%);
  background-blend-mode: multiply;
}
</style>
