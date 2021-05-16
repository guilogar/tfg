import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton, IonSelect, IonSelectOption, IonInput
} from '@ionic/react';
import { add, arrowBack, arrowBackCircle, trash } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';

import { getApi } from '../../../services/utils';
import './UpdateCrop.css';

const UpdateCrop: React.FC = (props: any) => {
  const { t } = useTranslation();
  const api = getApi();
  const [back, setBack] = useState<boolean>(false);
  const [farms, setFarms] = useState<Array<any>>([]);
  const [crops, setCrops] = useState<Array<any>>([]);

  const [farmCrops, setFarmCrops] = useState<Array<any>>([]);
  const [farmableLandId, setFarmableLandId] = useState<any | null>(null);

  const [farmRef, setFarmRef] = useState<HTMLIonSelectElement | null>(null);
  const [cropRef, setCropRef] = useState<HTMLIonSelectElement | null>(null);

  useEffect(() => {
    (async () => {
      const farmId = props.match.params.id;
      const { data } = await api.get(`/farmableLandCrop?farmId=${farmId}`);
      setFarmableLandId(farmId);
      setFarmCrops(data.lands[0].crops);
    })();
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
      const farmId = farmRef?.value;
      const crops = farmCrops.filter((farmCrop) => {
        return farmCrop !== null && farmCrop !== undefined;
      });
      await api.put(`/farmableLandCrop/${farmableLandId}`, {
        farmId: farmId,
        crops: crops
      });
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
          <IonTitle>{t('CROP_EDIT')}</IonTitle>
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
              name="type" value={farmableLandId}
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
          {
            farmCrops.map((farmCrop, index) => {
              if (farmCrop) {
                return (
                  <IonItem key={index}>
                    <IonLabel position="floating">{farmCrop.name}</IonLabel>
                    <IonInput
                      type="text" disabled
                      value={`${farmCrop.alias}, ${farmCrop.description}`}
                    />
                    <IonButton slot="end" color="danger" onClick={() => {
                      delete farmCrops[index];
                      setFarmCrops([...farmCrops]);
                    }}>
                      <IonIcon slot="icon-only" ios={trash} md={trash} />
                    </IonButton>
                  </IonItem>
                );
              }
            })
          }
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
                    <IonSelectOption value={crop} key={index}>
                      {crop.alias}
                    </IonSelectOption>
                  );
                })
              }
            </IonSelect>
            <IonButton slot="end" color="primary" onClick={() => {
              if(cropRef?.value)
                setFarmCrops([...farmCrops, cropRef?.value]);
            }}>
              <IonIcon slot="icon-only" ios={add} md={add} />
            </IonButton>
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            {t('CROP_EDIT')}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default UpdateCrop;
