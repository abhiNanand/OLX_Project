// libs
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// constants
import { IMAGES, QUOTES } from './constant';
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';

export default function ImageTransition() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function prevSlide() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1
    );
  }
  function nextSlide() {
    setCurrentIndex((prevIndex) =>
      prevIndex === IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  }
  function goToSlide(index: number) {
    setCurrentIndex(index);
  }

  return (
    <div className={CLASSNAME.IMAGE_TRANSITION.IMAGE_SECTION}>
      {IMAGES.map((image, index) => (
        <div
          key={`${COMMON_TEXT.LOGIN_IMAGES} ${index + 1}`}
          className={`${CLASSNAME.IMAGE_TRANSITION.SLIDE} ${index === currentIndex ? CLASSNAME.IMAGE_TRANSITION.ACTIVE : ''}`}
        >
          <img src={image} alt={COMMON_TEXT.IMG} />
          <span>{QUOTES[index]}</span>
        </div>
      ))}

      <button
        title={COMMON_TEXT.SLIDE_BUTTON}
        type="button"
        className={`${CLASSNAME.IMAGE_TRANSITION.LOGIN_SLIDE_BUTTON} ${CLASSNAME.IMAGE_TRANSITION.LOGIN_SLIDE_PREV}`}
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        title={COMMON_TEXT.SLIDE_BUTTON}
        type="button"
        className={`${CLASSNAME.IMAGE_TRANSITION.LOGIN_SLIDE_BUTTON} ${CLASSNAME.IMAGE_TRANSITION.LOGIN_SLIDE_NEXT}`}
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
      <div className={CLASSNAME.IMAGE_TRANSITION.LOGIN_DOTS_CONTAINER}>
        {IMAGES.map((_, index) => (
          <button
            title={COMMON_TEXT.DOTS}
            type="button"
            key={`${COMMON_TEXT.DOTS} ${index + 1}`}
            className={`${CLASSNAME.IMAGE_TRANSITION.DOT} ${currentIndex === index ? CLASSNAME.IMAGE_TRANSITION.ACTIVE : ''}`}
            aria-label={`${COMMON_TEXT.GO_TO_SLIDE} ${index + 1}`}
            onClick={() => {
              goToSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}
