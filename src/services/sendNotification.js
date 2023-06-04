import axios from "axios";

// Function to send an FCM notification
export const sendNotification = async (token, title, body) => {
  const message = {
    to: token,
    notification: {
      title: title,
      body: body,
    },
  };

  try {
    await axios.post("https://fcm.googleapis.com/fcm/send", message, {
      headers: {
        Authorization: `key=${import.meta.env.VITE_FIREBASE_SERVER_KEY}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
