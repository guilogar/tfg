import React, { useEffect, useState } from "react";
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonIcon, IonLabel, IonToggle, IonButtons, IonMenuButton, IonSelect, IonSelectOption, IonButton
} from "@ionic/react";
import { Redirect } from "react-router";
import { moon, language, trailSign } from "ionicons/icons";
import {
  getApi, insertDataIntoLocalStorage, setI18n
} from "../../services/utils";

import "./Settings.css";
import { useTranslation } from "react-i18next";

const Settings: React.FC = () => {
  const { t } = useTranslation();
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
    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
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
      const { data } = await api.put('/settings', {
        backgroundColor: (darkMode) ? 'DARK' : 'WHITE',
        defaultLanguage: languageRef?.value,
        defaultEventAction: eventActionRef?.value
      });
      insertDataIntoLocalStorage('userSettings', JSON.stringify(data.userSettings));
      setI18n(languageRef?.value);
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
          <IonTitle>{t('SETTING_LIST')}</IonTitle>
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
                slot="start" icon={moon}
                className="component-icon component-icon-dark" />
              <IonLabel>
                {(darkMode) ? t('SETTING_DARK_MODE') : t('SETTING_LIGHT_MODE')}
              </IonLabel>
              <IonToggle
                slot="end" name="darkMode" checked={darkMode}
                onClick={toggleDarkModeHandler} />
            </IonItem>
            <IonItem>
              <IonIcon
                slot="start" icon={language}
                className="component-icon component-icon-dark" />
              <IonLabel position="floating">
                {t('SETTING_LANGUAGE')}
              </IonLabel>
              <IonSelect
                ref={(languageRef) => { setLanguageRef(languageRef) }}
                name="language" value={settings?.defaultLanguage}
              >
                {
                  languages.map((language, index) => {
                    return (
                      <IonSelectOption value={language} key={index}>
                        {t(`SETTING_LANGUAGE_TYPE_${language.toUpperCase()}`)}
                      </IonSelectOption>
                    );
                  })
                }
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonIcon
                slot="start" icon={trailSign}
                className="component-icon component-icon-dark" />
              <IonLabel position="floating">
                {t('SETTING_ACTION_BY_DEFAULT')}
              </IonLabel>
              <IonSelect
                ref={(eventActionRef) => { setEventActionRef(eventActionRef) }}
                name="action" value={settings?.defaultEventAction}
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
              {t('SETTING_SAVE')}
            </IonButton>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
