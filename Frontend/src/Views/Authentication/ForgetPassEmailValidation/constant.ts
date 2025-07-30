import * as Yup from 'yup';

export const INITIAL_VALUES = {
  email: '',
};
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
export const VALIDATION = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address'),
});
export interface FormValue {
  email: string;
}
