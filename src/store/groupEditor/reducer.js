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
    default:
      return state;
  }
};

export default groupEditorReducer;
