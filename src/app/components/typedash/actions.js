import Types from './types';

export default {
  setSessionLength(length) {
    return {
      type: Types.setSessionLength,
      payload: length
    }
  }
};
