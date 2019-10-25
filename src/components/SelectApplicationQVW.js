import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Tooltip, Button, Modal, Input } from "antd";
import styled from "styled-components";
import { addQVWName, removeQVWName } from "../store/QVWs";

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

const QVWListItem = styled.div`
  display: flex;
  align-items: center;
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
const DeleteButton = styled(Button)`
  height: 40px;
`;

const QVWSelection = createSelector(
  state => state.QVWs,
  QVWs => QVWs
);

function SelectApplicationQVW() {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [newQVWName, setNewQVWName] = React.useState("");
  const defaultStartApp = "variableeditor"; // Could at some point be a setting so it can be changed
  const dispatch = useDispatch();
  const QVWs = useSelector(QVWSelection);

  let { confirm } = Modal;
  function showConfirm(id, qvwName) {
    confirm({
      title: `Do you want to delete "${qvwName}" QVW?`,
      content: `When clicked all Variables and Groups associated with "${qvwName}" QVW will be deleted.
        A backup file will be made of deleted Variables and Groups in the /data/backup directory.`,
      onOk() {
        return onDeleteQVW(id);
      },
      onCancel() {}
    });
  }

  const onAddQVWName = () => {
    dispatch(addQVWName(newQVWName));
    onHideModal();
  };
  const onDeleteQVW = id => {
    return dispatch(removeQVWName(id));
  };
  const onHideModal = () => {
    setModalVisible(false);
    setNewQVWName("");
  };
  return (
    <Wrapper>
      <H1>Select Application</H1>
      <List>
        {QVWs &&
          QVWs.map(qvw => {
            return (
              <li key={qvw.id}>
                <QVWListItem>
                  <MyLink to={`/${qvw.qvwName}/${defaultStartApp}`}>
                    {qvw.qvwName}
                  </MyLink>
                  <DeleteButton
                    type="danger"
                    icon="delete"
                    onClick={() => showConfirm(qvw.id, qvw.qvwName)}
                  />
                </QVWListItem>
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
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Add New
        </Button>
      </Tooltip>
      <Modal
        title="Add QVW Name"
        visible={modalVisible}
        onOk={onAddQVWName}
        onCancel={onHideModal}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            onAddQVWName();
          }}
        >
          <Input
            value={newQVWName}
            onChange={e => setNewQVWName(e.target.value)}
            autoFocus
          />
        </form>
      </Modal>
    </Wrapper>
  );
}

export default SelectApplicationQVW;
