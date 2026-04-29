<template>
  <div class="eurojackpot-settings">
    <div class="eurojackpot-settings__quickpick">
      <EurojackpotQuickPick @quick-pick-click="toggleQuickPick" />
    </div>
    <div class="eurojackpot-settings__line"></div>
    <div class="eurojackpot-settings__systems">
      <EurojackpotSystems @system-click="handleSystemClick" :active-system-id="selectedSystemId" />
    </div>
    <div class="eurojackpot-settings__nextDraw" v-if="getSalesCloseTime">
      <EurojackpotNextDrawWrapper :sales-close-time="new Date(getSalesCloseTime)" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import eurojackpotModuleTypes from '../../../../../store/modules/EurojackpotStoreModule/types';
import EurojackpotNextDrawWrapper from '../mainscreen/EurojackpotNextDrawWrapper.vue';
import EurojackpotSystems from './EurojackpotSystems.vue';
import EurojackpotQuickPick from './EurojackpotQuickPick.vue';
import EurojackpotConstants from '../../../../../util/eurojackpotConstants';

export default {
  name: 'EurojackpotSettings',
  components: {
    EurojackpotNextDrawWrapper,
    EurojackpotSystems,
    EurojackpotQuickPick,
  },
  computed: {
    ...mapGetters(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      getSelectedBoard: eurojackpotModuleTypes.getters.GET_SELECTED_BOARD,
    }),
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      getSalesCloseTime: state =>
        state.salesStatus === EurojackpotConstants.DRAW_STATUS.SALES_OPEN && state.salesCloseTime,
    }),
    selectedSystemId() {
      return this.getSelectedBoard.systemId;
    },
  },
  methods: {
    ...mapActions(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      setSelectedSystem: eurojackpotModuleTypes.actions.SET_SYSTEM,
      toggleQuickPick: eurojackpotModuleTypes.actions.TOGGLE_QUICK_PICK,
    }),
    handleSystemClick(systemId) {
      this.setSelectedSystem({ systemId });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/eurojackpot/colors';

.eurojackpot-settings {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding: 20px 15px 15px 15px;

  & > *:not(:last-child) {
    margin-bottom: 15px;
  }

  &__line {
    width: 100%;
    height: 1px;
    opacity: 0.3;
    background-color: $color-third-brown;
  }
  &__nextDraw {
    margin-top: auto;
  }
}
</style>
