import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton
} from '@ionic/react';
import { arrowBack, arrowBackCircle } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import { getApi } from '../../../services/utils';
import './UpdateMethodPay.css';

const UpdateMethodPay: React.FC = () => {
  const api = getApi();
  const [back, setBack] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
    })();
  });

  return (
    <IonPage>
      {
        back
        &&
        <Redirect to="/dashboard/page/MethodPay" exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => { setBack(true) }}>
              <IonIcon slot="icon-only" ios={arrowBackCircle} md={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>EditMethodPay</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default UpdateMethodPay;
