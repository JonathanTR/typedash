import Types from './types';

export function setMessage(message) {
  return {
    type: Types.SET_MESSAGE,
    payload: message
  }
};
