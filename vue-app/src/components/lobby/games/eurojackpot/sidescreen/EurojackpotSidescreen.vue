<template>
  <BaseSidescreen :betslip="betslip">
    <template>
      <EurojackpotSelectionsList />
    </template>
  </BaseSidescreen>
</template>

<script>
import { mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import EurojackpotStoreModuleTypes from '../../../../../store/modules/EurojackpotStoreModule/types';
import BaseSidescreen from '../../../../common/BaseSidescreen.vue';
import EurojackpotSelectionsList from './EurojackpotSelectionsList.vue';

export default {
  name: 'EurojackpotSidescreen',
  components: { EurojackpotSelectionsList, BaseSidescreen },
  computed: {
    ...mapGetters(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      betslip: EurojackpotStoreModuleTypes.getters.GET_BETSLIP,
    }),
  },
};
</script>
