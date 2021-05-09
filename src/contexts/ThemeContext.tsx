import React from 'react';

type themeType = {
  isDarkTheme: boolean;
  setIsDarkTheme?: (boolean: any) => void
}

const initialData: themeType = {
  isDarkTheme: true
};

const ThemeContext = React.createContext(initialData);
export const ThemeProvider = ThemeContext.Provider;

export default ThemeContext;
