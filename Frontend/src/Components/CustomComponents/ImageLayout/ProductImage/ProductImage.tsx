// libs
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

// api
import { usePostProductsMutation } from '../../../../Services/Api/module/imageApi';

// constants
import ICONS from '../../../../assets';
import { COMMON_TEXT } from '../../../../Helper/text';
import { ImageProps } from '../../../../Helper/interface';
import { ROUTES_CONFIG } from '../../../../Helper/Routes';
import CLASSNAME from '../../../../Helper/classes';

// utils
import { getDaysFromNow } from '../../../../Helper/function';

// redux
import { RootState } from '../../../../Store';
import { setWishlistCount } from '../../../../Store/WishlistCount';

export default function Images({
  data,
  refetch,
  refetchDashboard,
}: Readonly<ImageProps>) {
  const dispatch = useDispatch();
  const [post, { isLoading }] = usePostProductsMutation();
  const [showAdded, setShowAdded] = useState(data.is_favourite ? 'Added' : '');
  const navigate = useNavigate();
  const { access: token } = useSelector((state: RootState) => state?.common);
  const wishlistCount = useSelector(
    (state: RootState) => state?.wishlistCount?.count
  );

  // on click cart
  const onClickWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) {
      navigate(ROUTES_CONFIG.LOGIN.path);
      toast.error(COMMON_TEXT.LOGIN_TO_ADD_TO_WISHLIST);
      return;
    }
    try {
            console.log(token);

      const response = await post({ product_id: data.id , token }).unwrap();
      setShowAdded(
        response.message === COMMON_TEXT.ADDED_IN_FAV ? COMMON_TEXT.ADDED : ''
      );
      refetch?.();
      if (response.message === COMMON_TEXT.ADDED_IN_FAV) {
        dispatch(setWishlistCount(wishlistCount + 1));
        toast.success(COMMON_TEXT.ADDED_IN_WISHLIST);
      } else {
        dispatch(setWishlistCount(wishlistCount - 1));
        toast.success(COMMON_TEXT.REMOVE_FROM_WISHLIST);
      }
      refetchDashboard?.();
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_IN_ADDING);
    }
  };
  // on click layout section
  const onClickImages = async () => {
    navigate(`/product/${data.name}/${data.id}`);
  };

  // HOOKS
  useEffect(() => {
    setShowAdded(data.is_favourite ? COMMON_TEXT.ADDED : '');
  }, [data.is_favourite]);

  return (
    <button
      className={CLASSNAME.PRODUCT_IMAGE.WRAPPER}
      onClick={onClickImages}
      type="button"
      tabIndex={0}
    >
      <div className={CLASSNAME.PRODUCT_IMAGE.IMAGE_WRAPPER}>
        {/* image section */}
        <img
          src={`${import.meta.env.VITE_BASE_URL}${data.display_photo}`}
          alt={data.name}
          className={CLASSNAME.PRODUCT_IMAGE.IMAGE}
          loading="lazy"
        />
        {/* wishlist section */}
        <button
          title={COMMON_TEXT.BUTTON}
          type="button"
          onClick={onClickWishlist}
          className={CLASSNAME.PRODUCT_IMAGE.CART_WRAPPER}
          disabled={isLoading}
        >
          <Heart
            fill={showAdded === COMMON_TEXT.ADDED ? 'red' : 'none'}
            color={showAdded === COMMON_TEXT.ADDED ? 'red' : 'black'}
          />
        </button>
      </div>
      {/* content */}
      <div className={CLASSNAME.PRODUCT_IMAGE.CONTENT}>
        <span className={CLASSNAME.PRODUCT_IMAGE.COST}>
          <img src={ICONS.rupees} alt={COMMON_TEXT.IMG} /> {data.price}
        </span>
        <span className={CLASSNAME.PRODUCT_IMAGE.NAME}>{data.name}</span>
        <div className={CLASSNAME.PRODUCT_IMAGE.PLACE_DATE_WRAPPER}>
          <span className={CLASSNAME.PRODUCT_IMAGE.PLACE}>
            {data.city},{data.state}
          </span>
          <span className={CLASSNAME.PRODUCT_IMAGE.DATE}>
            {typeof data?.created_at === 'string'
              ? getDaysFromNow(data.created_at)
              : ''}
          </span>
        </div>
      </div>
    </button>
  );
}
