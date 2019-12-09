import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Radio } from "antd";

import {
  editorBGColor,
  Spacer,
  contentBgColor
} from "../styles/standardStyles";
import {
  useAppSettingsState,
  useAppSettingsStateSetting
} from "../context/appSettingsContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px;
  border: 1px solid #abbfcf;
  box-shadow: 3px 3px 9px -2px #000000;
  background: ${contentBgColor};
  width: 800px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #abbfcf;
  background-color: white;
  padding: 0 0 0 10px;
`;
const CloseButton = styled(Button)`
  border: 0;
  border-radius: 0;
  &:hover {
    background-color: red;
    color: white;
  }
`;
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
const SettingCard = styled.div`
  border: 1px solid black;
  padding: 5px;
`;

//-------------------------

function Settings(props) {
  let history = useHistory();
  let [defaultApp, setDefaultApp] = React.useState("");
  //let [settings, setSettings] = React.useState("");
  let { appSettings } = useAppSettingsState();
  let { saveAppSettings } = useAppSettingsStateSetting();

  console.log("defaultApp", defaultApp);
  console.log("settings", appSettings);

  // Run on initial load of component to
  // set the default state of appSettings parts
  React.useEffect(() => {
    setDefaultApp(appSettings.system.defaultApplication);
  }, []);

  // // Merge settings into full settings object and then save back to disk
  // const mergeSaveSettings = (key, newValues) => {
  //   let newSettings = { ...appSettings, [key]: newValues };
  //   console.log(
  //     `New appSettings data for "${key}" key: ${JSON.stringify(appSettings)}`
  //   );
  //   saveSettings(newSettings);
  //   //setSettings(newSettings);
  // };
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>App Settings </Title>
        <CloseButton icon="close" onClick={() => history.push("/")} />
      </TitleWrapper>
      <SettingCard>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h5>Default Application</h5>
          <Radio.Group
            name="defaultappgroup"
            onChange={e => setDefaultApp(e.target.value)}
            value={defaultApp}
          >
            <Radio value={"variableeditor"}>Variable Editor</Radio>
            <Radio value={"groupeditor"}>Group Editor</Radio>
          </Radio.Group>
          <Spacer />
          <Button
            style={{ width: "150px" }}
            type="primary"
            onClick={() => saveAppSettings({ defaultApplication: defaultApp })}
          >
            Update
          </Button>
        </div>
      </SettingCard>
      <Spacer />
      <SettingCard>
        <h4>Setting Number 2</h4>
      </SettingCard>
      {/* 
      <Button type="primary" onClick={() => history.push("/")}>
        Home
      </Button> */}
    </Wrapper>
  );
}

export default Settings;
