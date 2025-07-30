// libs
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// firebse
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';

// redux
import { RootState } from '../../Store';
import { setUserId } from '../../Store/ChatUser/index';

// components
import MessageSection from '../../Components/CustomComponents/ChatMsg/index';

// constants
import CLASSNAME from '../../Helper/classes';
import { COMMON_TEXT } from '../../Helper/text';

export default function MultiChat() {
  const dispatch = useDispatch();
  // const [receiverId, setReceiverId] = useState<string | null>(null);
  const { id } = useSelector((state: RootState) => state?.common);
  const messageRef = collection(db, 'messages');
  const [uniqueUsers, setUniqueUsers] = useState<
  { roomId: string; userName: string }[]
>([]);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const queryMessages = query(messageRef);

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const roomMap = new Map<string, { roomId: string; userName: string }>();

      snapshot.forEach((doc) => {
        const data = doc.data();
        const { room } = data;
        const participants = room.split('_');

       if (!participants.includes(String(id))) return;

        const isReceiver = data.receiverId === id;   
         const userName = isReceiver ? data.user : data.receiverName;

        if (!roomMap.has(room)) {
          roomMap.set(room, {
            roomId: room,
            userName: userName || "Unknown",
        });
       }
   });

    // Convert Map values to array
        const uniqueUserList = Array.from(roomMap.values());

    setUniqueUsers(uniqueUserList); // you can change state type accordingly
  
 });
  return () => unsubscribe();
}, []);

  return (
    <>
      {}
      {uniqueUsers?.length === 0 ? (
        <div className={CLASSNAME.FIREBASE.NO_USERS}>
          {COMMON_TEXT.NO_CONVERSATIONS}
        </div>
      ) : (
        <div className={CLASSNAME.FIREBASE.CHAT_APP}>
          <div className={CLASSNAME.FIREBASE.USER_WRAPPER}>
            <div className={CLASSNAME.FIREBASE.USER}>{COMMON_TEXT.USER}</div>
            <div className={CLASSNAME.FIREBASE.USER_LIST}>
            {uniqueUsers.map(({ roomId: room, userName }) => (
         <button
          type="button"
          key={room}
          className={`${CLASSNAME.FIREBASE.USER_ITEM} ${room == roomId ? CLASSNAME.FIREBASE.ACTIVE_USER : ''}`}
            disabled={room == roomId}
    onClick={() => {
      setRoomId(room);
      dispatch(
        setUserId({
          userId:
            room.split('_')[0] == id
              ? room.split('_')[1]
              : room.split('_')[0],
          userName,
        })
      );
    }}
  >
    <span >{userName}</span>
  </button>
))}
            </div>
          </div>
          <MessageSection roomId={roomId} />
        </div>
      )}
    </>
  );
}
