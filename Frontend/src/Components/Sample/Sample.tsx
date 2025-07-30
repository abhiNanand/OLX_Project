// libs
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// api
import { usePostCategoryProductsMutation } from '../../Services/Api/module/imageApi';

// components
import ImagesLayout from '../CustomComponents/ImageLayout/ProductImage';
import Schemer from '../Atom/Schemer';
import Pagination from '../Atom/Pagination/Pagination';
import Filter from '../Atom/Filter';
import ErrorSection from '../Atom/ErrorSection';

// constants
import { COMMON_TEXT } from '../../Helper/text';
import { SampleData, ResponseData, Product } from '../../Helper/interface';
import ICONS from '../../assets';
import CLASSNAME from '../../Helper/classes';

export default function Sample() {
  const limit = 8;
  const [totalpage, setTotalpage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const [showButton, setShowButton] = useState({ prev: false, next: false });
  const [sampleData, setSampleData] = useState<SampleData>({
    category,
    subcategory: '',
    brand: [],
    price: [100, 200000000],
  });
  const [price, setPrice] = useState<[number, number]>([100, 200000000]);
  const [response, setResponse] = useState<ResponseData | undefined>();
  const [productData, { isLoading, isError }] =
    usePostCategoryProductsMutation();

  // Hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productData({
          sampleData,
          page,
          limit,
        }).unwrap();

        setResponse(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page, JSON.stringify(sampleData)]);
  useEffect(() => {
    setPage(1);
  }, [JSON.stringify(sampleData)]);

  useEffect(() => {
    setSampleData({
      category,
      subcategory: '',
      brand: [],
      price: [100, 200000000],
    });
  }, [JSON.stringify(category)]);

  useEffect(() => {
    if (!response) return;

    const totalPages = Math.max(1, Math.ceil((response?.count ?? 0) / limit));
    setTotalpage(totalPages);

    setShowButton({
      prev: page > 1,
      next: page < totalPages,
    });
  }, [JSON.stringify(response), page]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className={CLASSNAME.SAMPLE.WRAPPER}>
      {/* TEXT SECTION */}
      <div className={CLASSNAME.SAMPLE.TEXT_SECTION}>
        <h3>
          Buy & Sell Used{' '}
          {category === 'MultiWheelVehicles'
            ? 'MULTI WHEEL VEHICLES'
            : category?.toUpperCase()}{' '}
          in India
        </h3>

        {/* SELECTED OPTIONS */}
        <div className={CLASSNAME.SAMPLE.SELECTED_OPTION}>
          {sampleData.subcategory && (
            <div className={CLASSNAME.SAMPLE.SELECTED_OPTION_WRAPPER}>
              <span className={CLASSNAME.SAMPLE.SELECTED_OPTION_TEXT}>
                {sampleData.subcategory}
              </span>
              <button
                type="button"
                className={CLASSNAME.SAMPLE.SELECTED_OPTION_CROSS}
                onClick={() => {
                  setSampleData({ ...sampleData, subcategory: '' });
                }}
              >
                <img src={ICONS.cross} alt={COMMON_TEXT.IMG} />
              </button>
            </div>
          )}

          {sampleData.brand.map((brand: string) => (
            <div
              className={CLASSNAME.SAMPLE.SELECTED_OPTION_WRAPPER}
              key={brand}
            >
              <span className={CLASSNAME.SAMPLE.SELECTED_OPTION_TEXT}>
                {brand}
              </span>
              <button
                type="button"
                className={CLASSNAME.SAMPLE.SELECTED_OPTION_CROSS}
                onClick={() => {
                  setSampleData({
                    ...sampleData,
                    brand: sampleData.brand.filter((b) => b !== brand),
                  });
                }}
              >
                <img src={ICONS.cross} alt={COMMON_TEXT.IMG} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className={CLASSNAME.SAMPLE.MAIN_SECTION_WRAPPER}>
        {/* FILTER SECTION */}
        <Filter
          category={category}
          response={response}
          sampleData={sampleData}
          price={price}
          setPrice={setPrice}
          setSampleData={setSampleData}
        />
        {/* Image Section */}
        <div className={CLASSNAME.SAMPLE.MAIN_IMAGE_SECTION_WRAPPER}>
          {isError && <ErrorSection />}
          <div className={CLASSNAME.SAMPLE.MAIN_SECTION_IMAGE}>
            {isLoading &&
              Array.from({ length: 8 }, (_, i) => <Schemer key={i} />)}
            {!isLoading &&
              response &&
              (response?.products?.length as number) > 0 &&
              response?.products?.map((product: Product) => (
                <ImagesLayout key={product.id} data={product} />
              ))}
            {!isLoading && response && response?.products?.length === 0 && (
              <h3 className={CLASSNAME.SAMPLE.NO_PRODUCTS}>
                {COMMON_TEXT.NO_PRODUCT_AVAILABLE}
              </h3>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            page={page}
            totalpage={totalpage}
            showButton={showButton}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
