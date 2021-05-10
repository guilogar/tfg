import {
  IonContent, IonHeader, IonPage,
  IonTitle, IonToolbar,
  IonButtons, IonMenuButton,
  IonCard, IonImg, IonCardHeader,
  IonCardTitle, IonCardSubtitle,
  IonCardContent, IonGrid,
  IonRow, IonCol
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { getWindowDimensions } from '../../services/utils';

import './Home.css';

const Home: React.FC = () => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [redirectURL, setRedirectURL] = useState<string | null>(null);

  const dimensions = getWindowDimensions();
  const [ width, setWidth ] = useState<number>(dimensions.width);
  window.addEventListener('resize', () => {
    const dimensions = getWindowDimensions();
    setWidth(dimensions.width);
  });

  const image = 'https://picsum.photos/400/200';
  let sections = [
    {
      image: image,
      title: 'Gestión de Terrenos',
      subtitle: 'Podrás gestionar tus terrenos con comodidad',
      redirectTo: '/dashboard/page/FarmableLand',
    },
    {
      image: image,
      title: 'Gestión de Cultivos',
      subtitle: 'Podrás gestionar tus cultivos con comodidad',
      redirectTo: '/dashboard/page/Crop',
    },
    {
      image: image,
      title: 'Gestión de Fitosanitarios',
      subtitle: 'Podrás gestionar tus fitosanitarios con comodidad',
      redirectTo: '/dashboard/page/Phytosanitary',
    },
    {
      image: image,
      title: 'Gestión de Eventos',
      subtitle: 'Podrás gestionar tus eventos con comodidad',
      redirectTo: '/dashboard/page/Events',
    },
    {
      image: image,
      title: 'Gestión de Riegos',
      subtitle: 'Podrás gestionar tus riegos con comodidad',
      redirectTo: '/dashboard/page/Irrigate',
    },
    {
      image: image,
      title: 'Ver Notificaciones',
      subtitle: 'Podrás ver tus notificaciones con comodidad',
      redirectTo: '/dashboard/page/Notification',
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {
              sections.map((section, index) => {
                return (
                  <IonCol size={(width < 1024) ? `6` : `4`} key={index}>
                    {
                      redirect
                      &&
                      <Redirect to={`${redirectURL}`} exact={true} />
                    }
                    <IonCard
                      className='home-card'
                      onClick={() => {
                        setRedirectURL(section.redirectTo)
                        setRedirect(true)
                      }}>
                      <IonImg src={`${section.image}?random=${index}`} class="img-card" />
                      <IonCardHeader>
                        <IonCardTitle>
                          {section.title}
                        </IonCardTitle>
                        <IonCardSubtitle>
                          {section.subtitle}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                );
              })
            }
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
