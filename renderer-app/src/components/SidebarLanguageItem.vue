<script setup>
import { computed } from 'vue';
import { useI18nPlugin } from '@unify/vuex-i18n';
import BasePopover from '@/components/base/BasePopover.vue';
import rightIconUrl from '@/assets/icons/Right.svg';
import navLanguageEl from '@/assets/icons/sidebarIcons/NavLanguageEl.png';
import navLanguageEn from '@/assets/icons/sidebarIcons/NavLanguageEn.png';

defineProps({
  expanded: {
    type: Boolean,
    required: true,
  },
});

const i18n = useI18nPlugin();

const languageOptions = [
  { code: 'el', labelKey: 'nav.languageEl' },
  { code: 'en', labelKey: 'nav.languageEn' },
];

const languageIcons = {
  en: navLanguageEn,
  el: navLanguageEl,
};

const currentLocale = computed(() => i18n.locale() || 'el');

const currentLanguageIcon = computed(() => {
  return languageIcons[currentLocale.value] || languageIcons.el;
});

const selectLanguage = (localeCode, closePopover) => {
  if (localeCode !== currentLocale.value) {
    i18n.set(localeCode);
  }

  closePopover?.();
};
</script>

<template>
  <BasePopover placement="right-end" :arrow="false">
    <template #default="{ isOpen }">
      <button id="nav-language" type="button" class="nav-item__button" :class="{ 'nav-item__button--active': isOpen }">
        <span class="nav-item__icon" aria-hidden="true">
          <img :src="currentLanguageIcon" class="atw:size-7 atw:rounded-full" />
        </span>

        <Transition
          enter-active-class="atw:transition-opacity atw:duration-300"
          leave-active-class="atw:transition-opacity atw:duration-300"
          enter-from-class="atw:opacity-0"
          leave-to-class="atw:opacity-0">
          <span v-if="expanded" class="nav-item__label" style="font-size: 20px; font-weight: 400">
            {{ $t('nav.language') }}

            <span class="atw:ml-6" aria-hidden="true">
              <img :src="rightIconUrl" class="atw:size-8 atw:object-contain" />
            </span>
          </span>
        </Transition>
      </button>
    </template>

    <template #content="{ close }">
      <button
        v-for="option in languageOptions"
        :id="`lang-${option.code}`"
        :key="option.code"
        type="button"
        class="language-menu__item"
        :class="{ 'language-menu__item--selected': currentLocale === option.code }"
        @click="selectLanguage(option.code, close)">
        <div class="atw:flex atw:gap-2">
          <img :src="languageIcons[option.code]" class="language-menu__item--image" />
          {{ $t(option.labelKey) }}
        </div>
      </button>
    </template>
  </BasePopover>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.nav-item__button {
  @apply atw:pointer-events-auto atw:relative atw:flex atw:h-[72px] atw:w-full atw:items-center atw:border-none atw:bg-transparent atw:text-left atw:transition-colors;
}

.nav-item__button--active {
  @apply atw:bg-(--sidebar-active-bg,rgba(191,247,255,0.15));
}

.nav-item__icon {
  @apply atw:flex atw:w-20 atw:shrink-0 atw:items-center atw:justify-center;
}

.nav-item__label {
  @apply atw:inline-flex atw:items-center atw:whitespace-nowrap atw:font-medium atw:leading-normal atw:text-white;
}

.language-menu__item {
  @apply atw:block atw:w-full atw:border-none atw:bg-transparent atw:px-5 atw:py-4 atw:text-left atw:text-lg atw:transition-colors atw:hover:bg-white/10;
}

.language-menu__item--selected {
  @apply atw:bg-main-background/60 atw:rounded-2xl atw:text-white;
}

.language-menu__item--image {
  @apply atw:w-7 atw:h-7 atw:rounded-full;
}
</style>
