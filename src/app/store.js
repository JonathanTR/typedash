import {
  applyMiddleware,
  createStore,
  combineReducers
}                                     from "redux";
import thunk                          from "redux-thunk";

import session                        from "./components/session/reducer";
import editor                         from "./components/editor/reducer";

const app = combineReducers({
  session,
  editor
})

let store = applyMiddleware(thunk)(createStore)(app);

export default store
