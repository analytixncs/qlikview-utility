import * as types from "./types";

const variableEditorReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_APPLICATION_NAMES:
      return action.applicationNames;
    default:
      return state;
  }
};

export default variableEditorReducer;
