// libs
import { Link } from 'react-router-dom';

// api
import { useGetWishlistProductsQuery } from '../../Services/Api/module/imageApi';

// components
import ImageLayout from '../../Components/CustomComponents/ImageLayout/ProductImage';
import ErrorSection from '../../Components/Atom/ErrorSection';
import Schemer from '../../Components/Atom/Schemer';

// styles
import { COMMON_TEXT } from '../../Helper/text';
import { Product } from '../../Helper/interface';
import CLASSNAME from '../../Helper/classes';
import { ROUTES_CONFIG } from '../../Helper/Routes';
 

export default function Wishlist() {

   const { data, isError, isLoading, refetch } = useGetWishlistProductsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  if(data)
    console.log(data);

  return (
    <div className={CLASSNAME.WISHLIST.WRAPPER}>
      <span className={CLASSNAME.WISHLIST.TEXT}>{COMMON_TEXT.WISHLIST}</span>
      {isError && <ErrorSection />}

      {/*  data LENGTH>0 then render */}
      <div className={CLASSNAME.WISHLIST.IMAGE_SECTION}>
        {isLoading
          ? Array.from({ length: 12 }, (_, i) => <Schemer key={i} />)
          : data &&
            data.length > 0 &&
            data?.map((products: Product) => (
              <ImageLayout
                key={products?.id}
                data={products}
                refetch={refetch}
              />
            ))}
      </div>

      {/* if data length === 0 */}
      {data && data.length === 0 && (
        <>
          <h1>{COMMON_TEXT.NO_WISHLIST}</h1>
          <Link to={ROUTES_CONFIG.HOMEPAGE.path}>{COMMON_TEXT.GO_TO_HOME}</Link>
        </>
      )}
    </div>
  );
}
