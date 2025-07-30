// libs
import { useState } from 'react';

// components
import SubCategory from '../SellCategory/SellCategory';

// constants
import ICONS from '../../../assets';
import CATEGORIES from './constant';
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';

export default function SellSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <div className={CLASSNAME.SELL_SECTION.WRAPPER}>
      {/* choose your category text */}
      <h2 className={CLASSNAME.SELL_SECTION.SUBTITLE}>
        {COMMON_TEXT.CHOOSE_YOUR_CATEGORY}
      </h2>
      <div className={CLASSNAME.SELL_SECTION.CATEGORIES}>
        {/* categories section / left hand side section */}
        {CATEGORIES.map((category) => (
          <div key={category.id} className={CLASSNAME.SELL_SECTION.CATEGORY}>
            <button
              type="button"
              className={`${CLASSNAME.SELL_SECTION.CATEGORY_BUTTON} ${
                selectedCategory === category.id
                  ? CLASSNAME.SELL_SECTION.ACTIVE
                  : ''
              }`}
              onClick={() =>
                setSelectedCategory(
                  category.id === selectedCategory ? '' : category.id
                )
              }
            >
              <img
                src={category.icon}
                alt={COMMON_TEXT.IMG}
                className={CLASSNAME.SELL_SECTION.CATEGORY_ICON}
              />
              <span className={CLASSNAME.SELL_SECTION.CATEGORY_NAME}>
                {category.name}
              </span>
              <img
                src={ICONS.upDownl}
                alt={COMMON_TEXT.IMG}
                className={CLASSNAME.SELL_SECTION.ARROW}
              />
            </button>
            {/* subcategories section / right hand side section */}
            {selectedCategory === category.id && (
              <div className={CLASSNAME.SELL_SECTION.SUBCATEGORIES}>
                <SubCategory categoryId={category.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
