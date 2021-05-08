import {
  IonContent, IonIcon, IonItem, IonLabel,
  IonList, IonListHeader, IonMenu, IonMenuToggle,
  IonNote
} from '@ionic/react';
import {
  archiveOutline, archiveSharp, bookmarkOutline,
  heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline,
  paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp,
  logOutOutline, home
} from 'ionicons/icons';

import './Menu.css';
import { useLocation } from 'react-router-dom';
import { logout } from '../services/utils';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Terrenos',
    url: '/dashboard/page/FarmableLand',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Cultivos',
    url: '/dashboard/page/Crop',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Fitosanitarios',
    url: '/dashboard/page/Phytosanitary',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Eventos',
    url: '/dashboard/page/Events',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Riegos',
    url: '/dashboard/page/Irrigate',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  },
  {
    title: 'Ajustes',
    url: '/dashboard/page/Setting',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  }
];

const Menu: React.FC<{ setIsLog: Function, reduceFormat: Boolean }> = ({ setIsLog, reduceFormat }) => {
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Menú</IonListHeader>
          <IonNote>information@smartrural.es</IonNote>
          {
            reduceFormat
            &&
            <IonItem routerLink={'/dashboard/page/home'} routerDirection="none" lines="none" detail={false}>
              <IonIcon slot="start" ios={home} md={home} />
              <IonLabel>Home</IonLabel>
            </IonItem>
          }
          {
            appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''}
                          routerLink={appPage.url} routerDirection="none"
                          lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
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
            <IonIcon slot="start" ios={logOutOutline} md={logOutOutline} />
            <IonLabel>Cerrar sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
