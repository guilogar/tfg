import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton, IonInput
} from '@ionic/react';
import { add, create as createIcon, trash } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

import { getApi } from '../../services/utils';
import './Irrigate.css';

import { Redirect } from 'react-router';

const Irrigate: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [irrigateId, setIrrigateId] = useState<number | null>(null);
  const [irrigates, setIrrigates] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/irrigates');
      setIrrigates(data.irrigates);
    })();
  }, []);

  return (
    <IonPage>
      {
        create
        &&
        <Redirect to="/dashboard/page/Irrigate/create" push={true} exact={true} />
      }
      {
        update
        &&
        <Redirect to={`/dashboard/page/Irrigate/${irrigateId}/update`} push={true} exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonTitle>Irrigate</IonTitle>
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
          irrigates.map((irrigate, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>Terreno: {irrigate.FarmableLand.name}</IonCardTitle>
                  <IonCardSubtitle>
                    Cantidad de agua: {irrigate.amountWater} litros
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="none">
                    <IonInput value={`Duración: ${irrigate.lengthMinutes} minutos`} disabled />
                  </IonItem>
                  <IonItem>
                    <IonLabel>Acciones</IonLabel>
                    <IonButton
                      fill="outline" slot="end"
                      onClick={() => {
                        setIrrigateId(irrigate.id)
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

export default Irrigate;
