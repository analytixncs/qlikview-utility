import {
  getQVGroups,
  updateQVGroup,
  getQVWFields,
  deleteQVGroup,
  insertQVGroup
} from "../../dataAccess/applicationDataAccess";
import * as types from "./types";

/**
 * loadGroups
 */
function loadGroups() {
  return async dispatch => {
    dispatch({ type: types.LOAD_GROUPS_WORKING, payload: true });
    let qvGroups = await getQVGroups();
    dispatch({
      type: types.LOAD_GROUPS,
      payload: { qvGroups }
    });
    //set working status to false
    dispatch({ type: types.LOAD_GROUPS_WORKING, payload: false });
  };
}

function addGroup(newGroupObj) {
  return async dispatch => {
    let qvGroups = await insertQVGroup(newGroupObj);
    dispatch({ type: types.POPULATE_GROUPS, payload: qvGroups });
  };
}
/**
 * updateGroup
 *
 */
function updateGroup(id, newGroupObj) {
  console.log("inupdate group", id, newGroupObj);
  return async dispatch => {
    let qvGroups = await updateQVGroup(id, newGroupObj);
    console.log("group data return", qvGroups);
    dispatch({
      type: types.LOAD_GROUPS,
      payload: { qvGroups }
    });
  };
}

/**
 * deleteGroup
 *
 */
function deleteGroup(id) {
  return async dispatch => {
    let qvGroups = await deleteQVGroup(id);
    dispatch({ type: types.POPULATE_GROUPS, payload: qvGroups });
  };
}

function clearGroups() {
  return { type: types.CLEAR_GROUPS };
}

//--------------------------------------------------//
// -- QVW Fields Loading/Clearing
//--------------------------------------------------//

/**
 * Loads the fields for the selectedQVW to the redux store.
 *
 */
function loadQVWFields(selectedQVW) {
  return async dispatch => {
    let qvwFields = await getQVWFields(selectedQVW);
    dispatch({ type: types.LOAD_QVW_FIELDS, payload: qvwFields });
  };
}
function clearQVWFields() {}

export {
  loadGroups,
  updateGroup,
  deleteGroup,
  addGroup,
  clearGroups,
  loadQVWFields,
  clearQVWFields
};
