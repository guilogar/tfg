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

import { useLocation } from 'react-router-dom';
import {
  archiveOutline, archiveSharp, bookmarkOutline,
  heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline,
  paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Terrenos',
    url: '/page/FarmableLand',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Cultivos',
    url: '/page/Crop',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Fitosanitarios',
    url: '/page/Phytosanitary',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Eventos',
    url: '/page/Event',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Ajustes',
    url: '/page/Setting',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Métodos de Pago',
    url: '/page/MethodPay',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
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
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
