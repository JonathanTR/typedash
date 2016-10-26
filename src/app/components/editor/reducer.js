import {combineReducers}   from 'redux';
import Immutable           from 'immutable';

import Types from './types';

const initialState = Immutable.fromJS({
  passage: 'A screaming comes across the sky. It has happened before, but there is nothing to compare it to now.'
});

function editor (state = initialState, action) {
  switch (action.type) {
    case Types.SET_PASSAGE:
      return state.set('passage', action.payload)

    default:
      return initialState
  }
};


export default editor
