import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";

import EditFieldModal from "./EditFieldModal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  border: 1px solid black;
`;
const AddButton = styled(Button)`
  width: 150px;
`;
const GroupFields = props => {
  let [showAddField, setShowAddField] = useState(false);
  return (
    <Wrapper>
      <h3>Fields</h3>
      {props.children}
      <AddButton
        icon="plus"
        type="primary"
        onClick={() => setShowAddField(true)}
      >
        Add Field
      </AddButton>
      <EditFieldModal
        show={showAddField}
        onCloseModal={() => setShowAddField(false)}
        onAddGroupField={props.onAddGroupField}
      />
    </Wrapper>
  );
};

export default GroupFields;
