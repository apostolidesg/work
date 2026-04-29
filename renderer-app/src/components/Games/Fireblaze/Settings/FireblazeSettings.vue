<script setup>
import { computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useFireblaze } from '@/composables/useFireblaze';
import FireblazeConstants from '@/util/fireblaze/Constants';
import configurationModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import moduleTypes from '@/store/modules/types/types';
import advertisementBackground from '@/assets/fireblaze/advertisement-background.svg';
import advertisementLogo from '@/assets/fireblaze/advertisement-logo.svg';
import advertisementAmount from '@/assets/fireblaze/advertisement-amount.svg';
import FireblazeQuickPick from './FireblazeQuickPick.vue';
import FireblazeOptions from './FireblazeOptions.vue';

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;

const store = useStore();
const { selectedBoard, toggleQuickPick, setBoardBetType } = useFireblaze();

const isAdvertisementIconHidden = computed(
  () =>
    store.getters[
      `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationModuleTypes.getters.IS_ADVERTISEMENT_ICON_HIDDEN}`
    ]
);

const selectedBoardBetType = computed(() => selectedBoard.value?.betType || FireblazeConstants.BET_TYPES.DEFAULT);

function handleQuickPick() {
  toggleQuickPick();
}

function handleBetTypeClick({ betType }) {
  setBoardBetType(betType);
}
</script>

<template>
  <div class="fireblaze-settings">
    <div class="fireblaze-settings__wrapper">
      <div class="fireblaze-settings__quickpick">
        <FireblazeQuickPick @quick-pick-click="handleQuickPick" />
      </div>
      <div class="fireblaze-settings__line"></div>
      <div class="fireblaze-settings__options">
        <FireblazeOptions :active-bet-type="selectedBoardBetType" @bet-type-click="handleBetTypeClick" />
      </div>
    </div>
    <div v-if="!isAdvertisementIconHidden" class="fireblaze-settings__advertisement-wrapper">
      <div class="fireblaze-settings__advertisement">
        <img :src="advertisementBackground" alt="" class="fireblaze-settings__advertisement-background" />
        <img :src="advertisementLogo" alt="" class="fireblaze-settings__advertisement-logo" />
        <div class="fireblaze-settings__advertisement-text">{{ t('fireblaze.advertisementText') }}</div>
        <img :src="advertisementAmount" alt="" class="fireblaze-settings__advertisement-amount" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.fireblaze-settings {
  @apply atw:flex atw:flex-col atw:justify-between atw:h-full;
  background: var(--fireblaze-gradient-pink-purple);
  color: var(--fireblaze-color-primary-white);
  font-size: 1em;
  padding: 1em 0.5em;
}

.fireblaze-settings__wrapper {
  @apply atw:flex atw:flex-col;
}

.fireblaze-settings__line {
  border: solid 1px var(--fireblaze-color-third-brown-opacity);
  margin: 1em 0;
}

.fireblaze-settings__advertisement {
  position: relative;
}

.fireblaze-settings__advertisement-background {
  position: relative;
  width: 100%;
}

.fireblaze-settings__advertisement-logo {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
}

.fireblaze-settings__advertisement-text {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -55%);
  color: var(--fireblaze-color-third-yellow);
  font-weight: bold;
}

.fireblaze-settings__advertisement-amount {
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -85%);
}
</style>
