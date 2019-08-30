import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import { Init } from "./hooks/useInitMain";

import Main from "./components/Main";
import Settings from "./components/Settings";
import configureStore from "./store/configureStore";
import * as qvwActions from "./store/QVWs";

function App() {
  // configure redux store
  let store = configureStore();
  // initialize store with application names
  store.dispatch(qvwActions.loadQVWNames());
  Init(store.dispatch);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
