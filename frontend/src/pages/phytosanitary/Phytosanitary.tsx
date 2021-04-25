import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

import { getApi } from '../../services/utils';
import './Phytosanitary.css';

import CreatePhytosanitary from './create/CreatePhytosanitary';
import UpdatePhytosanitary from './update/UpdatePhytosanitary';

const Phytosanitary: React.FC = () => {
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [farmableLandId, setFarmableLandId] = useState<number>(0);
  const [farmableLands, setFarmableLands] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
    })();
  });

  if (create)
  {
    return(<CreatePhytosanitary setCreate={setCreate} />);
  } else if(update) {
    return(<UpdatePhytosanitary setUpdate={setUpdate} farmableLandId={farmableLandId} />);
  } else
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Phytosanitary</IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={() => {setCreate(true)}}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          farmableLands.map((farmableLand, index) => {
            return (
              <IonCard>
                <IonImg src={farmableLand.image}
                        class="img-farmable-land" />
                <IonCardHeader>
                  <IonCardTitle>{farmableLand.type}</IonCardTitle>
                  <IonCardSubtitle>{farmableLand.area} m^2</IonCardSubtitle>
                  <IonButton 
                    fill="outline" slot="end"
                    onClick={() => {setUpdate(true)}}
                  >
                    Editar
                  </IonButton>
                </IonCardHeader>
                <IonCardContent>
                </IonCardContent>
              </IonCard>
            );
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Phytosanitary;