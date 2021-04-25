import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import {
  archiveOutline, archiveSharp, bookmarkOutline,
  heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline,
  paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp,
  logOutOutline
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
    url: '/dashboard/page/Event',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Métodos de Pago',
    url: '/dashboard/page/MethodPay',
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

const Menu: React.FC<{ setIsLog: Function }> = ({ setIsLog }) => {
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menú</IonListHeader>
          <IonNote>information@smartrural.es</IonNote>
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
          <IonItem  routerLink={'/'} routerDirection="none" lines="none" detail={false}
                    onClick={() => {
                      logout();
                      setIsLog(false);
                    } }>
            <IonIcon slot="start" ios={logOutOutline} md={logOutOutline} />
            <IonLabel>Cerrar sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
