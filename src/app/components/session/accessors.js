export default {
  getIsEnabled (state) {
    return state.session.get('isEnabled')
  },

  getIsInSession (state) {
    return state.session.get('isInSession')
  },

  getSessionLength (state) {
    return state.session.get('sessionLength')
  },

  getWordCountGoal (state) {
    return state.session.get('wordCountGoal')
  },
}
