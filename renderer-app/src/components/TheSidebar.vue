<script setup>
import { computed } from 'vue';
import SidebarNavItem from './SidebarNavItem.vue';
import SidebarLanguageItem from './SidebarLanguageItem.vue';
import { EXTERNAL_ASSETS, NAV_ITEMS, BOTTOM_NAV_ITEMS, APP_CONFIG } from '../config/appConfig';
import allwynLogoTextUrl from '@/assets/logos/allywin-logo-text.svg';

const props = defineProps({
  expanded: {
    type: Boolean,
    required: true,
  },
  currentPage: {
    type: String,
    required: true,
  },
});

defineEmits(['toggle', 'navigate']);

const navId = 'main-navigation';
const navItems = NAV_ITEMS;
const bottomNavItems = BOTTOM_NAV_ITEMS;

const allwynLogoUrl = computed(() =>
  props.expanded ? EXTERNAL_ASSETS.allwynLogoFull : EXTERNAL_ASSETS.allwynLogoSmall
);

const sidebarStyle = computed(() => ({
  top: '0',
  bottom: APP_CONFIG.header.height,
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  background: 'rgba(29, 29, 29, 0.30)',
  borderRight: '1px solid #fff',
}));
</script>

<template>
  <aside
    class="sidebar"
    :class="expanded ? 'atw:w-60' : 'atw:w-20'"
    :style="sidebarStyle"
    :aria-label="expanded ? 'Navigation sidebar expanded' : 'Navigation sidebar collapsed'"
    :aria-expanded="expanded"
    role="navigation">
    <button
      type="button"
      class="sidebar__toggle"
      aria-label="Toggle navigation sidebar"
      :aria-pressed="expanded"
      :aria-controls="navId"
      @click="$emit('toggle')">
      <div class="sidebar__toggle-icon">
        <img
          v-if="expanded"
          src="../assets/icons/sidebaricons/menu.svg"
          alt=""
          class="sidebar__icon-img"
          aria-hidden="true" />
        <img
          v-else
          src="../assets/icons/sidebaricons/NavHamburger.svg"
          alt=""
          class="sidebar__icon-img"
          aria-hidden="true" />
      </div>
    </button>

    <div class="sidebar__brand" :style="{ height: 'var(--header-height, 100px)' }">
      <div v-if="!expanded" class="sidebar__brand-icon">
        <img :src="allwynLogoUrl" alt="Allwyn logo" class="sidebar__logo" />
      </div>
      <template v-if="expanded">
        <div class="sidebar__brand-icon sidebar__brand-icon--expanded">
          <img :src="allwynLogoUrl" alt="Allwyn logo" class="sidebar__logo sidebar__logo--expanded" />
        </div>
        <div class="sidebar__brand-text">
          <img :src="allwynLogoTextUrl" alt="Allwyn" class="sidebar__logo-text" />
        </div>
      </template>
    </div>

    <nav :id="navId" class="sidebar__nav" aria-label="Main navigation">
      <SidebarNavItem
        v-for="item in navItems"
        :key="item.translationKey"
        :item="item"
        :expanded="expanded"
        :is-active="currentPage === item.translationKey"
        @click="$emit('navigate', item.translationKey)" />
    </nav>

    <div class="sidebar__bottom">
      <SidebarNavItem
        v-for="item in bottomNavItems"
        :key="item.translationKey"
        :item="item"
        :expanded="expanded"
        :is-active="currentPage === item.translationKey"
        @click="$emit('navigate', item.translationKey)" />

      <SidebarLanguageItem :expanded="expanded" />
    </div>
  </aside>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.sidebar {
  @apply atw:fixed atw:left-0 atw:z-40 atw:flex atw:flex-col atw:transition-all atw:duration-300;
}

.sidebar__toggle {
  @apply atw:pointer-events-auto atw:flex atw:items-center atw:border-none atw:bg-transparent atw:py-4 atw:focus-visible:outline-(--sidebar-active-indicator,rgb(191,247,255));
}

.sidebar__toggle-icon {
  @apply atw:flex atw:w-20 atw:shrink-0 atw:items-center atw:justify-center atw:text-(--sidebar-icon-color,rgb(191,247,255)) atw:mt-4;
}

.sidebar__icon-img {
  @apply atw:h-6 atw:w-6 atw:object-contain;
}

.sidebar__brand {
  @apply atw:flex atw:items-center;
}

.sidebar__brand-icon {
  @apply atw:flex atw:h-full atw:w-20 atw:shrink-0 atw:items-center atw:justify-center;
}

.sidebar__brand-icon--expanded {
  @apply atw:w-auto;
}

.sidebar__logo {
  @apply atw:h-[40.323px] atw:w-[40.129px] atw:shrink-0 atw:object-contain;
}

.sidebar__logo--expanded {
  @apply atw:ml-6;
}

.sidebar__brand-text {
  @apply atw:relative atw:flex atw:h-full atw:items-center atw:ml-2;
}

.sidebar__logo-text {
  @apply atw:h-[39.624px] atw:w-[111.901px] atw:shrink-0 atw:object-contain atw:transition-opacity atw:duration-300;
}

.sidebar__nav {
  @apply atw:flex atw:flex-1 atw:flex-col atw:py-4;
}

.sidebar__bottom {
  @apply atw:flex atw:flex-col atw:pb-4;
}
</style>
