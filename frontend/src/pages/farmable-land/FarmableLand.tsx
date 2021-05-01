import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonCheckbox
} from '@ionic/react';
import { add, create as createIcon, trash } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

import { getApi } from '../../services/utils';
import './FarmableLand.css';

import CreateFarmableLand from './create/CreateFarmableLand';
import UpdateFarmableLand from './update/UpdateFarmableLand';

const FarmableLand: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [farmableLandId, setFarmableLandId] = useState<number>(0);
  const [farmableLands, setFarmableLands] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLand');
      setFarmableLands(data.lands);
    })();
  }, []);

  if (create)
  {
    return(<CreateFarmableLand setCreate={setCreate} />);
  } else if(update) {
    return(<UpdateFarmableLand setUpdate={setUpdate} farmableLandId={farmableLandId} />);
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
              <IonCard key={index}>
                <IonImg src={farmableLand.image}
                        class="img-farmable-land" />
                <IonCardHeader>
                  <IonCardTitle>Tipo: {farmableLand.type}</IonCardTitle>
                  <IonCardSubtitle>Area: {farmableLand.area} m2</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="none">
                    <IonLabel>Se ha agregado un sistema de IOT</IonLabel>
                    <IonCheckbox checked={farmableLand.haveIOT} disabled={true} slot="start" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>El terreno tiene forma de cuadrado o rectangulo</IonLabel>
                    <IonCheckbox checked={farmableLand.isSquare} disabled={true} slot="start" />
                  </IonItem>
                  <IonItem>
                    <IonLabel>Acciones</IonLabel>
                    <IonButton
                      fill="outline" slot="end"
                      onClick={() => {setUpdate(true)}}>
                        <IonIcon icon={createIcon} />
                    </IonButton>
                    <IonButton
                      fill="outline" slot="end" color="danger"
                      onClick={() => {setUpdate(true)}}>
                        <IonIcon icon={trash} />
                    </IonButton>
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

export default FarmableLand;
