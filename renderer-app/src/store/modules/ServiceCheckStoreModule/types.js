const actionTypes = {
  CHANGE_SERVICE_AVAILABILITY: 'CHANGE_SERVICE_AVAILABILITY',
};

const mutationTypes = {
  CHANGE_SERVICE_AVAILABILITY: 'CHANGE_SERVICE_AVAILABILITY',
};

const getterTypes = {
  GET_MAINTENANCE: 'GET_MAINTENANCE',
  GET_CASHOUT: 'GET_CASHOUT',
};

const types = {
  mutations: { ...mutationTypes },
  actions: { ...actionTypes },
  getters: { ...getterTypes },
};

export default types;
