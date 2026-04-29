<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value),
  },
  isActiveDrawExtra: {
    type: Boolean,
    default: false,
  },
  gameType: {
    type: String,
    default: '',
  },
});

const slots = useSlots();

const hasHeader = computed(() => !!slots.header);
const hasStatic = computed(() => !!slots.static);

const isExtraBackground = computed(() => {
  return props.gameType.toLowerCase() === 'eurojackpot' && props.isActiveDrawExtra;
});
</script>

<template>
  <div class="sidescreen-layout" :class="{ 'sidescreen-layout--extra-background': isExtraBackground }">
    <div v-if="hasHeader" class="sidescreen-layout__header">
      <slot name="header"></slot>
      <hr class="sidescreen-layout__divider" :class="`sidescreen-layout__divider--${theme}`" />
    </div>
    <div
      class="sidescreen-layout__content"
      :class="{ 'sidescreen-layout__content--extra-background': isExtraBackground }">
      <slot></slot>
    </div>
    <div v-if="hasStatic" class="sidescreen-layout__static">
      <slot name="static"></slot>
    </div>
    <div
      class="sidescreen-layout__footer"
      :class="{ 'sidescreen-layout__footer--extra-background': isExtraBackground }">
      <hr
        v-if="!isExtraBackground"
        class="sidescreen-layout__divider"
        :class="`sidescreen-layout__divider--${theme}`" />
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.sidescreen-layout {
  @apply atw:h-full atw:flex atw:flex-col;
  padding: 0.5rem 0.5rem 1rem 0.5rem;
}

.sidescreen-layout--extra-background {
  @apply atw:p-0;
}

.sidescreen-layout__header {
  @apply atw:mb-0;
}

.sidescreen-layout__content {
  @apply atw:flex-1 atw:overflow-y-auto atw:pb-2;
}

.sidescreen-layout__content--extra-background {
  @apply atw:p-2;
}

.sidescreen-layout__static {
  @apply atw:pb-2;
}

.sidescreen-layout__footer {
  @apply atw:pb-2;
}

.sidescreen-layout__footer--extra-background {
  background: linear-gradient(180deg, #ebc17d 0%, #bc7c33 100%);
  background-blend-mode: multiply;
  padding: 1rem 0.7rem;
}

.sidescreen-layout__divider {
  @apply atw:border-none;
  margin: 10px 0;
  height: 1px;
}

.sidescreen-layout__divider--light {
  @apply atw:bg-white;
}

.sidescreen-layout__divider--dark {
  background-color: rgba(82, 61, 20, 0.3);
}
</style>
