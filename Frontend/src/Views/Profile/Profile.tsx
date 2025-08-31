// libs
import { Link } from 'react-router-dom';

// api
import { useGetUserInfoQuery } from '../../Services/Api/module/imageApi';

// components
import ErrorSection from '../../Components/Atom/ErrorSection';
import Loader from '../../Components/Atom/Loader';

// constants
import CLASSNAME from '../../Helper/classes';
import { ROUTES_CONFIG } from '../../Helper/Routes';
import ICONS from '../../assets';
import { COMMON_TEXT } from '../../Helper/text';

export default function Profile() {
  const { data, isLoading, isError } = useGetUserInfoQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorSection />;

  return (
    <div className={CLASSNAME.PROFILE.WRAPPER}>
      {/* header */}
      <div className={CLASSNAME.PROFILE.PROFILE_TEXT_WRAPPER}>
        {/* cross icon */}
        <Link
          className={CLASSNAME.PROFILE.CROSS}
          to={ROUTES_CONFIG.HOMEPAGE.path}
        >
          <img src={ICONS.cross} alt={COMMON_TEXT.IMG} />
        </Link>
        <h3 className={CLASSNAME.PROFILE.PROFILE_TEXT}>
          {COMMON_TEXT.PROFILE}
        </h3>
        {/* edit icon */}
        <Link
          className={CLASSNAME.PROFILE.EDIT}
          to={ROUTES_CONFIG.EDIT_PROFILE.path}
        >
          <img src={ICONS.edit} alt={COMMON_TEXT.IMG} />
        </Link>
      </div>
      {/* main section */}
      <div className={CLASSNAME.PROFILE.CONTENT}>
        <div className={CLASSNAME.PROFILE.PROFILE_INITIAL}>
          {data?.username?.[0]}
        </div>
        <div className={CLASSNAME.PROFILE.USERNAME}>{data?.username}</div>
        <div className={CLASSNAME.PROFILE.EMAIL}>{data?.email}</div>
        <div className={CLASSNAME.PROFILE.PHONE}>{data?.phoneNumber}</div>
        <div className={CLASSNAME.PROFILE.BIO}>{data?.aboutMe}</div>
        <div className={CLASSNAME.PROFILE.ADS}>
          <Link
            to={ROUTES_CONFIG.MYADS.path}
            className={CLASSNAME.PROFILE.ADS_TEXT}
          >
            {COMMON_TEXT.MYADS}
          </Link>
          <span className={CLASSNAME.PROFILE.ADS_COUNT}>{data?.ads_count}</span>
        </div>
      </div>
    </div>
  );
}
