import { useFormik } from "formik";
import { Form } from "../layout";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "../common";
import { InputError, TextInput } from "../input";

interface SeasonValues {
  seasonName: "";
  startDay: "";
  endDay: "";
}

const SeasonForm = ({ id }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Setup react-query for fetching data
  const { isLoading, data, refetch, error } = useQuery(
    ["", {}],
    async () => {}
  );

  // Setup initial values
  const initialValues: SeasonValues = data ?? {
    seasonName: "",
    startDay: "",
    endDay: "",
  };

  // Setup submit handler
  const onSubmit = async (values: SeasonValues) => {};

  // Setup validation
  const validate = (values: SeasonValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.seasonName) {
      errors.seasonName = "Required";
    }
    if (!values.startDay) {
      errors.startDay = "Required";
    }
    if (!values.endDay) {
      errors.endDay = "Required";
    }
    return errors;
  };

  // If fetching data for provided id, show loading
  if (id && isLoading) return <Spinner />;

  // If submitting, show loading
  if (isSubmitting) return <Spinner size="large" />;

  // If error fetching data, show error
  if (error) return <InputError error="Failed to load form" touched={true} />;

  // Setup form
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  // Otherwise show form
  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextInput
        label="Season Name"
        value={formik.values.seasonName}
        onChange={formik.handleChange("seasonName")}
        touched={formik.touched.seasonName}
        error={formik.errors.seasonName}
        required
      />
      <TextInput
        label="League"
        value={formik.values.seasonName}
        onChange={formik.handleChange("seasonName")}
        touched={formik.touched.seasonName}
        error={formik.errors.seasonName}
        required
      />
      <Button
        label={initialValues ? "Save" : "Add League"}
        onClick={() => formik.submitForm()}
        isSubmit
      />
    </Form>
  );
};

export default SeasonForm;
