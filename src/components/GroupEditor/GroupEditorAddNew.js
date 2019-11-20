import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { addGroup } from "../../store/groupEditor";
import { secondsTimeStampNow } from "../../dateHelpers";
import uuidv4 from "uuid/v4";
import { Input, Button, Select, message } from "antd";
import {
  editorHeaderHeight,
  editorBGColor,
  Spacer,
  variableGroupTopMargin,
  contentBgColor
} from "../../styles/standardStyles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: calc(${editorHeaderHeight} + ${variableGroupTopMargin}) 25px;
  border: 1px solid #abbfcf;
  box-shadow: 3px 3px 9px -2px #000000;
  background: ${contentBgColor};
  width: 800px;
`;
const ButtonRow = styled.div`
  border-top: 1px solid black;
  margin: 0 0 0 -15px;
  padding: 15px;
  background-color: white;
  margin: 15px 0 0 0;
`;

const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
`;
const Row = styled.div`
  display: flex;
  margin: 7.5px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #abbfcf;
  background-color: white;
  padding: 0 0 0 10px;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CloseButton = styled(Button)`
  border: 0;
  border-radius: 0;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.width ? props.width : "100%")};
  padding-right: 15px;
  & > textarea {
    font-family: ${props => (props.isCode ? `"Fira Code", monospace` : null)};
    font-size: ${props => (props.isCode ? "1.2rem" : null)};
  }
  & label {
    font-weight: bold;
  }
`;

const GroupEditorAddNew = () => {
  let [groupName, setGroupName] = useState("");
  let [groupNotes, setGroupNotes] = useState("");
  let [groupType, setGroupType] = useState("Cyclic");

  let { selectedQVW } = useParams();
  let history = useHistory();
  let dispatch = useDispatch();
  // React.useEffect(() => {
  //   let newGroup = {
  //     id: 1,
  //     application: selectedQVW,
  //     groupName: "_NewGroup",
  //     groupType: "Cyclic",
  //     groupNotes: "",
  //     createUser: "admin",
  //     createDate: secondsTimeStampNow()
  //   };
  //   console.log("NEW GRUOP", newGroup);
  //   dispatch(addGroup(newGroup));
  //   history.goBack();
  // }, [selectedQVW, dispatch]);
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Submitting Group", groupName, groupNotes, groupType);
    if (groupName.trim() === "") {
      message.error("Group Name cannot be blank", 2);
      return null;
    }
    let newGroup = {
      id: uuidv4(),
      application: selectedQVW,
      groupName: groupName,
      groupType: groupType,
      groupNotes: groupNotes,
      createUser: "admin",
      createDate: secondsTimeStampNow(),
      modifyUser: "",
      modifyDate: ""
    };
    dispatch(addGroup(newGroup));
    history.goBack();
  };
  return (
    <Wrapper onSubmit={handleSubmit}>
      <TitleWrapper>
        <Title>{`Add Group to ${selectedQVW}`} </Title>
        <CloseButton
          icon="close"
          onClick={() => history.push(`/${selectedQVW}/groupeditor`)}
        />
      </TitleWrapper>
      <InputFields>
        <Row>
          <FormItem>
            <label>Group Type</label>
            <Select value={groupType} onChange={value => setGroupType(value)}>
              <Select.Option value="Cyclic">Cyclic</Select.Option>
              <Select.Option value="Drill">Drill</Select.Option>
            </Select>
          </FormItem>
          <FormItem>
            <label>Group Name</label>
            <Input
              placeholder="Group Name"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
            />
          </FormItem>
        </Row>
        <Row>
          <FormItem>
            <label>Group Notes</label>
            <Input.TextArea
              placeholder="Group Notes"
              value={groupNotes}
              onChange={e => setGroupNotes(e.target.value)}
            />
          </FormItem>
        </Row>
      </InputFields>
      <ButtonRow>
        <Button type="primary" onClick={handleSubmit}>
          Add Group
        </Button>
        <Spacer />
        <Button onClick={() => history.push(`/${selectedQVW}/groupeditor`)}>
          Cancel
        </Button>
      </ButtonRow>
    </Wrapper>
  );
};

export default GroupEditorAddNew;
