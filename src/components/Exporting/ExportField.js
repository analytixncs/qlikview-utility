import React from "react";
import styled from "styled-components";
import { Checkbox } from "antd";
import { Draggable } from "react-beautiful-dnd";

const Box = styled.div`
  border: 1px solid gray;
  padding: 5px;
  background-color: white;
  width: 200px;
  margin-bottom: 5px;
`;

const ExportField = props => {
  let { index, field, fieldState, setFieldState } = props;
  // let { name: field, pos } = fieldObj;
  return (
    <Draggable draggableId={field} index={index}>
      {provided => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Checkbox
            checked={fieldState[field]}
            onChange={e =>
              setFieldState(prevState => ({
                ...prevState,
                [field]: !prevState[field]
              }))
            }
          >
            {field}
          </Checkbox>
        </Box>
      )}
    </Draggable>
  );
};

export default ExportField;
