import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './app/App';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

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

ReactDOM.render(
    <MuiThemeProvider theme={darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>,
  document.getElementById('root')
);
