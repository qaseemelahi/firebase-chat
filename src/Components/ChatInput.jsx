import { useState } from "react";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {useFirebaseToken} from '../hooks/useFirebaseToken'
import useUserTokens from "../hooks/useUserTokens";
import { sendNotification } from "../services/sendNotification";
const ChatInput = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const token = useFirebaseToken();
  const { uid, displayName, photoURL } = auth.currentUser;

  const userTokens = useUserTokens(uid);

  const handleSendNotification = (username, message) => {
    userTokens.forEach((token) => {
      sendNotification(token, `${username} sends a message`, message);
    });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    setMessage("");
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setDoc(doc(db, "users", uid), {
      token,
      uid,
      name: displayName,
      avatar: photoURL,
    }, { merge: true });
    handleSendNotification(displayName, message)
   
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
