import * as Yup from 'yup';

export const loginSchema = Yup.object({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});
