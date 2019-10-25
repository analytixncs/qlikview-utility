import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { editorHeaderHeight } from "../../styles/standardStyles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${editorHeaderHeight};
`;

function GroupMain(props) {
  console.log("GroupMain", props);
  const history = useHistory();
  return (
    <Wrapper>
      <h1>Group Editor Main</h1>
      <div>
        <h2>In Development</h2>
        <button onClick={() => history.push("/")}>Home</button>
      </div>
    </Wrapper>
  );
}

GroupMain.propTypes = {};

export default GroupMain;
