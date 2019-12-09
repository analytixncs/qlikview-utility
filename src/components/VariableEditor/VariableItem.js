import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon, Tooltip } from "antd";

import {
  useVariableStateSetters,
  useVariableState
} from "../../context/variableStateContext";

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  background-color: #64b5f6;
  cursor: pointer;
  margin: 4px;
  padding: 4px;
  width: 250px;
`;

const VariableName = styled.div`
  display: inline-block;
  margin-left: 5px;
  font-weight: bold;
  width: 215px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const VariableItem = ({ variable }) => {
  let { id, name, description, locked } = variable;
  let { setViewingId } = useVariableStateSetters();
  let { isEditing, isDirty } = useVariableState();
  // onClick on Wrapper is to make sure click on variable div doesn't bubble up to enclosing divs onclick handler
  // which sets the groupFilter
  return (
    <Tooltip title={`${name} -- ${description}`} mouseEnterDelay={0.8}>
      <Wrapper
        onClick={e => {
          e.stopPropagation();
          if (isEditing && isDirty) {
            alert(`Please close your current editing of Variable`);
          } else {
            setViewingId(id);
          }
        }}
      >
        {locked && <Icon type="lock" style={{ color: "red" }} />}
        <VariableName>{name}</VariableName>
      </Wrapper>
    </Tooltip>
  );
};

VariableItem.propTypes = {
  variable: PropTypes.object,
  setViewingId: PropTypes.func
};
export default VariableItem;
