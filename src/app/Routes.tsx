import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import Login from '../pages/Login';
import Home from '../pages/Home';
import AppStorage from '../utils/AppStorage';
import Logout from '../components/Login/Logout';
import ProtectedRoute from '../components/Shared/ProtectedRoute';

const Routes = () => {

  const history = useHistory();

  useEffect(() => {
    const token = AppStorage.get('access-token');
    if(!token){
      history.push('/login');
    }
  }, [history]);

  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </Switch>
  )
}

export default Routes
