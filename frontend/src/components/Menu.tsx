import {
  IonContent, IonIcon, IonItem, IonLabel, IonList,
  IonListHeader, IonMenu, IonMenuToggle, IonNote
} from '@ionic/react';
import {
  logOutOutline, homeSharp, homeOutline, albumsOutline, albumsSharp,
  colorFillSharp, colorFillOutline, eyedropOutline, eyedropSharp,
  alertOutline, alertSharp, rainyOutline, rainySharp,
  notificationsOutline, notificationsSharp, settingsOutline,
  settingsSharp, logOutSharp
} from 'ionicons/icons';

import './Menu.css';
import { logout } from '../services/utils';

import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'FARMABLE_LANDS',
    url: '/dashboard/page/FarmableLand',
    iosIcon: albumsOutline,
    mdIcon: albumsSharp
  },
  {
    title: 'CROPS',
    url: '/dashboard/page/Crop',
    iosIcon: colorFillOutline,
    mdIcon: colorFillSharp
  },
  {
    title: 'PHYTOSANITARYS',
    url: '/dashboard/page/Phytosanitary',
    iosIcon: eyedropOutline,
    mdIcon: eyedropSharp
  },
  {
    title: 'IRRIGATES',
    url: '/dashboard/page/Irrigate',
    iosIcon: rainyOutline,
    mdIcon: rainySharp
  },
  {
    title: 'EVENTS',
    url: '/dashboard/page/Events',
    iosIcon: alertOutline,
    mdIcon: alertSharp
  },
  {
    title: 'NOTIFICATIONS',
    url: '/dashboard/page/Notification',
    iosIcon: notificationsOutline,
    mdIcon: notificationsSharp
  },
  {
    title: 'SETTINGS',
    url: '/dashboard/page/Setting',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  }
];

interface Menu {
  setIsLog: Function;
  reduceFormat: Boolean;
  fullname: string;
};

const Menu: React.FC<Menu> = ({ setIsLog, reduceFormat, fullname }) => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>
            {t('MENU')}
          </IonListHeader>
          <IonNote>{t('DASHBOARD')} {fullname}</IonNote>
          {
            reduceFormat
            &&
            <IonMenuToggle autoHide={false}>
              <IonItem
                className={location.pathname === '/dashboard/page/Home' ? 'selected' : ''}
                routerLink={'/dashboard/page/Home'}
                routerDirection="none" lines="none"
                detail={false}>
                <IonIcon slot="start" ios={homeOutline} md={homeSharp} />
                <IonLabel>{t('HOME')}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          }
          {
            appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''}
                          routerLink={appPage.url} routerDirection="none"
                          lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>
                      {t(appPage.title)}
                    </IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })
          }
          <IonItem routerLink={'/logout'} routerDirection="none"
                  lines="none" detail={false}
                  onClick={() => {
                    logout();
                    setIsLog(false);
                  }}>
            <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
            <IonLabel>{t('CLOSE_SESSION')}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
