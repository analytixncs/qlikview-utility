import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import {
  selectQVWVariables,
  selectQVWVariables2,
  selectQVWVariablesGrouped
} from "../../store/variableEditor";

function VariableMain({ history, location, match }) {
  let { selectedQVW } = match.params;
  // let variables = useSelector(state =>
  //   _.filter(
  //     state.variableEditor.variables,
  //     variable => variable.application === selectedQVW
  //   )
  // );
  // // let allVars = useSelector(state => state.variableEditor.variables);
  // let varsSelected = useSelector(state =>
  //   selectQVWVariables(state, selectedQVW)
  // );
  // console.log("VarMain-Variables", varsSelected);
  let groupedVars = useSelector(state =>
    selectQVWVariablesGrouped(state, selectedQVW)
  );
  console.log("groupedVars", groupedVars);
  return (
    <div>
      <div>VariableMain {match.params.selectedQVW}</div>
      {groupedVars.map(variable => (
        <div>{variable.name}</div>
      ))}
    </div>
  );
}

export default VariableMain;
