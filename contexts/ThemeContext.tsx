import React, {createContext, useEffect, useState, ReactNode} from 'react';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme, darkTheme, Theme} from '../theme/colors';

type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  mode: 'system',
  setMode: () => {},
});

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const applyTheme = (modeToApply: ThemeMode) => {
    const colorScheme = Appearance.getColorScheme();
    if (modeToApply === 'light') setTheme(lightTheme);
    else if (modeToApply === 'dark') setTheme(darkTheme);
    else setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
  };

  const setMode = async (newMode: ThemeMode) => {
    setModeState(newMode);
    await AsyncStorage.setItem('themeMode', newMode);
    applyTheme(newMode);
  };

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem('themeMode');
      const m = (stored as ThemeMode) || 'system';
      setModeState(m);
      applyTheme(m);
    };

    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{theme, mode, setMode}}>
      {children}
    </ThemeContext.Provider>
  );
};
