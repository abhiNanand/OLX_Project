// constants
import ICONS from '../../assets';
import LINK from './constant';
import CLASSNAME from '../../Helper/classes';
import { COMMON_TEXT } from '../../Helper/text';

export default function Footer() {
  const handleClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={CLASSNAME.FOOTER.WRAPPER}>
      <div className={CLASSNAME.FOOTER.CHILD}>
        <div className={CLASSNAME.FOOTER.IMAGES_LIST}>
          <button className={CLASSNAME.FOOTER.CAR_TRADE_TECH} type="button">
            <img src={ICONS.carTradeTech} alt={COMMON_TEXT.IMG} />
          </button>
          <button
            className={CLASSNAME.FOOTER.OLX}
            type="button"
            onClick={() => handleClick(LINK.OLX)}
          >
            <img
              className={CLASSNAME.FOOTER.IMAGES}
              src={ICONS.OlxWhite}
              alt={COMMON_TEXT.IMG}
            />
          </button>
          <button
            className={CLASSNAME.FOOTER.CARWALE}
            type="button"
            onClick={() => handleClick(LINK.CARWALE)}
          >
            <img
              className={CLASSNAME.FOOTER.IMAGES}
              src={ICONS.carWale}
              alt={COMMON_TEXT.IMG}
            />
          </button>
          <button
            className={CLASSNAME.FOOTER.BIKEWALE}
            type="button"
            onClick={() => handleClick(LINK.BIKEWALE)}
          >
            <img
              className={CLASSNAME.FOOTER.IMAGES}
              src={ICONS.bikeWale}
              alt={COMMON_TEXT.IMG}
            />
          </button>
          <button
            className={CLASSNAME.FOOTER.CAR_TRADE}
            type="button"
            onClick={() => handleClick(LINK.CARTRADE)}
          >
            <img
              className={CLASSNAME.FOOTER.IMAGES}
              src={ICONS.carTrade}
              alt={COMMON_TEXT.IMG}
            />
          </button>
          <button
            className={CLASSNAME.FOOTER.MOBILITY_OUTLOOK}
            type="button"
            onClick={() => handleClick(LINK.MOBILITY_OUTLOOK)}
          >
            <img
              className={CLASSNAME.FOOTER.IMAGES}
              src={ICONS.mobilityOutlook}
              alt={COMMON_TEXT.IMG}
            />
          </button>
        </div>
        <div className={CLASSNAME.FOOTER.SECTION_TEXT}>
          <span className={CLASSNAME.FOOTER.ALL_RIGHT_RESERVED}>
            {COMMON_TEXT.ALL_RIGHT_RESERVED}
          </span>
        </div>
      </div>
    </div>
  );
}
