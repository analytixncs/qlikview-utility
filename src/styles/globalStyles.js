import { createGlobalStyle } from "styled-components";
import { baseColor } from "./standardStyles";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${baseColor};
  }
`;

export default GlobalStyle;
