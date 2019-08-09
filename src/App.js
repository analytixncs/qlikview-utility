import React, { useState } from "react";
import styled from "styled-components";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";

import Main from "./components/Main";
import Settings from "./components/Settings";

import configureStore from "./store/configureStore";
import * as qvwActions from "./store/QVWs";

let Header = styled.div`
  font-size: 1.8rem;
  color: white;
  background-color: #282c34;
`;

function App() {
  // configure redux store
  let store = configureStore();
  // initialize store with application names
  store.dispatch(qvwActions.loadQVWNames());
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
