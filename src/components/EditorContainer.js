import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import EditorSidebar from "./EditorSidebar";
import EditorMain from "./EditorMain";

import VariableEditor from "./VariableEditor/VariableMain";
import GroupEditor from "./GroupEditor/GroupMain";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const EditorContainer = props => {
  let selectedQVW = props.match.params.selectedQVW;

  console.log("editor container", props);
  return (
    <Wrapper>
      <EditorSidebar />
      <Route path="/:selectedQVW/variableeditor" component={VariableEditor} />
      <Route path="/:selectedQVW/groupeditor" component={GroupEditor} />
    </Wrapper>
  );
};

export default EditorContainer;
