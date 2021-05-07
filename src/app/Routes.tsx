import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from '../pages/Login';
import Home from '../pages/Home';
import Logout from '../components/Login/Logout';
import ProtectedRoute from '../components/Shared/ProtectedRoute';

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </Switch>
  )
}

export default Routes
