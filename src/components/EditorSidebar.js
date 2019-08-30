import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { map } from "bluebird-lst";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  border-right: 1px solid black;
  background-color: #f1f5f8;
  height: calc(100vh - 1px);
`;
const Editor = styled.div`
  padding: 10px;
  background-color: #b8c2cc;
  cursor: pointer;
  border-bottom: 1px solid #3d4852;
  &:hover {
    background-color: #8795a1;
  }
`;

const EditorSidebar = props => {
  const { variables, loading } = useSelector(state => ({
    variables: state.variableEditor.variables,
    loading: state.variableEditor.loading
  }));
  console.log(variables);
  return (
    <Wrapper>
      <button onClick={() => props.history.goBack()}>Back</button>
      <Editor>Variable Editor</Editor>
      {!loading && variables.map(variable => <div>{variable.name}</div>)}
      <Editor>Group Editor</Editor>
    </Wrapper>
  );
};

export default withRouter(EditorSidebar);
