import React from "react";
import styled from "styled-components";
import { withFormik, Form, Field, yupToFormErrors } from "formik";
import { Input, Select, Button, notification } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  editorHeaderHeight,
  variableSearchHeight,
  variableGroupTopMargin
} from "../../styles/standardStyles";
// For group select
import {
  selectQVWGroups,
  selectDoesVariableExist,
  selectVariableNameArray
} from "../../store/variableEditor";
import { addVariable } from "../../store/variableEditor";

const VarListWrapper = styled.div`
  margin: calc(${editorHeaderHeight} + ${variableGroupTopMargin}) 25px;
`;

// const FormWrapper = styled(Form)`
//   display: flex;
//   flex-direction: column;
// `;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ErrorDiv = styled.div`
  color: red;
  & > p {
    margin: 0 0 0 5px;
    padding: 0;
    font-weight: bold;
  }
`;

// ----------------------
// - VariableAddNew Component
//-----------------------
function VariableAddNew() {
  let { selectedQVW } = useParams();
  let dispatch = useDispatch();
  let variableNameArray = useSelector(state =>
    selectVariableNameArray(state, selectedQVW)
  );
  let initialGroup = useSelector(state =>
    selectQVWGroups(state, selectedQVW)
  )[0];
  // Submit function will be passed to formik
  const submit = async values => {
    // Check to make sure no other variable of same name exist
    // if it does send back an error object
    let nameExists = variableNameArray.includes(values.name);
    if (nameExists) {
      return { name: "Variable Name Exists" };
    }
    // Finish submitting if name is not a dup
    let newVarObj = {
      application: selectedQVW,
      group: values.group,
      name: values.name,
      description: values.description,
      expression: values.expression,
      notes: values.notes,
      locked: false
    };

    let x = await dispatch(addVariable(newVarObj));
    notification.open({
      message: "New Variable Saved",
      duration: 2,
      description: `The variable ${values.name} has been saved.`,
      style: {
        width: 300,
        marginLeft: 335 - 300
      }
    });
    return x;
  };
  return (
    <VarListWrapper>
      <FormikForm submit={submit} initialGroup={initialGroup} />
    </VarListWrapper>
  );
}

const MyForm = ({
  values,
  setFieldValue,
  setErrors,
  errors,
  touched,
  isSubmitting,
  handleSubmit
}) => {
  let { selectedQVW } = useParams();
  let groups = useSelector(state => selectQVWGroups(state, selectedQVW));

  // Only way I could figureout how to set the initial value dynamically on the
  // antd Select component
  React.useEffect(() => {
    setFieldValue("group", groups[0]);
  }, []);
  return (
    <Form>
      <FormRow flexDirection="row">
        <FormItem>
          <label>Group:</label>
          <Field
            name="group"
            render={({ field }) => (
              <Select
                {...field}
                onChange={value => setFieldValue("group", value)}
              >
                {groups.map(group => (
                  <Select.Option key={group} value={group}>
                    {group}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          <ErrorDiv>
            {errors.group && touched.group && <p>{errors.group}</p>}
          </ErrorDiv>
        </FormItem>
        <FormItem>
          <label>Variable Name:</label>
          <Field
            name="name"
            render={({ field }) => <Input {...field} placeholder="Name" />}
          />
          <ErrorDiv>
            {errors.name && touched.name && <p>{errors.name}</p>}
          </ErrorDiv>
        </FormItem>
      </FormRow>

      <FormRow>
        <FormItem>
          <label>Description</label>
          <Field
            name="description"
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Description" />
            )}
          />
        </FormItem>
      </FormRow>
      <FormRow>
        <FormItem>
          <label>Expression</label>
          <Field
            name="expression"
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Expression" />
            )}
          />
        </FormItem>
      </FormRow>
      <FormRow>
        <FormItem>
          <label>Notes</label>
          <Field
            name="notes"
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Notes" />
            )}
          />
        </FormItem>
      </FormRow>
      <Button disabled={isSubmitting} htmlType="submit">
        Add
      </Button>
    </Form>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ initialGroup }) {
    return {
      group: initialGroup,
      name: "",
      description: "",
      expression: "",
      notes: ""
      //ADD LOCKED!!
    };
  },
  validationSchema: yup.object().shape({
    group: yup.string().required(),
    name: yup
      .string()
      .min(2, "Name must be greater than 2 characters")
      .matches(
        /^(\d|\w)+$/,
        "Name must not contain spaces or special characters"
      )
      .required("Variable Name is a required field")
  }),
  async handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    // the props that come in the FormikBag (destructured above) are the props from
    // the "calling" component.  This component can house the submit function
    //This is simulating our submit
    let errors = await props.submit(values);
    console.log("after await call");
    if (errors) {
      setErrors(errors);
    } else {
      resetForm();
    }
    setSubmitting(false);
    // setTimeout(() => {
    //   // Check if variable name submitted is already being used in this QVW
    //   // If so, set error
    //   if (values.name === "vInUse") {
    //     setErrors({ name: "Variable name already exists" });
    //   } else {
    //     resetForm();
    //   }
    //   console.log("handlesumbit props", props);
    //   setSubmitting(false);
    // }, 2000);
  }
})(MyForm);

export default VariableAddNew;
