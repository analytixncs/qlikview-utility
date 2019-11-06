import _ from "lodash";

import { createSelector } from "reselect";

//------------- Standard Selectors ----------------------------//
export const selectAllGroups = state => state.groupEditor.groups;
export const selectAllGroups2 = (state, props) => ({
  variables: state.groupEditor.groups,
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
