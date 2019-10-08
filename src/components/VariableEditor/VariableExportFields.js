import React from "react";
import styled from "styled-components";

import { Droppable, Draggable } from "react-beautiful-dnd";

import VariableExportField from "./VariableExportField";

const FieldsContainer = styled.div`
  border: 1px solid black;
  padding: 5px;
`;

const VariableExportFields = ({
  variableFields,
  fieldState,
  setFieldState
}) => {
  return (
    <Droppable droppableId="1">
      {provided => (
        <FieldsContainer ref={provided.innerRef} {...provided.droppableProps}>
          {variableFields.map((field, idx) => (
            <VariableExportField
              key={idx}
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

export default VariableExportFields;

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
