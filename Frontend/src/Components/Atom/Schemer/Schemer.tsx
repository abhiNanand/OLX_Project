// libs
import { Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// constants
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';

export default function Schemer() {
  const { pathname } = useLocation();

  return (
    <div
      className={`${CLASSNAME.PRODUCT_IMAGE.WRAPPER} ${CLASSNAME.SCHEMER.COMMON}`}
    >
      <div
        className={`${CLASSNAME.PRODUCT_IMAGE.IMAGE_WRAPPER} ${CLASSNAME.SCHEMER.COMMON}`}
      >
        <div
          className={`${CLASSNAME.PRODUCT_IMAGE.IMAGE} ${CLASSNAME.SCHEMER.COMMON_BOX}`}
        />
        <button
          title={COMMON_TEXT.ADD_TO_WISHLIST}
          type="button"
          className={`${CLASSNAME.PRODUCT_IMAGE.CART_WRAPPER} ${CLASSNAME.SCHEMER.COMMON_BOX}`}
        >
          {!pathname.includes('/ads') && <Heart color="#ccc" />}
        </button>
      </div>
      <div
        className={`${CLASSNAME.PRODUCT_IMAGE.CONTENT} ${CLASSNAME.SCHEMER.COMMON}`}
      >
        <span
          className={`${CLASSNAME.PRODUCT_IMAGE.COST} ${CLASSNAME.SCHEMER.COMMON_BOX} ${CLASSNAME.SCHEMER.COST}`}
        />
        <span
          className={`${CLASSNAME.PRODUCT_IMAGE.DISTANCE} ${CLASSNAME.SCHEMER.COMMON_BOX} ${CLASSNAME.SCHEMER.DISTANCE}`}
        />
        <span
          className={`${CLASSNAME.PRODUCT_IMAGE.NAME} ${CLASSNAME.SCHEMER.COMMON_BOX} ${CLASSNAME.SCHEMER.NAME}`}
        />
        <div
          className={`${CLASSNAME.PRODUCT_IMAGE.PLACE_DATE_WRAPPER} ${CLASSNAME.SCHEMER.COMMON} ${CLASSNAME.SCHEMER.PLACE_DATE_WRAPPER}`}
        >
          <span
            className={`${CLASSNAME.PRODUCT_IMAGE.PLACE} ${CLASSNAME.SCHEMER.COMMON_BOX} ${CLASSNAME.SCHEMER.PLACE}`}
          />
          <span
            className={`${CLASSNAME.PRODUCT_IMAGE.DATE} ${CLASSNAME.SCHEMER.COMMON_BOX} ${CLASSNAME.SCHEMER.DATE}`}
          />
        </div>
      </div>
    </div>
  );
}
