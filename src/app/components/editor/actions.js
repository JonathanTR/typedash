import Types from './types';

export default {
  setPassage(passage) {
    return {
      type: Types.SET_PASSAGE,
      payload: passage
    }
  }
};
