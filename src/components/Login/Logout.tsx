import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AppStorage from '../../utils/AppStorage';

const Logout = () => {

  useEffect(() => {
    AppStorage.remove('access-token');
  }, [])

  return (
    <Redirect to="/login" />
  )
};

export default Logout;
