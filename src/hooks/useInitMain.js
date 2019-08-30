import * as varActions from "../store/variableEditor";
import * as groupActions from "../store/groupEditor";

export const Init = dispatch => {
  dispatch(varActions.setLoadVariablesWorking());
  dispatch(groupActions.setLoadGroupsWorking());
  dispatch(varActions.loadVariables());
  dispatch(groupActions.loadGroups());
};
