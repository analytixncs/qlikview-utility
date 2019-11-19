import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Alert, message, Tooltip } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import {
  editorHeaderHeight,
  editorBGColor,
  variableGroupTopMargin,
  Spacer,
  contentBgColor
} from "../../styles/standardStyles";

import { writeXMLData } from "../../dataAccess/nativeFileAccess";
import { getSettings } from "../../dataAccess/applicationDataAccess";
import VariableExportFields from "../VariableEditor/VariableExportFields";

let myStorage = window.localStorage;

const GroupExportWrapper = styled.div`
  margin: calc(${editorHeaderHeight} + ${variableGroupTopMargin}) 25px;
  border: 1px solid #abbfcf;
  box-shadow: 3px 3px 9px -2px #000000;
  background: ${editorBGColor};
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

const ExportBody = styled.div`
  padding: 10px;
  background-color: ${contentBgColor};
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > label {
    margin-left: 8px;
  }
`;
const ExportContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const ExportContentButtons = styled.div`
  display: flex;
  flex-direction: row;
  height: 75px;
  margin: 0 0 0 20px;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 15px;
  background-color: #ffecb3;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const GroupExport = props => {
  let history = useHistory();
  let { selectedQVW } = useParams();
  let [status, setStatus] = React.useState({
    isError: false,
    isComplete: false,
    message: undefined
  });
  let [loading, setLoading] = React.useState(false);
  // initialize to all boxes being checked
  let [fieldState, setFieldState] = React.useState();
  // These are all fields and order of fields
  let [variableFields, setVariableFields] = React.useState();

  //------------------------------------------------
  React.useEffect(() => {
    const loadFields = async () => {
      //Check if anything in localstorage
      let varFieldsArray = JSON.parse(myStorage.getItem("variableFields"));
      let initFieldState = JSON.parse(myStorage.getItem("fieldState"));
      let settings = await getSettings();
      if (!varFieldsArray) {
        varFieldsArray = settings.variableEditor.exportFields;
      }
      if (!initFieldState) {
        //setup checkbox state object
        initFieldState = varFieldsArray.reduce((final, curr) => {
          return { ...final, [curr]: true };
        }, {});
      }
      setVariableFields(varFieldsArray);
      setFieldState(initFieldState);
    };
    loadFields();
  }, []);
  //--------------------
  //Export function
  const exportXML = async () => {
    setLoading(true);
    setStatus({ isError: false, message: undefined });
    // Get field list to export
    let fieldsToExport = variableFields
      .map(field => (fieldState[field] ? field : null))
      .filter(field => field);
    // console.log("fieldsToExport", fieldsToExport);
    try {
      let results = await writeXMLData(selectedQVW, fieldsToExport);
      setStatus({
        isComplete: results && true,
        message: `Variables exported to \n ${results}`
      });
    } catch (error) {
      setStatus({ isError: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };
  //--------------------------------------------------------
  const onDragEnd = result => {
    let { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId == source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newVarFields = [...variableFields];
    newVarFields.splice(source.index, 1);
    newVarFields.splice(destination.index, 0, draggableId);
    setVariableFields(newVarFields);
  };
  //--------------------------------------------------------
  //Save to field position and checked status to Local Storage
  const saveToLocalStorage = () => {
    myStorage.setItem("variableFields", JSON.stringify(variableFields));
    myStorage.setItem("fieldState", JSON.stringify(fieldState));
    message.success("Field Order and checked state saved!", 2);
  };
  const clearLocalStorage = () => {
    myStorage.clear();
    message.error("Field Order and checked state deleted!", 2);
  };
  return (
    <GroupExportWrapper>
      <TitleWrapper>
        <Title>{`Export ${selectedQVW} Groups`} </Title>
        <CloseButton
          icon="close"
          onClick={() => history.push(`/${selectedQVW}/groupeditor`)}
        />
      </TitleWrapper>
      <ExportBody>
        <OptionsWrapper>
          <h3>Fields to Export</h3>
          <ExportContent>
            <DragDropContext onDragEnd={onDragEnd}>
              {variableFields && fieldState && (
                <VariableExportFields
                  variableFields={variableFields}
                  fieldState={fieldState}
                  setFieldState={setFieldState}
                />
              )}
            </DragDropContext>
            <ExportContentButtons>
              <Button
                icon="export"
                onClick={exportXML}
                type="primary"
                loading={loading}
              >
                Export
              </Button>
              <Spacer width="20" />
              <Tooltip title="Save Field Order and Checked Status">
                <Button icon="save" onClick={saveToLocalStorage} />
              </Tooltip>
              <Spacer />
              <Tooltip title="Clear Saved Field Order and Checked Status">
                <Button icon="delete" onClick={clearLocalStorage} />
              </Tooltip>
            </ExportContentButtons>
          </ExportContent>
        </OptionsWrapper>

        <Spacer />
        {status.isError && (
          <Alert
            message="ERROR Exporting"
            description={status.message}
            closable
            type="error"
            onClose={() => setStatus({ isError: false, message: undefined })}
          />
        )}
        {status.isComplete && status.message && (
          <Alert
            message="SUCCESS!"
            description={status.message}
            closable
            type="success"
            onClose={() => setStatus({ isComplete: false, message: undefined })}
          />
        )}
      </ExportBody>
    </GroupExportWrapper>
  );
};

export default GroupExport;
