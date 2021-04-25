import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons
} from '@ionic/react';
import { arrowBack, arrowBackCircle } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";

import { getApi } from '../../../services/utils';
import './CreateEvents.css';

const CreateEvents: React.FC<{ setCreate: Function }> = ({ setCreate }) => {
  const [message, setMessage] = useState<string>('');
  const api = getApi();
  let saveableCanvas: any = undefined;

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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => {setCreate(false)}}>
              <IonIcon slot="icon-only" ios={arrowBackCircle} md={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>CreateFarmableLand</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default CreateEvents;