<template>
  <div class="atw:relative">
    <div class="atw:flex atw:items-center atw:gap-3">
      <button
        :id="buttonId"
        type="button"
        class="atw:flex atw:h-12 atw:w-12 atw:items-center atw:justify-center atw:overflow-hidden atw:rounded-full atw:bg-gradient-to-br atw:from-gray-600 atw:to-gray-400 atw:transition-opacity atw:hover:opacity-80"
        aria-label="User menu"
        :aria-expanded="isOpen"
        aria-haspopup="true"
        :aria-controls="menuId"
        @click="toggle">
        <span class="atw:text-xl atw:font-bold atw:text-white">
          {{ initials }}
        </span>
      </button>
      <div
        class="atw:flex atw:h-12 atw:w-12 atw:flex-col atw:items-center atw:justify-center atw:rounded-full atw:bg-[#FFD700]"
        role="img"
        :aria-label="`${$t(membershipTierKey)} membership tier`">
        <FontAwesomeIcon :icon="faCrown" class="atw:h-6 atw:w-6 atw:text-[#111111]" aria-hidden="true" />
        <span class="atw:text-[10px] atw:font-bold atw:leading-none atw:text-[#111111]">
          {{ $t(membershipTierKey) }}
        </span>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="isOpen" class="atw:fixed atw:inset-0 atw:z-40" @click="close" />
    </Transition>
    <Transition name="fade">
      <div
        v-if="isOpen"
        :id="menuId"
        class="atw:absolute atw:right-0 atw:top-14 atw:z-50 atw:w-[200px] atw:overflow-hidden atw:rounded-xl atw:border atw:border-[#E0E0E0] atw:bg-white atw:shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
        role="menu"
        aria-label="User options">
        <button
          type="button"
          class="atw:w-full atw:border-none atw:bg-none atw:px-6 atw:py-4 atw:text-left atw:text-lg atw:font-semibold atw:text-[#E30613] atw:transition-colors atw:hover:bg-gray-50"
          role="menuitem"
          @click="handleUnpair">
          {{ $t('unpair') }}
        </button>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ref, useId, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

const props = defineProps({
  initials: {
    type: String,
    required: true,
  },
  membershipTier: {
    type: String,
    default: 'Gold',
  },
});
const emit = defineEmits(['unpair']);
const isOpen = ref(false);
const baseId = useId();
const buttonId = `user-menu-button-${baseId}`;
const menuId = `user-menu-dropdown-${baseId}`;
const membershipTierKey = computed(() => {
  return `membership.${props.membershipTier.toLowerCase()}`;
});
const toggle = () => {
  isOpen.value = !isOpen.value;
};
const close = () => {
  isOpen.value = false;
};
const handleUnpair = () => {
  close();
  emit('unpair');
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_HANDLE_DEMO_LOGIN_UNPAIR, {
    page_name: 'unpair_device_menu',
    step_name: 'unpair',
  });
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
