import React from 'react';
import Navigation from './navigation';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {useColorScheme} from './hooks/useColorScheme';

enableScreens();

export default function App() {
  const theme = useColorScheme();
  const barStyle =
    theme.text === '#000000' || theme.background === '#FFFFFF'
      ? 'dark-content'
      : 'light-content';

  return (
    <SafeAreaProvider style={{backgroundColor: theme.background}}>
      <StatusBar backgroundColor={theme.background} barStyle={barStyle} />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
