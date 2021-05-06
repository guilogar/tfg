import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import { getApi } from '../../services/utils';
import './Crop.css';

const Crop: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [cropId, setCropId] = useState<number>(0);
  const [crops, setCrops] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLandCrop');
      setCrops(data.lands);
    })();
  }, []);

  return (
    <IonPage>
      {
        create
        &&
        <Redirect to="/dashboard/page/Crop/create" push={true} exact={true} />
      }
      {
        update
        &&
        <Redirect to={`/dashboard/page/Crop/${cropId}/update`} push={true} exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crop</IonTitle>
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
          crops.map((crop, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{crop.name}</IonCardTitle>
                  <IonCardSubtitle>{crop.crops.length} cultivos</IonCardSubtitle>
                  <IonButton
                    fill="outline" slot="end"
                    onClick={() => {setUpdate(true)}}
                  >
                    Editar
                  </IonButton>
                </IonCardHeader>
                <IonCardContent>
                </IonCardContent>
              </IonCard>
            );
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Crop;
