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
};
