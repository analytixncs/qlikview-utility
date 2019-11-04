import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Button, Input, Select, Checkbox } from "antd";

import { useVariableStateSetters } from "../context/variableStateContext";
import { updateVariable, selectQVWGroups } from "../../store/variableEditor";
import { secondsTimeStampNow } from "../../dateHelpers";

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const morphLocked = keyframes`
  0% {background: rgba(224, 44, 47, 0.75); }
  100% {background: rgba(100, 181, 246, 0.75); }
`;
const morphUnLocked = keyframes`
  0% {background: rgba(100, 181, 246, 0.75); }
  100% {background: rgba(224, 44, 47, 0.75); }
`;

const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  padding: 5px;
  width: 150px;
  border: ${props => (props.isLocked ? "1px solid red" : "1px solid gray")};
  background-color: ${props =>
    props.isLocked ? "rgba(224, 44, 47, 0.75)" : "rgba(100, 181, 246, 0.75)"};
  animation: ${props => (props.isLocked ? morphUnLocked : morphLocked)} 1s
    linear;
`;
const Label = styled.div`
  font-weight: bold;
  margin-left: 6px;
  color: #4e5458;
  width: 20%;
`;

const ButtonGroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5px;
`;

const Spacer = styled.div`
  display: inline-block;
  width: 8px;
`;

function VariableEditable({ variable }) {
  let {
    id,
    group,
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

  let { setViewingId, setIsEditing, setIsDirty } = useVariableStateSetters();
  let { selectedQVW } = useParams();
  let dispatch = useDispatch();
  let groupsList = useSelector(state => selectQVWGroups(state, selectedQVW));
  let [newGroup, setNewGroup] = useState(group);
  let [newName, setNewName] = useState(name);
  let [newDescription, setNewDescription] = useState(description);
  let [newExpression, setNewExpression] = useState(expression);
  let [newNotes, setNewNotes] = useState(notes);
  let [newLocked, setNewLocked] = useState(locked);

  useEffect(() => {
    // every time user updates a field check to see if changed and set isDirty flag accordingly
    setIsDirty(
      group !== newGroup ||
        name !== newName ||
        description !== newDescription ||
        expression !== newExpression ||
        notes !== newNotes ||
        locked !== newLocked
    );
  }, [newGroup, newName, newDescription, newExpression, newNotes, newLocked]);

  // set dirty flag to false when exiting component
  useEffect(() => {
    return () => {
      setIsDirty(false);
    };
  }, []);

  const onSaveRecord = () => {
    let newVarRecord = {
      id,
      name: newName,
      group: newGroup,
      description: newDescription,
      expression: newExpression,
      notes: newNotes,
      locked: newLocked
    };
    dispatch(updateVariable(id, newVarRecord));
    setViewingId(undefined);
  };
  return (
    <React.Fragment>
      <Field>
        <Label> Name: </Label>
        <Input value={newName} onChange={e => setNewName(e.target.value)} />
      </Field>

      <Field>
        <Label> Group: </Label>
        <Select value={newGroup} onChange={setNewGroup}>
          {groupsList.map(group => (
            <Select.Option key={group}>{group}</Select.Option>
          ))}
        </Select>
      </Field>
      <Field>
        <Label> Description: </Label>
        <Input.TextArea
          rows={Math.ceil(newDescription.length / 80) || 2}
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
      </Field>
      <Field>
        <Label>Expression:</Label>
        <Input.TextArea
          rows={Math.ceil(newExpression.length / 80) || 2}
          style={{ fontFamily: `"Fira Code", monospace` }}
          value={newExpression}
          onChange={e => setNewExpression(e.target.value)}
        />
      </Field>
      <Field>
        <Label>Notes: </Label>
        <Input.TextArea
          rows={Math.ceil(newNotes.length / 80) || 2}
          value={newNotes}
          onChange={e => setNewNotes(e.target.value)}
        />
      </Field>
      <CheckWrapper isLocked={newLocked}>
        <Checkbox
          style={{ fontWeight: "bold" }}
          checked={newLocked}
          onChange={e => setNewLocked(e.target.checked)}
        >
          Lock?
        </Checkbox>
      </CheckWrapper>
      <ButtonGroupWrapper>
        <Button type="primary" onClick={onSaveRecord}>
          Save
        </Button>
        <Spacer />
        <Button type="primary" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </ButtonGroupWrapper>
    </React.Fragment>
  );
}

VariableEditable.propTypes = {
  variable: PropTypes.object
};

export default VariableEditable;
