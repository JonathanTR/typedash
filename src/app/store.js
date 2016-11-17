import {
  applyMiddleware,
  createStore,
  combineReducers
}                                     from "redux";
import thunk                          from "redux-thunk";

import typedash                       from "./components/typedash/reducer";
import editor                         from "./components/editor/reducer";

const app = combineReducers({
  typedash,
  editor
})

let store = applyMiddleware(thunk)(createStore)(app);

export default store
