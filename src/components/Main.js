import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import VarMain from "./VariableEditor/VarMain";
import GroupMain from "./GroupEditor/GroupMain";

const AppWrapper = styled.div`
  margin-top: 50px;
`;

export default function Main() {
  return (
    <div>
      <Header />
      <AppWrapper>
        <Route path="/vareditor" component={VarMain} />
        <Route path="/groupeditor" component={GroupMain} />
      </AppWrapper>
    </div>
  );
}
