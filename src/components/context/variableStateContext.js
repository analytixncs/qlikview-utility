import React, { useState, useContext } from "react";

const VariableStateContext = React.createContext();
const VariableSettersContext = React.createContext();

/**======================================================
 * Provider function
 * This function is also where all the state is created
 */
function VariableStateProvider({ children }) {
  let [viewingId, setViewingIdMain] = useState();
  let [isEditing, setIsEditing] = useState(false);
  let [isDirty, setIsDirty] = useState(false);
  // When setting the viewing ID need to take into account state
  // of being edited
  let setViewingId = newViewingId => {
    if (newViewingId) {
      setIsEditing(false);
    }
    setViewingIdMain(newViewingId);
  };

  return (
    <VariableStateContext.Provider value={{ viewingId, isEditing, isDirty }}>
      <VariableSettersContext.Provider
        value={{ setViewingId, setIsEditing, setIsDirty }}
      >
        {children}
      </VariableSettersContext.Provider>
    </VariableStateContext.Provider>
  );
}
/**======================================================
 * Variable State
 *
 * useVariableState()
 *  Returns and object with the Variable state
 *   { viewingId, isEditing, isDirty }
 *
 * Just a helper hook so that the user doesn't
 * need to import the VariableStateContext and useContext
 */
export const useVariableState = () => {
  const context = useContext(VariableStateContext);
  if (context === undefined) {
    throw new Error(
      "useVariableState must be used within a VariableStateProvider"
    );
  }
  return context;
};

/**======================================================
 * Variable State Setters
 *
 * useVariableStateSetting()
 *  Return an object with the setter functions
 *   { setViewingId, setIsEditing, setIsDirty }
 *
 *
 */
export const useVariableStateSetters = () => {
  const context = useContext(VariableSettersContext);
  if (context === undefined) {
    throw new Error(
      "useVariableStateSetters must be used within a VariableStateProvider"
    );
  }
  return context;
};

export default VariableStateProvider;
