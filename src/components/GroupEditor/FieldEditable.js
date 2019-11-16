import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import uuid from "uuid";
import { Select, Button, Input, Popconfirm } from "antd";

// TODO: Get Control/s working for Select controls
// TODO: Deal with no onBlur on Select controls
// TODO: Deal with border around static fields.  maybe prop to use border or not
//       pass to styled component

/**
 * Used for regular input and textarea input needs
 * the passed props.inRef is used in the main function's useEffect()
 * to set the cursor to the end of the text.
 */
const CustomInput = props => {
  let { inputProps } = props;

  if (props.inputType === "textarea") {
    return <Input.TextArea autoFocus ref={props.inRef} {...inputProps} />;
  } else {
    return (
      <Input
        autoFocus
        ref={props.inRef}
        {...inputProps}
        onKeyPress={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            props.onHandleSave();
          }
        }}
      />
    );
  }
};

const StaticField = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color: white;
  border: 1px solid gray;
  padding: 5px;
  width: 100%;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const FieldEditable = ({
  passedFieldValue,
  inputType,
  pickListValues,
  allowPickListSearch,
  onSave
}) => {
  let [hotKey, setHotKey] = useState();
  let [editing, setEditing] = useState(false);
  let [fieldValue, setFieldValue] = useState(passedFieldValue);
  let [availablePickListValues, setAvailablePickListValues] = useState(
    pickListValues || []
  );
  let inRef = React.createRef();

  React.useEffect(() => {
    let myRef;
    if (editing && inputType !== "select") {
      myRef =
        inputType === "textarea"
          ? inRef.current.textAreaRef
          : inRef.current.input;
      myRef.focus();
      myRef.setSelectionRange(fieldValue.length, fieldValue.length);
    }
  }, [inputType, editing]);
  const cancelEditing = () => {
    setEditing(false);
    setFieldValue(passedFieldValue);
    setAvailablePickListValues(pickListValues || []);
  };
  const handleSave = () => {
    onSave(fieldValue);
    setEditing(false);
    setAvailablePickListValues(pickListValues || []);
  };

  // -------------------------------------------
  // OLD -- Used to be called on the Selects 'onSearch' property, now letting antd Select do it with 'filterOption' property
  //---------------------------------------
  // const handleFieldSearch = value => {
  //   //Take the value typed and search the "label" key in the pickListValues object prop
  //   const re = new RegExp(value, "gi");
  //   setAvailablePickListValues(
  //     pickListValues.filter(aField => aField.label.match(re))
  //   );
  // };

  const captureKey = key => {
    console.log("captureky", hotKey);
    if (key === "Control") {
      setHotKey(key);
      return;
    }
    if (hotKey === "Control") {
      if (hotKey + key === "Controls") {
        console.log("we have a Controls");
        handleSave();
      }
      setHotKey(undefined);
    }
  };
  const keyUp = key => {
    setHotKey(undefined);
  };
  // Static (Non-Editable) field JSX
  let fieldJSX = (
    <StaticField onClick={() => setEditing(true)}>
      {passedFieldValue}
    </StaticField>
  );

  let editableJSX;
  // ---------------------------
  // - Build SELECT component -- inputType = "select"
  // ---------------------------
  if (inputType === "select") {
    //Create Options tags from passed list
    const options = availablePickListValues.map(aField => (
      <Select.Option key={aField.key} value={aField.key}>
        {aField.label}
      </Select.Option>
    ));
    editableJSX = (
      <div onKeyDown={e => captureKey(e.key)} onKeyUp={e => keyUp(e.key)}>
        <Select
          mode="default"
          showSearch={allowPickListSearch}
          autoFocus
          labelInValue
          value={{ key: fieldValue }}
          style={{ width: "100%" }}
          notFoundContent=""
          defaultActiveFirstOption={false}
          filterOption={allowPickListSearch} //handles the searching of the options for us
          // onBlur={() => cancelEditing()}
          dropdownMatchSelectWidth={false}
          onChange={value => setFieldValue(value.key)}
        >
          {options}
        </Select>
        <Button icon="save" onClick={handleSave} />
        <Button icon="close" onClick={cancelEditing} onBlur={cancelEditing} />
      </div>
    );
  } else {
    // ---------------------------
    // - Build INPUT component -- either "input" OR "textarea"
    // ---------------------------
    // These are the props that we will spread on the tag
    let inputProps = {
      value: fieldValue,
      onChange: e => setFieldValue(e.target.value),
      ref: inRef
    };
    editableJSX = (
      <React.Fragment>
        <InputWrapper>
          <div
            style={{ width: "100%" }}
            onKeyDown={e => captureKey(e.key)}
            onKeyUp={e => keyUp(e.key)}
          >
            <CustomInput
              inputProps={inputProps}
              inputType={inputType}
              onHandleSave={handleSave}
            />
          </div>
          <Button icon="save" onMouseDown={handleSave} />
          <Button
            icon="close"
            onMouseDown={cancelEditing}
            onBlur={cancelEditing}
          />
        </InputWrapper>
      </React.Fragment>
    );
  }

  return <div>{editing ? editableJSX : fieldJSX}</div>;
};

export default FieldEditable;

FieldEditable.propTypes = {
  // passed field value to be displayed in component
  // this is what is always displayed in the static view
  // the user must Save their changes and calling component must pass the newly saved field value.
  passedFieldValue: PropTypes.string,
  // inputType either "select", "input", "textarea"
  inputType: PropTypes.oneOf(["select", "input", "textarea"]),
  // if inputType is "select", this will be the values used to display in the dropdown list
  // must be passed as an array of objects [{label, key}, ...]
  pickListValues: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string
    })
  ),
  // Make searchable select component
  allowPickListSearch: PropTypes.bool,
  // Function to be called when editable field is saved
  onSave: PropTypes.func
};