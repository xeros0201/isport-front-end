import { useFormik } from "formik";
import { useState } from "react";
import { ImageListType, ImageType } from "react-images-uploading";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { createLeague, getLeague, updateLeague } from "../../api/leagues";
import { Button, Spinner } from "../common";
import { InputError, TextInput } from "../input";
import ImageInput from "../input/ImageInput/ImageInput";
import { Form } from "../layout";

interface LeagueFormValues {
  name: string;
  logo: ImageListType;
}

const LeagueForm = ({ id }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Setup react-query for fetching data
  const { isLoading, data, refetch, error } = useQuery(
    ["getLeague", { id }],
    async () => {
      if (id) return getLeague(+id);
    }
  );

  // Setup initial values
  const initialValues: LeagueFormValues = data ?? {
    name: "",
    logo: [],
  };

  // Setup submit handler
  const onSubmit = async (values: LeagueFormValues) => {
    console.log(values);

    const update = async () => {
      if (!id) return;
      await updateLeague(id, values);
      refetch();
    };
    const create = async () => {
      await createLeague(values);
      navigate("/admin/leagues");
    };

    setIsSubmitting(true);
    !!id ? await update() : await create();
    setIsSubmitting(false);
  };

  // Setup validation
  const validate = (values: LeagueFormValues) => {
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
        label="League Name"
        value={formik.values.name}
        onChange={formik.handleChange("name")}
        touched={formik.touched.name}
        error={formik.errors.name}
        required
      />
      <ImageInput
      
      label="123312"
      required
        onChange={(
          values: ImageListType,
          addUpdatedIndex: number[] | undefined
        ) => {
          //   formik.values.logo = values;
          formik.setFieldValue("logo", values);

          formik.handleChange("logo");
        }}
        values={formik.values.logo}
        touched={formik.touched.logo?.length === 0}
        error={formik.errors.logo as string}
      />
      <Button
        label={initialValues ? "Save" : "Add League"}
        onClick={() => formik.submitForm()}
        isSubmit
      />
    </Form>
  );
};

export default LeagueForm;
