import React from "react";
import styled from "styled-components";

import EditorSidebar from "./EditorSidebar";
import EditorMain from "./EditorMain";

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
      <EditorMain />
    </Wrapper>
  );
};

export default EditorContainer;
