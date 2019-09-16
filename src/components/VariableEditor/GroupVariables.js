import React from "react";
import styled from "styled-components";

import VariableItem from "./VariableItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const GroupVariables = ({ variables }) => {
  return (
    <Wrapper>
      {variables.map(variable => (
        <VariableItem key={variable.id} variable={variable} />
      ))}
    </Wrapper>
  );
};

export default GroupVariables;
