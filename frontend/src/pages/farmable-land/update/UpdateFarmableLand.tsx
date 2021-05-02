import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton
} from '@ionic/react';
import { arrowBack, arrowBackCircle } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";
import { Redirect } from 'react-router';

import { getApi } from '../../../services/utils';
import './UpdateFarmableLand.css';

const UpdateFarmableLand: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const api = getApi();
  let saveableCanvas: any = undefined;

  const [back, setBack] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLandTypes');

      let msg = '';
      for (const type of data.types) {
        msg += type + ', ';
      }
      setMessage(msg);
      console.log(data);

      // const canvasData = saveableCanvas.getSaveData();
      // saveableCanvas.loadSaveData(canvasData);
      // saveableCanvas.undo();
      // saveableCanvas.clear();
    })();
  });

  return (
    <IonPage>
      {
        back
        &&
        <Redirect to="/dashboard/page/FarmableLand" exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => { setBack(true) }}>
              <IonIcon slot="icon-only" ios={arrowBackCircle} md={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>EditFarmableLand</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default UpdateFarmableLand;
