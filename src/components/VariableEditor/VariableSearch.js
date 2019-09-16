import React from "react";
import styled from "styled-components";

const Sticky = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: lightgray;
  height: 55px;
  border-bottom: 2px solid gray;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  margin-left: 150px;
`;

const VariableSearch = props => {
  return (
    <Sticky>
      <h1>{props.selectedQVW}</h1>
    </Sticky>
  );
};

export default VariableSearch;
