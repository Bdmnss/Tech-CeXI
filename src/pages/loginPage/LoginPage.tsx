import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../validationSchemas/loginSchema';
import { authenticateUser } from '../../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../components/Input';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const authResponse = await authenticateUser(
          values.username,
          values.password
        );
        if (authResponse && authResponse.accessToken) {
          localStorage.setItem('accessToken', authResponse.accessToken);

          navigate('/users');
        } else {
          toast.error('Invalid username or password');
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unknown error occurred');
        }
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-white md:bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 md:shadow-md">
        <h2 className="mb-10 text-center text-2xl font-bold md:mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.username}
            touched={formik.touched.username}
            placeholder="Enter your username"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            placeholder="Enter your password"
            isPassword
          />
          <button
            type="submit"
            className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
