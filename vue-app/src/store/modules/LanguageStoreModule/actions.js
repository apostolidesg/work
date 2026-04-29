import types from './types'

const actions = {
  [types.actions.SET_LANGUAGE] ({ commit }, { language }) {
    commit(types.mutations.SET_LANGUAGE, { language })
  }
}

export default actions
