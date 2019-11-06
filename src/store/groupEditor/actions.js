import {
  getQVGroups,
  updateQVGroup
} from "../../dataAccess/applicationDataAccess";
import * as types from "./types";

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

function updateGroup(id, newGroupData) {
  console.log("inupdate group", id, newGroupData);
  return async dispatch => {
    let qvGroups = await updateQVGroup(id, newGroupData);
    console.log("group data return", qvGroups);
    dispatch({
      type: types.LOAD_GROUPS,
      payload: { qvGroups }
    });
  };
}

function clearGroups() {
  return { type: types.CLEAR_GROUPS };
}

export { loadGroups, updateGroup, clearGroups };
