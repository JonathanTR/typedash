import Types from './types';

export default {
  setFadeDuration(seconds) {
    return {
      type: Types.SET_FADE_DURATION,
      payload: seconds
    }
  },

  setPassage(passage) {
    return {
      type: Types.SET_PASSAGE,
      payload: passage
    }
  }
};
