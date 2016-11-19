import {combineReducers}   from 'redux';
import Immutable           from 'immutable';

import Types from './types';

const initialState = Immutable.fromJS({
  passage: '',
  fadeDuration: 5,
});

const editor = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_FADE_DURATION:
      return state.set('fadeDuration', action.payload)

    case Types.SET_PASSAGE:
      return state.set('passage', action.payload)

    case Types.RESET_PASSAGE:
      return state.set('passage', '')

    default:
      return state
  }
};


export default editor
