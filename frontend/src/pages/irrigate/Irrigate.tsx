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
import ToolBar from '../../components/toolbar';
import Refresher from '../../components/refresher';
import { useTranslation } from 'react-i18next';

const Irrigate: React.FC = () => {
  const { t } = useTranslation();
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [irrigateId, setIrrigateId] = useState<number | null>(null);
  const [irrigates, setIrrigates] = useState<Array<any>>([]);

  const [searchText, setSearchText] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const irrigates = await getIrrigates();
      setIrrigates(irrigates);
    })();
  }, []);

  const removeIrrigate = async (irrigateId: number) => {
    await api.delete(`/irrigate/${irrigateId}`);
  };

  const getIrrigates = async () => {
    const { data } = await api.get('/irrigate');
    return data.irrigates;
  }

  const filterData = async (text: string) => {
    if (!text) {
      return await getIrrigates();
    }
    const { data } = await api.get(`/irrigate?filter=${text}`);
    return data.irrigates;
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
        <Redirect to="/dashboard/page/Irrigate/create" push={true} exact={true} />
      }
      {
        update
        &&
        <Redirect to={`/dashboard/page/Irrigate/${irrigateId}/update`} push={true} exact={true} />
      }
      <IonHeader>
        <ToolBar
          title={t('IRRIGATE_LIST')}
          writeAction={async (text: string) => {
            const irrigates: Array<any> = await filterData(text)
            setIrrigates(irrigates)
            setSearchText(text)
          }}
          cancelAction={async () => {
            const irrigates: Array<any> = await getIrrigates()
            setIrrigates(irrigates)
            setSearchText(null)
          }}
          CreateButton={CreateButton}
          />
      </IonHeader>
      <IonContent>
        <Refresher refreshAction={async () => {
          const irrigates = (searchText) ? await filterData(searchText) : await getIrrigates()
          setIrrigates(irrigates)
        }} />
        {
          irrigates.map((irrigate, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>
                    {t('IRRIGATE_FARMABLE_LAND')}: {irrigate.FarmableLand.name}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {t('IRRIGATE_AQUA_QUANTITY')}: {irrigate.amountWater}
                    {t('IRRIGATE_AQUA_QUANTITY_TYPE')} litros
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="none">
                    <IonInput value={`${t('IRRIGATE_DURABILITY')}: ${irrigate.lengthMinutes} ${t('IRRIGATE_MINUTES')}`} disabled />
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      {t('ACTIONS')}
                    </IonLabel>
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
                      onClick={async () => {
                        await removeIrrigate(irrigate.id)
                        const irrigates = await getIrrigates()
                        setIrrigates(irrigates)
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

export default Irrigate;
