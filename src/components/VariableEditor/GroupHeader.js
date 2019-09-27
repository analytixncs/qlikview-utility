import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { setGroupFilter } from "../../store/variableEditor";
import {
  editorHeaderHeight,
  variableSearchHeight
} from "../../styles/standardStyles";

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 4px;
`;

const GroupHeader = ({ group }) => {
  let dispatch = useDispatch();
  let groupFilter = useSelector(state => state.variableEditor.groupFilter);

  const onSetGroupFilter = () => {
    if (groupFilter === group) {
      dispatch(setGroupFilter(undefined));
    } else {
      dispatch(setGroupFilter(group));
    }
  };

  return (
    <Header>
      <a onClick={onSetGroupFilter}>{group}</a>
    </Header>
  );
};

export default GroupHeader;
