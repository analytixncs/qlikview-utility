import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { Button, Icon } from "antd";

import handleimg from "../../images/drag_icon.png";
import FieldEditable from "./FieldEditable";

const Wrapper = styled.div`
  border: 1px solid lightgray;
  margin-bottom: 8px;
  border: 1px solid darkgray;
  display: flex;
  flex-direction: row;
`;

const FieldWrapper = styled.div`
  width: 100%;
  cursor: default;
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

const DeleteButton = styled.div`
  width: 25px;
  background-color: #ff4d4f;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  cursor: pointer;
`;

const GroupField = ({
  field,
  index,
  onDeleteGroupField,
  onUpdateGroupFieldName,
  onUpdateGroupFieldLabel
}) => {
  let qvwFields = useSelector(state => state.groupEditor.qvwFields);
  let formattedQVWFields =
    qvwFields &&
    qvwFields.map(field => ({
      label: field.field,
      key: field.field
    }));
  return (
    <Draggable draggableId={field.fieldName + index} index={index}>
      {provided => {
        return (
          <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
            <Handle {...provided.dragHandleProps}></Handle>
            <FieldWrapper>
              <FieldEditable
                passedFieldValue={field.fieldLabel}
                inputType="input"
                placeholder="Field Label"
                borderStyle="1px solid gray"
                onSave={newFieldLabel =>
                  onUpdateGroupFieldLabel(index, newFieldLabel)
                }
              />
              <FieldEditable
                passedFieldValue={field.fieldName}
                inputType="select"
                placeholder="Field Name"
                borderStyle="1px solid gray"
                allowPickListSearch
                pickListValues={formattedQVWFields}
                onSave={newFieldName =>
                  onUpdateGroupFieldName(index, newFieldName)
                }
              />
            </FieldWrapper>
            <DeleteButton onClick={() => onDeleteGroupField(index)}>
              <Icon type="close" />
            </DeleteButton>
          </Wrapper>
        );
      }}
    </Draggable>
  );
};

export default GroupField;
