// libs
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// api
import { usePostForgetPasswordDataMutation } from '../../../Services/Api/module/imageApi';

// constants
import { VALIDATION, INITIAL_VALUES, FormValue } from './constant';
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT, TYPE } from '../../../Helper/text';
import ICONS from '../../../assets';
import { ROUTES_CONFIG } from '../../../Helper/Routes';

export default function ForgetPassEmailValidation() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [post, { isLoading }] = usePostForgetPasswordDataMutation();

  //  submit
  async function handleSubmit(values: FormValue) {
    try {
      await post(values).unwrap();
      setDisabled(true);
      toast.success(COMMON_TEXT.CHECK_YOUR_INBOX);
    } catch (error) {
      toast.error(COMMON_TEXT.SOMETHING_WENT_WRONG_TRY_AGAIN);
    }
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        return (
          <div className={CLASSNAME.FORGOT_PASS.WRAPPER}>
            {/* header */}
            <div className={CLASSNAME.FORGOT_PASS.HEADER}>
              {/* Back */}
              <Link
                className={CLASSNAME.FORGOT_PASS.BACK}
                to={ROUTES_CONFIG.SIGNIN.path}
              >
                <img src={ICONS.arrow} alt={COMMON_TEXT.IMG} />
              </Link>
              {/* text */}
              <h2 className={CLASSNAME.FORGOT_PASS.TITLE}>
                {COMMON_TEXT.FORGOT_PASSWORD}
              </h2>
              {/* cross */}
              <Link
                className={CLASSNAME.FORGOT_PASS.CROSS}
                to={ROUTES_CONFIG.HOMEPAGE.path}
              >
                <img src={ICONS.cross} alt={COMMON_TEXT.IMG} />
              </Link>
            </div>
            {/* email section */}
            <div className={CLASSNAME.FORGOT_PASS.EMAIL_INPUT}>
              <label htmlFor={COMMON_TEXT.EMAIL_S}>
                Email
                <div className={CLASSNAME.FORGOT_PASS.REQUIRED}>*</div>
              </label>
              <input
                type={TYPE.TEXT}
                id={COMMON_TEXT.EMAIL_S}
                name={COMMON_TEXT.EMAIL_S}
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value.trim())}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className={CLASSNAME.FORGOT_PASS.ERROR}>
                  {errors.email}
                </div>
              )}
            </div>
            {/* validation text */}
            <span className={CLASSNAME.FORGOT_PASS.TEXT}>
              {COMMON_TEXT.PLEASE_ENTER_YOUR_EMAIL}
            </span>
            {/* send reset link text */}
            {!disabled && (
              <button
                title={COMMON_TEXT.SUBMIT}
                className={CLASSNAME.FORGOT_PASS.SUBMIT_BUTTON}
                type="submit"
                disabled={isSubmitting || isLoading || disabled}
                onClick={() => handleSubmit()}
              >
                {isLoading ? COMMON_TEXT.SENDING : COMMON_TEXT.SEND_RESET_LINK}
              </button>
            )}
            {/* footer section */}
            <footer className={CLASSNAME.LOGIN_SECTION.FOOTER}>
              <p className={CLASSNAME.LOGIN_SECTION.FOOTER_UPPER_TEXT}>
                {COMMON_TEXT.PERSONAL_DETAIL}
              </p>
              <p className={CLASSNAME.LOGIN_SECTION.FOOTER_SECOND_TEXT}>
                {COMMON_TEXT.PRIVACY_POLICY}
              </p>
            </footer>
          </div>
        );
      }}
    </Formik>
  );
}
