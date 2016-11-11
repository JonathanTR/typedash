import {combineReducers}   from 'redux';
import Immutable           from 'immutable';

import Types from './types';

const initialState = Immutable.fromJS({
  sessionLength: 60
});

function editor (state = initialState, action) {
  switch (action.type) {
    case Types.setSessionLength:
      return state.set('sessionLength', action.payload)

    default:
      return initialState
  }
};


export default editor