import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

import VariableStateProvider from "../context/variableStateContext";
import EditorHeader from "./EditorHeader";
import VariableMain from "./VariableEditor/VariableMain";
import VariableAddNew from "./VariableEditor/VariableAddNewFormik";
import GroupEditor from "./GroupEditor/GroupMain";
import GroupEditorAddNew from "./GroupEditor/GroupEditorAddNew";
import ExportContainer from "./Exporting/ExportContainer";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditorContainer = props => {
  //console.log("editor container", props);
  return (
    <Wrapper>
      <EditorHeader />
      <Switch>
        <Route path="/:selectedQVW/export/:exportAppType">
          <ExportContainer />
        </Route>
        <Route path="/:selectedQVW/variableeditor/addnew">
          <VariableAddNew />
        </Route>
        <Route path="/:selectedQVW/variableeditor">
          <VariableStateProvider>
            <VariableMain />
          </VariableStateProvider>
        </Route>
        <Route path="/:selectedQVW/groupeditor/addnew">
          <GroupEditorAddNew />
        </Route>
        <Route path="/:selectedQVW/groupeditor">
          <GroupEditor />
        </Route>
      </Switch>
    </Wrapper>
  );
};

export default EditorContainer;
