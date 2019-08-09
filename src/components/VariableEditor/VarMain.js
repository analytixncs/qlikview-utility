import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import SelectApplication from "./SelectQVW";
const QVWSelection = createSelector(
  state => state.QVWs,
  QVWs => QVWs
);
function VarMain(props) {
  // const QVWs = useSelector(state => state.QVWs);
  console.log(QVWSelection);
  const QVWs = useSelector(QVWSelection);
  console.log(QVWs);
  return (
    <div>
      <h1>Variable Editor Main</h1>
      <SelectApplication QVWs={QVWs} />
    </div>
  );
}

VarMain.propTypes = {};

export default VarMain;
