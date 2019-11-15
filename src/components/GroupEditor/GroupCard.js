import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { cardBGColor } from "../../styles/standardStyles";
import { updateGroup, deleteGroup } from "../../store/groupEditor";
import GroupField from "./GroupField";
import GroupFields from "./GroupFields";
import FieldItem from "./FieldItem";
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
`;

const CloseButton = styled(Button)`
  border: 0;
  border-radius: 0 5px 0 0;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
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
          <FieldItem
            fieldValue={groupRecord.groupName}
            customClass="gc-title"
            inputType="input"
            onSave={newGroupName => updateGroupName(newGroupName)}
          />
        </Title>
        <CloseButton icon="close" onClick={() => dispatch(deleteGroup(id))} />
      </TitleWrapper>
      <div>
        <span>Type:</span>
        <FieldItem
          fieldValue={groupRecord.groupType}
          customClass="gc-title"
          showPickList
          pickListValues={[
            { label: "Cyclic", key: "Cyclic" },
            { label: "Drill", key: "Drill" }
          ]}
          inputType="select"
          onSave={newGroupType => updateGroupType(newGroupType)}
        />
        {/* --FIELD EDITABLE-- */}
        <FieldEditable
          passedFieldValue={groupRecord.groupType}
          customClass="gc-title"
          allowPickListSearch
          pickListValues={[
            { label: "Cyclic", key: "Cyclic" },
            { label: "Drill", key: "Drill" }
          ]}
          inputType="select"
          onSave={newGroupType => updateGroupType(newGroupType)}
        />
      </div>

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
                      />
                    ))}
                  {provided.placeholder}
                </Fields>
              </GroupFields>
            );
          }}
        </Droppable>
      </DragDropContext>
      <div>
        <FieldItem
          fieldValue={groupRecord.groupNotes || "  "}
          customClass="gc-title"
          inputType="textarea"
          placeholder="Group Notes"
          onSave={newGroupNotes => updateGroupNotes(newGroupNotes)}
        />
        <FieldEditable
          passedFieldValue={groupRecord.groupNotes || "  "}
          inputType="textarea"
          placeholder="Group Notes"
          onSave={newGroupNotes => updateGroupNotes(newGroupNotes)}
        />
      </div>
    </Wrapper>
  );
};

export default GroupCard;
