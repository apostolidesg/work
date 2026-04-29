<template>
  <div class="quickbets" :class="`quickbets--${theme}`">
    <QuickbetsHeader :theme="theme" />
    <QuickbetsCards :theme="theme" />
    <QuickbetsFooter :theme="theme" />
  </div>
</template>

<script>
import QuickbetsHeader from '@/components/common/Quickbets/QuickbetsHeader.vue';
import QuickbetsCards from '@/components/common/Quickbets/QuickbetsCard.vue';
import QuickbetsFooter from '@/components/common/Quickbets/QuickbetsFooter.vue';
import Constants from '@/util/Constants';

export default {
  name: 'Quickbets',
  props: {
    theme: {
      type: String,
      default: Constants.THEMES.KINO,
    },
  },
  components: {
    QuickbetsHeader,
    QuickbetsCards,
    QuickbetsFooter,
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss-utils/kino/mixins.scss';


.quickbets {
  @include digital-assistant-background;
}

.quickbets {
  min-height: 100vh;
  padding: 1.5rem;
  color: #fff;
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  align-items: center;
}

@mixin theme-styles($theme) {
  &--#{$theme} {
    // Add theme-specific styles here if needed for QuickbetsPanel
    // This is a placeholder to avoid empty ruleset error
    position: relative;
  }
}

.quickbets {
  @include theme-styles('kino');
  @include theme-styles('powerspin');
}
</style>
