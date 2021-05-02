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
import { getWindowDimensions } from '../../services/utils';

import './Home.css';

const Home: React.FC = () => {
  const dimensions = getWindowDimensions();
  const [ width, setWidth ] = useState<number>(dimensions.width);
  const handleResize = () => {
    const dimensions = getWindowDimensions();
    setWidth(dimensions.width);
  };
  window.addEventListener('resize', handleResize);

  const imageMadison = 'https://ionicframework.com/docs/demos/api/card/madison.jpg';

  const sections = [
    {
      image: imageMadison,
      title: 'Gestión de Terrenos',
      subtitle: 'Podrás gestionar tus terrenos con comodidad',
    },
    {
      image: imageMadison,
      title: 'Gestión de Terrenos',
      subtitle: 'Podrás gestionar tus terrenos con comodidad',
    },
    {
      image: imageMadison,
      title: 'Gestión de Terrenos',
      subtitle: 'Podrás gestionar tus terrenos con comodidad',
    },
    {
      image: imageMadison,
      title: 'Gestión de Terrenos',
      subtitle: 'Podrás gestionar tus terrenos con comodidad',
    },
    {
      image: imageMadison,
      title: 'Gestión de Terrenos',
      subtitle: 'Podrás gestionar tus terrenos con comodidad',
    },
    {
      image: imageMadison,
      title: 'Gestión de Terrenos',
      subtitle: 'Podrás gestionar tus terrenos con comodidad',
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
                    <IonCard>
                      <IonImg src={`${section.image}`} class="img-card" />
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
