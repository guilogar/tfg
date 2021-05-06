import { Route } from 'react-router-dom';
import MethodPay from '../method-pay/MethodPay';
import CreateMethodPay from '../method-pay/create/CreateMethodPay';
import UpdateMethodPay from '../method-pay/update/UpdateMethodPay';

let index = 0;
export default [
  <Route path="/dashboard/page/MethodPay" exact={true} key={index++}>
    <MethodPay />
  </Route>,
  <Route path="/dashboard/page/MethodPay/create" exact={true} key={index++}>
    <CreateMethodPay />
  </Route>,
  <Route
    path="/dashboard/page/MethodPay/:id/update" key={index++}
    exact={true} component={UpdateMethodPay}
  >
  </Route>,
];
