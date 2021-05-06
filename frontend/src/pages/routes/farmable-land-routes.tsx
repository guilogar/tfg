import { Route, Router } from 'react-router-dom';
import FarmableLand from '../farmable-land/FarmableLand';
import CreateFarmableLand from '../farmable-land/create/CreateFarmableLand';
import UpdateFarmableLand from '../farmable-land/update/UpdateFarmableLand';

let index = 0;
export default [
  <Route path="/dashboard/page/FarmableLand" exact={true} key={index++}>
    <FarmableLand />
  </Route>,
  <Route path="/dashboard/page/FarmableLand/create" exact={true} key={index++}>
    <CreateFarmableLand />
  </Route>,
  <Route
    path="/dashboard/page/FarmableLand/:id/update" key={index++}
    exact={true} component={UpdateFarmableLand}
  >
  </Route>,
];
