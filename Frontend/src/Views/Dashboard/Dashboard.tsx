// libs
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// api
import { useGetTypeProductsQuery } from '../../Services/Api/module/imageApi/index';

// components
import Schemer from '../../Components/Atom/Schemer/Schemer';
import ImagesLayout from '../../Components/CustomComponents/ImageLayout/ProductImage/index';
import ErrorSection from '../../Components/Atom/ErrorSection';

// constants
import { COMMON_TEXT } from '../../Helper/text';
import { Product } from '../../Helper/interface';
import CLASSNAME from '../../Helper/classes';

// redux
import { RootState } from '../../Store/index';

export default function Dashboard() {
  const search = useSelector((state: RootState) => state?.areaItem?.item);
  const userId = useSelector((state: RootState) => state?.common?.id);
  const [page, setPage] = useState(1);
  const limit = 20;
  const { data, isError, isLoading } = useGetTypeProductsQuery(
    { page, limit, search, userId },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );
  const [totalImages, setTotalImages] = useState<Product[]>([]);

  // Hooks
  useEffect(() => {
    setTotalImages([]);
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (data && page === 1) {
      setTotalImages(() => {
        return [...data];
      });
    } else if (data) {
      setTotalImages((prev) => {
        return [...prev, ...data];
      });
    }
  }, [data, search]);

  return (
    <>
      {/* total images  */}
      {totalImages && (
        <div className={CLASSNAME.DASHBOARD.WRAPPER}>
          {isLoading && (
            <div className={CLASSNAME.DASHBOARD.LOADER}>
              {Array.from({ length: 10 }, (_, i) => (
                <Schemer key={i} />
              ))}
            </div>
          )}
          {isError && <ErrorSection />}
          <div className={CLASSNAME.DASHBOARD.IMAGE_SECTION}>
            {/* totalImages.length greater then 0 */}
            {data &&
              totalImages.length > 0 &&
              totalImages?.map((product: Product) => (
                <ImagesLayout key={product.id} data={product} />
              ))}
            {/* totalImages.length is eqauls to 0 */}
          </div>
          {data && totalImages.length === 0 && (
            <h2 className={CLASSNAME.DASHBOARD.NO_PRODUCTS}>
              {COMMON_TEXT.NO_PRODUCTS}
            </h2>
          )}
          {/* load section */}
          {data?.length !== 0 && data?.length === limit && (
            <button
              type="button"
              className={CLASSNAME.DASHBOARD.LOAD}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {COMMON_TEXT.LOAD_MORE}
            </button>
          )}
        </div>
      )}
    </>
  );
}
