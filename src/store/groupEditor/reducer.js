import * as types from "./types";

const initialState = {
  groups: [],
  loading: true
};
const groupEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_GROUPS:
      return {
        ...state,
        groups: action.payload.qvGroups
      };
    case types.LOAD_GROUPS_WORKING:
      return {
        ...state,
        loading: action.payload.status
      };
    case types.CLEAR_GROUPS:
      return {
        ...state,
        groups: []
      };
    case types.POPULATE_GROUPS:
      return {
        ...state,
        groups: action.payload
      };
    case types.LOAD_QVW_FIELDS:
      return {
        ...state,
        qvwFields: action.payload
      };
    case types.CLEAR_QVW_FIELDS:
      return {
        ...state,
        qvwFields: undefined
      };
    case types.GROUPS_SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    case types.GROUPS_SET_TYPE_FILTER:
      return {
        ...state,
        groupTypeFilter: action.payload
      };
    default:
      return state;
  }
};

export default groupEditorReducer;
