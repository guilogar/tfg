import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton
} from '@ionic/react';
import { add, create as createIcon, trash } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import { getApi } from '../../services/utils';
import './Phytosanitary.css';

const Phytosanitary: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [farms, setFarms] = useState<Array<any>>([]);
  const [farmId, setFarmId] = useState<number>(0);
  const [cropId, setCropId] = useState<number>(0);
  const [phytosanitaryId, setPhytosanitaryId] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/cropPhytosanitary');
      console.log(data.lands);
      setFarms(data.lands);
    })();
  }, []);

  return (
    <IonPage>
      {
        create
        &&
        <Redirect to="/dashboard/page/Phytosanitary/create" push={true} exact={true} />
      }
      {
        update
        &&
        <Redirect to={`/dashboard/page/Phytosanitary/${farmId}/${cropId}/update`} push={true} exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonTitle>Phytosanitary</IonTitle>
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
          farms.map((farm, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{farm.name}</IonCardTitle>
                  <IonCardSubtitle>{farm.crops.length} cultivo(s)</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  {
                    farm.crops.map((crop: any, index: number) => {
                      return (
                        <IonCard key={index}>
                          <IonCardHeader>
                            <IonCardTitle>{crop.alias}</IonCardTitle>
                            <IonCardSubtitle>{crop.phytosanitarys.length} Fitosanitarios(s)</IonCardSubtitle>
                          </IonCardHeader>
                          <IonCardContent>
                            <IonItem>
                              <IonLabel>Acciones</IonLabel>
                              <IonButton
                                fill="outline" slot="end"
                                onClick={() => {
                                  setFarmId(farm.id)
                                  setCropId(crop.id)
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
                </IonCardContent>
              </IonCard>
            );
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Phytosanitary;
