import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from 'ionicons/icons';

import { getApi, login, isLogged } from '../../services/utils';
import Dashboard from '../dashboard/Dashboard';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('test');
  const [password, setPassword] = useState<string>('test');
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLog, setIsLog] = useState(isLogged());
  const api = getApi();

  const handleLogin = async () => {
    try {
      const { data } = await api.post('/login', {
        username: email,
        password: password
      });
      login(data.token);
      setIsLog(true);
    } catch(err) {
      console.log(err);
      setMessage('Auth failure! Please check your credentials!');
      setIserror(true);
    }
  };

  if (isLog) {
    return (
      <Dashboard />
    );
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className='ion-padding ion-text-center'>
          <IonGrid>
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
              <IonLabel position='floating'> Email</IonLabel>
              <IonInput
                type='email'
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              >
              </IonInput>
              </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
              <IonItem>
                <IonLabel position='floating'> Password</IonLabel>
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
                <IonButton expand='block' onClick={handleLogin}>Login</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
};

export default Login;