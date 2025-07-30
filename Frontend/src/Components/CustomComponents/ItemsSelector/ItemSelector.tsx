// libs
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState, useCallback } from 'react';

// redux
import { RootState } from '../../../Store';
import { setItem } from '../../../Store/AreaItem';

// constants
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';
import { ROUTES_CONFIG } from '../../../Helper/Routes';
import ICONS from '../../../assets';

export default function ItemsSelector() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state?.areaItem?.item);
  const [localValue, setLocalValue] = useState(items);
  const [debouncedValue, setDebouncedValue] = useState(items);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(localValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue]);

  useEffect(() => {
    setLocalValue(items);
  }, [items]);
  useEffect(() => {
    dispatch(setItem(debouncedValue ?? ''));
  }, [debouncedValue, dispatch]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trimStart();
      setLocalValue(value);
      if (value) navigate(ROUTES_CONFIG.HOMEPAGE.path);
    },
    [navigate]
  );

  const handleClear = useCallback(() => {
    setLocalValue('');
    dispatch(setItem(''));
  }, [dispatch]);

  return (
    <div className={CLASSNAME.ITEM_SELECTOR.WRAPPER}>
      <input
        type="text"
        className={CLASSNAME.ITEM_SELECTOR.INPUT}
        placeholder={COMMON_TEXT.FINDS_CARS_MOBILE_AND_MORE}
        value={localValue ?? ''}
        onChange={handleChange}
        aria-label={COMMON_TEXT.FINDS_CARS_MOBILE_AND_MORE}
      />

      <button
        type="button"
        className={CLASSNAME.ITEM_SELECTOR.SEARCH}
        onClick={handleClear}
        aria-label="Clear search"
      >
        <img
          className={CLASSNAME.ITEM_SELECTOR.SEARCH_ICON}
          src={ICONS.cross}
          alt={COMMON_TEXT.IMG}
        />
      </button>
    </div>
  );
}
