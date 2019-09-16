import _ from "lodash";
import { createSelector } from "reselect";

//------------- Standard Selectors ----------------------------//
export const selectAllVariables = state => state.variableEditor.variables;
export const selectAllVariables2 = (state, props) => ({
  variables: state.variableEditor.variables,
  props
});

// ----------- ReSelect Selectors ---------------------------//
export const selectQVWVariables = createSelector(
  [selectAllVariables, (_, selectedQVW) => selectedQVW],
  (variables, selectedQVW) => {
    console.log("inselector", variables, selectedQVW);
    return _.filter(
      variables,
      variable => variable.application === selectedQVW
    );
  }
);

/**
 * ReSelect selector that returns variables for passed QVW grouped by the variables groups
 *  {
 *     group1: [{id, name, ...}, {id, name, ...}],
 *     group2: [{id, name, ...}, {id, name, ...}],
 *     ...
 *  }
 * @param object state
 * @param any selectedQVW
 * @returns object
 */
export const selectQVWVariablesGrouped = createSelector(
  [selectQVWVariables],
  variables => {
    return variables.reduce((groupedVars, variable) => {
      let groupName = variable.group;
      groupedVars[groupName] = [...(groupedVars[groupName] || ""), variable];
      return groupedVars;
    }, {});
  }
);

// export const selectQVWVariablesGrouped = (state, selectedQVW) => {
//   let qvwVariables = _.filter(
//     state.variableEditor.variables,
//     variable => variable.application === selectedQVW
//   );
//   console.log(qvwVariables);
//   return qvwVariables;
// };
