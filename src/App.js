import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import { Init } from "./hooks/useInitMain";
import Main from "./components/Main";
import Settings from "./components/Settings";
import configureStore from "./store/configureStore";
import * as qvwActions from "./store/QVWs";
import GlobalStyles from "./styles/globalStyles";

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
        <GlobalStyles />
      </Router>
    </Provider>
  );
}

export default App;
