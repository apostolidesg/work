import types from './types';

const mutations = {
  [types.actions.CHANGE_SERVICE_AVAILABILITY](state, { serviceStatus }) {
    if (serviceStatus) {
      state.maintenance = serviceStatus.maintenance;
      state.cashout = serviceStatus.cashout;
    } else {
      state.maintenance = false;
      state.cashout = true;
    }
  },
};
export default mutations;
