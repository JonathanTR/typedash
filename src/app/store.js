import {
  applyMiddleware,
  createStore,
  combineReducers
}                                     from "redux";
import thunk                          from "redux-thunk";

import main                           from "./reducer";
import editor                         from "./components/editor/reducer";

const app = combineReducers({
  main, editor
})

let store = applyMiddleware(thunk)(createStore)(app);

export default store
