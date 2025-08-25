// libs
import { Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// components
import Form from '../../Form';

// api
import { usePostNewProductsMutation } from '../../../../Services/Api/module/imageApi';

// constants and utils
import { validationSchema, initialValues } from './constant';
import { ROUTES_CONFIG } from '../../../../Helper/Routes';
import CLASSNAME from '../../../../Helper/classes';
import { COMMON_TEXT } from '../../../../Helper/text';
import { InitialValuesProps } from '../../../../Helper/interface';
import { capitalizeFirstLetter } from '../../../../Helper/function';

export default function PostForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showResponse, setShowResponse] = useState<string>('');
  const [postNewProducts] = usePostNewProductsMutation();

  // HandleSubmit
  const handleSubmit = async (
    values: InitialValuesProps,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();
   // formData.append('user', '1');
    formData.append('category', capitalizeFirstLetter(state.categoryId));
    formData.append('subcategory', state.subcategory);
    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof InitialValuesProps;
      if (Array.isArray(values[typedKey])) {
        (values[typedKey] as File[]).forEach((file) => {
          formData.append(`${typedKey}`, file);
        });
      } else {
        formData.append(typedKey, values[typedKey] as string);
      }
    });

    try {
      await postNewProducts(formData).unwrap();
      toast.success(COMMON_TEXT.POSTED_SUCCESSFULLY);
      setShowResponse('Added');
      navigate(ROUTES_CONFIG.HOMEPAGE.path);
      resetForm();
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR);
      setShowResponse('Error');
    }
  };

  // HOOKS
  useEffect(() => {
    if (showResponse) {
      const timer = setTimeout(() => {
        setShowResponse('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showResponse]);

  return (
    <Formik
      initialValues={initialValues}
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
          <>
            <Form
              touched={touched}
              errors={errors}
              values={values}
              share={share}
            />
            {/* Submit Button */}
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className={CLASSNAME.POST_COMMON.POST}
              disabled={isSubmitting}
            >
              {(() => {
                if (showResponse === 'Added')
                  return COMMON_TEXT.POSTED_SUCCESSFULLY;
                if (showResponse === 'Error')
                  return COMMON_TEXT.ERROR_IN_POSTING;
                return COMMON_TEXT.POST;
              })()}
            </button>
          </>
        );
      }}
    </Formik>
  );
}


