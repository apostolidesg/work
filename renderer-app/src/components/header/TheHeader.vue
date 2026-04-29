<script setup>
import { computed } from 'vue';
import { faArrowsRotate, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeClosed } from '@fortawesome/pro-regular-svg-icons';
import cashout from '@/assets/icons/cashout.svg?raw';
import HeaderLogo from './HeaderLogo.vue';
import ModeToggle from './ModeToggle.vue';
import PrimaryButton from '../base/PrimaryButton.vue';
import { useSession } from '@/composables/useSession';
import Utilities from '@/util/Utilities';
import { APP_CONFIG, EXTERNAL_ASSETS } from '../../config/appConfig';
import { useModalService } from '@/composables/useModalService';
import { dialogModalMessages, infoModalMessages } from '@/util/modalMessages';
import logoUrl from '../../assets/svg/opap-logo.svg';
import BarcodeReaderError from '@/components/header/BarcodeReaderError.vue';
import { useRouter, useRoute } from 'vue-router';
import BasePopover from '@/components/base/BasePopover.vue';

const rgBadgeUrl = EXTERNAL_ASSETS.rgBadgeFull;

const { confirm, info } = useModalService();

const props = defineProps({
  mode: {
    type: String,
    default: 'easy',
  },
  sidebarExpanded: {
    type: Boolean,
    default: false,
  },
  showLogo: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggleLogin', 'logoClick', 'modeChange', 'switchApplication', 'cashOut']);

const headerStyle = computed(() => ({
  height: APP_CONFIG.header.height,
  backgroundColor: 'var(--header-bg, transparent)',
}));

const router = useRouter();
const route = useRoute();

const isInsideGame = computed(() => route.name.startsWith('pro-games-'));

const handleLogoClick = () => emit('logoClick');

const handleModeToggle = (newMode) => {
  if (newMode !== props.mode) emit('modeChange', newMode);
};

const handleProModeClick = () => {
  if (props.mode !== 'pro') {
    emit('modeChange', 'pro');
    return;
  }
  if (isInsideGame.value) {
    router.push('/pro');
  }
};

const handleCashOutClick = async () => {
  if (await confirm(dialogModalMessages.cashOut)) emit('cashOut');
};

const { balance, toggleBalanceVisibility, isBalanceVisible } = useSession();
const balanceText = computed(() => Utilities.formatNumber(balance.value));

const balanceVisibilityIcon = computed(() => (isBalanceVisible.value ? faEye : faEyeClosed));

const openResponsibleGamingInfo = () => {
  info({ ...infoModalMessages.responsibleGaming, width: 800 });
};
</script>

<template>
  <header class="app-header" :class="sidebarExpanded ? 'atw:left-60' : 'atw:left-20'">
    <div class="app-header__inner" :style="headerStyle" role="banner">
      <div v-if="showLogo" class="atw:portrait:hidden">
        <HeaderLogo :logo-src="logoUrl" @click="handleLogoClick" />
      </div>

      <ModeToggle
        class="atw:portrait:hidden atw:ml-6;"
        :model-value="mode"
        @update:model-value="handleModeToggle"
        @pro-mode-click="handleProModeClick" />

      <BarcodeReaderError />

      <div class="app-header__right">
        <PrimaryButton
          v-if="balance !== 0"
          shape="pill"
          variant="outlined"
          size="md"
          :aria-label="$t('header.cashOut')"
          @click="handleCashOutClick">
          <span aria-hidden="true" :innerHTML="cashout"></span>
          {{ $t('header.cashOut') }}
        </PrimaryButton>

        <PrimaryButton
          v-if="balance === 0"
          shape="pill"
          size="md"
          class="atw:relative atw:overflow-hidden"
          :aria-label="$t('header.deposit')"
          @click="$emit('switchApplication')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0C15.5016 0 19.9998 4.49824 20 10C20 15.5019 15.5017 20.001 10 20.001C4.49838 20.0009 0 15.5018 0 10C0.000199276 4.49832 4.49851 0.000120657 10 0ZM10 1.39551C5.26915 1.39563 1.39571 5.26899 1.39551 10C1.39551 14.7312 5.26903 18.6053 10 18.6055C14.7311 18.6055 18.6055 14.7312 18.6055 10C18.6053 5.26892 14.7309 1.39551 10 1.39551ZM10 5.58203C10.3852 5.58203 10.6981 5.89406 10.6982 6.2793V9.30273H13.7217C14.1069 9.30273 14.4188 9.61476 14.4189 10C14.4189 10.3853 14.107 10.6982 13.7217 10.6982H10.6982V13.7217C10.6982 14.107 10.3853 14.4199 10 14.4199C9.61485 14.4197 9.30273 14.1069 9.30273 13.7217V10.6982H6.2793C5.89415 10.698 5.58203 10.3852 5.58203 10C5.58215 9.61489 5.89422 9.30294 6.2793 9.30273H9.30273V6.2793C9.30286 5.89419 9.61493 5.58224 10 5.58203Z"
              fill="white" />
          </svg>
          {{ $t('header.deposit') }}
        </PrimaryButton>

        <BasePopover v-else placement="bottom-end" :arrow="false">
          <PrimaryButton
            shape="pill"
            size="md"
            class="atw:relative atw:overflow-hidden"
            :aria-label="$t('header.deposit')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 0C15.5016 0 19.9998 4.49824 20 10C20 15.5019 15.5017 20.001 10 20.001C4.49838 20.0009 0 15.5018 0 10C0.000199276 4.49832 4.49851 0.000120657 10 0ZM10 1.39551C5.26915 1.39563 1.39571 5.26899 1.39551 10C1.39551 14.7312 5.26903 18.6053 10 18.6055C14.7311 18.6055 18.6055 14.7312 18.6055 10C18.6053 5.26892 14.7309 1.39551 10 1.39551ZM10 5.58203C10.3852 5.58203 10.6981 5.89406 10.6982 6.2793V9.30273H13.7217C14.1069 9.30273 14.4188 9.61476 14.4189 10C14.4189 10.3853 14.107 10.6982 13.7217 10.6982H10.6982V13.7217C10.6982 14.107 10.3853 14.4199 10 14.4199C9.61485 14.4197 9.30273 14.1069 9.30273 13.7217V10.6982H6.2793C5.89415 10.698 5.58203 10.3852 5.58203 10C5.58215 9.61489 5.89422 9.30294 6.2793 9.30273H9.30273V6.2793C9.30286 5.89419 9.61493 5.58224 10 5.58203Z"
                fill="white" />
            </svg>
            <span :class="{ 'app-header__balance': !isBalanceVisible }">&euro;{{ balanceText }}</span>
            <span class="atw:relative atw:ml-1 atw:flex atw:shrink-0 atw:items-center atw:pl-4">
              <span
                class="atw:pointer-events-none atw:absolute atw:left-0 atw:top-[-999px] atw:bottom-[-999px] atw:w-px atw:bg-white"
                aria-hidden="true" />
              <FontAwesomeIcon :icon="faAngleDown" aria-hidden="true" />
            </span>
          </PrimaryButton>
          <template #content>
            <div class="atw:text-lg atw:mx-2">
              <div class="atw:flex atw:gap-2 atw:items-center atw:mb-3" @click="toggleBalanceVisibility">
                <FontAwesomeIcon :icon="balanceVisibilityIcon" aria-hidden="true" />
                {{ isBalanceVisible ? $t('shownBalanceText') : $t('hiddenBalanceText') }}
              </div>
              <div class="atw:flex atw:gap-2 atw:items-center" @click="$emit('switchApplication')">
                <FontAwesomeIcon :icon="faArrowsRotate" aria-hidden="true" />{{ $t('balanceRenewal') }}
              </div>
            </div>
          </template>
        </BasePopover>

        <div class="app-header__divider" aria-hidden="true" />

        <div class="app-header__rg-badge" @click="openResponsibleGamingInfo">
          <img :src="rgBadgeUrl" alt="Responsible Gaming badge" class="app-header__rg-img" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.app-header {
  @apply atw:fixed atw:right-0 atw:top-0 atw:z-30 atw:font-normal atw:transition-all atw:duration-300;
}

.app-header__inner {
  @apply atw:flex atw:w-full atw:items-center atw:justify-between atw:pr-8;
}

.app-header__right {
  @apply atw:flex atw:items-center atw:gap-6 atw:portrait:ml-auto;
}

.app-header__username {
  @apply atw:flex atw:flex-col atw:items-end atw:portrait:hidden;
}

.app-header__username-text {
  @apply atw:text-xl atw:font-bold atw:text-[#111111];
}

.app-header__divider {
  @apply atw:h-10 atw:w-px atw:bg-white atw:opacity-60;
}

.app-header__rg-badge {
  @apply atw:flex atw:items-center atw:gap-3;
}

.app-header__rg-img {
  @apply atw:h-10 atw:w-auto atw:object-contain;
}

.app-header__balance {
  @apply atw:filter atw:blur-[3.5px];
}
</style>
