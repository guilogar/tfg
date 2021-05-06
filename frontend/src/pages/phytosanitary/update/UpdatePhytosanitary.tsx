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
import './UpdatePhytosanitary.css';

const UpdatePhytosanitary: React.FC<{ farmableLandId: number, setUpdate: Function }> = ( { farmableLandId, setUpdate } ) => {
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
        <Redirect to="/dashboard/page/Phytosanitary" exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => { setBack(true) }}>
              <IonIcon slot="icon-only" ios={arrowBackCircle} md={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>EditPhytosanitary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default UpdatePhytosanitary;
