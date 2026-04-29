<script setup>
import { computed } from 'vue';
import gtmEvents from '@/constants/gtmEvents';
import gaService from '@/services/gaService';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const sanitizedSvg = computed(() => props.item.svgIcon ?? '');

const handleClick = () => {
  const menuItem = props.item.translationKey?.split('.').pop() || props.item.translationKey;

  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_SIDE_BAR_CLICKED, {
    menu_item: menuItem,
  });

  emit('click');
};
</script>

<template>
  <div>
    <button
      :id="`nav-${item.translationKey.split('.')[1]}`"
      type="button"
      class="nav-item__button"
      :class="{ 'nav-item__button--active': isActive }"
      :aria-label="`Navigate to ${$t(item.translationKey)}`"
      :aria-current="isActive ? 'page' : undefined"
      @click="handleClick">
      <span
        v-if="sanitizedSvg"
        class="nav-item__icon nav-item__icon--svg"
        aria-hidden="true"
        :innerHTML="sanitizedSvg" />

      <span v-else-if="item.imgIcon" class="nav-item__icon nav-item__icon--img" aria-hidden="true">
        <img :src="item.imgIcon" class="atw:object-contain" style="width: 27.999px; height: 27.51px" />
      </span>

      <Transition
        enter-active-class="atw:transition-opacity atw:duration-300"
        leave-active-class="atw:transition-opacity atw:duration-300"
        enter-from-class="atw:opacity-0"
        leave-to-class="atw:opacity-0">
        <span v-if="expanded" class="nav-item__label" style="font-size: 20px; font-weight: 400">
          {{ $t(item.translationKey) }}
          <span v-if="item.showArrow" class="atw:ml-6" aria-hidden="true">
            <img src="../assets/icons/Right.svg" alt="" class="atw:h-8 atw:w-8 atw:object-contain" />
          </span>
        </span>
      </Transition>
    </button>

    <div v-if="item.hasDivider" class="atw:mx-6 atw:my-2 atw:h-px atw:bg-white" role="separator" aria-hidden="true" />
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.nav-item__button {
  @apply atw:pointer-events-auto atw:relative atw:flex atw:h-[72px] atw:w-full atw:items-center atw:border-none atw:bg-transparent atw:text-left atw:transition-colors atw:hover:bg-[var(--sidebar-hover,rgba(0,0,0,0.05))] atw:active:bg-[var(--sidebar-active,rgba(0,0,0,0.1))] atw:focus-visible:outline atw:focus-visible:outline-2 atw:focus-visible:outline-offset-2 atw:focus-visible:outline-[var(--sidebar-active-indicator,rgb(191,247,255))];
}

.nav-item__button--active {
  @apply atw:bg-[var(--sidebar-active-bg,rgba(191,247,255,0.15))] atw:hover:bg-[var(--sidebar-active-bg,rgba(191,247,255,0.15))];
}

.nav-item__icon {
  @apply atw:flex atw:w-20 atw:flex-shrink-0 atw:items-center atw:justify-center;
}

.nav-item__icon--svg {
  @apply atw:text-[var(--sidebar-icon-color,rgb(191,247,255))];
}

.nav-item__label {
  @apply atw:inline-flex atw:items-center atw:whitespace-nowrap atw:font-medium atw:leading-normal atw:text-white;
}
</style>
