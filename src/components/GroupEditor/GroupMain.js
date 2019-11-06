import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { editorHeaderHeight, cardBGColor } from "../../styles/standardStyles";
import GroupCard from "./GroupCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${editorHeaderHeight};
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px;
`;

function GroupMain() {
  const history = useHistory();
  const { selectedQVW } = useParams();
  const groupRecords = useSelector(state =>
    state.groupEditor.groups.filter(group => group.application === selectedQVW)
  );
  console.log("GroupMain", groupRecords);
  return (
    <Wrapper>
      <h1>Group Editor Main</h1>
      <div>
        <h2>In Development</h2>
        <GroupWrapper>
          {groupRecords.map(groupRecord => {
            return <GroupCard key={groupRecord.id} groupRecord={groupRecord} />;
          })}
        </GroupWrapper>
      </div>
    </Wrapper>
  );
}

GroupMain.propTypes = {};

export default GroupMain;
