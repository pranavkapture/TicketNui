import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Button, TextField } from '@mui/material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';

const LoginForm = () => {
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const onSubmit = (values, { setSubmitting }) => {
    // Save username to Redux or context
    setUsername(values.username);

    // Navigate to dashboard or desired route
    navigate('/dashboard');

    setSubmitting(false);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  return (
    <div className="bg-blue-800 min-h-screen flex justify-center items-center">
      {/* Left side - Welcome message */}
      <div className="w-1/2 flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Kapture Cx</h1>
        <p className="text-lg">Manage your tickets efficiently with our platform.</p>
      </div>

      {/* Right side - Login form */}
      <div className="w-1/2 bg-gray-800 p-8">
        <div className="max-w-sm w-full bg-gray-100 shadow-md rounded px-8 pt-6 pb-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-black">Login</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                    className="mt-1"
                    InputProps={{
                      startAdornment: <AccountCircle />,
                    }}
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                    className="mt-1"
                    InputProps={{
                      startAdornment: <Email />,
                    }}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                    className="mt-1"
                    InputProps={{
                      startAdornment: <Lock />,
                    }}
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    className="w-full"
                    startIcon={isSubmitting ? null : <Lock />}
                  >
                    {isSubmitting ? 'Logging in...' : 'Log In'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
