import * as types from "./types";

const initialState = {
  variables: []
};
const variableEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_VARIABLES:
      return {
        ...state,
        variables: action.payload.qvVariables
      };
    case types.CLEAR_VARIABLES:
      return {
        ...state,
        variables: []
      };
    default:
      return state;
  }
};

export default variableEditorReducer;
