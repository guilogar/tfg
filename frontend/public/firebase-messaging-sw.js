importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

(async () => {
  const response = await fetch('firebase-credentials.json');
  firebaseCredentials = await response.json();
  firebase.initializeApp(firebaseCredentials);
  firebase.messaging();
})();
