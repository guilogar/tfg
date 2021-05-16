import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IonAlert } from '@ionic/react';
import { withRouter } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import {
  getApi, isLogged, getSessionId, logout,
  pushNotifications, setI18n, backButtonNative,
  fetchKeyDataFromLocalStorage
} from './services/utils';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const settings: string = `${fetchKeyDataFromLocalStorage('userSettings')}`;
const userSettings = JSON.parse(settings);
if (userSettings) {
  if (userSettings.backgroundColor === 'DARK') {
    document.body.classList.add('dark');
  }
  setI18n(userSettings.defaultLanguage);
} else {
  setI18n();
}

const App: React.FC = () => {
  const api = getApi();
  let [isLog, setIsLog] = useState(isLogged());
  const [showAlert, setShowAlert] = useState(false);

  const checkSession = async () => {
    isLog = isLogged();
    if (isLog) {
      try {
        await api.post('/sessionValid', {
          token: getSessionId()
        });
        setIsLog(true);
        setShowAlert(false);
      } catch(err) {
        logout();
        setIsLog(false);
        setShowAlert(true);
      }
    }
  };

  useEffect(() => {
    backButtonNative();
    pushNotifications();
    checkSession();
    setInterval(checkSession, Number(process.env.REACT_APP_CHECK_SESSION_TIME));
  }, []);

  const AlertSession = withRouter(({ history }) => (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => {
        history.push('/login');
        setShowAlert(false);
      }}
      cssClass='my-custom-class'
      header={'Session expired'}
      subHeader={'need re-login'}
      message={'La sesión ha expirado. Por favor, vuelva a iniciar sesión. Gracias.'}
      buttons={['OK']}
    />
  ));

  return (
    <IonReactRouter>
      {
        !isLog
        &&
        <div>
          <AlertSession />
          <Redirect to="/login" exact={true} />
        </div>
      }
      <Switch>
        <Route path="/" exact={true}>
          <Redirect to="/login" exact={true} />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/dashboard/*" exact={true}>
          <Dashboard />
        </Route>
        <Route path="/dashboard" exact={true}>
          <Dashboard />
        </Route>
        <Route component={Login} />
      </Switch>
    </IonReactRouter>
  );
};

export default App;
