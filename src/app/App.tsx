import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Routes from './Routes';
import cyan from '@material-ui/core/colors/cyan';
import useAxiosGet from '../hooks/useAxiosGet';
import { UserProvider } from '../contexts/UserContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import CustomSnackBar from '../components/Shared/CustomSnackBar';
import { SnackBarProvider } from '../contexts/SnackBarContext';


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
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarType, setSnackBarType] = useState('');
  const { data, refetch } = useAxiosGet({endpoint: 'api/users/user_details'});

  const handleCloseSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <MuiThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <ThemeProvider value={{isDarkTheme, setIsDarkTheme}}>
        <CustomSnackBar open={openSnackBar} handleClose={handleCloseSnackBar} message={snackBarMessage} type={snackBarType} />
        <SnackBarProvider value={{showSnackBar: () => {setOpenSnackBar(true)}, setMessage: setSnackBarMessage, setType: setSnackBarType}}>
          <UserProvider value={{...data, refetchUserData: refetch}}>
            <CssBaseline />
            <Routes />
          </UserProvider>
        </SnackBarProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
};

export default App;

