
import {
  IonButton, IonButtons, IonIcon, IonMenuButton,
  IonSearchbar, IonTitle, IonToolbar
} from '@ionic/react';
import React, { useState, useRef } from 'react';
import { search, } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

interface ToolBarInterface {
  writeAction: Function;
  cancelAction: Function;
  title: string;
  CreateButton: any
};

const ToolBar: React.FC<ToolBarInterface> = (
  {
    writeAction, cancelAction,
    title, CreateButton
  }
) => {
  const { t } = useTranslation();
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const ionSearchBar = useRef<HTMLIonSearchbarElement>(null);

  return (
    <IonToolbar>
      {
        !showSearchbar
        &&
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
      }
      {
        !showSearchbar
        &&
        <IonTitle>{title}</IonTitle>
      }
      {
        showSearchbar
        &&
        <IonSearchbar
          showCancelButton="always" placeholder={t('SEARCH')}
          ref={ionSearchBar}
          onIonChange={async (e: CustomEvent) => {
            await writeAction(e.detail.value);
          }}
          onIonCancel={async () => {
            setShowSearchbar(false)
            await cancelAction();
          }} />
      }
      <IonButtons slot="end">
        {
          !showSearchbar
          &&
          <IonButton onClick={() => setShowSearchbar(true)}>
            <IonIcon slot="icon-only" icon={search}></IonIcon>
          </IonButton>
        }
        {
          CreateButton
          &&
          <CreateButton />
        }
      </IonButtons>
    </IonToolbar>
  );
};

export default ToolBar;
