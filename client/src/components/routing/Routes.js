import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Workouts from '../workouts/Workouts';
import CreateWorkout from '../workouts/CreateWorkout';
import EditWorkout from '../workouts/EditWorkout';
import Profile from '../profiles/Profile';
import CreateProfile from '../profiles/CreateProfile';
import EditProfile from '../profiles/EditProfile';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <section className="container">
    <Alert />
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/workouts" component={Workouts} />
      <PrivateRoute exact path="/create-workout" component={CreateWorkout} />
      <PrivateRoute exact path="/edit-workout/:id" component={EditWorkout} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
    </Switch>
  </section>
);

export default Routes;
