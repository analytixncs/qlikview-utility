import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";

import VariableEditor from "./VariableEditor/VariableMain";
import GroupEditor from "./GroupEditor/GroupMain";

const Wrapper = styled.div`
  display: flex;
  background-color: #f8fafc;
  width: 100%;
`;
const EditorMain = () => {
  return (
    <Wrapper>
      <div>Editor Main</div>
      <Route path="/:selectedQVW/variableeditor" component={VariableEditor} />
      <Route path="/:selectedQVW/groupeditor" component={GroupEditor} />
    </Wrapper>
  );
};

export default EditorMain;
