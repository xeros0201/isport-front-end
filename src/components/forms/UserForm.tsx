import { useFormik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { 
  createUser, getUser, 
  updateUser, UserFormValues 
} from "../../api/users";
import { Button, Spinner } from "../common";
import { CheckboxInput, InputError, TextInput } from "../input";
import { Form } from "../layout";
import "./Form.scss";
const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;

const UserForm = ({ id }: { id: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Setup react-query for fetching data
  const { isLoading, data, refetch, error } = useQuery(
    ["getUser", {}],
    async () => {
      if (id) return getUser(id);
    }
  );

  // Setup initial values
  const initialValues: UserFormValues = {
    email: data?.email ?? "",
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    password: "",
    status: data?.active ? "true" : "",
  };
  
  // Setup submit handler
  const onSubmit = async (values: UserFormValues) => {
    const update = async () => {
      if (!id) return;
      await updateUser(id, values);
      refetch();
    };
    const create = async () => {
      await createUser(values);
      navigate(`${adminPrefix}/seasons`);
    };

    setIsSubmitting(true);
    try {
      !!id ? await update() : await create();
    } catch (error) {
      alert(JSON.stringify(error))
    }
    setIsSubmitting(false);
  };

  // Setup validation
  const validate = (values: UserFormValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  // Setup form
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  // If fetching data for provided id, show loading
  if (id && isLoading) return <Spinner />;

  // If submitting, show loading
  if (isSubmitting) return <Spinner size="large" />;

  // If error fetching data, show error
  if (error) return <InputError error="Failed to load form" touched={true} />;

  // Otherwise show form
  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextInput
        label="Email"
        placeholder="Type email ..."
        value={formik.values.email}
        onChange={formik.handleChange("email")}
        touched={formik.touched.email}
        error={formik.errors.email}
        required
      />
      <div className="make-row">
        <TextInput
          label="First Name"
          placeholder="Type first name..."
          value={formik.values.firstName}
          onChange={formik.handleChange("firstName")}
          touched={formik.touched.firstName}
          error={formik.errors.firstName}
          required
        />
        <div className="make-row--space" />
        <TextInput
          label="Last Name"
          placeholder="Type last name..."
          value={formik.values.lastName}
          onChange={formik.handleChange("lastName")}
          touched={formik.touched.lastName}
          error={formik.errors.lastName}
          required
        />
      </div>
      <TextInput
        label="Password"
        placeholder="Type password..."
        value={formik.values.password}
        onChange={formik.handleChange("password")}
        touched={formik.touched.password}
        error={formik.errors.password}
        required
        type="password"
      />
      <CheckboxInput
        label={"Status"}
        checkboxLabel={"Activated"}
        value={formik.values.status}
        onChange={formik.handleChange("status")}
        required
      />
      <Button
        label={initialValues ? "Save" : "Add User"}
        onClick={() => formik.submitForm()}
        isSubmit
      />
    </Form>
  );
};

export default UserForm;
