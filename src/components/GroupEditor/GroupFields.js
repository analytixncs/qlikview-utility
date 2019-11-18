import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";

import EditFieldModal from "./EditFieldModal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  border: 1px solid black;
  padding: 5px 0 5px 5px;
  background-color: whitesmoke;
`;
const AddButton = styled(Button)`
  width: 150px;
  align-self: flex-end;
  margin-right: 5px;
  margin-bottom: 5px;
`;
const GroupFields = props => {
  let [showAddField, setShowAddField] = useState(false);
  return (
    <Wrapper>
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
