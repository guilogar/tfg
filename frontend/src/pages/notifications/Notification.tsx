import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton, IonInput
} from '@ionic/react';
import React, { useState, useEffect } from 'react';

import { getApi } from '../../services/utils';
import './Notification.css';

const Notification: React.FC = () => {
  const api = getApi();
  const [notifications, setNotifications] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/notifications');
      setNotifications(data.notifications);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notification</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
                    <IonInput value={`${new Date().toLocaleString()}`} disabled />
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
