import * as Yup from 'yup';

export const INITIAL_VALUES = {
  password: '',
  confirmPassword: '',
};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
export const VALIDATION = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
    ),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export interface FormValue {
  password: string;
  confirmPassword: string;
}
