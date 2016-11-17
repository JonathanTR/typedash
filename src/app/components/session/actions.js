import Types from './types';

export default {
  setIsInSession(bool) {
    return {
      type: Types.setIsInSession,
      payload: bool
    }
  },

  setSessionLength(length) {
    return {
      type: Types.setSessionLength,
      payload: length
    }
  },

  setWordCountGoal(wordCount) {
    return {
      type: Types.setWordCountGoal,
      payload: wordCount
    }
  },
};
