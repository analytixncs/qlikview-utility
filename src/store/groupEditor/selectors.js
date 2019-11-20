import _ from "lodash";

import { createSelector } from "reselect";

//------------- Standard Selectors ----------------------------//
export const selectAllGroups = state => state.groupEditor.groups;
export const selectAllGroups2 = (state, props) => ({
  groups: state.groupEditor.groups,
  props
});

// ----------- ReSelect Selectors ---------------------------//
/**
 * ReSelect selector that returns array of group objects for passed QVW
 * This selector also filters based on the searchTerm and groupTypeFilter that are stored in redux store
 * The array of selectors includes first "selectAllGroups" which is a simple selector
 * that returns state.groupEditor.groups
 * The next selector is a function that is used to extract the selectedQVW Parameter from the calling function
 * and to pull the searchTerm and groupTypeFilter from the state and returns an object with this data:
 * { searchTerm, groupTypeFilter, selectedQVW }
 *
 * How to use:
 * selectAndFilterGroups(state, selectedQVW)
 */
export const selectAndFilterGroups = createSelector(
  [
    selectAllGroups,
    (state, selectedQVW) => ({
      searchTerm: state.groupEditor.searchTerm,
      groupTypeFilter: state.groupEditor.groupTypeFilter,
      selectedQVW
    })
  ],
  (groups, props) => {
    // Extract what we need from props { searchTerm, groupFilter, selectedQVW }
    let { selectedQVW, searchTerm, groupTypeFilter } = props;
    let QVGroups = _.filter(groups, group => group.application === selectedQVW);

    let finalGroups = QVGroups;
    // Filter by searchTerm, if it exists
    if (searchTerm) {
      finalGroups = _.filter(QVGroups, obj => {
        return obj.groupName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    // Filter by groupFilter if it exists
    if (groupTypeFilter) {
      finalGroups = _.filter(finalGroups, obj => {
        return obj.groupType === groupTypeFilter;
      });
    }

    return finalGroups;
  }
);

/**
 * ReSelect selector that returns "stats" for the groups for a specific QVW
 *  {
 *    groupsCount: int
 *    typeBreakout: { cyclic: int, drill: int}
 *  }
 * How to use:
 * selectQVWVariablesStats(state, selectedQVW)
 */
export const selectGroupsStats = createSelector(
  [selectAndFilterGroups],
  groups => {
    let groupTypeBreakout = groups.reduce(
      (final, group) => {
        if (group.groupType === "Cyclic") {
          final.Cyclic += 1;
        } else {
          final.Drill += 1;
        }
        return final;
      },
      { Cyclic: 0, Drill: 0 }
    );
    return {
      groupCount: groups.length,
      groupTypeBreakout: groupTypeBreakout
    };
  }
);
