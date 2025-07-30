// libs
import { ClipLoader } from 'react-spinners';

// constants
import CLASSNAME from '../../../Helper/classes';

export default function Loader() {
  return (
    <div className={CLASSNAME.LOADER.LOADING}>
      <ClipLoader color="black" size={50} loading />
    </div>
  );
}
