import {
  getQVVariables,
  updateQVVariable,
  insertQVVariable,
  deleteQVVariable
} from "../../dataAccess/applicationDataAccess";
import * as types from "./types";
import { secondsTimeStampNow } from "../../dateHelpers";
import uuidv4 from "uuid/v4";

/** LOAD (INITALIZE) VARIABLEs Action Creator ---------------
 * loadVariables - action creator (thunk) for loading variables into store
 * Used primarily as an initializer.
 * If no application name passed, then all variables from file will be loaded.
 *
 * @param {string} application - application name to load, if null or undefined, then load all variables
 */
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
}

/** UPDATE VARIABLE Action Creator ---------------
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

/** ADD VARIABLE Action Creator ---------------
 * addVariable - action creator (thunk) that takes in information to create
 * new variable.  Will generate an id, modifyDate and modifyUser fields
 *
 * @param {object} qvVariable - object containing new variable information
 */
function addVariable(newVariable) {
  return async dispatch => {
    // Create Date formated as Unix Seconds timestamp
    let createDate = secondsTimeStampNow();
    let id = uuidv4();
    let newQVVar = {
      id,
      ...newVariable,
      createDate,
      createUser: "admin",
      modifyDate: "",
      modifyUser: ""
    };
    // returned variable is new list of ALL variables, makes reducer update easy
    let newQVVars = await insertQVVariable(newQVVar);
    dispatch({ type: types.VAR_ADD, payload: newQVVars });
  };
}

/** DELETE VARIABLE Action Creator ---------------
 * deleteVariable - action creator (thunk) that takes in id of variable to delete
 * and deletes from disk and redux store.
 *
 * @param {string} id - id of the variable to upate
 */
function deleteVariable(id) {
  return async dispatch => {
    // returned variable is new list of ALL variables, makes reducer update easy
    let newQVVars = await deleteQVVariable(id);
    dispatch({ type: types.VAR_DELETE, payload: newQVVars });
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
  updateVariable,
  addVariable,
  deleteVariable
};
