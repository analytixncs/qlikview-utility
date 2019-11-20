import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import {
  editorHeaderHeight,
  variableSearchHeight
} from "../../styles/standardStyles";
import GroupCard from "./GroupCard";
import GroupSearch from "./GroupSearch";
import { loadQVWFields, selectAndFilterGroups } from "../../store/groupEditor";

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
  margin-top: calc(${variableSearchHeight} + 10px);
`;

function GroupMain() {
  const { selectedQVW } = useParams();
  const dispatch = useDispatch();
  const groupRecords = useSelector(state =>
    selectAndFilterGroups(state, selectedQVW)
  );
  // const groupRecords = useSelector(state =>
  //   state.groupEditor.groups.filter(group => group.application === selectedQVW)
  // );
  // Load application fields from JSON file
  useEffect(() => {
    dispatch(loadQVWFields(selectedQVW));
  }, [dispatch, selectedQVW]);

  return (
    <Wrapper>
      <GroupSearch selectedQVW={selectedQVW} />
      <div>
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
