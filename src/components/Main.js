import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import GroupMain from "./GroupEditor/GroupMain";
import SelectApplicationQVW from "./SelectApplicationQVW";
import EditorContainer from "./EditorContainer";

const AppWrapper = styled.div`
  background-color: #696969;
  height: 100vh;
  border: 1px solid red;
`;

export default function Main(props) {
  console.log("in Main", props);
  return (
    <div>
      <AppWrapper>
        <Route exact path="/" component={SelectApplicationQVW} />
        <Route path="/:selectedQVW" component={EditorContainer} />
      </AppWrapper>
    </div>
  );
}
