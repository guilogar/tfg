import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg
} from '@ionic/react';
import { pin } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

import { getApi } from '../../services/utils';
import './FarmableLand.css';

import CreateFarmableLand from './create/CreateFarmableLand';
import UpdateFarmableLand from './update/UpdateFarmableLand';

const FarmableLand: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [farmableLandId, setFarmableLandId] = useState<number>(0);
  const api = getApi();

  useEffect(() => {
    (async () => {

    })();
  });

  if (create)
  {
    return(<CreateFarmableLand />);
  } else if(update) {
    return(<UpdateFarmableLand farmableLandId={farmableLandId} />);
  } else
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FarmableLand</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonImg src="https://raw.githubusercontent.com/ionic-team/ionic-docs/master/src/demos/api/card/madison.jpg"
                  class="img-farmable-land" />
          <IonCardHeader>
            <IonCardSubtitle>{message}</IonCardSubtitle>
            <IonCardTitle>{message}</IonCardTitle>
          </IonCardHeader>
          <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>{message}</IonLabel>
            <IonButton 
              fill="outline" slot="end"
              onClick={() => {setUpdate(true)}}
            >
              Editar
            </IonButton>
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