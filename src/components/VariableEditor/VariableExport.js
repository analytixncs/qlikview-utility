import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Alert, Progress } from "antd";
import styled from "styled-components";
import {
  editorHeaderHeight,
  variableSearchHeight,
  variableGroupTopMargin,
  Spacer
} from "../../styles/standardStyles";

import { writeXMLData } from "../../dataAccess/nativeFileAccess";

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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const VariableExport = props => {
  let history = useHistory();
  let { selectedQVW } = useParams();
  let [status, setStatus] = React.useState({
    isError: false,
    isComplete: false,
    message: undefined
  });
  let [loading, setLoading] = React.useState(false);

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
  return (
    <VarExportWrapper>
      <TitleWrapper>
        <Title>{`Export ${selectedQVW} Variables`} </Title>
        <CloseButton icon="close" onClick={() => history.goBack()} />
      </TitleWrapper>
      <ExportBody>
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
