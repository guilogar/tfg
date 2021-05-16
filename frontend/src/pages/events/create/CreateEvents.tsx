import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton, IonSelect, IonSelectOption, IonInput, IonAlert
} from '@ionic/react';
import { arrowBack, arrowBackCircle } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';

import { getApi } from '../../../services/utils';
import './CreateEvents.css';

const CreateEvents: React.FC = () => {
  const { t } = useTranslation();
  const api = getApi();
  const [back, setBack] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [eventRef, setEventRef] = useState<HTMLIonSelectElement | null>(null);
  const [actionRef, setActionRef] = useState<HTMLIonSelectElement | null>(null);

  const [events, setEvents] = useState<Array<any>>([]);
  const [eventActions, setEventActions] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/events');
      setEvents(data.events);
    })();
    (async () => {
      const { data } = await api.get('/event-actions');
      setEventActions(data.actions);
    })();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setMessageError('Ya estas suscrito a este evento. Por favor, elije otro. Gracias.');
      await api.post('/user-events', {
        action: actionRef?.value,
        eventId: eventRef?.value
      });
      setBack(true);
    } catch(err) {
      setShowErrorAlert(true);
      console.log(err);
    }
  };

  return (
    <IonPage>
      {
        back
        &&
        <Redirect to="/dashboard/page/Events" exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => { setBack(true) }}>
              <IonIcon slot="icon-only" ios={arrowBackCircle} md={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{t('EVENTS_CREATE')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAlert
          isOpen={showErrorAlert}
          onDidDismiss={() => setShowErrorAlert(false)}
          header={'Evento no valido'}
          subHeader={'Error a la hora de suscribirse al evento'}
          message={messageError}
          buttons={['OK']}
        />
        <form className="ion-padding" onSubmit={(event) => { handleSubmit(event) }}>
          <IonItem>
            <IonLabel position="floating">
              {t('EVENTS_CREATE_EVENT')}
            </IonLabel>
            <IonSelect
              ref={(eventRef) => { setEventRef(eventRef) }}
              name="event"
            >
              {
                events.map((event, index) => {
                  return (
                    <IonSelectOption value={event.id} key={index}>
                      {t(`EVENTS_NAMES_${event.name}`)}
                    </IonSelectOption>
                  );
                })
              }
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              {t('EVENTS_CREATE_ACTION')}
            </IonLabel>
            <IonSelect
              ref={(actionRef) => { setActionRef(actionRef) }}
              name="action"
            >
              {
                eventActions.map((eventAction, index) => {
                  return (
                    <IonSelectOption value={eventAction} key={index}>
                      {t(`EVENTS_ACTION_TYPES_${eventAction}`)}
                    </IonSelectOption>
                  );
                })
              }
            </IonSelect>
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            {t('EVENTS_CREATE')}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateEvents;
