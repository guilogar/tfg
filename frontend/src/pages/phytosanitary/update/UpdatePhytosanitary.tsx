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
import './UpdatePhytosanitary.css';

const UpdatePhytosanitary: React.FC = (props: any) => {
  const { t } = useTranslation();
  const api = getApi();
  const [back, setBack] = useState<boolean>(false);
  const [crops, setCrops] = useState<Array<any>>([]);
  const [phytosanitarys, setPhytosanitarys] = useState<Array<any>>([]);

  const [cropsPhytosanitarys, setCropsPhytosanitarys] = useState<Array<any>>([]);
  const [cropId, setCropId] = useState<any | null>(null);
  const [farmableLandId, setFarmableLandId] = useState<any | null>(null);

  const [cropRef, setCropRef] = useState<HTMLIonSelectElement | null>(null);
  const [phytosanitaryRef, setPhytosanitaryRef] = useState<HTMLIonSelectElement | null>(null);

  useEffect(() => {
    (async () => {
      const farmId = props.match.params.farmId;
      const cropId = props.match.params.cropId;
      const { data } = await api.get(`/cropPhytosanitary?farmId=${farmId}&cropId=${cropId}`);
      setFarmableLandId(farmId);
      setCropId(cropId);
      setCropsPhytosanitarys(data.lands[0].crops[0].phytosanitarys);
    })();
    (async () => {
      const { data } = await api.get('/phytosanitary');
      setPhytosanitarys(data.phytosanitarys);
    })();
    (async () => {
      const { data } = await api.get('/crop');
      setCrops(data.crops);
    })();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const cId = cropRef?.value;
      const phytosanitarys = cropsPhytosanitarys.filter((cropPhytosanitarys) => {
        return cropPhytosanitarys !== null && cropPhytosanitarys !== undefined;
      });
      await api.put(`/cropPhytosanitary/${farmableLandId}/${cropId}`, {
        cropId: cId,
        phytosanitarys: phytosanitarys
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
          <IonTitle>{t('PHYTOSANITARY_EDIT')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form className="ion-padding" onSubmit={(event) => { handleSubmit(event) }}>
          <IonItem>
            <IonLabel position="floating">
              {t('CROP_NAME_SINGULAR')}
            </IonLabel>
            <IonSelect
              ref={(cropRef) => { setCropRef(cropRef) }}
              name="type" value={cropId}
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
          {
            cropsPhytosanitarys.map((cropPhytosanitarys, index) => {
              if (cropPhytosanitarys) {
                return (
                  <IonItem key={index}>
                    <IonLabel position="floating">{cropPhytosanitarys.name}</IonLabel>
                    <IonInput
                      type="text" disabled
                      value={`${cropPhytosanitarys.alias}, ${cropPhytosanitarys.description}`}
                    />
                    <IonButton slot="end" color="danger" onClick={() => {
                      delete cropsPhytosanitarys[index];
                      setCropsPhytosanitarys([...cropsPhytosanitarys]);
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
              {t('PHYTOSANITARY_NAME_SINGULAR')}
            </IonLabel>
            <IonSelect
              ref={(phytosanitaryRef) => { setPhytosanitaryRef(phytosanitaryRef) }}
              name="type"
            >
              {
                phytosanitarys.map((phytosanitary, index) => {
                  return (
                    <IonSelectOption value={phytosanitary} key={index}>
                      {phytosanitary.name}
                    </IonSelectOption>
                  );
                })
              }
            </IonSelect>
            <IonButton slot="end" color="primary" onClick={() => {
              if(phytosanitaryRef?.value)
                setCropsPhytosanitarys([...cropsPhytosanitarys, phytosanitaryRef?.value]);
            }}>
              <IonIcon slot="icon-only" ios={add} md={add} />
            </IonButton>
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            {t('PHYTOSANITARY_EDIT')}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default UpdatePhytosanitary;
