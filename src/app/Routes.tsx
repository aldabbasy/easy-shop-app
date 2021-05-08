import React from 'react';
import { Switch, Route, useLocation } from "react-router-dom";
import Login from '../pages/Login';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Logout from '../components/Login/Logout';
import ProtectedRoute from '../components/Shared/ProtectedRoute';
import NavBar from '../components/Shared/NavBar';

const Routes = () => {
  const location = useLocation();
  return (
    <>
    {(location.pathname !== '/login') && <NavBar />}
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/*" component={() => <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>404 page not found</div>} />
    </Switch>
    </>
  )
}

export default Routes
