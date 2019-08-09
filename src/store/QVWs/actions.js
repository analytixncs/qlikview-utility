import { getApplicationNames } from "../../dataAccess/applicationDataAccess";
import * as types from "./types";

function loadQVWNames() {
  return async dispatch => {
    let applicationNames = await getApplicationNames();
    dispatch({ type: types.LOAD_APPLICATION_NAMES, applicationNames });
  };
  // --- OLD PROMISE WAY BELOW ---
  // return dispatch => {
  //   let request = getApplicationNames();
  //   request.then(applicationNames => {
  //     dispatch({ type: LOAD_APPLICATION_NAMES, applicationNames });
  //   });
  // };
}

export { loadQVWNames };
