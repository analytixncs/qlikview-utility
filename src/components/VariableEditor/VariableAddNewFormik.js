import React from "react";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import {
  Input,
  Select,
  Button,
  notification,
  Alert,
  Checkbox,
  Divider,
  Icon,
  Modal
} from "antd";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  editorHeaderHeight,
  variableGroupTopMargin,
  Spacer,
  contentBgColor
} from "../../styles/standardStyles";
// For group select
import {
  selectQVWGroups,
  selectVariableNameArray
} from "../../store/variableEditor";
import { addVariable } from "../../store/variableEditor";

//------------------------------
// Styled Components
//------------------------------

const ButtonRow = styled.div`
  border-top: 1px solid black;
  margin: 0 0 0 -15px;
  padding: 15px;
  background-color: white;
`;

const VarListWrapper = styled.div`
  margin: calc(${editorHeaderHeight} + ${variableGroupTopMargin}) auto;
  box-shadow: 3px 3px 9px -2px #000000;
  border: 1px solid #abbfcf;
  width: 800px;
  & > form {
    background-color: ${contentBgColor};
    padding-left: 15px;
    border: 1px solid #abbfcf;
  }
  & label {
    font-weight: bold;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.width ? props.width : "100%")};
  padding-right: 15px;
  & > textarea {
    font-family: ${props => (props.isCode ? `"Fira Code", monospace` : null)};
    font-size: ${props => (props.isCode ? "1.2rem" : null)};
  }
`;

const ErrorDiv = styled.div`
  color: red;
  & > p {
    margin: 0 0 0 5px;
    padding: 0;
    font-weight: bold;
  }
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

//--------------------------------------------------
// ----------------------
// - VariableAddNew Component
//-----------------------
function VariableAddNew() {
  let { selectedQVW } = useParams();
  let history = useHistory();
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
      locked: values.locked
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
      <TitleWrapper>
        <Title>Add New Variable</Title>
        <CloseButton
          icon="close"
          onClick={() => history.push(`/${selectedQVW}/variableeditor`)}
        />
      </TitleWrapper>
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
  let [newGroup, setNewGroup] = React.useState("");
  let [isVisibleModal, setIsVisibleModal] = React.useState(false);

  // Add a new group if doesn't exist in QVW
  // Called from Modal shown if isVisibleModal is set to show in Select
  const addGroup = () => {
    setIsVisibleModal(false);
    setFieldValue("group", newGroup);
    setNewGroup("");
  };
  let history = useHistory();
  return (
    <React.Fragment>
      <Form>
        <FormRow flexDirection="row">
          <FormItem width="400px">
            <label>Group:</label>
            <Field
              name="group"
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={value => setFieldValue("group", value)}
                  // Renders an extra "option" to add a new group
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div
                        style={{ padding: "4px 8px", cursor: "pointer" }}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setIsVisibleModal(true)}
                      >
                        <Icon type="plus" />
                        {` New Group`}
                      </div>
                    </div>
                  )}
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
          <FormItem isCode>
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
        <FormRow>
          <FormItem>
            <Field
              name="locked"
              render={({ field }) => {
                return (
                  <Checkbox
                    {...field}
                    style={{ fontWeight: "bold" }}
                    checked={field.value}
                    onChange={e => setFieldValue("locked", e.target.checked)}
                  >
                    Lock?
                  </Checkbox>
                );
              }}
            />
          </FormItem>
        </FormRow>
        <ButtonRow>
          <Button type="primary" disabled={isSubmitting} htmlType="submit">
            Add Variable
          </Button>
          <Spacer />
          <Button
            disabled={isSubmitting}
            onClick={() => history.push(`/${selectedQVW}/variableeditor`)}
          >
            Cancel
          </Button>
        </ButtonRow>
        <Modal
          visible={isVisibleModal}
          title="Enter New Group Name"
          onOk={addGroup}
          onCancel={() => setIsVisibleModal(false)}
        >
          <Input
            autoFocus
            value={newGroup}
            onChange={e => setNewGroup(e.target.value)}
            onPressEnter={addGroup}
          />
        </Modal>
      </Form>
    </React.Fragment>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ initialGroup }) {
    return {
      group: initialGroup,
      name: "",
      description: "",
      expression: "",
      notes: "",
      locked: false
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
