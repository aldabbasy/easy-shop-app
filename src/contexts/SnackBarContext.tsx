import React from 'react';

type snackBarType = {
  showSnackBar?: () => void;
  setMessage?: (any) => void;
  setType?: (any) => void;
}

const initialData: snackBarType = {
};

const SnackBarContext = React.createContext(initialData);
export const SnackBarProvider = SnackBarContext.Provider;

export default SnackBarContext;