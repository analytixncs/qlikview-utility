import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Radio } from "antd";

import { Spacer, contentBgColor } from "../styles/standardStyles";
import {
  useAppSettingsState,
  useSetAppSettingsState
} from "../context/appSettingsContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px auto;
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

const SettingsList = styled.div`
  & > :last-child {
    border-bottom: none;
  }
`;
const SettingCard = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  padding: 5px;
  & > :last-child {
    border: 2px solid red;
    background-color: white;
  }
`;

const CloseButton = styled(Button)`
  border: 0;
  border-radius: 0;
`;
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

//-------------------------

function Settings(props) {
  let history = useHistory();
  let [defaultApp, setDefaultApp] = React.useState("");
  //let [settings, setSettings] = React.useState("");
  let { appSettings } = useAppSettingsState();
  let { saveAppSettings } = useSetAppSettingsState();

  // Run on initial load of component to
  // set the default state of appSettings parts
  React.useEffect(() => {
    setDefaultApp(appSettings.system.defaultApplication);
  }, [appSettings]);

  // Until the defaultApp state is set return null
  // This is to keep flickering from happening when setting up the settingCards
  if (defaultApp === "") {
    return null;
  }
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>App Settings </Title>
        <CloseButton icon="close" onClick={() => history.push("/")} />
      </TitleWrapper>
      <SettingsList>
        <SettingCard>
          <h4>Default Application</h4>
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
            type={
              appSettings.system.defaultApplication !== defaultApp
                ? "danger"
                : "primary"
            }
            onClick={() => saveAppSettings({ defaultApplication: defaultApp })}
          >
            Update
          </Button>
        </SettingCard>
        <Spacer />
        <SettingCard>
          <h4>Setting Number 2</h4>
        </SettingCard>
      </SettingsList>
      <Spacer />
      <Button type="primary" onClick={() => history.push("/")}>
        Close
      </Button>
    </Wrapper>
  );
}

export default Settings;
