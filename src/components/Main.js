import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import GroupMain from "./GroupEditor/GroupMain";
import SelectApplicationQVW from "./SelectApplicationQVW";
import EditorContainer from "./EditorContainer";

const AppWrapper = styled.div`
  background-color: #8795a1;
  height: 100vh;
  /* needed this to deal with margin issue in SelectApplicationQVW component */
  border: 1px solid #8795a1;
`;

export default function Main(props) {
  console.log("in Main", props);
  return (
    <AppWrapper>
      <Route exact path="/" component={SelectApplicationQVW} />
      <Route path="/:selectedQVW" component={EditorContainer} />
    </AppWrapper>
  );
}
