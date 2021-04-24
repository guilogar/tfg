import {
  IonContent, IonHeader, IonPage,
  IonTitle, IonToolbar
} from '@ionic/react';
import React, { useState, useEffect } from 'react';

import { api } from '../../services/utils';

const FarmableLand: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const handleLogin = async () => { };

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLandTypes');

      let msg = '';
      for (const type of data.types) {
        msg += type + ', ';
      }
      setMessage(msg);
      console.log(data);
    })();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FarmableLand</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding ion-text-center'>
        {message}
      </IonContent>
    </IonPage>
  );
};

export default FarmableLand;