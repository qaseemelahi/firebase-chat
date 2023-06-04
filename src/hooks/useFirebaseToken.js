import { useEffect, useState } from "react";
import { messaging } from "../config/firebase";
import { getToken } from "firebase/messaging";

export const useFirebaseToken = () => {
  const [token, setToken] = useState("");

  const getFirebaseToken = () => {
    return getToken(messaging, {
      vapidKey: import.meta.env.VITE_GENERATED_MESSAGING_KEY,
    })
      .then((currentToken) => {
        if (currentToken) {
          setToken(currentToken);
        } else {
          alert(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  };
  useEffect(() => {
    getFirebaseToken();
  }, []);

  return token;
};
