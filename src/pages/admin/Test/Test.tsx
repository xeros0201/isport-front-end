import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "../../../components/common";
import { LeagueDropdown } from "../../../components/dropdowns";
import { TextInput } from "../../../components/input";
import { Form, Page } from "../../../components/layout";

const Test = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            text1: "",
            text2: "",
            league: "",
        },
        onSubmit: (values) => {
            setIsSubmitting(true);
            // Wait 2 seconds
            setTimeout(() => {
                setIsSubmitting(false);
                alert(JSON.stringify(values, null, 2));
            }, 2000);
        },
    });

    return (
        <Page title="Test">
            <h3>This is a test form for testing</h3>
            <Form onSubmit={formik.submitForm}>
                <TextInput
                    label="Text 1"
                    value={formik.values.text1}
                    onChange={formik.handleChange('text1')}
                    error={formik.errors.text1}
                    touched={formik.touched.text1}
                />
                <TextInput
                    label="Text 2"
                    value={formik.values.text2}
                    onChange={formik.handleChange('text2')}
                    error={formik.errors.text2}
                    touched={formik.touched.text2}
                    icon="IoSearch"
                />
                <LeagueDropdown
                    label="League"
                    value={formik.values.league}
                    onChange={formik.handleChange('league')}
                    error={formik.errors.league}
                    touched={formik.touched.league}
                    asInput
                />
            </Form>
            <Button
                label="Submit"
                onClick={formik.submitForm}
                isLoading={isSubmitting}
                isSubmit
            />
            <br />
            {JSON.stringify(formik.values)}
        </Page>
    );
}

export default Test;