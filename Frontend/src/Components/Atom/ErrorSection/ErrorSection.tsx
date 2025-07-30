// constants
import CLASSNAME from '../../../Helper/classes';
import { COMMON_TEXT } from '../../../Helper/text';

export default function ErrorSection() {
  return (
    <div className={CLASSNAME.ERROR_SECTION.ERROR}>
      <h1>{COMMON_TEXT.SOMETHING_WENT_WRONG}</h1>
    </div>
  );
}
