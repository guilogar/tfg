import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';

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

const App: React.FC = () => {
  return (
    <IonReactRouter>
      <Route path="/" exact={true}>
        <Redirect to="/login" />
      </Route>
      <Route path="/login" exact={true}>
        <Login />
      </Route>
      <Route path="/dashboard/*" exact={true}>
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard" exact={true}>
        <Dashboard />
      </Route>
    </IonReactRouter>
  );
};

export default App;
