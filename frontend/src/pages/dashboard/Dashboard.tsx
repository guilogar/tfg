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
import FarmableLand from '../farmable-land/FarmableLand';
import Crop from '../crop/Crop';
import Events from '../events/Events';
import MethodPay from '../method-pay/MethodPay';
import Phytosanitary from '../phytosanitary/Phytosanitary';

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
import '../../theme/variables.css';
import CreateFarmableLand from '../farmable-land/create/CreateFarmableLand';
import UpdateFarmableLand from '../farmable-land/update/UpdateFarmableLand';
import Login from '../login/Login';

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
              <Route path="/dashboard/page/FarmableLand" exact={true}>
                <FarmableLand />
              </Route>
              <Route path="/dashboard/page/FarmableLand/create" exact={true}>
                <CreateFarmableLand />
              </Route>
              <Route path="/dashboard/page/FarmableLand/:id/update" exact={true}>
                <UpdateFarmableLand />
              </Route>
              <Route path="/dashboard/page/Crop" exact={true}>
                <Crop />
              </Route>
              <Route path="/dashboard/page/Event" exact={true}>
                <Events />
              </Route>
              <Route path="/dashboard/page/MethodPay" exact={true}>
                <MethodPay />
              </Route>
              <Route path="/dashboard/page/Phytosanitary" exact={true}>
                <Phytosanitary />
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
