import React from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";

import { Spacer } from "../../styles/standardStyles";

const Wrapper = styled.div``;
const GroupHeaderButtons = () => {
  let { selectedQVW } = useParams();
  let history = useHistory();
  return (
    <Wrapper>
      <Button
        icon="plus"
        type="primary"
        onClick={() => history.push(`/${selectedQVW}/groupeditor/addnew`)}
      >
        Add New Group
      </Button>
      <Spacer />
      <Button
        icon="export"
        type="primary"
        onClick={() => history.push(`/${selectedQVW}/groupeditor/export`)}
      >
        Export Groups
      </Button>
    </Wrapper>
  );
};

export default GroupHeaderButtons;
