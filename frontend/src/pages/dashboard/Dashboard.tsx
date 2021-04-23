import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../../components/Menu';
import Page from '../Page';
import Settings from '../settings/Settings';
import React, { useState } from 'react';
import { isLogged } from '../../services/utils';
import Login from '../../pages/login/Login';

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

const Dashboard: React.FC = () => {
    const [isLog, setIsLog] = useState(isLogged());

    if (!isLog) {
        return (
            <Login />
        );
    } else {
        return (
            <IonApp>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        <Menu setIsLog={setIsLog} />
                        <IonRouterOutlet id="main">
                            <Route path="/dashboard" exact={true}>
                                <Redirect to="/dashboard/page/Inbox" />
                            </Route>
                            <Route path="/dashboard/page/:name" exact={true}>
                                <Page />
                            </Route>
                            <Route path="/dashboard/settings" exact={true}>
                                <Settings />
                            </Route>
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </IonApp>
        );
    }
};

export default Dashboard;