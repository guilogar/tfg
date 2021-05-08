import { Route, Router } from 'react-router-dom';
import Irrigate from '../irrigate/Irrigate';
import CreateIrrigate from '../irrigate/create/CreateIrrigate';
import UpdateIrrigate from '../irrigate/update/UpdateIrrigate';

let index = 0;
export default [
  <Route path="/dashboard/page/Irrigate" exact={true} key={index++}>
    <Irrigate />
  </Route>,
  <Route path="/dashboard/page/Irrigate/create" exact={true} key={index++}>
    <CreateIrrigate />
  </Route>,
  <Route
    path="/dashboard/page/Irrigate/:id/update" key={index++}
    exact={true} component={UpdateIrrigate}
  >
  </Route>,
];
