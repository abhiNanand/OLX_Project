// libs
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// firebase
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

// components
import ProfileUpDown from '../CustomComponents/LoginUpDown';
import Item from '../CustomComponents/ItemsSelector';

// api
import { useGetWishlistProductsQuery } from '../../Services/Api/module/imageApi';

// redux
import { RootState } from '../../Store';
import { setWishlistCount } from '../../Store/WishlistCount';

// constants
import ICONS from '../../assets';
import CLASSNAME from '../../Helper/classes';
import { COMMON_TEXT } from '../../Helper/text';
import { ROUTES_CONFIG } from '../../Helper/Routes';

export default function Navbar() {
  const [unseenMsgCount, setUnseenMsgCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useSelector((state: RootState) => state?.common);
  const { count } = useSelector((state: RootState) => state?.wishlistCount);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messageRef = collection(db, 'messages');
  const { access, username } = useSelector((state: RootState) => state?.common);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const profileRef = useRef<HTMLButtonElement>(null);
  const { data } = useGetWishlistProductsQuery(
    {},
    {
      skip: !access,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  // handle click on sell
  function onClickSell() {
    if (access) {
      navigate(ROUTES_CONFIG.SELL.path);
    } else {
      toast.error(COMMON_TEXT.SIGNIN_TO_ADD_PRODUCT);
      navigate(ROUTES_CONFIG.LOGIN.path);
    }
  }
  // handle click on cart
  function onClickWishlist() {
    if (access) {
      navigate(ROUTES_CONFIG.WISHLIST.path);
    } else {
      toast.error(COMMON_TEXT.SIGNIN_TO_ACCESS_WISHLIST);
      navigate(ROUTES_CONFIG.LOGIN.path);
    }
  }
  // handle profile dropdown toggle
  function onClickProfileUpDown() {
    setOpenProfile(!openProfile);
  }
  // handle click on chat
  function handleClickChat() {
    navigate(ROUTES_CONFIG.FIREBASE_CHAT.path);
  }

  //  Hooks
  useEffect(() => {
    if (access && data) {
      dispatch(setWishlistCount(data?.length));
    }
  }, [data]);
  // Close  dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // for unseen message count
  useEffect(() => {
    if (!id) {
      setUnseenMsgCount(0);
      setLoading(false);
      return;
    }

    const q = query(
      messageRef,
      where('receiverId', '==', String(id)),
      where('seen', '==', false)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setUnseenMsgCount(snapshot.size);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id]);


  return (
    <div className={CLASSNAME.NAVBAR.NAV_PARENT}>
      <div className={CLASSNAME.NAVBAR.NAV}>
        {/* olx logo */}
        <button
          type="button"
          title={COMMON_TEXT.BUTTON}
          className={CLASSNAME.NAVBAR.LOGO}
          onClick={() => navigate(ROUTES_CONFIG.HOMEPAGE.path)}
        >
          <img src={ICONS.Olx} alt={COMMON_TEXT.IMG} />
        </button>

        {/* item selector */}
        <Item />

        {/* cart login sell section */}
        <div className={CLASSNAME.NAVBAR.CART_LOGIN_SELL}>
          {/* cart section */}
          <div className={CLASSNAME.NAVBAR.WISHLIST_WRAPPER}>
            <button
              type="button"
              className={CLASSNAME.NAVBAR.CART}
              onClick={onClickWishlist}
              title={COMMON_TEXT.BUTTON}
            >
              <img
                src={ICONS.heartIcon}
                alt={COMMON_TEXT.IMG}
                className={CLASSNAME.NAVBAR.CART_ICON}
              />
            </button>
            {count > 0 && <span>{count}</span>}
          </div>
          {/* If not logged in */}
          {access && (
            <>
              {/* chat section */}
              <div className={CLASSNAME.NAVBAR.WISHLIST_WRAPPER}>
                <button
                  type="button"
                  className={CLASSNAME.NAVBAR.CHAT}
                  onClick={handleClickChat}
                >
                  <img src={ICONS.chat} alt={COMMON_TEXT.IMG} />
                </button>
                {!loading && unseenMsgCount > 0 && (
                  <span>{unseenMsgCount}</span>
                )}
              </div>

              {/* Profile dropdown */}
              <button
                type="button"
                className={CLASSNAME.NAVBAR.PROFILE}
                ref={profileRef}
                onClick={onClickProfileUpDown}
              >
                <span className={CLASSNAME.NAVBAR.PROFILE_PHOTO}>
                  <div className={CLASSNAME.NAVBAR.PROFILE_INITIAL}>
                    {username?.[0]}
                  </div>
                </span>
                <span className={CLASSNAME.NAVBAR.PROFILE_UPDOWN}>
                  <img src={ICONS.upDown} alt={COMMON_TEXT.IMG} />
                </span>
                {openProfile && (
                  <ProfileUpDown setOpenProfile={setOpenProfile} />
                )}
              </button>
            </>
          )}
          {/* If not logged in, show login */}
          {!access && (
            <Link
              to={ROUTES_CONFIG.LOGIN.path}
              className={CLASSNAME.NAVBAR.LOGIN}
            >
              {COMMON_TEXT.LOGIN}
            </Link>
          )}
          {/* Sell button */}
          <button
            title={COMMON_TEXT.BUTTON}
            type="button"
            className={CLASSNAME.NAVBAR.SELL}
            onClick={onClickSell}
          >
            <img
              src={ICONS.sellImage}
              alt={COMMON_TEXT.IMG}
              className={CLASSNAME.NAVBAR.SELL_ICON}
            />
            <span className={CLASSNAME.NAVBAR.SELL_INNER}>
              <img
                src={ICONS.addIcon}
                alt={COMMON_TEXT.IMG}
                className={CLASSNAME.NAVBAR.SELL_ADD}
              />
              <span className={CLASSNAME.NAVBAR.SELL_TEXT}>
                {COMMON_TEXT.SELL}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
