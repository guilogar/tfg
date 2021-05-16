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
import './CreatePhytosanitary.css';

const CreatePhytosanitary: React.FC = () => {
  const { t } = useTranslation();
  const api = getApi();
  const [back, setBack] = useState<boolean>(false);
  const [farms, setFarms] = useState<Array<any>>([]);
  const [crops, setCrops] = useState<Array<any>>([]);
  const [phytosanitarys, setPhytosanitarys] = useState<Array<any>>([]);
  const [farmRef, setFarmRef] = useState<HTMLIonSelectElement | null>(null);
  const [cropRef, setCropRef] = useState<HTMLIonSelectElement | null>(null);
  const [phytosanitaryRef, setPhytosanitaryRef] = useState<HTMLIonSelectElement | null>(null);

  const [farmableLandId, setFarmableLandId] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLand');
      setFarms(data.lands);
    })();
    (async () => {
      const { data } = await api.get('/phytosanitary');
      setPhytosanitarys(data.phytosanitarys);
    })();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await api.post('/cropPhytosanitary', {
        farmId: farmRef?.value,
        cropId: cropRef?.value,
        phytosanitaryId: phytosanitaryRef?.value
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
        <Redirect to="/dashboard/page/Phytosanitary" exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => { setBack(true) }}>
              <IonIcon slot="icon-only" ios={arrowBackCircle} md={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{t('PHYTOSANITARY_CREATE')}</IonTitle>
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
              name="farm" aria-required="true" onClick={() => {
                cropRef?.setAttribute('value', '');
                setCrops([]);
              }}
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
              name="crop" aria-required="true" onClick={async () => {
                const farmId = farmRef?.value
                const { data } = await api.get(`/farmableLandCrop?farmId=${farmId}`)
                setCrops(data.lands[0].crops);
              }}
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
          <IonItem>
            <IonLabel position="floating">
              {t('PHYTOSANITARY_NAME_SINGULAR')}
            </IonLabel>
            <IonSelect
              ref={(phytosanitaryRef) => { setPhytosanitaryRef(phytosanitaryRef) }}
              name="phytosanitary" aria-required="true"
            >
              {
                phytosanitarys.map((phytosanitary, index) => {
                  return (
                    <IonSelectOption value={phytosanitary.id} key={index}>
                      {phytosanitary.alias}
                    </IonSelectOption>
                  );
                })
              }
            </IonSelect>
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            {t('PHYTOSANITARY_CREATE')}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreatePhytosanitary;
