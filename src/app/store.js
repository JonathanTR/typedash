import {
  applyMiddleware,
  createStore,
  combineReducers
}                                     from "redux";
import thunk                          from "redux-thunk";

import editor                         from "./components/editor/reducer";

const app = combineReducers({
  editor
})

let store = applyMiddleware(thunk)(createStore)(app);

export default store
