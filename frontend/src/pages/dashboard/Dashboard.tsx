import {
  IonApp, IonRouterOutlet, IonSplitPane
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {
  isLogged, getWindowDimensions,
  getApi, setI18n
} from '../../services/utils';
import Menu from '../../components/Menu';
import Home from '../home/Home';
import Settings from '../settings/Settings';
import Notification from '../notifications/Notification';

import FarmableLandRoute from '../routes/farmable-land-routes';
import CropRoute from '../routes/crop-routes';
import EventsRoute from '../routes/event-routes';
import PhytosanitaryRoute from '../routes/phytosanitary-routes';
import IrrigateRoute from '../routes/irrigate-routes';

const localSettings = localStorage.getItem('localSettings');
if (!localSettings) {
  (async () => {
    const api = getApi();
    const { data } = await api.get('/settings');
    if (data.userSettings?.backgroundColor === 'DARK') {
      document.body.classList.add("dark");
    }
    setI18n(data.userSettings?.defaultLanguage);
  })();
}

const Dashboard: React.FC = () => {
  const api = getApi();
  const [isLog, setIsLog] = useState(isLogged());
  const [ fullname, setFullname ] = useState<string | null>(null);

  const dimensions = getWindowDimensions();
  const [ width, setWidth ] = useState<number>(dimensions.width);

  window.addEventListener('resize', () => {
    const dimensions = getWindowDimensions();
    setWidth(dimensions.width);
  });

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/user/fullname');
      setFullname(data.fullname);
    })();
  }, []);

  return (
    <IonApp>
      {
        !isLog
        &&
        <Redirect to="/login" push={true} exact={true} />
      }
      {
        (width < 1024)
        &&
        <Redirect to="/dashboard" exact={true} />
      }
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu setIsLog={setIsLog} reduceFormat={width < 1024} fullname={`${fullname}`} />
          <IonRouterOutlet id="main">
            <Switch>
              <Route path="/dashboard" exact={true}>
                {
                  (width < 1024)
                  &&
                  <Redirect to="/dashboard/page/Home" push={true} exact={true} />
                }
              </Route>
              <Route path="/dashboard/page/Home" exact={true}>
                <Home />
              </Route>
              {FarmableLandRoute}
              {CropRoute}
              {EventsRoute}
              {PhytosanitaryRoute}
              {IrrigateRoute}
              <Route path="/dashboard/page/Notification" exact={true}>
                <Notification />
              </Route>
              <Route path="/dashboard/page/Setting" exact={true}>
                <Settings />
              </Route>
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default Dashboard;
