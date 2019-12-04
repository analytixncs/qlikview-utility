import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Radio } from "antd";

import { getSettings, saveSettings } from "../dataAccess/applicationDataAccess";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px;
`;
const SettingCard = styled.div`
  border: 1px solid black;
  padding: 5px;
`;
function onDefaultAppUpdate(defaultApp) {
  console.log(defaultApp);
  saveSettings();
}
//-------------------------

function Settings(props) {
  let history = useHistory();
  let [defaultApp, setDefaultApp] = React.useState("");
  let [settings, setSettings] = React.useState("");
  console.log("defaultApp", defaultApp);
  React.useEffect(() => {
    const onGetSettings = async () => {
      let settings = await getSettings();
      setSettings(settings);
      setDefaultApp(settings.system.defaultApplication);
    };

    onGetSettings();
  }, []);

  const onDefaultAppChange = e => {
    setDefaultApp(e.target.value);
    console.log(e.target.value);
  };
  // Merge settings into full settings object and then save back to disk
  const mergeSaveSettings = (key, newValues) => {
    let newSettings = { ...settings, [key]: newValues };
    console.log(
      `New Settings data for "${key}" key: ${JSON.stringify(settings)}`
    );
    saveSettings(newSettings);
    setSettings(newSettings);
  };
  return (
    <Wrapper>
      <h1>Settings</h1>
      <SettingCard>
        <h5>Default Application</h5>
        <Radio.Group
          name="defaultappgroup"
          onChange={onDefaultAppChange}
          value={defaultApp}
        >
          <Radio value={"variable-editor"}>Variable Editor</Radio>
          <Radio value={"group-editor"}>Group Editor</Radio>
        </Radio.Group>
        <Button
          type="primary"
          onClick={() =>
            mergeSaveSettings("system", { ["defaultApplication"]: defaultApp })
          }
        >
          Update
        </Button>
      </SettingCard>
      <button onClick={() => history.push("/")}>Home</button>
    </Wrapper>
  );
}

export default Settings;
