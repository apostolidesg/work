<template>
  <div id="eurojackpot">
    <PlayAreaLayout>
      <template #settings>
        <div class="eurojackpot__settings" :class="{ 'eurojackpot__settings--extra-background': isActiveDrawExtra }">
          <EurojackpotSettings />
        </div>
      </template>
      <div class="eurojackpot__play-area">
        <EurojackpotPlayArea />
      </div>
      <template #sidescreen>
        <div
          class="eurojackpot__sidescreen"
          :class="{ 'eurojackpot__sidescreen--extra-background': isActiveDrawExtra }"
        >
          <EurojackpotSidescreen />
        </div>
      </template>
    </PlayAreaLayout>
  </div>
</template>
<script>
import Constants from '../../../../util/Constants';
import { mapActions, mapGetters, mapState } from 'vuex';
import moduleTypes from '../../../../store/modules/types';
import sessionStoreModuleTypes from '../../../../store/modules/SessionStoreModule/types';
import eurojackpotGameStoreModuleTypes from '../../../../store/modules/EurojackpotStoreModule/types';
import PlayAreaLayout from '../../../common/layouts/PlayAreaLayout.vue';
import EurojackpotPlayArea from './mainscreen/EurojackpotPlayArea.vue';
import EurojackpotSettings from './settings/EurojackpotSettings.vue';
import EurojackpotSidescreen from './sidescreen/EurojackpotSidescreen.vue';
import modalEventConstants from '../../../../util/modalEventConstants';
import dialogModalMessages from '../../../../util/dialogModalMessages';
import EurojackpotConstants from '../../../../util/eurojackpotConstants';

export default {
  name: 'Eurojackpot',
  components: {
    EurojackpotSidescreen,
    EurojackpotPlayArea,
    PlayAreaLayout,
    EurojackpotSettings,
  },
  mounted() {
    this.setGameType({ gameType: Constants.GENERAL_GAME_TYPES.EUROJACKPOT });
    this.$eventHub.$on('replayWager', this.replayWager);
    this.$eventHub.$on('clearBetslip', this.clearBetslip);
  },
  beforeMount() {
    this.handleRouteParams();
  },
  beforeDestroy() {
    this.$eventHub.$off('replayWager');
    this.$eventHub.$off('clearBetslip');
  },
  beforeRouteLeave(to, from, next) {
    const {
      query: { shouldConfirm },
    } = to || { query: {} };

    if (this.isZeroBalance && !this.isBetslipEmpty && shouldConfirm !== 'false') {
      this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.returnToLobby, () => {
        this.resetBetslip();
        this.setStatistics({ selection: EurojackpotConstants.STATISTICS_SELECTIONS.NONE });
        next();
      });
    } else {
      if (this.isZeroBalance) {
        this.resetBetslip();
      }
      this.setStatistics({ selection: EurojackpotConstants.STATISTICS_SELECTIONS.NONE });
      next();
    }
  },
  computed: {
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      isZeroBalance: sessionStoreModuleTypes.getters.GET_IS_ZERO_BALANCE,
    }),
    ...mapGetters(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      isBetslipEmpty: eurojackpotGameStoreModuleTypes.getters.GET_IS_BETSLIP_EMPTY,
    }),
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, ['isActiveDrawExtra']),
  },
  methods: {
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setGameType: sessionStoreModuleTypes.actions.SET_GAME_TYPE,
    }),
    ...mapActions(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      resetBetslip: eurojackpotGameStoreModuleTypes.actions.RESET_BETSLIP,
      setStatistics: eurojackpotGameStoreModuleTypes.actions.SET_STATISTICS_SELECTION,
    }),
    handleRouteParams() {
      const { wagerId = null } = this.$route?.params || {};
      if (wagerId) {
        this.replayWager({ wagerId });
      }
    },
    replayWager({ wagerId }) {
      if (!this.isBetslipEmpty) {
        this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.replayWager, () => {
          this.$eventHub.$emit('getWager', wagerId);
        });
      } else {
        this.$eventHub.$emit('getWager', wagerId);
      }
    },
    clearBetslip() {
      this.resetBetslip();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../scss-utils/eurojackpot/mixins';

.eurojackpot {
  &__settings {
    @include light-background;

    &--extra-background {
      background: transparent;
    }
  }
  &__play-area {
    @include dark-background;
    padding: 15px 20px;
  }
  &__sidescreen {
    @include light-background;
    &--extra-background {
      background: transparent;
    }
  }
}
</style>
