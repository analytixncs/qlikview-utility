import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";

import EditorSidebar from "./EditorSidebar";
import EditorHeader from "./EditorHeader";
import VariableMain from "./VariableEditor/VariableMain";
import GroupEditor from "./GroupEditor/GroupMain";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditorContainer = props => {
  let selectedQVW = props.match.params.selectedQVW;
  //console.log("editor container", props);
  return (
    <Wrapper>
      <EditorHeader />
      <Route path="/:selectedQVW/variableeditor" component={VariableMain} />
      <Route path="/:selectedQVW/groupeditor" component={GroupEditor} />
    </Wrapper>
  );
};

export default EditorContainer;
