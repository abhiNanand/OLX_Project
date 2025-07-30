// libs
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// firebase
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase';

// redux
import { RootState } from '../../../Store';

// constants
import CLASSNAME from '../../../Helper/classes';
import { ChatMsgSectionProps, MessageProps } from '../../../Helper/interface';
import { COMMON_TEXT } from '../../../Helper/text';

export default function ChatMsg({ roomId }: Readonly<ChatMsgSectionProps>) {
  const { userId = '', userName: receiverName = '' } = useSelector(
  (state: RootState) => state.chatUser || {}
 );
  const { username, id } = useSelector((state: RootState) => state?.common);
  const [newmsg, setNewmsg] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const messageRef = collection(db, 'messages');
  const messagEnd = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (newmsg.trim() === '') return;

    const tempId = Date.now().toString();
    try {
      const newMessage: MessageProps = {
        id: tempId,
        text: newmsg,
        createdAt: new Date(),
        user: username ?? '',
        room: roomId ?? '',
        seen: false,
        senderId: id ?? '',
        receiverId: userId ?? '',
        receiverName: receiverName ?? '',
      };
      setMessages((prev) => [...prev, newMessage]);
      setNewmsg('');

      // Add to Firebase
      const docRef = await addDoc(messageRef, {
        text: newmsg,
        createdAt: serverTimestamp(),
        user: username,
        room: roomId,
        seen: false,
        senderId: id,
        receiverId: userId,
        receiverName,
      });

      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? { ...msg, id: docRef.id } : msg))
      );
    } catch (error) {
      toast.error(COMMON_TEXT.ERROR_SENDING_MESSAGE);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    }
  };

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where('room', '==', roomId),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const newMessages: MessageProps[] = [];
      snapshot.forEach((doc) => {
        newMessages.push({
          ...(doc.data() as MessageProps),
          id: doc.id,
        });
      });

      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !id) return;

    const observerOptions = {
      root: messageListRef.current,
      threshold: 0.5,
    };

    const observers: IntersectionObserver[] = [];

    messages.forEach((msg) => {
      if (msg.senderId == id || msg.receiverId != id || msg.seen) return;
      const messageElement = document.getElementById(msg.id);

      if (!messageElement) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update in Firebase
            const msgRef = doc(db, 'messages', msg.id);

            updateDoc(msgRef, { seen: true })
              .then(() => {
                // Update local state
                setMessages((prev) =>
                  prev.map((m) => (m.id === msg.id ? { ...m, seen: true } : m))
                );
              })
              .catch((error) => {
                console.error('Error updating seen status:', error);
              });

            observer.disconnect();
          }
        });
      }, observerOptions);

      observer.observe(messageElement);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [messages, id, roomId]);

  useEffect(() => {
    const el = messagEnd.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={CLASSNAME.FIREBASE.MESSAGE_WRAPPER}>
      <div className={CLASSNAME.FIREBASE.MESSAGE}>{COMMON_TEXT.MESSAGES}</div>
      <div
        className={CLASSNAME.FIREBASE.MESSAGE_LIST}
        ref={(el) => {
          if (el) {
            // Type assertion to bypass read-only restriction
            (messagEnd as React.MutableRefObject<HTMLDivElement>).current = el;
            (messageListRef as React.MutableRefObject<HTMLDivElement>).current =
              el;
          }
        }}
      >
        {messages.length === 0 ? (
          <div className={CLASSNAME.FIREBASE.NO_MSG}>{COMMON_TEXT.NO_MSG}</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              id={msg.id}
              className={`${CLASSNAME.FIREBASE.MESSAGE_ITEM} ${
                msg.user === username
                  ? CLASSNAME.FIREBASE.SENT
                  : CLASSNAME.FIREBASE.RECEIVED
              }`}
            >
              <span className={CLASSNAME.FIREBASE.MESSAGE_TEXT}>
                {msg.text}
              </span>
              <span className={CLASSNAME.FIREBASE.MESSAGE_TIME}>
                {msg.createdAt
                  ? new Date(
                      (msg.createdAt as any).seconds * 1000
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''}
                {msg.user === username && (
                  <span
                    className={`${CLASSNAME.FIREBASE.TICK_STATUS} ${msg.seen ? CLASSNAME.FIREBASE.SEEN : ''}`}
                  >
                    {msg.seen ? '✓✓' : '✓'}
                  </span>
                )}
              </span>
            </div>
          ))
        )}
      </div>
      {/* send button and input wrapper  */}
      {roomId !== '' && (
        <div className={CLASSNAME.FIREBASE.INPUT_WRAPPER}>
          <input
            className={CLASSNAME.FIREBASE.MESSAGE_INPUT}
            type="text"
            placeholder={COMMON_TEXT.TYPE_MESSAGE}
            value={newmsg}
            onChange={(e) => setNewmsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button
            type="button"
            className={CLASSNAME.FIREBASE.SEND_BUTTON}
            onClick={handleSendMessage}
          >
            {COMMON_TEXT.SEND}
          </button>
        </div>
      )}
    </div>
  );
}
