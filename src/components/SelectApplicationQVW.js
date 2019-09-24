import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Tooltip, Button } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  background: #f8fafc;
  height: calc(90vh - 25px);
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  border: 1px solid #696969;
  padding: 10px;
  box-shadow: gray 1px 1px 15px 3px;
  border-radius: 5px;
`;

const H1 = styled.h1``;

const List = styled.ul`
  font-size: 1.2rem;
  list-style-type: none;
  width: 80%;
  margin: 0;
  padding: 0;
`;
const MyLink = styled(Link)`
  display: block;
  border: 1px solid black;
  color: #3d4852;
  background: #f1f5f8;
  width: 100%;
  padding: 5px 10px;
  margin: 5px;
  &:hover {
    background-color: #b8c2cc;
    color: white;
  }
`;
const NewQVW = styled.div``;

const QVWSelection = createSelector(
  state => state.QVWs,
  QVWs => QVWs
);

function SelectApplicationQVW() {
  const defaultStartApp = "variableeditor"; // Could at some point be a setting so it can be changed
  const QVWs = useSelector(QVWSelection);
  return (
    <Wrapper>
      <H1>Select Application</H1>
      <List>
        {QVWs &&
          QVWs.map(qvw => {
            return (
              <li key={qvw.id}>
                <MyLink to={`/${qvw.qvwName}/${defaultStartApp}`}>
                  {qvw.qvwName}
                </MyLink>
              </li>
            );
          })}
      </List>
      <Tooltip title="Add New">
        <Button
          style={{ marginTop: "25px" }}
          type="primary"
          shape="round"
          size="large"
          icon="plus"
          onClick={() => alert("Not Yet implemented")}
        >
          Add New
        </Button>
      </Tooltip>
    </Wrapper>
  );
}

export default SelectApplicationQVW;
