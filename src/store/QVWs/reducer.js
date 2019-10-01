import * as types from "./types";

const variableEditorReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_QVW_NAMES:
      return action.applicationNames;
    case types.ADD_QVW_NAME:
      return [...state, action.payload];
    case types.DELETE_QVW_NAME:
      return [...action.payload];
    default:
      return state;
  }
};

export default variableEditorReducer;
