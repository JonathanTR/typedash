import {combineReducers}   from 'redux';
import Immutable           from 'immutable';

import Types from './types';

const initialState = Immutable.fromJS({
  passage: ''
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
