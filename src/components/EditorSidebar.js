import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { selectQVWVariablesGrouped } from "../store/variableEditor";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  border-right: 1px solid black;
  background-color: #f1f5f8;
  height: calc(100vh - 1px);
  position: fixed;
  left: 0;
  height: 100%;
  z-index: 100;
`;
const Editor = styled.a`
  padding: 10px;
  background-color: #b8c2cc;
  cursor: pointer;
  border-bottom: 1px solid #3d4852;
  &:hover {
    background-color: #8795a1;
  }
`;

const EditorSidebar = ({ history, location, match }) => {
  let { selectedQVW } = match.params;
  // Get variables from store in format { group1: [array of variable object], group2: [...], ...}
  let groupedVars = useSelector(state =>
    selectQVWVariablesGrouped(state, selectedQVW)
  );

  return (
    <Wrapper>
      <button onClick={() => history.push("/")}>Select QVW</button>
      <Editor onClick={() => history.push(`/${selectedQVW}/variableeditor`)}>
        Variable Editor
      </Editor>
      {groupedVars && Object.keys(groupedVars).map(group => <div>{group}</div>)}
      <Editor onClick={() => history.push(`/${selectedQVW}/groupeditor`)}>
        Group Editor
      </Editor>
    </Wrapper>
  );
};

export default withRouter(EditorSidebar);
