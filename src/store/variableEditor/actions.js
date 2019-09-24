import { getQVVariables } from "../../dataAccess/applicationDataAccess";
import * as types from "./types";

function loadVariables(application) {
  return async dispatch => {
    let qvVariables = await getQVVariables(application);
    dispatch({
      type: types.LOAD_VARIABLES,
      payload: { qvVariables, application }
    });
    dispatch({
      type: types.LOAD_VARIABLES_WORKING,
      payload: { status: false }
    });
  };
  // --- OLD PROMISE WAY BELOW ---
  // return dispatch => {
  //   let request = getApplicationNames();
  //   request.then(applicationNames => {
  //     dispatch({ type: LOAD_APPLICATION_NAMES, applicationNames });
  //   });
  // };
}

function setSearchTerm(searchTerm) {
  return { type: types.VAR_SET_SEARCH_TERM, payload: searchTerm };
}

function setGroupFilter(group) {
  return { type: types.VAR_SET_GROUP_FILTER, payload: group };
}

function setLoadVariablesWorking() {
  return {
    type: types.LOAD_VARIABLES_WORKING,
    payload: { status: true }
  };
}

function clearVariables() {
  return { type: types.CLEAR_VARIABLES };
}
export {
  loadVariables,
  setSearchTerm,
  setGroupFilter,
  setLoadVariablesWorking,
  clearVariables
};
