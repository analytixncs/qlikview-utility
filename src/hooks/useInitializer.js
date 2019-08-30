import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as varActions from "../store/variableEditor";
import * as groupActions from "../store/groupEditor";
import * as appActions from "../store/appState";

export const useInitializer = selectedQVW => {
  let dispatch = useDispatch();
  let { loading } = useSelector(state => ({
    loading: state.variableEditor.loading || state.groupEditor.loading
  }));

  // Use Effect will run when we change QVWs
  useEffect(() => {
    dispatch(varActions.setLoadVariablesWorking());
    dispatch(groupActions.setLoadGroupsWorking());
    dispatch(varActions.loadVariables(selectedQVW));
    dispatch(groupActions.loadGroups(selectedQVW));
    dispatch(appActions.setCurrentQVW(selectedQVW));
    return () => {
      dispatch(varActions.clearVariables());
      dispatch(groupActions.clearGroups());
      dispatch(appActions.setCurrentQVW());
    };
  }, [selectedQVW]);

  return [loading];
};
