import {
  applyMiddleware,
  createStore,
  combineReducers
}                                     from "redux";
import thunk                          from "redux-thunk";

import helloWorld                     from "./components/helloWorld/reducer";

const app = combineReducers({
  'hello': helloWorld
})

let store = applyMiddleware(thunk)(createStore)(app);

export default store
