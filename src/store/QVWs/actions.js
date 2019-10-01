import {
  getQVWNames,
  saveQVWName,
  deleteQVWName
} from "../../dataAccess/applicationDataAccess";
import * as types from "./types";

/**
 * Loads all QVW Names from qvwnames.json and
 * dispatches action to load into redux store.
 *
 * @returns
 */
function loadQVWNames() {
  return async dispatch => {
    let applicationNames = await getQVWNames();
    dispatch({ type: types.LOAD_QVW_NAMES, applicationNames });
  };
  // --- OLD PROMISE WAY BELOW ---
  // return dispatch => {
  //   let request = getQVWNames();
  //   request.then(applicationNames => {
  //     dispatch({ type: LOAD_QVW_NAMES, applicationNames });
  //   });
  // };
}

/**
 * calls function to add passed QVW name to the qvwnames.json file
 * and dispatches action to add QVW name to the redux store.
 *
 * @param {string} newQVWName
 * @returns
 */
function addQVWName(newQVWName) {
  return async (dispatch, getState) => {
    let qvwNames = getState().QVWs;
    let newQVWNameObj = await saveQVWName(newQVWName, qvwNames);
    dispatch({ type: types.ADD_QVW_NAME, payload: newQVWNameObj });
  };
}

/**
 * calls function to delete QVW name with passed id from qvwnames.json
 * and dipatches action to remove QVW name from redux store.
 *
 * @param {string} id
 * @returns
 */
function removeQVWName(id) {
  return async (dispatch, getState) => {
    let qvwNames = getState().QVWs;
    let newQVWNames = qvwNames.filter(qvwName => qvwName.id !== id);
    await deleteQVWName(newQVWNames);
    dispatch({ type: types.DELETE_QVW_NAME, payload: newQVWNames });
  };
}
export { loadQVWNames, addQVWName, removeQVWName };
