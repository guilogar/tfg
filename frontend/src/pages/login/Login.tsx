import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from 'ionicons/icons';

import { api, login, isLogged } from '../../services/utils';
import Dashboard from '../dashboard/Dashboard';

const validateEmail = (email: string) => {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('eve.holt@reqres.in');
  const [password, setPassword] = useState<string>('cityslicka');
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLog, setIsLog] = useState(isLogged());

  const handleLogin = async () => {
    if (!email) {
      setMessage('Please enter a valid email');
      setIserror(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage('Your email is invalid');
      setIserror(true);
      return;
    }

    if (!password || password.length < 6) {
      setMessage('Please enter your password');
      setIserror(true);
      return;
    }

    try {
      const response = await api.post('/login', {
        username: 'test',
        password: 'test'
      });
      console.log(response);
      login('');
      setIsLog(true);
    } catch(err) {
      setMessage('Auth failure! Please create an account');
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