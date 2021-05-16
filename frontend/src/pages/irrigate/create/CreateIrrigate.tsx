import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton, IonAlert, IonSelect, IonInput, IonSelectOption
} from '@ionic/react';
import { arrowBack, arrowBackCircle } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';

import { getApi } from '../../../services/utils';
import './CreateIrrigate.css';

const CreateIrrigate: React.FC = () => {
  const { t } = useTranslation();
  const api = getApi();
  const [back, setBack] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [farms, setFarms] = useState<Array<any>>([]);

  const [farmRef, setFarmRef] = useState<HTMLIonSelectElement | null>(null);
  const [amountWaterRef, setAmountWaterRef] = useState<HTMLIonInputElement | null>(null);
  const [lengthMinutesRef, setLengthMinutesRef] = useState<HTMLIonInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLand');
      setFarms(data.lands);
    })();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await api.post(`/irrigate`, {
        amountWater: amountWaterRef?.value,
        lengthMinutes: lengthMinutesRef?.value,
        farmId: farmRef?.value
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
        <Redirect to="/dashboard/page/Irrigate" exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => { setBack(true) }}>
              <IonIcon slot="icon-only" ios={arrowBackCircle} md={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{t('IRRIGATE_CREATE')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAlert
          isOpen={showErrorAlert}
          onDidDismiss={() => setShowErrorAlert(false)}
          header={'Acción no valida'}
          subHeader={'Error a la hora de de modificar un item. Por favor, vuelva a intentarlo'}
          message={messageError}
          buttons={['OK']}
        />
        <form className="ion-padding" onSubmit={(event) => { handleSubmit(event) }}>
          <IonItem>
            <IonLabel position="floating">
              {t('IRRIGATE_AQUA_QUANTITY')}
            </IonLabel>
            <IonInput
              ref={(amountWaterRef) => { setAmountWaterRef(amountWaterRef) }}
              type="number" name="amountWater" step="any"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              {t('IRRIGATE_DURABILITY_IN_MINUTES')}
            </IonLabel>
            <IonInput
              ref={(lengthMinutesRef) => { setLengthMinutesRef(lengthMinutesRef) }}
              type="number" name="lengthMinutes" step="any"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              {t('IRRIGATE_FARMABLE_LAND')}
            </IonLabel>
            <IonSelect
              ref={(farmRef) => { setFarmRef(farmRef) }}
              name="farm"
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
          <IonButton className="ion-margin-top" type="submit" expand="block">
            {t('IRRIGATE_CREATE')}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateIrrigate;
