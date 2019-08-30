import * as types from "./types";

function setCurrentQVW(currentQVW = undefined) {
  return {
    type: types.SET_CURRENT_QVW,
    payload: { currentQVW: currentQVW }
  };
}

function setCurrentEditor(currentEditor = undefined) {
  return {
    type: types.SET_CURRENT_EDITOR,
    payload: { currentEditor: currentEditor }
  };
}

export { setCurrentQVW, setCurrentEditor };
