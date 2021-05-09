import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonCheckbox, IonMenuButton, IonRefresher, IonRefresherContent, IonToast, IonSearchbar
} from '@ionic/react';
import { add, create as createIcon, trash, search, options } from 'ionicons/icons';
import React, { useState, useEffect, useRef } from 'react';

import { getApi } from '../../services/utils';
import './FarmableLand.css';
import { Redirect } from 'react-router';

const FarmableLand: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [farmableLandId, setFarmableLandId] = useState<number | null>(null);
  const [farmableLands, setFarmableLands] = useState<Array<any>>([]);
  const [allFarms, setAllFarms] = useState<Array<any>>([]);

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  useEffect(() => {
    (async () => {
      const farms = await getFarms();
      setFarmableLands(farms);
      setAllFarms(farms);
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

  const doRefresh = async () => {
    ionRefresherRef.current!.complete();
    if (showSearchbar) {
      await filterData('');
    } else {
      await getFarms();
    }
    setShowCompleteToast(true);
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
        <IonToolbar>
          {
            !showSearchbar
            &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {
            !showSearchbar
            &&
            <IonTitle>FarmableLand</IonTitle>
          }
          {
            showSearchbar
            &&
            <IonSearchbar
              showCancelButton="always" placeholder="Search"
              onIonChange={async (e: CustomEvent) => {
                const farms: Array<any> = await filterData(e.detail.value)
                setFarmableLands(farms)
              }}
              onIonCancel={async () => {
                setShowSearchbar(false)
                const farms: Array<any> = await getFarms()
                setFarmableLands(farms)
              }} />
          }
          <IonButtons slot="end">
            {
              !showSearchbar
              &&
              <IonButton onClick={() => setShowSearchbar(true)}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            }
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => {setCreate(true)}}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonToast
          isOpen={showCompleteToast}
          message="Actualización completada"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />
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
