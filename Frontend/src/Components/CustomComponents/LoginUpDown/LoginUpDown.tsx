// libs
import { LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// components
import Modal from '../Modal';

// redux
import { RootState } from '../../../Store';
import { updateAuthState } from '../../../Store/Common';
import { setUserId } from '../../../Store/ChatUser';
import { setWishlistCount } from '../../../Store/WishlistCount';

// api
import { usePostLogoutDataMutation } from '../../../Services/Api/module/imageApi';

// constants
import dropdownItems from './constant';
import CLASSNAME from '../../../Helper/classes';
import { ROUTES_CONFIG } from '../../../Helper/Routes';
import { COMMON_TEXT } from '../../../Helper/text';
import { LoginUpDownProps } from '../../../Helper/interface';

export default function LoginUpDown({
  setOpenProfile,
}: Readonly<LoginUpDownProps>) {
  const { username} = useSelector(
    (state: RootState) => state?.common
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post] = usePostLogoutDataMutation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('no');

  // on click any item
  const handleItemClick = () => {
    setOpenProfile?.((prev) => !prev);
  };
  // onclick logout
  const handleLogout = () => {
    try {
      post(undefined).unwrap();
      dispatch(setWishlistCount(0));
      dispatch(
        updateAuthState({
          access: null,
          id: null,
          username: null,
        })
      );
      dispatch(setUserId({ userId: null, userName: null }));
      toast.success(COMMON_TEXT.SIGN_OUT_SUCCESSFULLY);
      navigate(ROUTES_CONFIG.HOMEPAGE.path);
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_SIGNOUT);
    }
  };

  useEffect(() => {
    if (answer === 'yes') {
      handleLogout();
    }
  }, [answer]);

  return (
    <div className={CLASSNAME.LOGIN_DROPDOWN.PROFILE_DROPDOWN}>
      <div className={CLASSNAME.LOGIN_DROPDOWN.DROPDOWN_MENU}>
        <div className={CLASSNAME.LOGIN_DROPDOWN.PROFILE_SECTION}>
          <div className={CLASSNAME.LOGIN_DROPDOWN.PROFILE_HEADER}>
            <div className={CLASSNAME.LOGIN_DROPDOWN.PROFILE_INFO}>
              <div className={CLASSNAME.LOGIN_DROPDOWN.PROFILE_INITIAL}>
                {username?.[0]}
              </div>
              <h3>{username}</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                handleItemClick();
                navigate(ROUTES_CONFIG.PROFILE.path);
              }}
              className={CLASSNAME.LOGIN_DROPDOWN.PROFILE_EDIT_PROFILE}
            >
              {COMMON_TEXT.VIEW_AND_EDIT_PROFILE}
            </button>
          </div>
        </div>

        <div className={CLASSNAME.LOGIN_DROPDOWN.PROFILE_MENU_ITEMS}>
          {dropdownItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.label}
                onClick={() => {
                  if (item.clickHandler) {
                    item.clickHandler(navigate);
                  }
                  item?.clickHandler?.(navigate);
                }}
                className={CLASSNAME.LOGIN_DROPDOWN.PROFILE_MENU_ITEM}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            title={COMMON_TEXT.SIGNOUT}
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
            }}
            className={CLASSNAME.LOGIN_DROPDOWN.PROFILE_MENU_ITEM}
          >
            <LogOut />
            <span>{COMMON_TEXT.SIGNOUT}</span>
          </button>
        </div>
        {openModal && (
          <Modal
            setAnswer={setAnswer}
            setOpen={setOpenModal}
            text={COMMON_TEXT.ARE_YOU_SURE}
            setDropdown={() => setOpenProfile?.((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
}
