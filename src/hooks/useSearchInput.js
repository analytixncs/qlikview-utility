import { useState, useRef, useEffect } from "react";
/**
 * parameters: { searchArray: [] }
 * Uses the passed searchArray and display like google predictive search
 * Escape key press turns off searching, press again, turns back on
 * the "searchingIsOn" value returned from useSearchInput() lets you know if
 * searching is on or off
 *
 * @param {Object} - { searchArray: [] }
 * @example
 *   let {searchingIsOn, spreadProps} = useSearchInput({
 *     searchArray: arrayToSearch
 *   });
 *  // get the value so you can use it after it is input
 *   let { value } = spreadProps;
 *  ....
 *  <input {...spreadProps}
 *    style={searchingIsOn ? { backgroundColor: 'white'} : {backgroundColor: 'yellow'}}
 *    placeholder="Input a Value"
 *  />
 */
const useSearchInput = ({ searchArray }) => {
  const [inputValue, setInputValue] = useState("");
  const [backspace, setBackspace] = useState(false);
  const [escKey, setEscKey] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [endPos, setEndPos] = useState(0);
  const inputEl = useRef();

  const onKeyDown = e => {
    const keyPressed = e.key;
    //Check keyPressed and set selection
    switch (keyPressed) {
      case "ArrowRight":
        setStartPos(inputEl.current.selectionStart + 1);
        setEndPos(inputEl.current.selectionStart + 1);
        break;
      case "ArrowLeft":
        setStartPos(inputEl.current.selectionStart - 1);
        setEndPos(inputEl.current.selectionStart - 1);
        break;
      case "Backspace":
        if (startPos !== endPos) {
          setStartPos(inputEl.current.selectionStart);
          setEndPos(inputEl.current.selectionStart);
        } else {
          setStartPos(inputEl.current.selectionStart - 1);
          setEndPos(inputEl.current.selectionStart - 1);
        }
        setBackspace(true);
        break;
      case "Delete":
        setStartPos(inputEl.current.selectionStart);
        setEndPos(inputEl.current.selectionStart);
        setBackspace(true);
        break;
      case "Escape":
        setStartPos(inputEl.current.selectionStart);
        setEndPos(inputEl.current.selectionStart);
        setEscKey(!escKey);
        break;
      default:
        break;
    }
  };
  const onInputChange = e => {
    //Get input value
    //CHECK FOR this.state.backspace and if true, set state to target.value passed
    // and set backspace to false
    const inputValue = e.target.value;
    if (backspace || escKey) {
      setInputValue(inputValue);
      setBackspace(false);
      return;
    }
    //Setup match expression
    const matchExpr = inputValue.length > 0 ? "^" + inputValue : /.^/;
    //Create RegExp Object
    const expr = new RegExp(matchExpr, "ig");
    //Try and Find a match in array of service inputValues
    const foundItem = searchArray.find(desc => desc.match(expr));
    // console.log(`foundItem ${foundItem}`);
    //If not found, return inputValue, else return found item and set selection range
    const finalValue = foundItem || inputValue;

    setStartPos(inputValue.length);
    setEndPos(finalValue.length);
    // console.log(`startpos: ${startPos} -- endpos: ${endPos} -- foundItem: ${foundItem}`)
    setInputValue(finalValue);
  };
  useEffect(() => {
    if (startPos !== endPos) {
      inputEl.current.setSelectionRange(startPos, endPos);
    }
  });
  return {
    searchingIsOn: !escKey,
    spreadProps: {
      ref: inputEl,
      value: inputValue,
      onKeyDown: onKeyDown,
      onChange: onInputChange
    }
  };
};
export default useSearchInput;
