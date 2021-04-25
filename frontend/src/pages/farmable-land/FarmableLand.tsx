import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons
} from '@ionic/react';
import { pin, add } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

import { getApi } from '../../services/utils';
import './FarmableLand.css';

import CreateFarmableLand from './create/CreateFarmableLand';
import UpdateFarmableLand from './update/UpdateFarmableLand';

const FarmableLand: React.FC = () => {
  const api = getApi();
  const [message, setMessage] = useState<string>('');
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [farmableLandId, setFarmableLandId] = useState<number>(0);
  const [farmableLands, setFarmableLands] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      setCreate(false);
      setUpdate(false);
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
          <IonButtons slot="primary">
            <IonButton onClick={() => {setCreate(true)}}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          farmableLands.map((farmableLand, index) => {
            return (
              <IonCard>
                <IonImg src={farmableLand.image}
                        class="img-farmable-land" />
                <IonCardHeader>
                  <IonCardTitle>{farmableLand.type}</IonCardTitle>
                  <IonCardSubtitle>{farmableLand.area} m^2</IonCardSubtitle>
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
            );
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default FarmableLand;