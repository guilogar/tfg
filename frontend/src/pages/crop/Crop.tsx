import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton, IonList, IonListHeader
} from '@ionic/react';
import { add, create as createIcon, trash } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Refresher from '../../services/refresher';
import ToolBar from '../../services/toolbar';

import { getApi } from '../../services/utils';
import './Crop.css';

const Crop: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [farmId, setFarmId] = useState<number>(0);
  const [farms, setFarms] = useState<Array<any>>([]);

  const [searchText, setSearchText] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const farms = await getFarms();
      setFarms(farms);
    })();
  }, []);

  const getFarms = async () => {
    const { data } = await api.get('/farmableLandCrop');
    return data.lands;
  }

  const filterData = async (text: string) => {
    if (!text) {
      return await getFarms();
    }
    const { data } = await api.get(`/farmableLandCrop?filter=${text}`);
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
        <Redirect to="/dashboard/page/Crop/create" push={true} exact={true} />
      }
      {
        update
        &&
        <Redirect to={`/dashboard/page/Crop/${farmId}/update`} push={true} exact={true} />
      }
      <IonHeader>
        <ToolBar
          title={`Crop`}
          writeAction={async (text: string) => {
            const farms: Array<any> = await filterData(text)
            setFarms(farms)
            setSearchText(text)
          }}
          cancelAction={async () => {
            const farms: Array<any> = await getFarms()
            setFarms(farms)
            setSearchText(null)
          }}
          CreateButton={CreateButton}
          />
      </IonHeader>
      <IonContent>
        <Refresher refreshAction={async () => {
          const farms = (searchText) ? await filterData(searchText) : await getFarms()
          setFarms(farms)
        }} />
        {
          farms.map((farm, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{farm.name}</IonCardTitle>
                  <IonCardSubtitle>{farm.crops.length} cultivo(s)</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonListHeader>Cultivos:</IonListHeader>
                    {
                      farm.crops.map((crop: any, index: any) => {
                        return (
                          <IonItem key={index}>
                            {crop.alias}, {crop.weeks} semanas
                          </IonItem>
                        );
                      })
                    }
                  </IonList>
                  <IonItem>
                    <IonLabel>Acciones</IonLabel>
                    <IonButton
                      fill="outline" slot="end"
                      onClick={() => {
                        setFarmId(farm.id)
                        setUpdate(true)
                      }}>
                        <IonIcon icon={createIcon} />
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

export default Crop;
