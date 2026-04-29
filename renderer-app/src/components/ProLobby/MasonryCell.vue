<script setup>
import { useConfigText } from '../../composables/useConfigText';
const { tConfig } = useConfigText();

defineProps({
  item: {
    type: Object,
    default: () => null,
  },
  centerButton: {
    type: Boolean,
    default: false,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <router-link
    v-if="item?.order != null && item?.link"
    :to="item.link"
    class="masonry-cell"
    :class="{ 'masonry-cell--span': item?.span && !centerButton }">
    <img v-if="item?.src" :src="item.src" :alt="item.alt || ''" class="masonry-cell__img" />
    <div
      v-if="item?.promoText || item?.link"
      class="masonry-cell__overlay"
      :class="{ 'masonry-cell__overlay--right': item?.alignRight && !centerButton }">
      <div v-if="showOverlay">
        <span
          v-if="item?.promoText"
          class="masonry-cell__promo"
          :class="{ 'masonry-cell__promo--right': item?.alignRight && !centerButton }">
          {{ tConfig(item.promoText) }}
        </span>
        <span class="masonry-cell__btn">
          {{ tConfig('masonry.playHere') }}
        </span>
      </div>
    </div>
  </router-link>
  <div v-else class="masonry-cell" :class="{ 'masonry-cell--span': item?.span && !centerButton }">
    <img v-if="item?.src" :src="item.src" :alt="item.alt || ''" class="masonry-cell__img" />
    <slot v-else />
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.masonry-cell {
  @apply atw:w-full atw:h-full atw:overflow-hidden atw:rounded-3xl atw:bg-[#F0F0F0] atw:min-h-0 atw:block atw:relative;
}

.masonry-cell--span {
  @apply atw:col-span-2;
}

.masonry-cell__img {
  @apply atw:w-full atw:h-full atw:object-cover atw:block;
}

.masonry-cell__overlay {
  @apply atw:absolute atw:bottom-3 atw:left-1/2 atw:-translate-x-1/2
    atw:flex atw:flex-col atw:items-center atw:gap-2;
}

.masonry-cell__overlay--right {
  @apply atw:left-auto atw:translate-x-0 atw:right-[20%] atw:items-end;
}

.masonry-cell__promo {
  @apply atw:text-center atw:uppercase atw:text-white;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  width: 361px;
}

.masonry-cell__promo--right {
  @apply atw:text-right;
}

.masonry-cell__btn {
  @apply atw:px-5 atw:py-2 atw:rounded-full
    atw:text-sm atw:font-bold atw:uppercase atw:tracking-wide
    atw:text-white atw:whitespace-nowrap
    atw:bg-transparent atw:border atw:border-white;
}
</style>
