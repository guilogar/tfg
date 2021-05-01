import axios from "axios";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';

export const login = (sessionId: string) : void => {
  localStorage.setItem('sessionId', sessionId);
}

export const logout = () : void => {
  localStorage.clear();
};

export const isLogged = () : boolean => {
  return  localStorage.getItem('sessionId') !== null &&
          localStorage.getItem('sessionId') !== undefined;
};

export const getSessionId = (): string | null => {
  return localStorage.getItem('sessionId');
};

export const getApi = () : any => {
  const headers = (!isLogged()) ? {} : {
    authorization: `Bearer ${getSessionId()}`
  };
  return axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_HOST}/api/v1`,
    headers: headers
  });
};

export const inputToDataURL = (input: any) : Promise<any> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    if (!input.files || !input.files[0])
    {
      reject(new DOMException("Error loading the images of file"));
    }

    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file"));
    };

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(input.files[0]);
  });
};

export const pushNotifications = async () => {
  const { PushNotifications } = Plugins;

  const result = await PushNotifications.requestPermission();
  if (result.granted) {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();
  }

  PushNotifications.addListener(
    'registration',
    (token: PushNotificationToken) => {
      try {
        localStorage.setItem('pushNotificationToken', token.value);
      } catch (error) {
        alert('error on save pushNotificationToken');
      }
    },
  );

  PushNotifications.addListener(
    'pushNotificationReceived',
    (notification: PushNotification) => {
      alert('Push received: ' + JSON.stringify(notification));
    },
  );

  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification: PushNotificationActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    },
  );
};
