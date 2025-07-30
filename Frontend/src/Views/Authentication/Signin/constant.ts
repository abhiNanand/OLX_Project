import * as Yup from 'yup';

export interface FormValue {
  email: string;
  password: string;
}

export const INITIAL_VALUES = {
  email: '',
  password: '',
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

export const VALIDATION = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address'),
  password: Yup.string().required('Password is required'),
});
