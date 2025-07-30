// libs
import RangeSlider from 'react-range-slider-input';

// styles
import 'react-range-slider-input/dist/style.css';

// constants and utils
import { FilterProps, SampleData } from '../../../Helper/interface';
import CLASSNAME from '../../../Helper/classes';
import { TYPE, COMMON_TEXT } from '../../../Helper/text';

function Filter({
  category,
  response,
  sampleData,
  setSampleData,
  price,
  setPrice,
}: Readonly<FilterProps>) {
  const handlePrice = (value: [number, number]) => {
    setPrice?.(value);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setSampleData?.({
      ...sampleData,
      price: value,
    });
  };
  const handleBrandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const brand = e.currentTarget.title;

    if (brand) {
      setSampleData?.((prev: SampleData) => {
        const isSelected = prev.brand.includes(brand);
        return {
          ...prev,
          brand: isSelected
            ? prev.brand.filter((b) => b !== brand)
            : [...prev.brand, brand],
        };
      });
    }
  };

  return (
    <div className={CLASSNAME.FILTER.MAIN_SECTION_FILTER}>
      <h3 className={CLASSNAME.FILTER.FILTER_TITLE}>
        {category === 'multiwheelvehicles'
          ? 'MULTI WHEEL VEHICLES'
          : category?.toUpperCase()}
      </h3>
      {/* SUBCATEGORIES */}
      <div className={CLASSNAME.FILTER.SUBCATEGORY}>
        <h4>{COMMON_TEXT.CATEGORY}</h4>

        <div className={CLASSNAME.FILTER.SUBCATEGORY_LIST}>
          {response?.subcategories && response?.subcategories?.length > 0 ? (
            response?.subcategories?.map(
              (category: {
                subcategory_name: string;
                product_count: number;
              }) => (
                <button
                  title={category.subcategory_name}
                  key={category.subcategory_name}
                  className={
                    category.subcategory_name === sampleData?.subcategory
                      ? CLASSNAME.FILTER.ACTIVE
                      : CLASSNAME.FILTER.SUBCATEGORY_ITEM
                  }
                  type="button"
                  onClick={() => {
                    if (category.subcategory_name !== sampleData?.subcategory) {
                      setSampleData?.({
                        ...sampleData,
                        subcategory: category.subcategory_name,
                      });
                    } else {
                      setSampleData?.({
                        ...sampleData,
                        subcategory: '',
                      });
                    }
                  }}
                >
                  {category.subcategory_name} ({category?.product_count})
                </button>
              )
            )
          ) : (
            <h3 className={CLASSNAME.FILTER.NO_PRODUCTS}>
              {COMMON_TEXT.NO_CATEGORY}
            </h3>
          )}
        </div>
      </div>
      {/* BRANDS */}
      <div className={CLASSNAME.FILTER.BRAND}>
        <h4>{COMMON_TEXT.BRAND}</h4>
        <div className={CLASSNAME.FILTER.BRAND_LIST}>
          {response?.Brand && response?.Brand?.length > 0 ? (
            response?.Brand?.map((brand: string | undefined) => (
              <button
                type="button"
                title={brand}
                key={brand}
                className={
                  sampleData?.brand.includes(brand as string)
                    ? CLASSNAME.FILTER.ACTIVE
                    : CLASSNAME.FILTER.BRAND_ITEMS
                }
                onClick={handleBrandClick}
              >
                {brand}
              </button>
            ))
          ) : (
            <h3 className={CLASSNAME.FILTER.NO_PRODUCTS}>
              {COMMON_TEXT.NO_BRAND}
            </h3>
          )}
        </div>
      </div>

      {/* BUDGET */}
      <div className={CLASSNAME.FILTER.PRICE}>
        <h4>{COMMON_TEXT.PRICE}</h4>
        <RangeSlider
          min={100}
          max={200000000}
          step={100}
          value={price ?? [100, 200000000]}
          onInput={(value: [number, number]) => handlePrice(value)}
        />
        <div className={CLASSNAME.FILTER.PRICE_LIST}>
          <input
            title={COMMON_TEXT.PRICE_MIN}
            min={100}
            max={price?.[1] ?? 200000000}
            type={TYPE.NUMBER}
            className={CLASSNAME.FILTER.PRICE_MIN}
            value={price?.[0] ?? ''}
            placeholder="Min"
            onChange={(e) => {
              const value = Math.max(
                100,
                Math.min(Number(e.target.value) || 100, price?.[1] ?? 200000000)
              );
              setPrice?.([value, price?.[1] ?? 2000000000]);
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                setPrice?.([100, price?.[1] ?? 200000000]);
              }
            }}
          />

          <input
            title={COMMON_TEXT.PRICE_MAX}
            min={price?.[0] ?? 100}
            max={200000000}
            type={TYPE.NUMBER}
            className={CLASSNAME.FILTER.PRICE_MAX}
            value={price?.[1] ?? ''}
            placeholder="Max"
            onChange={(e) => {
              const value = Math.max(
                price?.[0] ?? 100,
                Math.min(Number(e.target.value) || 100, 200000000)
              );
              setPrice?.([price?.[0] ?? 100, value]);
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                setPrice?.([price?.[0] ?? 100, 200000000]);
              }
            }}
          />
        </div>
        <button
          className={CLASSNAME.FILTER.APPLY}
          type="button"
          disabled={!price || (price[0] === 100 && price[1] === 200000001)}
          onClick={() => {
            handlePriceRangeChange(price ?? [100, 200000000]);
          }}
        >
          {COMMON_TEXT.APPLY}
        </button>
      </div>
    </div>
  );
}
export default Filter;
