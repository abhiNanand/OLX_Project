// libs
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// components
import ImageTransition from '../../Components/CustomComponents/ProductDetailImageTransition';
import ErrorSection from '../../Components/Atom/ErrorSection';
import LocationMap from '../../Components/CustomComponents/LocationMap';
import Loader from '../../Components/Atom/Loader';

// api
import { useGetProductsDetailQuery } from '../../Services/Api/module/imageApi';

// constants
import CLASSNAME from '../../Helper/classes';
import { COMMON_TEXT } from '../../Helper/text';
import { ROUTES_CONFIG } from '../../Helper/Routes';

// redux
import { RootState } from '../../Store';
import { setUserId } from '../../Store/ChatUser';

// utils
import { getDaysFromNow } from '../../Helper/function';

export default function ProductDetail() {
  const { productId } = useParams();
  console.log("productId:",productId);
  const { access, id: uid } = useSelector((state: RootState) => state?.common);
  const id = productId !== undefined ? productId : undefined;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsDetailQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );
  const product = Array.isArray(data) ? data[0] : data;
  const dispatch = useDispatch();

  // handle click on chat
  function handleClickChat() {
    if (!access) {
      toast.error(COMMON_TEXT.LOGIN_TO_CHAT);
      navigate(ROUTES_CONFIG.LOGIN.path);
    } else {
      dispatch(setUserId({ userId: data?.user, userName: data?.user_name }));
      navigate(ROUTES_CONFIG.SINGLE_CHAT.path);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorSection />;
  }

  return (
    <div className={CLASSNAME.PRODUCT_DETAIL.WRAPPER}>
      {/* image transition / detail / description */}
      <div className={CLASSNAME.PRODUCT_DETAIL.IMAGE_DETAIL_DESCRIPTION}>
        {/* image section */}
        <div className={CLASSNAME.PRODUCT_DETAIL.IMAGE}>
          <ImageTransition images={product?.images} />
        </div>
        {/* detail / description section */}
        <div className={CLASSNAME.PRODUCT_DETAIL.DETAIL_DESCRIPTION}>
          {/* detail section */}
          <div className={CLASSNAME.PRODUCT_DETAIL.DETAIL}>
            <span className={CLASSNAME.PRODUCT_DETAIL.DETAIL_TEXT}>
              {COMMON_TEXT.DETAIL}
            </span>
            <div className={CLASSNAME.PRODUCT_DETAIL.BRAND}>
              <span className={CLASSNAME.PRODUCT_DETAIL.BRAND_TEXT}>
                {COMMON_TEXT.CATEGORY}
              </span>
              <span className={CLASSNAME.PRODUCT_DETAIL.BRAND_VALUE}>
                {product?.category}
              </span>
            </div>
            <div className={CLASSNAME.PRODUCT_DETAIL.BRAND}>
              <span className={CLASSNAME.PRODUCT_DETAIL.BRAND_TEXT}>
                {COMMON_TEXT.SUBCATEGORY$}
              </span>
              <span className={CLASSNAME.PRODUCT_DETAIL.BRAND_VALUE}>
                {product?.subcategory}
              </span>
            </div>
            <div className={CLASSNAME.PRODUCT_DETAIL.BRAND}>
              <span className={CLASSNAME.PRODUCT_DETAIL.BRAND_TEXT}>
                {COMMON_TEXT.BRAND}
              </span>
              <span className={CLASSNAME.PRODUCT_DETAIL.BRAND_VALUE}>
                {product?.subcategory_details?.brand}
              </span>
            </div>
            <div className={CLASSNAME.PRODUCT_DETAIL.BRAND}>
              <span className={CLASSNAME.PRODUCT_DETAIL.BRAND_TEXT}>
                {COMMON_TEXT.TITLE}
              </span>
              <span className={CLASSNAME.PRODUCT_DETAIL.BRAND_VALUE}>
                {product?.name}
              </span>
            </div>
          </div>
          <hr />
          {/* description section */}
          <div className={CLASSNAME.PRODUCT_DETAIL.DESCRIPTION}>
            <span className={CLASSNAME.PRODUCT_DETAIL.DESCRIPTION_TITLE}>
              {COMMON_TEXT.DESCRIPTION}
            </span>
            <span className={CLASSNAME.PRODUCT_DETAIL.DESCRITION_VALUE}>
              {product?.description}
            </span>
          </div>
        </div>
      </div>
      {/*  price / chat/ map section */}
      <div className={CLASSNAME.PRODUCT_DETAIL.PRICE_CHAT_WRAPPER}>
        {/* price section */}
        <div className={CLASSNAME.PRODUCT_DETAIL.PRICE}>
          <span className={CLASSNAME.PRODUCT_DETAIL.PRICE_VALUE}>
            ₹ {product?.price}
          </span>
          <span className={CLASSNAME.PRODUCT_DETAIL.PRICE_TEXT}>
            {COMMON_TEXT.BOUGHT_IN} {product?.subcategory_details?.year}
          </span>
          <div className={CLASSNAME.PRODUCT_DETAIL.PRICE_TAG}>
            <span className={CLASSNAME.PRODUCT_DETAIL.PRICE_PLACE}>
              {product?.city}
            </span>
            <span className={CLASSNAME.PRODUCT_DETAIL.PRICE_PLACE}>
              {getDaysFromNow(product?.created_at)}
            </span>
          </div>
        </div>
        {/*  chat section */}
        {uid !== product.user && (
          <div className={CLASSNAME.PRODUCT_DETAIL.CHAT}>
            <div className={CLASSNAME.PRODUCT_DETAIL.CHAT_TEXT_PHOTO}>
              <span className={CLASSNAME.PRODUCT_DETAIL.CHAT_PHOTO}>
                <img
                  src={`${
                    import.meta.env.VITE_BASE_URL
                  }${product?.display_photo}`}
                  alt={COMMON_TEXT.IMG}
                />
              </span>
              <span className={CLASSNAME.PRODUCT_DETAIL.CHAT_TEXT}>
                {COMMON_TEXT.OLX_INDIA}
              </span>
            </div>
            <div>👤 {product?.user_name}</div>
            <div>
              📞 <a href={`tel:${product?.phone}`}>{product?.phone}</a>
            </div>
            <button
              type="button"
              title={COMMON_TEXT.CHAT}
              className={CLASSNAME.PRODUCT_DETAIL.CHAT_BUTTON}
              onClick={handleClickChat}
            >
              {COMMON_TEXT.CHAT_WITH_SELLER}
            </button>
          </div>
        )}
        {/* post section */}
        <div className={CLASSNAME.PRODUCT_DETAIL.POST}>
          <span className={CLASSNAME.PRODUCT_DETAIL.POST_TEXT}>
            {COMMON_TEXT.POSTED_IN}
          </span>
          <span className={CLASSNAME.PRODUCT_DETAIL.POST_VALUE}>
            {product?.state} , {product?.city || product?.district}
          </span>
        </div>
        {/* map section */}
        <div className={CLASSNAME.PRODUCT_DETAIL.MAP}>
          <LocationMap
            cityName={product?.city}
            mapHeadingText={COMMON_TEXT.POSTED_IN}
          />
        </div>
      </div>
    </div>
  );
}
