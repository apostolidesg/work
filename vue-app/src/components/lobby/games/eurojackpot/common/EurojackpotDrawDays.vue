<template>
  <div class="eurojackpot-draw-days">
    {{ getDrawDaysTitle }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import eurojackpotGameStoreModuleTypes from '../../../../../store/modules/EurojackpotStoreModule/types';
import EurojackpotBetslipUtilities from '../../../../../util/eurojackpotBetslipUtilities';

export default {
  name: 'EurojackpotDrawDays',
  computed: {
    ...mapGetters(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      drawDays: eurojackpotGameStoreModuleTypes.getters.GET_DRAW_DAYS,
    }),
    getDrawDaysTitle() {
      const days = EurojackpotBetslipUtilities.getDrawDaysTitle(Object.values(this.drawDays), this.$t);

      return `${this.$t('eurojackpot.drawsEvery')} ${days}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.eurojackpot-draw-days {
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 900;
  line-height: 26px;
  color: #211f1f;
}
</style>
