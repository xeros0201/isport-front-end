import { useFormik } from "formik";
import { Form, Row } from "../layout";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "../common";
import { DateInput, InputError, TextInput } from "../input";
import { LeagueDropdown } from "../dropdowns";
import { createSeasons, getSeason, SeasonFormValues, updateSeason } from "../../api/seasons";
const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;
const defaultDate = new Date().toISOString();

const SeasonForm = ({ id }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Setup react-query for fetching data
  const { isLoading, data, refetch, error } = useQuery(
    ["getSeason", {}],
    async () => {
      if (id) return getSeason(+id);
    }
  );

  // Setup initial values
  const initialValues: SeasonFormValues = {
    name: data?.name ?? "",
    startDate: data?.startDate ?? defaultDate,
    endDate: data?.endDate ?? defaultDate,
    leagueId: data?.leagueId.toString() ?? "",
  };

  // Setup submit handler
  const onSubmit = async (values: SeasonFormValues) => {
    const update = async () => {
      if (!id) return;
      await updateSeason(id, values);
      refetch();
    };
    const create = async () => {
      await createSeasons(values);
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
  const validate = (values: SeasonFormValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.startDate) {
      errors.startDate = "Required";
    }
    if (!values.endDate) {
      errors.endDate = "Required";
    }
    if (!values.leagueId) {
      errors.league = "Required";
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
        label="Season Name"
        value={formik.values.name}
        onChange={formik.handleChange("name")}
        touched={formik.touched.name}
        error={formik.errors.name}
        required
      />
      <Row>
        <DateInput
          label="Start Date"
          value={formik.values.startDate}
          onChange={formik.handleChange("startDate")}
          touched={formik.touched.startDate}
          error={formik.errors.startDate}
          required
        />
        <DateInput
          label="End Date"
          value={formik.values.endDate}
          onChange={formik.handleChange("endDate")}
          touched={formik.touched.endDate}
          error={formik.errors.endDate}
          required
        />
      </Row>
      <LeagueDropdown
        label="League"
        value={formik.values.leagueId}
        onChange={formik.handleChange("leagueId")}
        touched={formik.touched.leagueId}
        error={formik.errors.leagueId}
        required
        asInput
      />
      <Button
        label={id ? "Save" : "Add Season"}
        onClick={() => formik.submitForm()}
        isSubmit
      />
    </Form>
  );
};

export default SeasonForm;
