import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "../../../components/common";
import { LeagueDropdown } from "../../../components/dropdowns";
import { DateInput, CheckboxInput, TextInput } from "../../../components/input";
import { Form, Page, Row } from "../../../components/layout";
import ImageInput from "../../../components/input/ImageInput/ImageInput";

const Test = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      text1: "",
      text2: "",
      date: new Date().toISOString(),
      league: "",
      active: "true",
      logo1: "value",
      logo2: "",
    },
    onSubmit: (values) => {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 1000);
    },
  });

  return (
    <Page title="Test">
      <h3>This is a test form for testing</h3>
      <Form onSubmit={formik.submitForm}>
        <Row>
            <TextInput
            label="Text 1"
            value={formik.values.text1}
            onChange={formik.handleChange("text1")}
            error={formik.errors.text1}
            touched={formik.touched.text1}
            />
            <TextInput
            label="Text 2"
            value={formik.values.text2}
            onChange={formik.handleChange("text2")}
            error={formik.errors.text2}
            touched={formik.touched.text2}
            icon="IoSearch"
            />
        </Row>
        <DateInput
          label="Date"
          value={formik.values.date}
          onChange={formik.handleChange("date")}
          error={formik.errors.date}
          touched={formik.touched.date}
        />
        <LeagueDropdown
          label="League"
          value={formik.values.league}
          onChange={formik.handleChange("league")}
          error={formik.errors.league}
          touched={formik.touched.league}
          asInput
        />
        <CheckboxInput
          label="Active"
          checkboxLabel="Active"
          value={formik.values.active}
          onChange={formik.handleChange("active")}
        />
        <ImageInput
          label="Prefilled logo"
          value={formik.values.logo1}
          onChange={formik.handleChange("logo1")}
          error={formik.errors.logo1}
          touched={formik.touched.logo1}
        />
        <ImageInput
          label="Empty logo"
          value={formik.values.logo2}
          onChange={formik.handleChange("logo2")}
          error={formik.errors.logo2}
          touched={formik.touched.logo2}
        />
      </Form>
      <Button
        label="Submit"
        onClick={formik.submitForm}
        isLoading={isSubmitting}
        isSubmit
      />
      <br />
      {/* {JSON.stringify(formik.values)} */}
    </Page>
  );
};

export default Test;
