// libs
import { useNavigate } from 'react-router-dom';

// constants
import { ROUTES_CONFIG } from '../../Helper/Routes';
import CLASSNAME from '../../Helper/classes';
import { COMMON_TEXT } from '../../Helper/text';

export default function NavCategory() {
  const navigate = useNavigate();

  function handleMotorcycleClick() {
    navigate('/type/bikes');
  }
  function handleMobilePhoneClick() {
    navigate('/type/mobile');
  }
  function handleElecyronicsClick() {
    navigate('/type/electronics');
  }
  function handleMultiWheelVehicleClick() {
    navigate('/type/MultiWheelVehicles');
  }
  return (
    <div className={CLASSNAME.NAVCATEGORY.WRAPPER}>
      <div className={CLASSNAME.NAVCATEGORY.CHILD}>
        <div className={CLASSNAME.NAVCATEGORY.ALL_CATEGORY}>
          <button
            type="button"
            className={CLASSNAME.NAVCATEGORY.ALL_CATEGORY_TEXT}
            onClick={() => navigate(ROUTES_CONFIG.HOMEPAGE.path)}
          >
            {COMMON_TEXT.ALL_CATEGORIES}
          </button>
        </div>
        <div className={CLASSNAME.NAVCATEGORY.LIST}>
          <button
            type="button"
            className={CLASSNAME.NAVCATEGORY.CARS}
            onClick={handleMultiWheelVehicleClick}
          >
            {COMMON_TEXT.MULTI_WHEEL_VEHICLE}
          </button>
          <button
            type="button"
            className={CLASSNAME.NAVCATEGORY.MOTORCYCLE}
            onClick={handleMotorcycleClick}
          >
            {COMMON_TEXT.BIKES}
          </button>
          <button
            type="button"
            className={CLASSNAME.NAVCATEGORY.MOBILEPHONE}
            onClick={handleMobilePhoneClick}
          >
            {COMMON_TEXT.MOBILE_PHONE}
          </button>

          <button
            type="button"
            className={CLASSNAME.NAVCATEGORY.COMMERCIAL}
            onClick={handleElecyronicsClick}
          >
            {COMMON_TEXT.ELECTRONICS}
          </button>
        </div>
      </div>
    </div>
  );
}
