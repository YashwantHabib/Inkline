// hooks/useThemeColors.ts
import {useColorScheme as _useColorScheme} from 'react-native';
import {lightTheme, darkTheme, Theme} from '../theme/colors';

export function useColorScheme(): Theme {
  const scheme = _useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
