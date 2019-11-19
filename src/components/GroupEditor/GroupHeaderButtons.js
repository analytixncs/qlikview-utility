import React from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";

import { Spacer } from "../../styles/standardStyles";

const Wrapper = styled.div``;
const GroupHeaderButtons = () => {
  let { selectedQVW } = useParams();
  let match = useRouteMatch();
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
        onClick={() => history.push(`/${selectedQVW}/export/group`)}
      >
        Export Groups
      </Button>
    </Wrapper>
  );
};

export default GroupHeaderButtons;
