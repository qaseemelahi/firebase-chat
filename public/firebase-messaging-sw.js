// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDxQrKcFq1vNxuqPKw1YIG81p4WMdWGP5g",
  authDomain: "onetoonechat-dbf4b.firebaseapp.com",
  projectId: "onetoonechat-dbf4b",
  storageBucket: "onetoonechat-dbf4b.appspot.com",
  messagingSenderId: "709158434877",
  appId: "1:709158434877:web:39c4d74697b754c82f5254",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
