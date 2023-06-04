import { useEffect, useMemo, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";
import ChatBubble from '../Components/ChatBubble'
import ChatInput from "../Components/ChatInput";
const ChatBox = () => {

  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      
      setMessages(fetchedMessages);
    });
    return () => unsubscribe;
  }, []);

  const sortedMessages = useMemo(()=>{
    return messages.sort(
      (a, b) => a.createdAt - b.createdAt
    );
  }, [messages])
  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {sortedMessages?.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <ChatInput scroll={scroll} />
    </main>
  );
};

export default ChatBox;
