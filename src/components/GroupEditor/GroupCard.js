import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { cardBGColor } from "../../styles/standardStyles";
import { updateGroup } from "../../store/groupEditor";
import GroupField from "./GroupField";
import { updateVariable } from "../../store/variableEditor";

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

const GroupCard = ({ groupRecord }) => {
  let { id, fields } = groupRecord;
  let dispatch = useDispatch();
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
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{groupRecord.groupName} </Title>
        <CloseButton icon="close" />
      </TitleWrapper>
      <div>
        <span>Type:</span>
        {groupRecord.groupType}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div>Fields</div>
        <Droppable droppableId={groupRecord.id}>
          {provided => {
            return (
              <Fields ref={provided.innerRef} {...provided.droppableProps}>
                {fields.map((field, idx) => (
                  <GroupField
                    key={field.fieldName + idx}
                    field={field}
                    index={idx}
                  />
                ))}
                {provided.placeholder}
              </Fields>
            );
          }}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

export default GroupCard;
