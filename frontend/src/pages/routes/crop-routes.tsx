import { Route } from 'react-router-dom';
import Crop from '../crop/Crop';
import CreateCrop from '../crop/create/CreateCrop';
import UpdateCrop from '../crop/update/UpdateCrop';

let index = 0;
export default [
  <Route path="/dashboard/page/Crop" exact={true} key={index++}>
    <Crop />
  </Route>,
  <Route path="/dashboard/page/Crop/create" exact={true} key={index++}>
    <CreateCrop />
  </Route>,
  <Route
    path="/dashboard/page/Crop/:id/update" key={index++}
    exact={true} component={UpdateCrop}
  >
  </Route>,
];
