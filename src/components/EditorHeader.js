import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Button, Icon } from "antd";
import {
  editorHeaderHeight,
  mainHeaderBGColor
} from "../styles/standardStyles";
import VariableHeaderButtons from "./VariableEditor/VariableHeaderButtons";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 200;
  flex-direction: row;
  height: ${editorHeaderHeight};
  align-items: center;
  background: ${mainHeaderBGColor};
  padding-left: 10px;
  top: 0;
  width: 100%;
  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.57);
  border-bottom: 1px solid #0d47a1;
`;
const Editor = styled.a`
  display: block;
  padding: 5px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
  &:hover {
    background-color: #64b5f6;
    color: rgba(0, 0, 0, 0.95);
    transition: all 0.4s;
  }
`;
const Menu = styled.div`
  display: ${props => (props.isOpen ? "" : "none")};
  opacity: ${props => (props.isOpen ? "1" : "0")};
  position: absolute;
  top: 35px;
  border: 1px solid gray;
  background: aliceblue;
  width: 150px;
  border-radius: 4px;
  z-index: 1000;
  transition: all 0.3s;
  box-shadow: 0px 6px 5px -2px rgba(0, 0, 0, 0.57);
`;
const Title = styled.div`
  margin: 0 25px;
  font-size: 1.4rem;
  font-weight: bold;
`;

const EditorHeader = ({ history, location, match }) => {
  let [menuOpen, setMenuOpen] = useState(false);
  let { selectedQVW } = match.params;
  // Get variables from store in format { group1: [array of variable object], group2: [...], ...}
  // let groupedVars = useSelector(state =>
  //   selectQVWVariablesGrouped(state, selectedQVW)
  // );
  console.log("location", location.pathname);
  let activeEditor = location.pathname.split("/").includes("variableeditor")
    ? "Variable Editor"
    : location.pathname.split("/").includes("groupeditor")
    ? "Group Editor"
    : "";

  const openVariableEditor = () => {
    history.push(`/${selectedQVW}/variableeditor`);
    setMenuOpen(false);
  };
  const openGroupEditor = () => {
    history.push(`/${selectedQVW}/groupeditor`);
    setMenuOpen(false);
  };
  const openSelectQVW = () => {
    history.push(`/`);
    setMenuOpen(false);
  };
  return (
    <Wrapper onClick={() => setMenuOpen(false)}>
      <Menu isOpen={menuOpen}>
        <Editor onClick={openVariableEditor}>Variable Editor</Editor>
        <Editor onClick={openGroupEditor}>Group Editor</Editor>
        <Editor onClick={openSelectQVW}>Select QVW</Editor>
      </Menu>
      <Button
        icon="menu"
        onClick={e => {
          e.stopPropagation();
          setMenuOpen(menuOpen => !menuOpen);
        }}
      />

      <Title>{`${selectedQVW} ${activeEditor}`}</Title>
      <VariableHeaderButtons />
    </Wrapper>
  );
};

export default withRouter(EditorHeader);
