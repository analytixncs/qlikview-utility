const initialState = {
  variableNameFilter: ""
};
const appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "var/SET_FILTER":
      return { ...state, variableNameFilter: "Not Testing" };
    default:
      return state;
  }
};

export default appStateReducer;
