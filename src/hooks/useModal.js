import React, { useState } from "react";
import { Modal, Input, Select } from "antd";
import styled from "styled-components";

export const useAntModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const showModal = () => setIsShowing(true);
  const hideModal = () => setIsShowing(false);
  return { isShowing, showModal, hideModal, setIsShowing };
};

const AntModal = props => {
  let { title, isShowing, onOk, onCancel, message } = props;
  return (
    <Modal title={title} visible={isShowing} onOk={onOk} onCancel={onCancel}>
      <div>{message}</div>
    </Modal>
  );
};

export default AntModal;
