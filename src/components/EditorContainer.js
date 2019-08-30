import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { useInitializer } from "../hooks/useInitializer";

import EditorSidebar from "./EditorSidebar";
import EditorMain from "./EditorMain";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const EditorContainer = props => {
  let selectedQVW = props.match.params.selectedQVW;
  let dispatch = useDispatch();
  //let loading = useInitializer(selectedQVW);

  console.log("editor container", props);
  return (
    <Wrapper>
      <EditorSidebar />
      <EditorMain />
    </Wrapper>
  );
};

export default EditorContainer;
