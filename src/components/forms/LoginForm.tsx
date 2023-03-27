import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { Button, Title } from "../common";
import { CheckboxInput, TextInput } from "../input";
import { Form } from "../layout";
import './LoginForm.scss';

interface LoginFormValues {
  email: string;
  password: string;
  remember: string
}

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    'email': 'tyler.beutel@blackbook.ai',
    'password': 'Aa@123456',
    'remember': ''
  };

  const validate = (values: LoginFormValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    // Test credentials for development (from db seeding)
    initialValues,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      login({ email, password })
        .then(() => navigate('/admin/leagues'))
        .catch(() => setError('Incorrect password'))
        .finally(() => setIsSubmitting(false));
    },
    validate
  });

  return (
    <div className="login-form">
      <div className="logo-wrapper">
        <img src="/isports.png" />
      </div>
      <Form onSubmit={formik.submitForm} fullWidth>
        <Title>User Login</Title>
        <TextInput
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          touched={formik.touched.email}
          error={formik.errors.email}
          type="email"
          required
        />
        <TextInput
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          touched={formik.touched.password}
          error={formik.errors.password}
          type="password"
          required
        />
        <Button
          label="Log In"
          onClick={() => { }}
          isLoading={isSubmitting}
          fullwidth
          isSubmit
        />
        <CheckboxInput
          checkboxLabel="Remember me"
          onChange={formik.handleChange('remember')}
          value={formik.values.remember}
        />
        {error && <p className="error-text">{error}</p>}
      </Form>
    </div>
  );
};

export default LoginForm;