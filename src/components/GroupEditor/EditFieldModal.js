import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Input, Select } from "antd";
import styled from "styled-components";
import { dispatch } from "rxjs/internal/observable/range";

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const Label = styled.div`
  width: 125px;
  height: 32px;
  padding: 4px 11px 4px 5px;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  /* border-radius: 4px 0 0 4px; */
  border: 1px solid #d9d9d9;
  background-color: #fafafa;
`;

const EditFieldModal = ({ show, onCloseModal, onAddGroupField }) => {
  let [fieldLabel, setFieldLabel] = useState("");
  let [fieldName, setFieldName] = useState("");
  let qvwFields = useSelector(state => state.groupEditor.qvwFields);

  const handleSubmit = () => {
    //check that we have a value in field
    if (!fieldName) {
      alert("You must choose a field.");
      return;
    }
    //check that we have a value in fieldLabel, if not, copy field into fieldLabel
    let fieldLabeltoSubmit = fieldLabel || fieldName;

    //dispatch function for adding group field
    onAddGroupField({ fieldName, fieldLabel: fieldLabeltoSubmit });
    //close modal
    onCloseModal();
  };
  return (
    <Modal
      title="Add Group Field"
      visible={show}
      onOk={handleSubmit}
      onCancel={onCloseModal}
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(
            "form submit i.e. enter button mirroring OK button press",
            fieldLabel
          );
          handleSubmit();
        }}
      >
        <InputWrapper>
          <Label>Field Label</Label>
          <Input
            value={fieldLabel}
            onChange={e => setFieldLabel(e.target.value)}
            autoFocus
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Field Name</Label>
          {/* <Input value={field} onChange={e => setField(e.target.value)} /> */}
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Choose Field"
            onChange={value => setFieldName(value)}
          >
            {qvwFields &&
              qvwFields.map(qvwField => (
                <Select.Option key={qvwField.field} value={qvwField.field}>
                  {qvwField.field}
                </Select.Option>
              ))}
          </Select>
        </InputWrapper>
      </form>
    </Modal>
  );
};

export default EditFieldModal;
