import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as actions from "../store/variableEditor";
import EditorSidebar from "./EditorSidebar";
import EditorMain from "./EditorMain";

const EditorContainer = props => {
  let selectedQVW = props.match.params.selectedQVW;
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.loadVariables(selectedQVW));
    return () => dispatch(actions.clearVariables());
  }, [selectedQVW]);

  console.log("editor main", props);
  return (
    <div>
      Editor Main
      <button onClick={() => props.history.goBack()}>Back</button>
      <EditorSidebar />
      <EditorMain />
    </div>
  );
};

export default EditorContainer;
