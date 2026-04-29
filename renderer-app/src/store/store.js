import { createStore } from 'vuex';
import ConfigurationStoreModule from './modules/ConfigurationStoreModule';
import SessionStoreModule from './modules/SessionStoreModule';
import ServiceCheckStoreModule from './modules/ServiceCheckStoreModule';
import KinoStoreModule from './modules/KinoStoreModule';
import EurojackpotStoreModule from './modules/EurojackpotStoreModule';
import PowerspinStoreModule from './modules/PowerspinStoreModule';
import FireblazeStoreModule from './modules/FireblazeStoreModule';
import TzokerStoreModule from './modules/TzokerStoreModule';
import PlayerBetslipSessionModule from './modules/PlayerBetslipsSessionModule';
import moduleTypes from './modules/types/types';

const store = createStore({
  modules: {
    [moduleTypes.CONFIGURATION_STORE_MODULE]: ConfigurationStoreModule,
    [moduleTypes.SESSION_STORE_MODULE]: SessionStoreModule,
    [moduleTypes.SERVICE_CHECK_STORE_MODULE]: ServiceCheckStoreModule,
    [moduleTypes.KINO_GAME_STORE_MODULE]: KinoStoreModule,
    [moduleTypes.EUROJACKPOT_GAME_STORE_MODULE]: EurojackpotStoreModule,
    [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: PowerspinStoreModule,
    [moduleTypes.FIREBLAZE_GAME_STORE_MODULE]: FireblazeStoreModule,
    [moduleTypes.TZOKER_GAME_STORE_MODULE]: TzokerStoreModule,
    [moduleTypes.PLAYER_SESSION_MODULE]: PlayerBetslipSessionModule,
  },
});

export default store;
