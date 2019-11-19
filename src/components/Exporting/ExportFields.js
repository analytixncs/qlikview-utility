import React from "react";
import styled from "styled-components";

import { Droppable, Draggable } from "react-beautiful-dnd";

import ExportField from "./ExportField";

const FieldsContainer = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  padding: 15px;
  background-color: #ffecb3;
`;

const ExportFields = ({ exportFields, fieldState, setFieldState }) => {
  return (
    <Droppable droppableId="1">
      {provided => (
        <FieldsContainer ref={provided.innerRef} {...provided.droppableProps}>
          {exportFields.map((field, idx) => (
            <ExportField
              key={field}
              index={idx}
              field={field}
              fieldState={fieldState}
              setFieldState={setFieldState}
            />
          ))}
          {provided.placeholder}
        </FieldsContainer>
      )}
    </Droppable>
  );
};

export default ExportFields;

{
  /* <Checkbox
                    checked={fieldState[field]}
                    onChange={e =>
                      setFieldState(prevState => ({
                        ...prevState,
                        [field]: !prevState[field]
                      }))
                    }
                  >
                    {field}
                  </Checkbox> */
}
