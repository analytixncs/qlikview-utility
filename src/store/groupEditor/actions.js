import { getQVGroups } from "../../dataAccess/applicationDataAccess";
import * as types from "./types";

function loadGroups(application) {
  return async dispatch => {
    let qvGroups = await getQVGroups(application);
    dispatch({
      type: types.LOAD_GROUPS,
      payload: { qvGroups, application }
    });
    //set working status to false
    dispatch({ type: types.LOAD_GROUPS_WORKING, payload: false });
  };
  // --- OLD PROMISE WAY BELOW ---
  // return dispatch => {
  //   let request = getApplicationNames();
  //   request.then(applicationNames => {
  //     dispatch({ type: LOAD_APPLICATION_NAMES, applicationNames });
  //   });
  // };
}

function setLoadGroupsWorking() {
  return {
    type: types.LOAD_GROUPS_WORKING,
    payload: { status: true }
  };
}
function clearGroups() {
  return { type: types.CLEAR_GROUPS };
}

export { loadGroups, setLoadGroupsWorking, clearGroups };
