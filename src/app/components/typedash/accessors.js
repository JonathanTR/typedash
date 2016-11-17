export default {
  getIsInSession (state) {
    return state.typedash.get('isInSession')
  },

  getSessionLength (state) {
    return state.typedash.get('sessionLength')
  }
}
