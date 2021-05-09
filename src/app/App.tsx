import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Routes from './Routes';
import cyan from '@material-ui/core/colors/cyan';
import useAxiosGet from '../hooks/useAxiosGet';
import { UserProvider } from '../contexts/UserContext';
import { ThemeProvider } from '../contexts/ThemeContext';


const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: cyan
  },
});

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const { data, refetch } = useAxiosGet({endpoint: 'api/users/user_details'});
  return (
    <MuiThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <ThemeProvider value={{isDarkTheme, setIsDarkTheme}}>
        <UserProvider value={{...data, refetchUserData: refetch}}>
          <CssBaseline />
          <Routes />
        </UserProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
};

export default App;

