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
    case types.VAR_SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    case types.VAR_SET_GROUP_FILTER:
      return {
        ...state,
        groupFilter: action.payload
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
    case types.VAR_UPDATE:
      return {
        ...state,
        variables: action.payload
      };
    case types.VAR_ADD:
      return {
        ...state,
        variables: action.payload
      };
    default:
      return state;
  }
};

export default variableEditorReducer;
