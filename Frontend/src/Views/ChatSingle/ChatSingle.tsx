// libs
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';

// components
import MessageSection from '../../Components/CustomComponents/ChatMsg/index';

// constants
import CLASSNAME from '../../Helper/classes';

export default function ChatSingle() {
  const { userId } = useSelector((state: RootState) => state.chatUser);
  const { id } = useSelector((state: RootState) => state?.common);
  const roomId =
    userId != null && id != null
      ? [userId, id].sort((a, b) => a - b).join('_')
      : '';

  return (
    <div className={CLASSNAME.FIREBASE.CHAT_APP}>
      <MessageSection roomId={roomId} />
    </div>
  );
}
