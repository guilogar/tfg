import React, { useEffect, useState } from "react";
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonIcon, IonLabel, IonToggle, IonButtons, IonMenuButton, IonSelect, IonSelectOption, IonButton
} from "@ionic/react";
import { moon } from "ionicons/icons";
import "./Settings.css";

import { getApi } from "../../services/utils";
import { Redirect } from "react-router";

const Settings: React.FC = () => {
  const api = getApi();
  const [back, setBack] = useState<boolean>(false);

  const [languageRef, setLanguageRef] = useState<HTMLIonSelectElement | null>(null);
  const [eventActionRef, setEventActionRef] = useState<HTMLIonSelectElement | null>(null);

  const [languages, setLanguages] = useState<Array<any>>([]);
  const [eventActions, setEventActions] = useState<Array<any>>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [settings, setSettings] = useState<any>(null);

  const toggleDarkModeHandler = async () => {
    setDarkMode(!darkMode);
    document.body.classList.add("dark");
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/settings');
      setSettings(data.userSettings);
      setDarkMode(data.userSettings?.backgroundColor === 'DARK');
    })();
    (async () => {
      const { data } = await api.get('/languages');
      setLanguages(data.languages);
    })();
    (async () => {
      const { data } = await api.get('/eventActions');
      setEventActions(data.actions);
    })();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await api.put('/settings', {
        backgroundColor: (darkMode) ? 'DARK' : 'WHITE',
        defaultLanguage: languageRef?.value,
        defaultEventAction: eventActionRef?.value
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
        <Redirect to="/dashboard" exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="ion-margin-top">
          <form className="ion-padding" onSubmit={(event) => { handleSubmit(event) }}>
            <IonItem>
              <IonIcon
                slot="start" icon={moon} className="component-icon component-icon-dark" />
              <IonLabel>Dark Mode</IonLabel>
              <IonToggle
                slot="end" name="darkMode" checked={darkMode}
                onClick={toggleDarkModeHandler} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Idioma</IonLabel>
              <IonSelect
                ref={(languageRef) => { setLanguageRef(languageRef) }}
                name="language" value={settings?.defaultLanguage}
              >
                {
                  languages.map((language, index) => {
                    return (
                      <IonSelectOption value={language} key={index}>
                        {language}
                      </IonSelectOption>
                    );
                  })
                }
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Acción por defecto en eventos</IonLabel>
              <IonSelect
                ref={(eventActionRef) => { setEventActionRef(eventActionRef) }}
                name="action" value={settings?.defaultEventAction}
              >
                {
                  eventActions.map((eventAction, index) => {
                    return (
                      <IonSelectOption value={eventAction} key={index}>
                        {eventAction}
                      </IonSelectOption>
                    );
                  })
                }
              </IonSelect>
            </IonItem>

            <IonButton className="ion-margin-top" type="submit" expand="block">
              Guardar
            </IonButton>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
