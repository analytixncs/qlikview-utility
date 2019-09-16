import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectQVWVariablesGrouped } from "../../store/variableEditor";

import GroupHeader from "./GroupHeader";
import GroupVariables from "./GroupVariables";
import VariableSearch from "./VariableSearch";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 55px;
  margin-left: 150px;
`;

function VariableMain({ history, location, match }) {
  let { selectedQVW } = match.params;
  // Get variables from store in format { group1: [array of variable object], group2: [...], ...}
  let groupedVars = useSelector(state =>
    selectQVWVariablesGrouped(state, selectedQVW)
  );
  return (
    <div>
      <VariableSearch selectedQVW={selectedQVW} />

      {Object.keys(groupedVars).map(group => {
        return (
          <Wrapper key={group}>
            <GroupHeader group={group} />
            <GroupVariables variables={groupedVars[group]} />
          </Wrapper>
        );
      })}
    </div>
  );
}

export default VariableMain;
