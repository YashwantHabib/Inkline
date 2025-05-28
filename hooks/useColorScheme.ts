import {useEffect, useState} from 'react';
import {useColorScheme as _useSystemColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme, darkTheme, Theme} from '../theme/colors';

export function useColorScheme(): Theme {
  const systemScheme = _useSystemColorScheme();
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem('themeMode'); // 'system', 'light', 'dark'
      const mode = stored || 'system';

      if (mode === 'light') setTheme(lightTheme);
      else if (mode === 'dark') setTheme(darkTheme);
      else setTheme(systemScheme === 'dark' ? darkTheme : lightTheme);
    };

    loadTheme();
  }, [systemScheme]);

  return theme;
}
