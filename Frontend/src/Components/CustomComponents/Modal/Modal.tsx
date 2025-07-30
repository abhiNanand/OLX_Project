// libs
import { useEffect, useRef } from 'react';

// constants
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';
import { ModalProps } from '../../../Helper/interface';

export default function Modal({
  setAnswer,
  setOpen,
  text,
  setDropdown,
}: Readonly<ModalProps>) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleYes = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
    setAnswer('yes');
  };
  const handleNo = () => {
    setOpen(false);
    setAnswer('no');
    setDropdown?.(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen?.(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={CLASSNAME.MODAL.WRAPPER}>
      <div className={CLASSNAME.MODAL.CONTENT} ref={dropdownRef}>
        <span className={CLASSNAME.MODAL.TEXT}>{text}</span>
        <div className={CLASSNAME.MODAL.BUTTON}>
          <button
            type="button"
            title={COMMON_TEXT.YES}
            onClick={handleYes}
            className={CLASSNAME.MODAL.YES}
          >
            {COMMON_TEXT.YES}
          </button>
          <button
            type="button"
            title={COMMON_TEXT.NO}
            onClick={handleNo}
            className={CLASSNAME.MODAL.NO}
          >
            {COMMON_TEXT.NO}
          </button>
        </div>
      </div>
    </div>
  );
}
