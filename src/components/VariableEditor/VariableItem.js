import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  background-color: #e1bee7;
  margin: 4px;
  padding: 4px;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const VariableItem = ({ variable }) => {
  let {
    id,
    name,
    description,
    expression,
    locked,
    notes,
    createDate,
    createUser,
    modifyDate,
    modifyUser
  } = variable;
  return <Wrapper>{name}</Wrapper>;
};

export default VariableItem;
