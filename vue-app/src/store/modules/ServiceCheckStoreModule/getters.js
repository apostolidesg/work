import types from './types'

const getters = {
  [types.getters.GET_MAINTENANCE]: ({ maintenance }) => maintenance,
  [types.getters.GET_CASHOUT]: ({ cashout }) => cashout
}

export default getters
