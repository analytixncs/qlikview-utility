import * as types from "./types";

const initialState = {
  variables: [],
  loading: true
};
const variableEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_VARIABLES:
      return {
        ...state,
        variables: action.payload.qvVariables
      };
    case types.LOAD_VARIABLES_WORKING:
      return {
        ...state,
        loading: action.payload.status
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
