import {combineReducers}   from 'redux';
import Immutable           from 'immutable';

import Types from './types';

const initialState = Immutable.fromJS({
  message: 'Hello World!'
});

function helloWorld (state = initialState, action) {
  switch (action.type) {
    case Types.SET_MESSAGE:
      return state.set('message', action.payload)

    default:
      return initialState
  }
};




export default helloWorld
