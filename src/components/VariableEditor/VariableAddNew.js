import React from "react";
import styled from "styled-components";
import useForm from "react-hook-form";
import {
  editorHeaderHeight,
  variableSearchHeight,
  variableGroupTopMargin
} from "../../styles/standardStyles";

const VarListWrapper = styled.div`
  margin: calc(${editorHeaderHeight} + ${variableGroupTopMargin}) 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

function VariableAddNew() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <VarListWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow flexDirection="row">
          <FormItem>
            <label>Group:</label>
            <select name="group" ref={register}>
              <option value="group1">group1</option>
              <option value="group2">group2</option>
            </select>
          </FormItem>
          <FormItem>
            <label>Variable Name:</label>
            <input id="name" name="name" ref={register} />
          </FormItem>
        </FormRow>

        <FormRow>
          <FormItem>
            <label>Description</label>
            <textarea name="description" ref={register} />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem>
            <label>Expression</label>
            <textarea name="expression" ref={register} />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem>
            <label>Notes</label>
            <textarea name="notes" ref={register} />
          </FormItem>
        </FormRow>
        <input type="submit" />
      </Form>
    </VarListWrapper>
  );
}

export default VariableAddNew;
