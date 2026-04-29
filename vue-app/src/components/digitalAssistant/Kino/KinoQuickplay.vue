<template>
  <QuickPlay>
    <QuickPlayCard v-for="(betslipData, index) in quickPlayReadyBetslips" :key="index" :betslipData="betslipData" />
  </QuickPlay>
</template>

<script>
import moduleTypes from '@/store/modules/types';
import configurationModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';
import { mapGetters, mapActions } from 'vuex';
import QuickPlay from '../QuickPlay.vue';
import QuickPlayCard from '../QuickPlayCard.vue';
import Constants from '@/util/Constants';

export default {
  name: 'KinoQuickPlay',
  components: {
    QuickPlay,
    QuickPlayCard,
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
    }),
    ...mapGetters(moduleTypes.KINO_GAME_STORE_MODULE, {
      readyBetslipsNumbers: kinoGameModuleTypes.getters.GET_READY_BETSLIPS_NUMBERS,
    }),
    quickPlayReadyBetslips() {
      return (
        this.getConfiguration?.KINO?.PLAY_KINO?.READY_BETSLIPS.map((betslip) => ({
          ...betslip,
          numbers: this.readyBetslipsNumbers,
        })) || []
      );
    },
  },
  methods: {
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      setReadyBetslipsNumbers: kinoGameModuleTypes.actions.SET_READY_BETSLIPS_NUMBERS,
    }),
  },
  mounted() {
    const numberValue =
      this.readyBetslipsNumbers ||
      this.getConfiguration?.KINO?.PLAY_KINO?.READY_BETSLIPS_NUMBERS ||
      Constants.QUICKBETS.DEFAULT_KINO_NUMBERS;

    this.setReadyBetslipsNumbers({ numbers: numberValue });
  },
};
</script>
