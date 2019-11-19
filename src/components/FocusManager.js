import React, { useState, useRef, useEffect } from "react";

/** FocusManager
 * Idea is that this will allow you to manager focus for a group of tags
 * and only run the blur function when focus has left the whole group.
 * This works because the containing tag receives the blur and focus events
 * for all it's children.
 * Blur comes first and then focus.  So if one tag in the group triggers the blur,
 * we set the update of the isManagingFocus flag to run in a setTimeout, this allows
 * for the _onFocus event to run and clear the timeout if another tag in the group
 * has received focus, thus keeping the isManagingFocus flag true.
 *
 * The useEffect function is where we will actually run the handle blur.  This only
 * happens when the isManagingFocus flag is set.
 *
 * This can get tricky if you are have tags in the group that have onClick handlers.
 * If they are not buttons, but instead a div or an 'a' tag, the onClick handler never fires
 * because the onBlur in focus manager fires before.
 * !!! SOLUTION to the above issue.
 * If you need to fire an onClick event on an item within the FocusManager,
 * make sure to include on those tags with the onClick and onMouseDown event that simply
 * calls e.preventDefault().  Since the onMouseDown event fires first, the preventDefault() call
 * will keep the onBlur from firing.
 */
const FocusManager = ({ handleBlur, children }) => {
  let [isManagingFocus, setIsManagingFocus] = useState(true);
  let timeoutIdRef = useRef();

  const _onBlur = () => {
    timeoutIdRef.current = setTimeout(() => {
      if (isManagingFocus) {
        setIsManagingFocus(false);
      }
    }, 0);
  };
  const _onFocus = () => {
    clearTimeout(timeoutIdRef.current);
    if (!isManagingFocus) {
      setIsManagingFocus(true);
    }
  };
  useEffect(() => {
    if (isManagingFocus) {
      // console.log("managing focus");
      return;
    } else {
      // console.log("NOT managing focus");
      handleBlur();
    }
  }, [isManagingFocus, handleBlur]);
  return (
    <div onBlur={_onBlur} onFocus={_onFocus}>
      {children}
    </div>
  );
};

export default FocusManager;
