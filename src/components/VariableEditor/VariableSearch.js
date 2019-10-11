import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select } from "antd";
import styled from "styled-components";

import {
  setSearchTerm,
  setGroupFilter,
  selectQVWGroups,
  selectQVWVariablesStats
} from "../../store/variableEditor";
import {
  editorHeaderHeight,
  variableSearchHeight,
  filterBarBGColor
} from "../../styles/standardStyles";

const Sticky = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: ${filterBarBGColor};
  height: ${variableSearchHeight};
  padding: 5px 15px;
  position: fixed;
  top: ${editorHeaderHeight};
  width: 100%;
  z-index: 100;
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.57);
  border-bottom: 1px solid #0d47a1;
`;

const InputLabel = styled.label`
  font-weight: bold;
  padding-left: 4px;
`;

const Padder = styled.div`
  width: 20px;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
`;

const VariableSearch = props => {
  let dispatch = useDispatch();
  let searchTerm = useSelector(state => state.variableEditor.searchTerm) || "";
  let groupFilter =
    useSelector(state => state.variableEditor.groupFilter) || "";
  let qvwGroups = useSelector(state =>
    selectQVWGroups(state, props.selectedQVW)
  );
  let variableStats = useSelector(state =>
    selectQVWVariablesStats(state, props.selectedQVW)
  );
  return (
    <Sticky>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <InputLabel>Search Variable Names</InputLabel>
        <Input
          style={{ width: "250px" }}
          placeholder="Search by Variable Name"
          allowClear
          value={searchTerm}
          onChange={e => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
      <Padder />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <InputLabel>Group Filter</InputLabel>
        <Select
          style={{ width: "250px" }}
          onChange={value => dispatch(setGroupFilter(value))}
          allowClear
          value={groupFilter}
        >
          {qvwGroups.map(group => (
            <Select.Option key={group} value={group}>
              {group}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Padder />
      <Stats>
        <div>{variableStats.variableCount} - Variables</div>
        <div>{variableStats.groupCount} - Groups</div>
      </Stats>
    </Sticky>
  );
};

export default VariableSearch;
