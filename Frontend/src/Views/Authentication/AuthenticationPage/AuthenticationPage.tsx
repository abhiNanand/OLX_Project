// libs
import { Link } from 'react-router-dom';

// components
import ImageSection from '../../../Components/Atom/ImageTransition';

// constants
import CLASSNAME from '../../../Helper/classes';
import { ROUTES_CONFIG } from '../../../Helper/Routes';
import { TYPE, COMMON_TEXT } from '../../../Helper/text';

export default function AuthenticationPage() {
  return (
    <div className={CLASSNAME.LOGIN_SECTION.WRAPPER}>
      <div className={CLASSNAME.LOGIN_SECTION.SECTION}>
        {/* image section */}
        <ImageSection />
        {/* signup section */}
        <Link
          to={ROUTES_CONFIG.SIGNUP.path}
          type={TYPE.BUTTON}
          className={CLASSNAME.LOGIN_SECTION.SIGNUP}
        >
          {COMMON_TEXT.SIGN_UP_WITH_EMAIL}
        </Link>
        {/* signin section */}
        <div className={CLASSNAME.LOGIN_SECTION.SIGNIN}>
          <span>{COMMON_TEXT.ALREADY_HAVE_ACCOUNT}</span>
          <Link
            to={ROUTES_CONFIG.SIGNIN.path}
            className={CLASSNAME.LOGIN_SECTION.SIGNIN_TEXT}
          >
            {COMMON_TEXT.LOGIN}
          </Link>
        </div>
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
    </div>
  );
}
