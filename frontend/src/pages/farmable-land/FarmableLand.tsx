import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg
} from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";

import { getApi } from '../../services/utils';
import './FarmableLand.css';

const FarmableLand: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const api = getApi();

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLandTypes');

      let msg = '';
      for (const type of data.types) {
        msg += type + ', ';
      }
      setMessage(msg);
      console.log(data);
    })();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FarmableLand</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonImg src="https://raw.githubusercontent.com/ionic-team/ionic-docs/master/src/demos/api/card/madison.jpg" class="img-farmable-land" />
          <IonCardHeader>
            <IonCardSubtitle>{message}</IonCardSubtitle>
            <IonCardTitle>{message}</IonCardTitle>
          </IonCardHeader>
          <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>{message}</IonLabel>
            <IonButton fill="outline" slot="end">Editar</IonButton>
          </IonItem>
          <IonCardContent>
            {message}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default FarmableLand;