import { createGlobalStyle } from "styled-components";
import { applicationBGColor } from "./standardStyles";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${applicationBGColor};
  }
`;

export default GlobalStyle;
