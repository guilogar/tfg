import { IonItem, IonRefresher, IonRefresherContent, IonToast } from '@ionic/react';
import React, { useState, useRef } from 'react';

const Refresher: React.FC<{ refreshAction: Function }> = ({ refreshAction }) => {
  const [showCompleteToast, setShowCompleteToast] = useState<boolean>(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);

  const doRefresh = async () => {
    ionRefresherRef.current!.complete();
    await refreshAction();
    setShowCompleteToast(true);
  };

  return (
    <div>
      <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
        <IonRefresherContent />
      </IonRefresher>
      <IonToast
        isOpen={showCompleteToast}
        message="Actualización completada"
        duration={2000}
        onDidDismiss={() => setShowCompleteToast(false)}
      />
      <IonItem lines='none'></IonItem>
      <IonItem lines='none'></IonItem>
    </div>
  );
};

export default Refresher;
