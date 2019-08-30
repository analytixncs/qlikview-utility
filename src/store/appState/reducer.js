import * as types from "./types";

const initialState = {
  currentQVW: undefined,
  currentEditor: undefined
};

const appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_QVW:
      return { ...state, currentQVW: action.payload.currentQVW };
    case types.SET_CURRENT_EDITOR:
      return { ...state, currentEditor: action.payload.currentEditor };
    default:
      return state;
  }
};

export default appStateReducer;
