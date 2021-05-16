import axios from "axios";
import {
  Plugins, Capacitor,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  LocalNotificationActionPerformed
} from '@capacitor/core';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { EN, ES } from './languages/languages';

export const login = (sessionId: string) : void => {
  localStorage.setItem('sessionId', sessionId);
}

export const logout = () : void => {
  localStorage.removeItem('sessionId');
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

export const insertDataIntoLocalStorage = (
  inputKey: string, inputValue: string
) : void  => {
    try {
      localStorage.setItem(inputKey, inputValue);
    }
    catch(error) {
      console.error(error);
    }
}

export const fetchKeyDataFromLocalStorage = (inputKey: string) : string | null => {
  return localStorage.getItem(inputKey);
}

export const pushNotifications = async () => {
  const { isNative } = Capacitor;
  if(!isNative) return;

  const { PushNotifications, LocalNotifications } = Plugins;

  PushNotifications.addListener(
    'registration',
    (token: PushNotificationToken) => {
      try {
        localStorage.setItem('pushNotificationToken', token.value);
      } catch (error) {
        alert('error on save pushNotificationToken');
      }
    }
  );

  PushNotifications.addListener(
    'pushNotificationReceived',
    async (notification: PushNotification) => {
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: `${notification.title}`,
              body: `${notification.body}`,
              id: Math.round(Math.random() * 100),
            }
          ]
        });
      } catch (error) {
        alert(error);
      }
    }
  );

  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification: PushNotificationActionPerformed) => {}
  );

  LocalNotifications.addListener(
    'localNotificationActionPerformed',
    (notificationAction: LocalNotificationActionPerformed) => {}
  );

  const result = await PushNotifications.requestPermission();
  // Register with Apple / Google to receive push via APNS/FCM
  if (result.granted) PushNotifications.register();
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export const backButtonNative = () => {
  if (Capacitor.isNative) {
    Plugins.App.addListener("backButton", (e) => {
      const paths = [
        '/login', '/dashboard', '/dashboard/page/Home'
      ];
      if (paths.includes(window.location.pathname)) {
        Plugins.App.exitApp();
      }
    });
  }
};

export const setI18n = (lng = 'en', fallbackLng = 'en') => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: EN
      },
      es: {
        translation: ES
      }
    },
    lng: lng,
    fallbackLng: fallbackLng,
    interpolation: {
      escapeValue: false
    }
  });
};
