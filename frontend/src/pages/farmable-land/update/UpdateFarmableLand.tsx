import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg
} from '@ionic/react';
import { pin } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";

import { getApi } from '../../../services/utils';
import './UpdateFarmableLand.css';

const UpdateFarmableLand: React.FC<{ farmableLandId: number }> = ( { farmableLandId } ) => {
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
        <CanvasDraw
          brushRadius={3} brushColor={'#009dff'}
          ref={canvasDraw => (saveableCanvas = canvasDraw)}
          canvasWidth="100%"
          canvasHeight="100%"
        />
      </IonContent>
    </IonPage>
  );
};

export default UpdateFarmableLand;