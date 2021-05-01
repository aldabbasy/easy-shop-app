import React from 'react'
import Login from '../pages/Login'
import CssBaseline from '@material-ui/core/CssBaseline';
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

const App = () => {

  return (
    <MuiThemeProvider theme={darkTheme || lightTheme}>
      <CssBaseline />
      <Login />
    </MuiThemeProvider>
  )
}

export default App

