import React from 'react';
import ReactDOM from 'react-dom';
import {
  Capacitor
} from '@capacitor/core';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {
  initializeFirebase, askPermissionNotification
} from './push-notifications';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
(async () => {
  const { isNative, platform } = Capacitor;
  if(isNative) return;

  if (platform === 'electron') {
    return;
  }

  try {
    const firebase = initializeFirebase();
    const token = await askPermissionNotification(firebase);
    localStorage.setItem('pushNotificationToken', token);

    serviceWorkerRegistration.register({
      onSuccess: (registration) => {
        firebase.messaging().useServiceWorker(registration);
      },
      onUpdate: (registration) => {
        firebase.messaging().useServiceWorker(registration);
      }
    });
  } catch (error) {
    console.log(error)
  }
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
