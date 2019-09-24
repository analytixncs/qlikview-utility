import _ from "lodash";
import _fp from "lodash/fp";

import { createSelector } from "reselect";

//------------- Standard Selectors ----------------------------//
export const selectAllVariables = state => state.variableEditor.variables;
export const selectAllVariables2 = (state, props) => ({
  variables: state.variableEditor.variables,
  props
});

// ----------- ReSelect Selectors ---------------------------//
/**
 * ReSelect selector that returns array of variable objects for passed QVW
 * Used as input selector for the selectQVWVariablesGrouped
 * This selector also filters based on the searchTerm and groupFilter that are stored in redux store
 * The array of selectors includes first "selectAllVariables" which is a simple selector
 * that returns state.variableEditor.variables
 * The next selector is a function that is used to extract the selectedQVW Parameter from the calling function
 * and to pull the searchTerm and groupFilter from the state and returns an object with this data:
 * { searchTerm, groupFilter, selectedQVW }
 *
 * How to use:
 * selectQVWVariables(state, selectedQVW)
 */
export const selectQVWVariables = createSelector(
  [
    selectAllVariables,
    (state, selectedQVW) => ({
      searchTerm: state.variableEditor.searchTerm,
      groupFilter: state.variableEditor.groupFilter,
      selectedQVW
    })
  ],
  (variables, props) => {
    // Extract what we need from props { searchTerm, groupFilter, selectedQVW }
    let { selectedQVW, searchTerm, groupFilter } = props;
    let QVWVars = _.filter(
      variables,
      variable => variable.application === selectedQVW
    );

    let finalVariables = QVWVars;
    // Filter by searchTerm, if it exists
    if (searchTerm) {
      finalVariables = _.filter(QVWVars, obj => {
        return obj.name.toLowerCase().includes(searchTerm);
      });
    }
    // Filter by groupFilter if it exists
    if (groupFilter) {
      finalVariables = _.filter(finalVariables, obj => {
        return obj.group === groupFilter;
      });
    }

    return finalVariables;
  }
);

/**
 * ReSelect selector that returns variables for passed QVW grouped by the variables groups
 *  {
 *     group1: [{id, name, ...}, {id, name, ...}],
 *     group2: [{id, name, ...}, {id, name, ...}],
 *     ...
 *  }
 * How to use:
 * selectQVWVariablesGrouped(state, selectedQVW)
 */
export const selectQVWVariablesGrouped = createSelector(
  [selectQVWVariables],
  // [selectAllVariablesFiltered],
  variables => {
    return variables.reduce((groupedVars, variable) => {
      let groupName = variable.group;
      groupedVars[groupName] = [...(groupedVars[groupName] || ""), variable];
      return groupedVars;
    }, {});
  }
);

export const selectQVWVariablesStats = createSelector(
  [selectQVWVariables],
  variables => {
    let numGroups = _.uniqBy(variables, "group").length;
    return {
      variableCount: variables.length,
      groupCount: numGroups
    };
  }
);

export const selectQVWGroups = createSelector(
  [selectAllVariables, (_, selectedQVW) => selectedQVW],
  (variables, selectedQVW) => {
    // let qvwGroups = _.sortBy(
    //   _.uniq(
    //     variables
    //       .filter(variable => variable.application === selectedQVW)
    //       .map(variable => variable.group)
    //   )
    // );
    let qvwGroups = _fp.compose(
      _fp.sortBy(group => group),
      _fp.uniqBy(group => group),
      _fp.map(variable => variable.group),
      _fp.filter(variable => variable.application === selectedQVW)
    )(variables);
    return qvwGroups;
  }
);
