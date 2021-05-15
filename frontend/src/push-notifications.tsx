import firebase from 'firebase';
import * as firebaseCredentials from './firebase-credentials.json';

export const initializeFirebase = () : any => {
  firebase.initializeApp({
    apiKey: firebaseCredentials.apiKey,
    authDomain: firebaseCredentials.authDomain,
    projectId: firebaseCredentials.projectId,
    storageBucket: firebaseCredentials.storageBucket,
    messagingSenderId: firebaseCredentials.messagingSenderId,
    appId: firebaseCredentials.appId,
    measurementId: firebaseCredentials.measurementId,
  });
  firebase.analytics();
  return firebase;
};

export const askPermissionNotification = async (firebase: any) => {
  const messaging = firebase.messaging();
  await messaging.requestPermission();
  return await messaging.getToken();
};
