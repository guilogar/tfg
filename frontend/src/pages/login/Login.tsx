import {
  IonContent, IonHeader, IonPage,
  IonTitle, IonToolbar
} from '@ionic/react';
import {
  IonItem, IonLabel, IonInput,
  IonButton, IonIcon, IonAlert
} from '@ionic/react';
import React, { useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { Redirect } from 'react-router-dom';

import { getApi, login, isLogged } from '../../services/utils';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const api = getApi();
  const [username, setUsername] = useState<string>('test');
  const [password, setPassword] = useState<string>('test');
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLog, setIsLog] = useState(isLogged());

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const firebaseToken = localStorage.getItem('pushNotificationToken');
      const { data } = await api.post('/login', {
        username: username,
        password: password,
        firebaseToken: (firebaseToken) ? firebaseToken : null
      });
      login(data.token);
      setIsLog(true);
    } catch(err) {
      console.log(err);
      setMessage(`Auth failure! Please check your credentials!`);
      setIserror(true);
    }
  };

  return (
    <IonPage>
      {
        isLog
        &&
        <Redirect to="/dashboard" push={true} exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding ion-text-center'>
        <IonGrid>
          <form className="ion-padding" onSubmit={(event) => { handleSubmit(event) }}>
            <IonRow>
              <IonCol>
                <IonAlert
                  isOpen={iserror}
                  onDidDismiss={() => setIserror(false)}
                  cssClass='my-custom-class'
                  header={'Error!'}
                  message={message}
                  buttons={['Dismiss']}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonIcon
                  style={{ fontSize: '70px', color: '#0040ff' }}
                  icon={personCircle}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>
                    {t('LOGIN_USERNAME')}
                  </IonLabel>
                  <IonInput
                    type='text'
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>
                    {t('LOGIN_PASSWORD')}
                  </IonLabel>
                  <IonInput
                    type='password'
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand='block' type="submit">
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
