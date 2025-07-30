// libs
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// api
import {
  useGetUserInfoQuery,
  usePostEditProfileDataMutation,
  usePostEmailValidMutation,
} from '../../Services/Api/module/imageApi';

// components
import {
  Description,
  TextField,
  PhoneNumber,
} from '../../Components/CustomComponents/Post/Common/Common';
import ErrorSection from '../../Components/Atom/ErrorSection';
import Loader from '../../Components/Atom/Loader';

// constants
import { ROUTES_CONFIG } from '../../Helper/Routes';
import ICONS from '../../assets';
import { COMMON_TEXT } from '../../Helper/text';
import { EditProfileProps } from '../../Helper/interface';
import { validationSchema, initialValues } from './constant';
import CLASSNAME from '../../Helper/classes';

// redux
import { updateUsername } from '../../Store/Common';

export default function EditProfile() {
  const { data, isLoading, isError } = useGetUserInfoQuery({});
  const [post] = usePostEditProfileDataMutation();
  const [postEmailValid] = usePostEmailValidMutation();
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //    submiting form
  const handleSubmit = async (values: EditProfileProps) => {
    try {
      await postEmailValid({ email: values.email }).unwrap();
      await post({
        ...values,
      }).unwrap();
      toast.success(COMMON_TEXT.PROFILE_UPDATED_SUCCESSFULLY);
      dispatch(updateUsername({ username: values?.username }));
      navigate(ROUTES_CONFIG.PROFILE.path);
    } catch (error) {
      toast.error((error as any)?.data?.msg);
    }
  };

  //    to set the initial value
  useEffect(() => {
    if (data) {
      setFormInitialValues((prev) => ({
        ...prev,
        ...Object.keys(initialValues).reduce((acc, key) => {
          acc[key as keyof EditProfileProps] =
            data[key] ?? prev[key as keyof EditProfileProps];
          return acc;
        }, {} as EditProfileProps),
      }));
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorSection />;

  return (
    <Formik
      initialValues={formInitialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        touched,
        errors,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        const share = { handleChange, handleBlur, setFieldValue };

        return (
          <div className={CLASSNAME.EDIT_PROFILE.WRAPPER}>
            {/* header wrapper */}
            <div className={CLASSNAME.EDIT_PROFILE.HEADER_WRAPPER}>
              {/* cross */}
              <Link
                className={CLASSNAME.EDIT_PROFILE.CROSS}
                to={ROUTES_CONFIG.PROFILE.path}
              >
                <img src={ICONS.arrow} alt={COMMON_TEXT.IMG} />
              </Link>
              {/* text */}
              <h3 className={CLASSNAME.EDIT_PROFILE.EDIT_TEXT}>
                {COMMON_TEXT.EDIT_PROFILE}
              </h3>
              {/* view profile */}
              <Link
                className={CLASSNAME.EDIT_PROFILE.VIEW_PROFILE}
                to={ROUTES_CONFIG.PROFILE.path}
              />
            </div>
            {/* name Input */}
            <TextField
              type="text"
              htmlFor="username"
              value={values.username}
              label="Name"
              err={errors.username}
              tch={touched.username}
              {...share}
            />
            {/* email section */}

            <TextField
              type="email"
              htmlFor="email"
              value={values.email}
              label="Email"
              err={errors.email}
              tch={touched.email}
              compulsory
              {...share}
            />
            {/* phone number */}
            <PhoneNumber
              type="text"
              htmlFor="phonenumber"
              value={values.phonenumber}
              label="Mobile Number"
              err={errors.phonenumber}
              tch={touched.phonenumber}
              {...share}
            />
            {/* About Me Input */}
            <Description
              type="text"
              htmlFor="about me"
              value={values['about me']}
              err={errors['about me']}
              tch={touched['about me']}
              label="About me"
              {...share}
            />
            <hr />
            {/* Submit Button */}
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className={CLASSNAME.EDIT_PROFILE.POST}
              disabled={isSubmitting}
            >
              {isSubmitting ? COMMON_TEXT.EDITING : COMMON_TEXT.EDIT}
            </button>
          </div>
        );
      }}
    </Formik>
  );
}
