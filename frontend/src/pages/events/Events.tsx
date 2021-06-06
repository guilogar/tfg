import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
  IonImg, IonButtons, IonMenuButton, IonInput
} from '@ionic/react';
import { add, create as createIcon, trash } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import Refresher from '../../components/refresher';
import ToolBar from '../../components/toolbar';

import { getApi } from '../../services/utils';
import './Events.css';

const Events: React.FC = () => {
  const { t } = useTranslation();
  const api = getApi();
  const [create, setCreate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [userEventId, setUserEventId] = useState<number | null>(null);
  const [userEvents, setUserEvents] = useState<Array<any>>([]);

  const [searchText, setSearchText] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const events = await getEvents();
      setUserEvents(events);
    })();
  }, []);

  const removeEvent = async (userEventId: number) => {
    await api.delete(`/user-events/${userEventId}`);
  };

  const getEvents = async () => {
    const { data } = await api.get('/user-events');
    return data.events;
  }

  const filterData = async (text: string) => {
    if (!text) {
      return await getEvents();
    }
    const { data } = await api.get(`/user-events?filter=${text}`);
    return data.events;
  }

  const CreateButton = () => {
    return (
      <IonButton onClick={() => { setCreate(true) }}>
        <IonIcon slot="icon-only" icon={add} />
      </IonButton>
    );
  };

  return (
    <IonPage>
      {
        create
        &&
        <Redirect to="/dashboard/page/Events/create" push={true} exact={true} />
      }
      {
        update
        &&
        <Redirect to={`/dashboard/page/Events/${userEventId}/update`} push={true} exact={true} />
      }
      <IonHeader>
        <ToolBar
          title={t('EVENTS_LIST')}
          writeAction={async (text: string) => {
            const events: Array<any> = await filterData(text)
            setUserEvents(events)
            setSearchText(text)
          }}
          cancelAction={async () => {
            const events: Array<any> = await getEvents()
            setUserEvents(events)
            setSearchText(null)
          }}
          CreateButton={CreateButton}
          />
      </IonHeader>
      <IonContent>
        <Refresher refreshAction={async () => {
          const events = (searchText) ? await filterData(searchText) : await getEvents()
          setUserEvents(events)
        }} />
        {
          userEvents.map((userEvent, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>
                    {t('EVENTS_NAME')}: {t(`EVENTS_NAMES_${userEvent.Event.name}`)}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {t('EVENTS_ACTION_TYPE')}: {t(`EVENTS_ACTION_TYPES_${userEvent.action}`)},{` `}
                    {t('EVENTS_EXECUTIONS')}: {userEvent.countFired}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="none">
                    <IonInput value={userEvent.Event.description} disabled />
                  </IonItem>
                  <IonItem>
                    <IonLabel>{t('ACTIONS')}</IonLabel>
                    <IonButton
                      fill="outline" slot="end"
                      onClick={() => {
                        setUserEventId(userEvent.id)
                        setUpdate(true)
                      }}>
                        <IonIcon icon={createIcon} />
                    </IonButton>
                    <IonButton
                      fill="outline" slot="end" color="danger"
                      onClick={async () => {
                        await removeEvent(userEvent.id)
                        const events = await getEvents()
                        setUserEvents(events)
                      }}>
                        <IonIcon icon={trash} />
                    </IonButton>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            );
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Events;
