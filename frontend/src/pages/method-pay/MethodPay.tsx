import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

import { getApi } from '../../services/utils';
import './MethodPay.css';

import CreateMethodPay from './create/CreateMethodPay';
import UpdateMethodPay from './update/UpdateMethodPay';
import { Redirect } from 'react-router';

const MethodPay: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [methodPayId, setMethodPayId] = useState<number>(0);

  useEffect(() => {
    (async () => {
    })();
  });

  return (
    <IonPage>
      {
        create
        &&
        <Redirect to="/dashboard/page/MethodPay/create" push={true} exact={true} />
      }
      {
        update
        &&
        <Redirect to={`/dashboard/page/MethodPay/${methodPayId}/update`} push={true} exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonTitle>MethodPay</IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={() => {setCreate(true)}}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default MethodPay;
