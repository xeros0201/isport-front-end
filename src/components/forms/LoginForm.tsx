import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { Button, Title } from "../common";
import { CheckboxInput, TextInput } from "../input";
import { Form } from "../layout";

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const formik = useFormik({
    // Test credentials for development (from db seeding)
    initialValues: {
      'email': 'tyler.beutel@blackbook.ai',
      'password': 'Aa@123456'
    },
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      login({ email, password })
        .then(() => navigate('/admin/leagues'))
        .catch((error) => setError('Authentication failed.'))
        .finally(() => setIsSubmitting(false));
    }
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      height: '100%'
    }}>
      <div style={{ height: '50px' }}>
        <img src="/isports.png" style={{ height: '100%', width: 'auto' }} />
      </div>
      <Form onSubmit={formik.submitForm} fullWidth>
        <Title loginForm>User Login</Title>
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
          type="login"
          isSubmit
        />
        {error && <p>{error}</p>}
        <CheckboxInput
          checkboxLabel="Remember me"
          onChange={() => { }}
          type='login'
          value={'true'}
        />
      </Form>
    </div>
  );
};

export default LoginForm;