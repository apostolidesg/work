<template>
  <QuickPlay :theme="constants.THEMES.POWERSPIN">
    <QuickPlayCard
      v-for="(betslipData, index) in quickPlayReadyBetslips"
      :key="index"
      :betslipData="betslipData"
      :theme="constants.THEMES.POWERSPIN"
    />
  </QuickPlay>
</template>

<script>
import moduleTypes from '@/store/modules/types';
import configurationModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import { mapGetters } from 'vuex';
import QuickPlay from '../QuickPlay.vue';
import QuickPlayCard from '../QuickPlayCard.vue';
import Constants from '@/util/Constants';

export default {
  name: 'PowerspinQuickPlay',
  components: {
    QuickPlay,
    QuickPlayCard,
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
    }),
    quickPlayReadyBetslips() {
      return this.getConfiguration?.POWERSPIN?.READY_BETSLIPS || [];
    },
    constants() {
      return Constants;
    },
  },
};
</script>
