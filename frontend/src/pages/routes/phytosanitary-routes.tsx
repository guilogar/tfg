import { Route } from 'react-router-dom';
import Phytosanitary from '../phytosanitary/Phytosanitary';
import CreatePhytosanitary from '../phytosanitary/create/CreatePhytosanitary';
import UpdatePhytosanitary from '../phytosanitary/update/UpdatePhytosanitary';

let index = 0;
export default [
  <Route path="/dashboard/page/Phytosanitary" exact={true} key={index++}>
    <Phytosanitary />
  </Route>,
  <Route path="/dashboard/page/Phytosanitary/create" exact={true} key={index++}>
    <CreatePhytosanitary />
  </Route>,
  <Route
    path="/dashboard/page/Phytosanitary/:farmId/:cropId/update" key={index++}
    exact={true} component={UpdatePhytosanitary}
  >
  </Route>,
];
