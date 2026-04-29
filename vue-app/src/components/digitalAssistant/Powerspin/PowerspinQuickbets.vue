<template>
  <QuickBets :theme="theme" />
</template>

<script>
import Constants from '@/util/Constants';
import QuickBets from '@/components/digitalAssistant/Quickbets.vue';

export default {
  name: 'PowerspinQuickbets',
  data() {
    return {
      theme: Constants.THEMES.POWERSPIN,
    };
  },
  components: {
    QuickBets,
  },
};
</script>
