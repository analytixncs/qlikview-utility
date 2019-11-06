import React, { useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import {
  editorHeaderHeight,
  variableSearchHeight,
  variableGroupTopMargin,
  editorBGColor
} from "../../styles/standardStyles";

import { selectQVWVariablesGrouped } from "../../store/variableEditor";
import { setGroupFilter } from "../../store/variableEditor";

import GroupHeader from "./GroupHeader";
import GroupVariables from "./GroupVariables";
import VariableSearch from "./VariableSearch";

const VarListWrapper = styled.div`
  margin: calc(
      ${variableSearchHeight} + ${editorHeaderHeight} +
        ${variableGroupTopMargin}
    )
    25px;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${editorBGColor};
  border: 1px solid gray;
  border-radius: 10px;
  margin-top: ${variableGroupTopMargin};
  padding: 5px 15px 15px 15px;
  box-shadow: 0px 3px 6px -1px rgba(0, 0, 0, 0.62);
  &:hover {
    box-shadow: 0px 3px 6px 2px rgba(0, 0, 0, 0.62);
  }
`;

function VariableMain(props) {
  let { selectedQVW } = useParams();
  // let [viewingId, setViewingId] = useState();
  // let [isEditing, setIsEditing] = useState(false);
  // let [isDirty, setIsDirty] = useState(false);

  // Get variables from store in format { group1: [array of variable object], group2: [...], ...}
  let groupedVars = useSelector(state =>
    selectQVWVariablesGrouped(state, selectedQVW)
  );
  return (
    <div>
      <VariableSearch selectedQVW={selectedQVW} />
      <VarListWrapper>
        {Object.keys(groupedVars).map(group => {
          return (
            <GroupWrapper key={group}>
              <GroupHeader group={group} />
              <GroupVariables
                variables={groupedVars[group]}
                // viewingId={viewingId}
                // setViewingId={setViewingId}
              />
            </GroupWrapper>
          );
        })}
      </VarListWrapper>
    </div>
  );
}

export default VariableMain;
