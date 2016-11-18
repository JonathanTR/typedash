import {combineReducers}   from 'redux';
import Immutable           from 'immutable';

import Types from './types';

const initialState = Immutable.fromJS({
  isEnabled: false,
  isInSession: false,
  sessionLength: 300,
  wordCountGoal: 100,
});

const session = (state = initialState, action) => {
  switch (action.type) {
    case Types.setIsEnabled:
      return state.set('isEnabled', action.payload)

    case Types.setIsInSession:
      return state.set('isInSession', action.payload)

    case Types.setSessionLength:
      return state.set('sessionLength', action.payload)

    case Types.setWordCountGoal:
      return state.set('wordCountGoal', action.payload)

    default:
      return state
  }
};


export default session
