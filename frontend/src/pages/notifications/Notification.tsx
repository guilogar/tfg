import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton, IonInput
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Refresher from '../../components/refresher';
import ToolBar from '../../components/toolbar';

import { getApi } from '../../services/utils';
import './Notification.css';

const Notification: React.FC = () => {
  const { t } = useTranslation();
  const api = getApi();
  const [notifications, setNotifications] = useState<Array<any>>([]);

  const [searchText, setSearchText] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const notifications = await getNotifications();
      setNotifications(notifications);
    })();
  }, []);

  const getNotifications = async () => {
    const { data } = await api.get('/notifications');
    return data.notifications;
  }

  const filterData = async (text: string) => {
    if (!text) {
      return await getNotifications();
    }
    const { data } = await api.get(`/notifications?filter=${text}`);
    return data.notifications;
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolBar
          title={`Notification`}
          writeAction={async (text: string) => {
            const notifications: Array<any> = await filterData(text)
            setNotifications(notifications)
            setSearchText(text)
          }}
          cancelAction={async () => {
            const notifications: Array<any> = await getNotifications()
            setNotifications(notifications)
            setSearchText(null)
          }}
          CreateButton={null}
          />
      </IonHeader>
      <IonContent>
        <Refresher refreshAction={async () => {
          const notifications = (searchText) ? await filterData(searchText) : await getNotifications()
          setNotifications(notifications)
        }} />
        {
          notifications.map((notification, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>
                    {notification.title}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {notification.body}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="none">
                    <IonInput value={notification.createdAt} disabled />
                  </IonItem>
                </IonCardContent>
              </IonCard>
            );
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Notification;
