// libs
import { useNavigate, Outlet } from 'react-router-dom';

// components
import Footer from '../../Components/Footer';

// constants
import ICONS from '../../assets';
import CLASSNAME from '../../Helper/classes';
import { COMMON_TEXT } from '../../Helper/text';

export default function Sell() {
  const navigate = useNavigate();

  return (
    <div className={CLASSNAME.SELL.WRAPPER}>
      <header className={CLASSNAME.SELL.HEADER}>
        <button
          title={COMMON_TEXT.BACK}
          type="button"
          className={CLASSNAME.SELL.BACK_BUTTON}
          onClick={() => navigate(-1)}
        >
          <img src={ICONS.arrow} alt={COMMON_TEXT.IMG} />
        </button>
      </header>
      <h1 className={CLASSNAME.SELL.TITLE}>{COMMON_TEXT.POST_YOUR_AD}</h1>
      <div className={CLASSNAME.SELL.OUTLET}>
        <Outlet />
      </div>
      <div className={CLASSNAME.SELL.FOOTER}>
        <Footer />
      </div>
    </div>
  );
}
