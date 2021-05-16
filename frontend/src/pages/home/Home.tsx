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
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import { getWindowDimensions } from '../../services/utils';

import './Home.css';

const Home: React.FC = () => {
  const { t } = useTranslation();
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
      title: t('HOME_FARMABLE_LAND'),
      subtitle: t('HOME_FARMABLE_LAND_DESCRIPTION'),
      redirectTo: '/dashboard/page/FarmableLand',
    },
    {
      image: image,
      title: t('HOME_CROP'),
      subtitle: t('HOME_CROP_DESCRIPTION'),
      redirectTo: '/dashboard/page/Crop',
    },
    {
      image: image,
      title: t('HOME_PHYTOSANITARY'),
      subtitle: t('HOME_PHYTOSANITARY_DESCRIPTION'),
      redirectTo: '/dashboard/page/Phytosanitary',
    },
    {
      image: image,
      title: t('HOME_EVENTS'),
      subtitle: t('HOME_EVENTS_DESCRIPTION'),
      redirectTo: '/dashboard/page/Events',
    },
    {
      image: image,
      title: t('HOME_IRRIGATE'),
      subtitle: t('HOME_IRRIGATE_DESCRIPTION'),
      redirectTo: '/dashboard/page/Irrigate',
    },
    {
      image: image,
      title: t('HOME_NOTIFICATIONS'),
      subtitle: t('HOME_NOTIFICATIONS_DESCRIPTION'),
      redirectTo: '/dashboard/page/Notification',
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('HOME_LIST')}</IonTitle>
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
