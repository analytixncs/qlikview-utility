import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import appStateReducer from "./appState";
import QVWsReducer from "./QVWs";
import variableEditorReducer from "./variableEditor";
import groupEditorReducer from "./groupEditor";

export default function configureStore() {
  // combine reducers
  const reducer = combineReducers({
    appState: appStateReducer,
    variableEditor: variableEditorReducer,
    groupEditor: groupEditorReducer,
    QVWs: QVWsReducer
  });
  // Middleware to only be used in development
  const devMiddleware =
    process.env.NODE_ENV !== "production"
      ? [require("redux-immutable-state-invariant").default()]
      : null;

  // If you don't need to use redux dev tools
  //return createStore(rootReducer, applyMiddleware(thunk));
  let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(...devMiddleware, thunk))
  );
}
