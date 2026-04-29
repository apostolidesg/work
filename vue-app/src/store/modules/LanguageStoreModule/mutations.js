import types from './types'

const mutations = {
  [types.mutations.SET_LANGUAGE] (state, { language }) {
    state.lang = language
  }
}

export default mutations
