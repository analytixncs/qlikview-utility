import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button, Icon } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { cardBGColor } from "../../styles/standardStyles";
import { updateGroup, deleteGroup } from "../../store/groupEditor";
import GroupField from "./GroupField";
import GroupFields from "./GroupFields";
import FieldEditable from "./FieldEditable";

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  background-color: ${cardBGColor};
  margin: 10px;
  width: 350px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #abbfcf;
  background-color: white;
  padding: 0 0 0 10px;
  border-radius: 5px 5px 0 0;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 0 5px 0 0;
  padding: 0 8px;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const InputGroup = styled.div`
  margin: 0 5px;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const FieldEditableStyled = styled(FieldEditable)`
  margin: 5px;
`;

const onUpdateGroupFields = (dispatch, id, groupRecord, newFieldObj) => {
  //let { fieldName, fieldLabel }  = newFieldObj;
  let existingFields = groupRecord.fields || [];
  let fields = [...existingFields, newFieldObj];
  let newGroupRecord = { ...groupRecord, fields };
  dispatch(updateGroup(id, newGroupRecord));
};

const GroupCard = ({ groupRecord }) => {
  let { id, fields } = groupRecord;
  let dispatch = useDispatch();

  //--------------------------------------
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const newFields = Array.from(fields);
    newFields.splice(source.index, 1);
    newFields.splice(destination.index, 0, fields[source.index]);
    fields = newFields;
    // Build updated groupRecord
    let newGroup = { ...groupRecord, fields: newFields };
    // Update group via redux
    dispatch(updateGroup(id, newGroup));
  };

  //--------------------------------------
  const onDeleteGroupField = fieldIdx => {
    let newFields = Array.from(fields);
    newFields.splice(fieldIdx, 1);
    let newGroupRecord = { ...groupRecord, fields: newFields };
    dispatch(updateGroup(id, newGroupRecord));
  };
  const onUpdateGroupFieldLabel = (fieldIdx, newLabel) => {
    let newFields = Array.from(fields);
    let updatedField = { ...newFields[fieldIdx] };
    updatedField.fieldLabel = newLabel;
    newFields.splice(fieldIdx, 1, updatedField);
    let newGroupRecord = { ...groupRecord, fields: newFields };
    dispatch(updateGroup(id, newGroupRecord));
  };
  const onUpdateGroupFieldName = (fieldIdx, newName) => {
    let newFields = Array.from(fields);
    let updatedField = { ...newFields[fieldIdx] };
    updatedField.fieldName = newName;
    newFields.splice(fieldIdx, 1, updatedField);
    let newGroupRecord = { ...groupRecord, fields: newFields };
    dispatch(updateGroup(id, newGroupRecord));
  };
  //---------------------------------------
  const updateGroupName = newGroupName => {
    let newGroupRecord = { ...groupRecord, groupName: newGroupName };
    dispatch(updateGroup(id, newGroupRecord));
  };
  //---------------------------------------
  const updateGroupType = newGroupType => {
    let newGroupRecord = { ...groupRecord, groupType: newGroupType };
    dispatch(updateGroup(id, newGroupRecord));
  };
  //---------------------------------------
  const updateGroupNotes = newGroupNotes => {
    let newGroupRecord = { ...groupRecord, groupNotes: newGroupNotes };
    dispatch(updateGroup(id, newGroupRecord));
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>
          <FieldEditableStyled
            passedFieldValue={groupRecord.groupName || "  "}
            inputType="input"
            placeholder="Enter Group Name..."
            onSave={newGroupName => updateGroupName(newGroupName)}
          />
        </Title>
        {/* <CloseButton icon="close" onClick={() => dispatch(deleteGroup(id))} /> */}
        <CloseButton onClick={() => dispatch(deleteGroup(id))}>
          <Icon type="close" />
        </CloseButton>
      </TitleWrapper>

      <InputGroup>
        <Label>Type:</Label>
        <div style={{ margin: "5px" }}>
          <FieldEditable
            passedFieldValue={groupRecord.groupType}
            allowPickListSearch
            pickListValues={[
              { label: "Cyclic", key: "Cyclic" },
              { label: "Drill", key: "Drill" }
            ]}
            inputType="select"
            borderStyle="1px solid gray"
            onSave={newGroupType => updateGroupType(newGroupType)}
          />
        </div>
      </InputGroup>

      <InputGroup>
        <Label>Fields:</Label>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={groupRecord.id}>
            {provided => {
              return (
                <GroupFields
                  onAddGroupField={fieldObj =>
                    onUpdateGroupFields(dispatch, id, groupRecord, fieldObj)
                  }
                >
                  <Fields ref={provided.innerRef} {...provided.droppableProps}>
                    {fields &&
                      fields.map((field, idx) => (
                        <GroupField
                          key={field.fieldName + idx}
                          field={field}
                          index={idx}
                          onDeleteGroupField={onDeleteGroupField}
                          onUpdateGroupFieldLabel={onUpdateGroupFieldLabel}
                          onUpdateGroupFieldName={onUpdateGroupFieldName}
                        />
                      ))}
                    {provided.placeholder}
                  </Fields>
                </GroupFields>
              );
            }}
          </Droppable>
        </DragDropContext>
      </InputGroup>
      <InputGroup>
        <Label>Notes:</Label>
        <FieldEditableStyled
          passedFieldValue={groupRecord.groupNotes || ""}
          inputType="textarea"
          placeholder="Enter Group Notes..."
          borderStyle="1px solid gray"
          onSave={newGroupNotes => updateGroupNotes(newGroupNotes)}
        />
      </InputGroup>
    </Wrapper>
  );
};

export default GroupCard;
