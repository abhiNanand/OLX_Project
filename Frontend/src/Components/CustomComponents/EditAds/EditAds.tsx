// libs
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

// api
import {
  usePostEditDataMutation,
  useGetProductsDetailQuery,
} from '../../../Services/Api/module/imageApi';

// components
import ErrorSection from '../../Atom/ErrorSection';
import Form from '../Form/index';
import Loader from '../../Atom/Loader';

// constants
import { initialValues } from './constant';
import { validationSchema } from '../Post/PostForm/constant';
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';
import { InitialValuesProps, EditAdsProps } from '../../../Helper/interface';

export default function EditAds({
  setEditOpen,
  data: product,
  refetch,
}: Readonly<EditAdsProps>) {
  const [post] = usePostEditDataMutation();
  const { data, isLoading, isError } = useGetProductsDetailQuery({
    id: product.id,
  });
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const dropdownRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (data) {
      setFormInitialValues((prev) => ({
        ...prev,
        ...Object.keys(initialValues).reduce((acc, key) => {
          acc[key as keyof InitialValuesProps] =
            data[key] ?? prev[key as keyof InitialValuesProps];
          if (key === 'photos') {
            acc.photos = data.images;
          }
          else if (key === 'title') {
            acc.title = data.name;
          }
          else if (key === 'mobileNumber') {
            acc.mobileNumber = data?.phone;
          }
          else if (key === 'sellerName') {
            acc.sellerName= data?.user_name;
          }
          else if (key === 'year') {
            acc.year = data?.subcategory_details?.year;
          }
          else if (key === 'brand') {
            acc.brand = data?.subcategory_details?.brand;
          }
          return acc;
        }, {} as InitialValuesProps),
      }));
    }
  }, [data]);

  const handleSubmit = async (
    values: InitialValuesProps,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();
    if (product?.id !== undefined) formData.append('id', String(product.id));
    if (product?.category !== undefined)
      formData.append('category', JSON.stringify(product.category));
    if (product?.subcategory !== undefined)
      formData.append('subcategory', JSON.stringify(product.subcategory));

await Promise.all(  
  Object.entries(values).map(async ([key, value]) => {
    const typedKey = key as keyof InitialValuesProps;

    if (Array.isArray(value)) {
      await Promise.all(
        (value as (File | string)[]).map(async (file) => {
          if (typeof file === 'object') {
            formData.append(typedKey, file);
          } else if (typeof file === 'string') {
            // Check if it's an image path or URL
            if (/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file)) {
              
              try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}${file}`);

                if (!res.ok) throw new Error(`Failed to fetch: ${file}`);
                
               
                const blob = await res.blob();
                const filename = file.split('/').pop() || 'image';
                const fileFromUrl = new File([blob], filename, {
                  type: blob.type,
                });
                formData.append(typedKey, fileFromUrl);
              } catch (err) {
                // Optionally handle error or fallback
                // formData.append(typedKey, file);
              }
            } else {
              // Not an image path, append string
              formData.append(typedKey, file);
            }
          }
        })
      );
    } else if (value !== undefined && value !== null) {
      formData.append(typedKey, String(value));
    }
  })
);


    try {
      await post(formData).unwrap();
      setEditOpen(false);
      toast.success(COMMON_TEXT.SUCCESS_IN_EDITING);
      resetForm();
      refetch?.();
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_IN_EDITING);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setEditOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorSection />;

  return (
    <div className={CLASSNAME.EDIT_ADS.WRAPPER}>
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
            <form
              className={CLASSNAME.EDIT_ADS.MAIN}
              ref={dropdownRef}
              onSubmit={handleSubmit}
            >
              <Form
                share={share}
                values={values}
                touched={touched}
                errors={errors}
              />

              <button
                type="submit"
                className={CLASSNAME.EDIT_ADS.POST}
                disabled={isSubmitting}
              >
                {isSubmitting ? COMMON_TEXT.EDITING : COMMON_TEXT.EDIT}
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
