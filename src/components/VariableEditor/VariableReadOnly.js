import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "antd";
import { useVariableStateSetters } from "../context/variableStateContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #90caf9;
  border: 1px solid black;
  padding: 10px;
  width: 100%;
  margin-left: 2px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;
const Label = styled.div`
  font-weight: bold;
  margin-left: 8px;
  color: #4e5458;
  width: 20%;
`;
const Value = styled.div`
  color: #333d45;
  background-color: #dde7f0;
  font-family: ${props => (props.isCode ? '"Fira Code", monospace;' : "")};
  border: 1px solid #4e5458;
  padding: 8px;
  margin-left: 5px;
  width: 100%;
`;
const ButtonGroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 5px;
`;
const Spacer = styled.div`
  display: inline-block;
  width: 8px;
`;
const LockedWrapper = styled.div`
  display: ${props => (props.isLocked ? "block" : "none")};
  width: 150px;
  border: 1px solid gray;
  background: rgba(224, 44, 47, 0.75);
  padding: 8px;
  margin-left: 5px;
  font-weight: bold;
  &:after {
    content: "Locked";
  }
`;

function VariableReadOnly({ variable }) {
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

  let { setViewingId, setIsEditing } = useVariableStateSetters();

  return (
    <React.Fragment>
      <Field>
        <Label> Name: </Label> <Value>{name}</Value>
      </Field>
      <Field>
        <Label> Description: </Label> <Value>{description}</Value>
      </Field>
      <Field>
        <Label>Expression:</Label> <Value isCode>{expression}</Value>
      </Field>
      <Field>
        <Label>Notes: </Label> <Value>{notes}</Value>
      </Field>
      <Field>
        <LockedWrapper isLocked={locked} />
      </Field>
      <ButtonGroupWrapper>
        <div>
          <Button type="primary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Spacer />
          <Button type="primary" onClick={() => setViewingId(undefined)}>
            Close
          </Button>
        </div>
        <Button
          type="danger"
          onClick={() =>
            console.log("call the action creator for deleting var id", id)
          }
        >
          Delete
        </Button>
      </ButtonGroupWrapper>
    </React.Fragment>
  );
}

VariableReadOnly.propTypes = {
  variable: PropTypes.object
};

export default VariableReadOnly;
