<template>
  <div v-if="showPanel" class="content-mask" :class="`content-mask--${gameTheme}`" id="maintenance-panel">
    <div class="container">
      <div id="maintenance-icon" class="row">
        <div class="col-12 icon-area">
          <font-awesome-icon class="tool-wrench-img mx-auto d-block" :icon="maintenanceIcon" />
        </div>
      </div>
      <div class="row" id="maintenance-message">
        <div class="col-12 text-center">
          <h1 class="h2">{{ $t('maintenanceMessage') }}</h1>
        </div>
      </div>
      <div class="row options-area">
        <div v-if="cashOutAllowed && activeSession" class="col text-center" @click="cashout">
          <div class="col-12">
            <img id="maintenance-cash-out-img" class="cash_out_img" :src="getEuroImage" />
          </div>
          <div class="col-12">
            <h2 id="cash-out-txt">{{ $t('cashOut') }}</h2>
          </div>
        </div>
        <div v-if="!activeSession" class="col text-center" @click="switchApp">
          <div class="col-12">
            <font-awesome-icon class="switch-app-img" :icon="switchAppIcon" />
          </div>
          <div class="col-12">
            <h2 id="switch-app-txt">{{ $t('maintenanceSwitchAppMessage') }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import { mapGetters, mapState } from 'vuex';
import moduleTypes from '../../store/modules/types';
import serviceCheckStoreModuleTypes from '../../store/modules/ServiceCheckStoreModule/types';
import sessionStoreModuleTypes from '../../store/modules/SessionStoreModule/types';
import constants from '../../util/Constants';
import EuroIconDark from '../../assets/euro-icon-dark.png';
import EuroIconWhite from '../../assets/euro-icon-white.png';

export default {
  name: 'MaintenancePanel',
  data() {
    return {
      maintenanceIcon: faWrench,
      switchAppIcon: faSignOutAlt,
    };
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {
    cashout() {
      this.$eventHub.$emit('doCashout');
    },
    switchApp() {
      this.$eventHub.$emit('switchToApplicationOk');
    },
  },
  computed: {
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: sessionStoreModuleTypes.state.GAME_TYPE,
    }),
    ...mapGetters(moduleTypes.SERVICE_CHECK_STORE_MODULE, {
      getMaintenance: serviceCheckStoreModuleTypes.getters.GET_MAINTENANCE,
      getCashOut: serviceCheckStoreModuleTypes.getters.GET_CASHOUT,
    }),
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      getActiveSession: sessionStoreModuleTypes.getters.GET_ACTIVE_SESSION,
    }),
    gameTheme() {
      return this.gameType && this.gameType !== ''
        ? this.gameType.toLowerCase()
        : constants.GENERAL_GAME_TYPES.KINO.toLowerCase();
    },
    getEuroImage() {
      return this.gameType === constants.GENERAL_GAME_TYPES.KINO ? EuroIconDark : EuroIconWhite;
    },
    activeSession() {
      return this.getActiveSession;
    },
    showPanel() {
      return this.getMaintenance;
    },
    cashOutAllowed() {
      return this.getCashOut;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  display: flex;
  justify-content: center;
  align-items: center;

  &--kino {
    background-color: #f4bc24;
  }

  &--powerspin {
    background-color: #2e1e93;
    color: white;
  }
}

.icon-area {
  margin-bottom: 30px;
}

.options-area {
  margin-top: 50px;
}
.cash_out_txt {
  margin-top: 30px;
}
.cash_out_img {
  margin-bottom: 5px;
  width: 120px;
}

.switch-app-img {
  width: 57px;
  height: 57px;
}

.tool-wrench-img {
  height: 200px;
  width: 200px;
}
</style>
