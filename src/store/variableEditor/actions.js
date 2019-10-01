import {
  getQVVariables,
  updateQVVariable
} from "../../dataAccess/applicationDataAccess";
import * as types from "./types";
import { secondsTimeStampNow } from "../../dateHelpers";

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
  //   let request = getQVWNames();
  //   request.then(applicationNames => {
  //     dispatch({ type: LOAD_QVW_NAMES, applicationNames });
  //   });
  // };
}
/** UPDATE Action Creator ---------------
 * updateVariable - action creator (thunk) that takes in information on a variable that
 * has been updated and writes it to disk (async), then dispatches the udpate
 *
 * @param {string} id - id of the variable to upate
 * @param {object} qvVariable - object containing updated variable information
 */
function updateVariable(id, qvVariable) {
  return async dispatch => {
    // Create Date formated as Unix Seconds timestamp
    let modifyDate = secondsTimeStampNow();
    let updatedQVVar = {
      ...qvVariable,
      modifyDate,
      modifyUser: "admin"
    };
    // returned variable is new list of ALL variables, makes reducer update easy
    let newQVVars = await updateQVVariable(id, updatedQVVar);
    dispatch({ type: types.VAR_UPDATE, payload: newQVVars });
  };
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
  clearVariables,
  updateVariable
};
