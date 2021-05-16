import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton, IonSelect, IonSelectOption
} from '@ionic/react';
import { arrowBack, arrowBackCircle } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';

import { getApi } from '../../../services/utils';
import './CreateCrop.css';

const CreateCrop: React.FC = () => {
  const { t } = useTranslation();
  const api = getApi();
  const [back, setBack] = useState<boolean>(false);
  const [farms, setFarms] = useState<Array<any>>([]);
  const [crops, setCrops] = useState<Array<any>>([]);
  const [farmRef, setFarmRef] = useState<HTMLIonSelectElement | null>(null);
  const [cropRef, setCropRef] = useState<HTMLIonSelectElement | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLand');
      setFarms(data.lands);
    })();
    (async () => {
      const { data } = await api.get('/crop');
      setCrops(data.crops);
    })();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const farmCrop: any = {
        farmId: farmRef?.value,
        cropId: cropRef?.value
      };
      await api.post('/farmableLandCrop', farmCrop);
      setBack(true);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      {
        back
        &&
        <Redirect to="/dashboard/page/Crop" exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => { setBack(true) }}>
              <IonIcon slot="icon-only" ios={arrowBackCircle} md={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{t('CROP_CREATE')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form className="ion-padding" onSubmit={(event) => { handleSubmit(event) }}>
          <IonItem>
            <IonLabel position="floating">
              {t('CROP_FARMABLE_LAND')}
            </IonLabel>
            <IonSelect
              ref={(farmRef) => { setFarmRef(farmRef) }}
              name="type"
            >
              {
                farms.map((farm, index) => {
                  return (
                    <IonSelectOption value={farm.id} key={index}>
                      {farm.name}
                    </IonSelectOption>
                  );
                })
              }
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              {t('CROP_NAME_SINGULAR')}
            </IonLabel>
            <IonSelect
              ref={(cropRef) => { setCropRef(cropRef) }}
              name="type"
            >
              {
                crops.map((crop, index) => {
                  return (
                    <IonSelectOption value={crop.id} key={index}>
                      {crop.alias}
                    </IonSelectOption>
                  );
                })
              }
            </IonSelect>
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            {t('CROP_CREATE')}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateCrop;
