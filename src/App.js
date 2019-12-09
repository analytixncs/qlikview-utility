import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import Main from "./components/Main";
import Settings from "./components/Settings";
import AppSettingsProvider from "./context/appSettingsContext";
import configureStore from "./store/configureStore";
import * as qvwActions from "./store/QVWs";
import * as varActions from "./store/variableEditor";
import * as groupActions from "./store/groupEditor";
import GlobalStyles from "./styles/globalStyles";

function App() {
  // configure redux store
  let store = configureStore();
  // initialize store with application names, all variables and all groups
  store.dispatch(qvwActions.loadQVWNames());
  store.dispatch(varActions.loadVariables());
  store.dispatch(groupActions.loadGroups());
  return (
    <Provider store={store}>
      <AppSettingsProvider>
        <Router>
          <Switch>
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Main} />
          </Switch>
          <GlobalStyles />
        </Router>
      </AppSettingsProvider>
    </Provider>
  );
}

export default App;
