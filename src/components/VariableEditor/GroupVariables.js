import React, { useState } from "react";
import styled from "styled-components";

import {
  useVariableState,
  useVariableStateSetters
} from "../../context/variableStateContext";
import VariableItem from "./VariableItem";
import VariableEditable from "./VariableEditable";
import VariableReadOnly from "./VariableReadOnly";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const VariableViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #90caf9;
  border: 1px dashed black;
  padding: 10px;
  width: 100%;
  margin-left: 2px;
`;

const GroupVariables = ({ variables }) => {
  let varState = useVariableState();
  // let varSetters = useVariableStateSetters();
  const getVariableJSX = variable => {
    if (variable.id === varState.viewingId) {
      if (varState.isEditing) {
        return (
          <VariableViewerWrapper key={variable.id}>
            <VariableEditable variable={variable} />
          </VariableViewerWrapper>
        );
      }
      return (
        <VariableViewerWrapper key={variable.id}>
          <VariableReadOnly variable={variable} />
        </VariableViewerWrapper>
      );
    }
    return (
      <VariableItem
        key={variable.id}
        variable={variable}
        // setViewingId={varSetters.setViewingId}
      />
    );
  };
  return (
    <Wrapper>
      {variables.map(variable => {
        return getVariableJSX(variable);
      })}
    </Wrapper>
  );
};

export default GroupVariables;
