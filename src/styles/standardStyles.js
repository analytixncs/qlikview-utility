import styled from "styled-components";

//================================================
// - CONSTANTS ----
//================================================
// -- COLORS --
export const applicationBGColor = "#bbdefb";
export const contentBgColor = "#e3f2fd";
export const mainHeaderBGColor = "#64b5f6";
export const mainHeaderFontColor = "black";
export const filterBarBGColor = "lightgray";
export const filterBarFontColor = "black";

// -- DIMENSIONS --
export const editorHeaderHeight = "50px";
export const variableSearchHeight = "75px"; //VariableSearch.js
export const variableGroupTopMargin = "15px"; //VariableSearch.js

//================================================
// - Styled Components  ----
//================================================
export const Spacer = styled.div`
  display: inline-block;
  width: ${props => props.width || 8}px;
  height: ${props => props.height || 8}px;
`;
