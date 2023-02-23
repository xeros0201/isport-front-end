import { useFormik } from "formik";
import { Form, Row } from "../layout";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "../common";
import { DateInput, InputError, TextInput } from "../input";
import DropdownInput from "../input/DropdownInput/DropdownInput";

interface SeasonValues {
  seasonName: "";
  startDay: "";
  endDay: "";
  league: "";
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
    league: "",
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
    if (!values.league) {
      errors.league = "Required";
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
      <Row>
        <DateInput
          label="Start Date"
          onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
          touched={formik.touched.startDay}
          error={formik.errors.startDay}
          required
        />
        <DateInput
          label="End Date"
          onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
          touched={formik.touched.endDay}
          error={formik.errors.endDay}
          required
        />
      </Row>
      <DropdownInput
        label="League"
        placeholder="Select league..."
        options={[]}
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        touched={formik.touched.league}
        error={formik.errors.league}
        required
        asInput
      />
      <Button
        label={initialValues ? "Save" : "Add Season"}
        onClick={() => formik.submitForm()}
        isSubmit
      />
    </Form>
  );
};

export default SeasonForm;
