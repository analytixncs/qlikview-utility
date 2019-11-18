import React, { useState, useRef, useEffect } from "react";

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
      console.log("NOT managing focus");
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
