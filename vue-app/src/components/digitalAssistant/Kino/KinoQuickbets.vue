<template>
  <QuickBets :theme="theme" />
</template>

<script>
import Constants from '@/util/Constants';
import QuickBets from '@/components/digitalAssistant/Quickbets.vue';

export default {
  name: 'KinoQuickbets',
  data() {
    return {
      theme: Constants.THEMES.KINO,
    };
  },
  components: {
    QuickBets,
  },
};
</script>