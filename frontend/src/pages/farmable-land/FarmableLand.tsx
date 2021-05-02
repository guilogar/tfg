import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonCheckbox, IonMenuButton
} from '@ionic/react';
import { add, create as createIcon, trash } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

import { getApi } from '../../services/utils';
import './FarmableLand.css';
import { Redirect } from 'react-router';

const FarmableLand: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [farmableLandId, setFarmableLandId] = useState<number | null>(null);
  const [farmableLands, setFarmableLands] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLand');
      setFarmableLands(data.lands);
    })();
  }, []);

  return (
    <IonPage>
      {
        create
        &&
        <Redirect to="/dashboard/page/FarmableLand/create" push={true} exact={true} />
      }
      {
        update
        &&
        <Redirect to={`/dashboard/page/FarmableLand/${farmableLandId}/update`} push={true} exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonTitle>FarmableLand</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
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
                <IonImg src={(farmableLand.image) ? farmableLand.image : '/assets/no-image.png'}
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
                      onClick={() => {
                        setFarmableLandId(farmableLand.id)
                        setUpdate(true)
                      }}>
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
