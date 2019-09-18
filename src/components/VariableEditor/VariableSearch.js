import React from "react";
import styled from "styled-components";

const Sticky = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: lightgray;
  height: 55px;
  padding: 10px;
  position: fixed;
  top: 40px;
  width: 100%;
  z-index: 100;
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.57);
  border-bottom: 1px solid #0d47a1;
`;

const VariableSearch = props => {
  return (
    <Sticky>
      <h1>{props.selectedQVW}</h1>
    </Sticky>
  );
};

export default VariableSearch;
