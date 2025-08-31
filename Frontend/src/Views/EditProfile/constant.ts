import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().matches(
    /^\d{10}$/,
    'Mobile number must be exactly 10 digits'
  ),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  username: Yup.string()
    .required('Seller name is required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Seller name should contain only alphabets and spaces'
    )
    .min(3, 'Seller name should be at least 3 characters long'),
});

export const initialValues = {
  username: '',
  phoneNumber: '',
  aboutMe: '',
  email: '',
};
