import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Routes from './Routes';

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
  return (
    <MuiThemeProvider theme={darkTheme || lightTheme}>
      <CssBaseline />
      <Routes />
    </MuiThemeProvider>
  )
};

export default App;

