import * as types from "./types";

const initialState = {
  applications: []
};
const variableEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_APPLICATION_NAMES:
      return action.applicationNames;
    default:
      return state;
  }
};

export default variableEditorReducer;
