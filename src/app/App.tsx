import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Switch, Route, useHistory } from "react-router-dom";
import Login from '../pages/Login';
import Home from '../pages/Home';
import AppStorage from '../utils/AppStorage';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});

const App = () => {

  const history = useHistory();


  useEffect(() => {
    const token = AppStorage.get('access-token');
    if(token === null){
      history.push('/login');
    }
  }, [history]);

  return (
    <MuiThemeProvider theme={darkTheme || lightTheme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </MuiThemeProvider>
  )
};

export default App;

