// libs
import { useNavigate } from 'react-router-dom';

// constants
import SUBCATEGORIES from './constant';
import { ROUTES_CONFIG } from '../../../Helper/Routes';
import { COMMON_TEXT } from '../../../Helper/text';
import { SellCategoryProps } from '../../../Helper/interface';
import CLASSNAME from '../../../Helper/classes';

export default function SellCategory({
  categoryId,
}: Readonly<SellCategoryProps>) {
  const subcategories = SUBCATEGORIES[categoryId] || [];
  const navigate = useNavigate();

  return (
    <div className={CLASSNAME.SELL_CATEGORY.WRAPPER}>
      {subcategories.map((subcategory) => (
        <button
          title={COMMON_TEXT.SELECT_THIS_CATEGORY}
          type="button"
          key={subcategory}
          className={CLASSNAME.SELL_CATEGORY.OPTIONS}
          onClick={() => {
            navigate(ROUTES_CONFIG.ATTRIBUTES.path, {
              state: { categoryId, subcategory },
            });
          }}
        >
          {subcategory}
        </button>
      ))}
    </div>
  );
}
