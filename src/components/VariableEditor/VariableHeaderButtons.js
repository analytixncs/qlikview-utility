import React from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";

import { Spacer } from "../../styles/standardStyles";

const Wrapper = styled.div``;

const VariableHeaderButtons = () => {
  let { selectedQVW } = useParams();
  let history = useHistory();
  return (
    <Wrapper>
      <Button
        icon="plus"
        type="primary"
        onClick={() => history.push(`/${selectedQVW}/variableeditor/addnew`)}
      >
        Add New Variable
      </Button>
      <Spacer />
      <Button
        icon="export"
        type="primary"
        // onClick={() => history.push(`/${selectedQVW}/variableeditor/export`)}
        onClick={() => history.push(`/${selectedQVW}/export/variable`)}
      >
        Export Variables
      </Button>
    </Wrapper>
  );
};

export default VariableHeaderButtons;
