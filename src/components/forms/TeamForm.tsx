import { useFormik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  createTeam,
  getTeam,
  TeamFormValues,
  updateTeam,
} from "../../api/teams";

import { Button, Spinner } from "../common";
import { LeagueDropdown, SeasonDropdown } from "../dropdowns";
import { InputError, TextInput } from "../input";
import ImageInput from "../input/ImageInput/ImageInput";
import { Form } from "../layout";

const TeamForm = ({ id }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Setup react-query for fetching data
  const { isLoading, data, refetch, error } = useQuery(
    ["getTeam", { id }],
    async () => {
      if (id) return getTeam(+id);
    }
  );

  // Setup initial values
  const initialValues: TeamFormValues = {
    name: data?.name ?? "",
    logo: data?.logo ?? "",
    leagueId: data?.season.league.id.toString() ?? "",
    seasonId: data?.seasonId?.toString() ?? "",
  };

  // Setup submit handler
  const onSubmit = async (values: TeamFormValues) => {
    const update = async () => {
      if (!id) return;
      await updateTeam(id, values);
      refetch();
    };
    const create = async () => {
      await createTeam(values);
      navigate("/admin/teams");
    };

    setIsSubmitting(true);
    !!id ? await update() : await create();
    setIsSubmitting(false);
  };

  // Setup validation
  const validate = (values: TeamFormValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (values.logo.length === 0) {
      errors.logo = "Required";
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
        label="Team Name"
        placeholder="Type team name..."
        value={formik.values.name}
        onChange={formik.handleChange("name")}
        touched={formik.touched.name}
        error={formik.errors.name}
        required
      />
      <ImageInput
        label="Team Logo"
        required
        value={formik.values.logo}
        onChange={(value) => formik.setFieldValue("logo", value)}
        touched={formik.touched.logo}
        error={formik.errors.logo}
      />
      <LeagueDropdown
        label="League"
        value={formik.values.leagueId}
        onChange={formik.handleChange("leagueId")}
        error={formik.errors.leagueId}
        touched={formik.touched.leagueId}
        required
        asInput
      />
      <SeasonDropdown
        label="Season"
        leagueId={formik.values.leagueId}
        value={formik.values.seasonId}
        onChange={formik.handleChange("seasonId")}
        error={formik.errors.seasonId}
        touched={formik.touched.seasonId}
        required
        asInput
      />
      <Button
        label={id ? "Save" : "Add Team"}
        onClick={formik.submitForm}
        isSubmit
      />
    </Form>
  );
};

export default TeamForm;
