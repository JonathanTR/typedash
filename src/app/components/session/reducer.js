import {combineReducers}   from 'redux';
import Immutable           from 'immutable';

import Types from './types';

const initialState = Immutable.fromJS({
  isInSession: false,
  sessionLength: 60,
});

const session = (state = initialState, action) => {
  console.log(action.type, action.payload)
  switch (action.type) {
    case Types.setIsInSession:
      return state.set('isInSession', action.payload)

    case Types.setSessionLength:
      return state.set('sessionLength', action.payload)

    default:
      return state
  }
};


export default session
