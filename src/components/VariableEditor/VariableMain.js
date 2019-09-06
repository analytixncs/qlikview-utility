import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";

function VariableMain({ history, location, match }) {
  let { selectedQVW } = match.params;
  let variables = useSelector(state =>
    _.filter(
      state.variableEditor.variables,
      variable => variable.application === selectedQVW
    )
  );
  let allVars = useSelector(state => state.variableEditor.variables);
  console.log("VarMain-Variables", variables);
  return (
    <div>
      <div>VariableMain {match.params.selectedQVW}</div>
      {variables.map(variable => (
        <div>{variable.name}</div>
      ))}
    </div>
  );
}

export default VariableMain;
