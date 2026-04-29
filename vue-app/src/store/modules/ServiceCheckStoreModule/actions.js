import types from './types'

const actions = {
  [types.actions.CHANGE_SERVICE_AVAILABILITY] ({ commit }, { serviceStatus }) {
    commit(types.mutations.CHANGE_SERVICE_AVAILABILITY, { serviceStatus })
  }
}
export default actions
