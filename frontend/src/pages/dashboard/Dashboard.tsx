import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { isLogged } from '../../services/utils';
import Menu from '../../components/Menu';
import Settings from '../settings/Settings';
import FarmableLand from '../farmable-land/FarmableLand';

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

    if (!isLog)
    {
        return (<Redirect to="/login" />);
    } else
    {
        return (
            <IonApp>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        <Menu changeIsLog={setIsLog} />
                        <IonRouterOutlet id="main">
                            <Route path="/dashboard" exact={true}>
                                <Redirect to="/dashboard/page/FarmableLand" />
                            </Route>
                            <Route path="/dashboard/page/FarmableLand" exact={true}>
                                <FarmableLand />
                            </Route>
                            <Route path="/dashboard/page/Setting" exact={true}>
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