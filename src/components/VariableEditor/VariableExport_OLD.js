import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Alert, Checkbox } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import {
  editorHeaderHeight,
  variableSearchHeight,
  variableGroupTopMargin,
  Spacer
} from "../../styles/standardStyles";

import { writeXMLData, getSettings } from "../../dataAccess/nativeFileAccess";
import VariableExportFields from "./VariableExportFields";

const VarExportWrapper = styled.div`
  margin: calc(${editorHeaderHeight} + ${variableGroupTopMargin}) 25px;
  border: 1px solid #abbfcf;
  box-shadow: 3px 3px 9px -2px #000000;
  background: aliceblue;
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
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > label {
    margin-left: 8px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const VariableExport = props => {
  let history = useHistory();
  let { selectedQVW } = useParams();
  let variableFieldsObj = useSelector(
    state => state.variableEditor.variables[0]
  );
  let [status, setStatus] = React.useState({
    isError: false,
    isComplete: false,
    message: undefined
  });
  let [loading, setLoading] = React.useState(false);
  // initialize to all boxes being checked
  let [fieldState, setFieldState] = React.useState();
  let [variableFields, setVariableFields] = React.useState();

  React.useEffect(() => {
    let varFieldsArray = Object.keys(variableFieldsObj).map(key => key);
    let initFieldState = Object.keys(variableFieldsObj).reduce(
      (final, curr) => {
        return { ...final, [curr]: true };
      },
      {}
    );
    setVariableFields(varFieldsArray);
    setFieldState(initFieldState);
  }, []);
  //Export function
  const exportXML = async () => {
    setLoading(true);
    setStatus({ isError: false, message: undefined });
    try {
      let results = await writeXMLData(selectedQVW);
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

  const onDragEnd = result => {
    let { destination, source, draggableId } = result;
    console.log("you been dragged", destination, source, draggableId);
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
    console.log(newVarFields);
    setVariableFields(newVarFields);
  };

  return (
    <VarExportWrapper>
      <TitleWrapper>
        <Title>{`Export ${selectedQVW} Variables`} </Title>
        <CloseButton icon="close" onClick={() => history.goBack()} />
      </TitleWrapper>
      <ExportBody>
        <OptionsWrapper>
          <p>Fields to Export</p>
          <DragDropContext onDragEnd={onDragEnd}>
            {variableFields && fieldState && (
              <VariableExportFields
                variableFields={variableFields}
                fieldState={fieldState}
                setFieldState={setFieldState}
              />
            )}
          </DragDropContext>
        </OptionsWrapper>
        <ButtonWrapper>
          <Button
            icon="export"
            onClick={exportXML}
            type="primary"
            loading={loading}
          >
            Export
          </Button>
        </ButtonWrapper>

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
    </VarExportWrapper>
  );
};

export default VariableExport;
