import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
    .max(20, 'Must be less than 15 characters'),
  description: Yup.string().required('Required'),
  brand: Yup.string().required('Required'),
  year: Yup.number()
    .required('Required')
    .integer('year must be integer')
    .min(1900, 'Must be greater than 1900')
    .max(new Date().getFullYear(), 'Select correct year'),
  price: Yup.number()
    .required('Required')
    .min(100, 'Must be greater than 100')
    .max(10000000, 'Must be less than 10 lakhs'),
  images: Yup.array()
    .min(1, 'Please upload at least one photo')
    .max(5, 'min 5 photos')
    .required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
});

export const initialValues = {
  title: '',
  description: '',
  brand: '',
  year: '',
  price: '',
  photos: [] as File[],
  state: '',
  city: '',
  sellerName: '',
  mobileNumber: '',
};
