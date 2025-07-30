// components
import {
  Description,
  TextField,
  Photos,
  Price,
  Seller,
  State,
  City,
} from '../Post/Common/Common';

// constants
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';
import { FormProps } from '../../../Helper/interface';

export default function Form({
  touched,
  errors,
  values,
  share,
}: Readonly<FormProps>) {
  return (
    <>
      <div className={CLASSNAME.POST_COMMON.WRAPPER}>
        <h3 className={CLASSNAME.POST_COMMON.DETAIL_TEXT}>
          {COMMON_TEXT.INCLUDE_DETAIL}
        </h3>
        <TextField
          type="text"
          htmlFor="brand"
          value={values.brand}
          err={errors.brand}
          tch={touched.brand}
          label="Brand"
          countRequired
          compulsory
          {...share}
        />
        {/* Year Input */}
        <TextField
          type="number"
          htmlFor="year"
          value={values.year}
          err={errors.year}
          tch={touched.year}
          label="Year"
          countRequired
          compulsory
          {...share}
        />

        {/* Title Input */}
        <TextField
          type="text"
          htmlFor="title"
          value={values.title}
          label="Ad title"
          err={errors.title}
          tch={touched.title}
          countRequired
          compulsory
          {...share}
        />
        {/* Description Input */}
        <Description
          type="text"
          htmlFor="description"
          value={values.description}
          err={errors.description}
          tch={touched.description}
          label="Description"
          compulsory
          {...share}
        />
      </div>
      <hr />
      {/* Price Input */}
      <Price
        type="number"
        htmlFor="price"
        value={values.price}
        err={errors.price}
        tch={touched.price}
        label="Price"
        {...share}
      />
      <hr />
      {/* Photos input */}
      <Photos
        type="file"
        label="photos"
        value={values?.photos as []}
        {...share}
      />
      <hr />
      {/* Location */}
      <div className={CLASSNAME.POST_COMMON.LOCATION_WRAPPER}>
        <h3 className={CLASSNAME.POST_COMMON.LOCATION_TEXT}>
          {COMMON_TEXT.CONFIRM_LOCATION}
        </h3>
        <State
          type="text"
          htmlFor="state"
          value={values.state}
          err={errors.state}
          tch={touched.state}
          label="State"
          {...share}
        />
        {values.state && (
          <City
            state={values.state}
            type="text"
            htmlFor="city"
            value={values.city}
            err={errors.city}
            tch={touched.city}
            label="City"
            {...share}
          />
        )}
      </div>
      <hr />
      {/* Review Your Detail */}
     
      <div className={CLASSNAME.POST_COMMON.SELLER_WRAPPER}>
        <h3 className={CLASSNAME.POST_COMMON.SELLER_TEXT}>
          {COMMON_TEXT.REVIEW_DETAIL}
        </h3>
        <TextField
          type="text"
          htmlFor="sellerName"
          value={values.sellerName}
          label="Name"
          err={errors.sellerName}
          tch={touched.sellerName}
          compulsory
          {...share}
        />
        <Seller
          type="text"
          htmlFor="mobileNumber"
          value={values.mobileNumber}
          label="Mobile Number"
          err={errors.mobileNumber}
          tch={touched.mobileNumber}
          compulsory
          {...share}
        />
      </div>
      <hr />
    </>
  );
}
