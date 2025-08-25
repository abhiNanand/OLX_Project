// // constants
// import CONTENTS from './constant';
// import CLASSNAME from '../../Helper/classes';
// import { COMMON_TEXT } from '../../Helper/text';

// export default function PromotedContent() {
//   return (
//     <div className={CLASSNAME.PROMOTED_CONTENT.WRAPPER}>
//       <h4>{COMMON_TEXT.PROMOTED_CONTENT}</h4>
//       <div className={CLASSNAME.PROMOTED_CONTENT.CONTENT}>
//         {CONTENTS.map((data) => (
//           <button
//             type="button"
//             key={data.id}
//             className={CLASSNAME.PROMOTED_CONTENT.CONTAINER}
//             onClick={() => window.open(data.link || '')}
//           >
//             {data?.type === 'youtube' && (
//               <>
//                 <iframe
//                   src={data.src}
//                   title={data.label || COMMON_TEXT.VIDEO_CONTENT}
//                   allow="autoplay; encrypted-media"
//                 />
//                 <span className={CLASSNAME.PROMOTED_CONTENT.LABEL}>
//                   {data.label}
//                 </span>
//               </>
//             )}
//             {data.type === 'image' && (
//               <>
//                 <img src={data.src} alt={COMMON_TEXT.IMG} />
//                 <span className={CLASSNAME.PROMOTED_CONTENT.LABEL}>
//                   {data.label}
//                 </span>
//               </>
//             )}
//             {/* {data?.type === 'video' && (
//               <>
//                 <video src={data.src} autoPlay muted loop />
//                 <span>{data.label}</span>
//               </>
//             )} */}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
// constants
import CONTENTS from './constant';
import CLASSNAME from '../../Helper/classes';
import { COMMON_TEXT } from '../../Helper/text';

export default function PromotedContent() {
  return (
    <div className={CLASSNAME.PROMOTED_CONTENT.WRAPPER}>
      <h4>{COMMON_TEXT.PROMOTED_CONTENT}</h4>
      <div className={CLASSNAME.PROMOTED_CONTENT.CONTENT}>
        {CONTENTS.map((data) => (
          <button
            type="button"
            key={data.id}
            className={CLASSNAME.PROMOTED_CONTENT.CONTAINER}
            onClick={() => window.open(data.link || '')}
          >
            {/* YouTube iframe without autoplay */}
            {data?.type === 'youtube' && (
              <>
                <iframe
                  src={data.src.includes('autoplay=1')
                    ? data.src.replace('autoplay=1', 'autoplay=0')
                    : data.src}
                  title={data.label || COMMON_TEXT.VIDEO_CONTENT}
                  allow="encrypted-media"
                  allowFullScreen
                />
                <span className={CLASSNAME.PROMOTED_CONTENT.LABEL}>
                  {data.label}
                </span>
              </>
            )}

            {data.type === 'image' && (
              <>
                <img src={data.src} alt={COMMON_TEXT.IMG} />
                <span className={CLASSNAME.PROMOTED_CONTENT.LABEL}>
                  {data.label}
                </span>
              </>
            )}

            {/* Local video without autoplay */}
            {data?.type === 'video' && (
              <>
                <video
                  src={data.src}
                  controls
                  autoPlay={false}
                  muted={false}
                  preload="metadata"
                />
                <span>{data.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
