import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonCheckbox, IonMenuButton, IonRefresher,
  IonRefresherContent, IonToast, IonSearchbar
} from '@ionic/react';
import { add, create as createIcon, trash, search, } from 'ionicons/icons';
import React, { useState, useEffect, useRef } from 'react';

import { getApi } from '../../services/utils';
import { Redirect } from 'react-router';
import './FarmableLand.css';

import Refresher from '../../services/refresher';
import ToolBar from '../../services/toolbar';

const FarmableLand: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [farmableLandId, setFarmableLandId] = useState<number | null>(null);
  const [farmableLands, setFarmableLands] = useState<Array<any>>([]);

  const [searchText, setSearchText] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const farms = await getFarms();
      setFarmableLands(farms);
    })();
  }, []);

  const getFarms = async () => {
    const { data } = await api.get('/farmableLand');
    return data.lands;
  }

  const removeFarm = async (farmId: number) => {
    await api.delete(`/farmableLand/${farmId}`);
  };

  const filterData = async (text: string) => {
    if (!text) {
      return await getFarms();
    }
    const { data } = await api.get(`/farmableLand?filter=${text}`);
    return data.lands;
  }

  const CreateButton = () => {
    return (
      <IonButton onClick={() => { setCreate(true) }}>
        <IonIcon slot="icon-only" icon={add} />
      </IonButton>
    );
  };

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
        <ToolBar
          title={`FarmableLand`}
          writeAction={async (text: string) => {
            const farms: Array<any> = await filterData(text)
            setFarmableLands(farms)
            setSearchText(text)
          }}
          cancelAction={async () => {
            const farms: Array<any> = await getFarms()
            setFarmableLands(farms)
            setSearchText(null)
          }}
          CreateButton={CreateButton}
          />
      </IonHeader>
      <IonContent>
        <Refresher refreshAction={async () => {
          const farms = (searchText) ? await filterData(searchText) : await getFarms()
          setFarmableLands(farms)
        }} />
        {
          farmableLands.map((farmableLand, index) => {
            return (
              <IonCard key={index}>
                <IonImg src={(farmableLand.image) ? farmableLand.image : '/assets/no-image.png'}
                        class="img-farmable-land" />
                <IonCardHeader>
                  <IonCardTitle>Nombre: {farmableLand.name}</IonCardTitle>
                  <IonCardSubtitle>Tipo: {farmableLand.type}, Area: {farmableLand.area} m2</IonCardSubtitle>
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
                      onClick={async () => {
                        await removeFarm(farmableLand.id)
                        const farms = await getFarms()
                        setFarmableLands(farms)
                      }}>
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
