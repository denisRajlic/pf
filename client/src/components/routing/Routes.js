import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Workouts from '../workouts/Workouts';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <section className="container">
    <Alert />
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/workouts" component={Workouts} />
    </Switch>
  </section>
);

export default Routes;
