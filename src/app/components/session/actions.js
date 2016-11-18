import Types from './types';

export default {
  setIsEnabled(bool) {
    return {
      type: Types.setIsEnabled,
      payload: bool
    }
  },

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
