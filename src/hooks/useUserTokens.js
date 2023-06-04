import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

function useUserTokens(currentUid) {
  const [userTokens, setUserTokens] = useState([]);

  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("uid", "!=", currentUid)
        );
        const querySnapshot = await getDocs(q);

        const tokens = [];
        querySnapshot.forEach((doc) => {
          const userToken = doc.data().token;
          tokens.push(userToken);
        });

        setUserTokens(tokens);
      } catch (error) {
        console.error("Error retrieving user tokens:", error);
      }
    };

    fetchUserTokens();
  }, [currentUid]);

  return userTokens;
}

export default useUserTokens;
