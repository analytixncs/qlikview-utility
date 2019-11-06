import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Icon } from "antd";
import handleimg from "../../images/drag_icon.png";

const Wrapper = styled.div`
  border: 1px solid lightgray;
  margin-bottom: 8px;
  border: 1px solid darkgray;
  display: flex;
  flex-direction: row;
`;

const FieldWrapper = styled.div`
  width: 100%;
`;
const Handle = styled.div`
  width: 25px;
  background-color: lightgray;
  background-image: url(${handleimg});
  background-size: 20px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: center;
`;

const Field = styled.div`
  border: 1px solid black;
  word-break: break-all;
  background-color: white;
`;

const GroupField = ({ field, index }) => {
  return (
    <Draggable draggableId={field.fieldName + index} index={index}>
      {provided => {
        return (
          <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
            <Handle {...provided.dragHandleProps}></Handle>
            <FieldWrapper>
              <Field>{field.fieldLabel}</Field>
              <Field>{field.fieldName}</Field>
            </FieldWrapper>
          </Wrapper>
        );
      }}
    </Draggable>
  );
};

export default GroupField;
