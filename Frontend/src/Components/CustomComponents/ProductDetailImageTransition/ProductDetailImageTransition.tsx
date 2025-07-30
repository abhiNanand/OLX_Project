// libs
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// constants
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';
import { ProductDetailProps } from '../../../Helper/interface';

function ProductDetailImageTransition({
  images,
}: Readonly<ProductDetailProps>) {
  let imageArray: string[] = [];
  if (images) {
    imageArray = Array.isArray(images) ? images : [images];
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  };
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1
    );
  };
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={CLASSNAME.PRODUCT_DETAIL_IMG.IMAGE_SECTION}>
      {imageArray.map((image, index) => (
        <div
          key={image}
          className={`${CLASSNAME.PRODUCT_DETAIL_IMG.IMAGE_SLIDE} ${
            index === currentIndex ? CLASSNAME.PRODUCT_DETAIL_IMG.ACTIVE : ''
          }`}
        >
          <img
            src={`${import.meta.env.VITE_BASE_URL}${image}`}
            alt={COMMON_TEXT.IMG}
            className={CLASSNAME.PRODUCT_DETAIL_IMG.ACTIVE_IMAGES}
          />
        </div>
      ))}

      <button
        type="button"
        className={`${CLASSNAME.PRODUCT_DETAIL_IMG.BUTTON} ${CLASSNAME.PRODUCT_DETAIL_IMG.PREV}`}
        onClick={prevSlide}
      >
        <ChevronLeft size={30} />
      </button>
      <button
        type="button"
        className={`${CLASSNAME.PRODUCT_DETAIL_IMG.BUTTON} ${CLASSNAME.PRODUCT_DETAIL_IMG.NEXT}`}
        onClick={nextSlide}
      >
        <ChevronRight size={30} />
      </button>

      <div className={CLASSNAME.PRODUCT_DETAIL_IMG.DOTS_CONTAINER}>
        {imageArray.map((image, index) => (
          <button
            type="button"
            key={`loginDots${index + 1}`}
            className={`${CLASSNAME.PRODUCT_DETAIL_IMG.DOTS} ${
              currentIndex === index
                ? CLASSNAME.PRODUCT_DETAIL_IMG.ACTIVE_DOTS
                : ''
            }`}
            onClick={() => goToSlide(index)}
          >
            <img
              src={`${import.meta.env.VITE_BASE_URL}${image}`}
              alt={COMMON_TEXT.IMG}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailImageTransition;
