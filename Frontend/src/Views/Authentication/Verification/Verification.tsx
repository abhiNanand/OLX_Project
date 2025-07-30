// libs
import { useLocation, useNavigate } from 'react-router-dom';

// constants
import CLASSNAME from '../../../Helper/classes';
import { ROUTES_CONFIG } from '../../../Helper/Routes';
import { COMMON_TEXT } from '../../../Helper/text';

export default function Verification() {
  const navigate = useNavigate();
  const {
    state: { email },
  } = useLocation();

  return (
    <div className={CLASSNAME.VERIFICATION.WRAPPER}>
      {/* verification text */}
      <span>
        {COMMON_TEXT.VERIFICATION_TEXT}
        <div className={CLASSNAME.VERIFICATION.EMAIL}>{email}</div>
      </span>
      {/* login button and text */}
      <div className={CLASSNAME.VERIFICATION.TEXT_WRAPPER}>
        <button
          type="button"
          className={CLASSNAME.VERIFICATION.LOGIN}
          onClick={() => navigate(ROUTES_CONFIG.SIGNIN.path, { replace: true })}
        >
          {COMMON_TEXT.LOGIN}
        </button>
        <span className={CLASSNAME.VERIFICATION.TEXT}>
          {COMMON_TEXT.AFTER_VERIFICATION}
        </span>
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
  );
}
