import { Route } from 'react-router-dom';
import Events from '../events/Events';
import CreateEvents from '../events/create/CreateEvents';
import UpdateEvents from '../events/update/UpdateEvents';

let index = 0;
export default [
  <Route path="/dashboard/page/Events" exact={true} key={index++}>
    <Events />
  </Route>,
  <Route path="/dashboard/page/Events/create" exact={true} key={index++}>
    <CreateEvents />
  </Route>,
  <Route
    path="/dashboard/page/Events/:id/update" key={index++}
    exact={true} component={UpdateEvents}
  >
  </Route>,
];
