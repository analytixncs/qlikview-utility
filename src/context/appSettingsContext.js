import React, { useState, useContext, useEffect } from "react";
import { getSettings, saveSettings } from "../dataAccess/applicationDataAccess";

const AppSettingsStateContext = React.createContext();
const AppSettingsSettersContext = React.createContext();

/**======================================================
 * Provider function
 * This function is also where all the state is created
 */
function AppSettingsProvider({ children }) {
  let [appSettings, setAppSettings] = useState("");
  //let [appSettings, setAppSettings] = useState({});
  //const appMemo = React.useMemo(() => appSettings, [appSettings]);

  //Run when instantiated to load settings file
  useEffect(() => {
    const onGetSettings = async () => {
      let settings = await getSettings();
      setAppSettings(settings);
      //setDefaultApp(settings.system.defaultApplication);
    };

    onGetSettings();
  }, []);

  const saveAppSettings = async updateObject => {
    let newSettings = await saveSettings(appSettings, updateObject);
    setAppSettings(newSettings);
  };
  return (
    <AppSettingsStateContext.Provider value={{ appSettings }}>
      <AppSettingsSettersContext.Provider value={{ saveAppSettings }}>
        {children}
      </AppSettingsSettersContext.Provider>
    </AppSettingsStateContext.Provider>
  );
}

/**======================================================
 * App Settings State
 *
 * useAppSettingsState()
 *  Returns and object with the Variable state
 *   { appSettings }
 *
 * Just a helper hook so that the user doesn't need to
 * import the VariableStateContext and useContext
 */
export const useAppSettingsState = () => {
  const context = useContext(AppSettingsStateContext);
  if (context === undefined) {
    throw new Error(
      "useVariableState must be used within a VariableStateProvider"
    );
  }
  return context;
};

/**======================================================
 * App Settings State Setters
 *
 * useAppSettingsStateSetting()
 *  Return an object with the setter functions
 *   { appSettings }
 */
export const useAppSettingsStateSetting = () => {
  const context = useContext(AppSettingsSettersContext);
  if (context === undefined) {
    throw new Error(
      "useVariableStateSetters must be used within a VariableStateProvider"
    );
  }
  return context;
};

export default AppSettingsProvider;
