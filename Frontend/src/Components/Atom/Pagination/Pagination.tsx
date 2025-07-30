// constants
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';
import { PaginationProps } from '../../../Helper/interface';

function Pagination({
  page,
  totalpage,
  showButton,
  setPage,
}: Readonly<PaginationProps>) {
  const handlePrevPage = () => {
    setPage((prev: number) => prev - 1);
  };
  const handleNextPage = () => {
    setPage((prev: number) => prev + 1);
  };
  if (totalpage < 2) return null;
  return (
    <div className={CLASSNAME.PAGINATION.WRAPPER}>
      <button
        type="button"
        className={`${CLASSNAME.PAGINATION.PREV} ${
          showButton.prev ? '' : CLASSNAME.PAGINATION.DISABLED
        }`}
        onClick={handlePrevPage}
      >
        {COMMON_TEXT.PREV}
      </button>
      <div className={CLASSNAME.PAGINATION.PAGE_COUNT_WRAPPER}>
        {Array(totalpage)
          ?.fill('')
          ?.map((_, index) => {
            return (
              <button
                type="button"
                key={`${COMMON_TEXT.PAGE}-${index + 1}`}
                onClick={() => setPage(index + 1)}
                disabled={index + 1 === page}
                className={`${CLASSNAME.PAGINATION.PAGE_NUMBER} ${
                  index + 1 === page ? CLASSNAME.PAGINATION.ACTIVE_PAGE : ''
                }`}
              >
                {index + 1}
              </button>
            );
          })}
      </div>

      <button
        type="button"
        className={`${CLASSNAME.PAGINATION.NEXT} ${
          showButton.next ? '' : CLASSNAME.PAGINATION.DISABLED
        }`}
        onClick={handleNextPage}
      >
        {COMMON_TEXT.NEXT}
      </button>
    </div>
  );
}
export default Pagination;
