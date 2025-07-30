// libs
import { Navigate, useLocation } from 'react-router-dom';

// components
import Form from '../../Components/CustomComponents/Post/PostForm';

// utils
import { capitalizeFirstLetter } from '../../Helper/function';

// constants
import CLASSNAME from '../../Helper/classes';
import { ROUTES_CONFIG } from '../../Helper/Routes';
import { COMMON_TEXT } from '../../Helper/text';

export default function PostForm() {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to={ROUTES_CONFIG.SELL.path} />;
  }
  return (
    // sell form section
    <div className={CLASSNAME.POST_FORM.WRAPPER}>
      {/* header */}
      <div className={CLASSNAME.POST_FORM.SELECTED_CATEGORY}>
        {/* selected category text */}
        <span className={CLASSNAME.POST_FORM.SELECTED_CATEGORY_TITLE}>
          {COMMON_TEXT.SELECTED_CATEGORY}
        </span>
        <span className={CLASSNAME.POST_FORM.SELECTED_CATEGORY_NAME}>
          {capitalizeFirstLetter(location.state.categoryId)} /{' '}
          {location.state.subcategory}
        </span>
      </div>
      <div className={CLASSNAME.POST_FORM.POST_DETAIL}>
        <Form />
      </div>
    </div>
  );
}
