import {
  IonApp, IonRouterOutlet, IonSplitPane
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import { isLogged, getWindowDimensions } from '../../services/utils';
import Menu from '../../components/Menu';
import Home from '../home/Home';
import Settings from '../settings/Settings';

import FarmableLandRoute from '../routes/farmable-land-routes';
import CropRoute from '../routes/crop-routes';
import EventsRoute from '../routes/event-routes';
import PhytosanitaryRoute from '../routes/phytosanitary-routes';
import MethodPayRoute from '../routes/method-pay-routes';

const Dashboard: React.FC = () => {
  const [isLog, setIsLog] = useState(isLogged());

  const dimensions = getWindowDimensions();
  const [ width, setWidth ] = useState<number>(dimensions.width);
  const handleResize = () => {
    const dimensions = getWindowDimensions();
    setWidth(dimensions.width);
  };
  window.addEventListener('resize', handleResize);

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
          <Menu setIsLog={setIsLog} reduceFormat={width < 1024} />
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
              {MethodPayRoute}
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
