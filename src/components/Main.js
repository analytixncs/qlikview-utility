import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import { baseColor } from "../styles/standardStyles";
import SelectApplicationQVW from "./SelectApplicationQVW";
import EditorContainer from "./EditorContainer";
import electron from "../electronExports";

const AppWrapper = styled.div`
  background-color: ${baseColor};
  /* needed this to deal with margin issue in SelectApplicationQVW component */
  /* border: 1px solid #8795a1; */
`;

export default function Main(props) {
  //console.log("in Main", props);
  useEffect(() => {
    // Listen for File/Settings Menu message from Main process
    electron.ipcRenderer.on("route-settings", (event, message) => {
      props.history.push("/settings");
    });
  }, []);
  return (
    <AppWrapper>
      <Route exact path="/" component={SelectApplicationQVW} />
      <Route path="/:selectedQVW" component={EditorContainer} />
    </AppWrapper>
  );
}
