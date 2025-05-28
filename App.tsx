import React, {useContext} from 'react';
import Navigation from './navigation';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {ThemeProvider, ThemeContext} from './contexts/ThemeContext';

enableScreens();

// Move theme-dependent logic inside this
function ThemedAppContent() {
  const {theme} = useContext(ThemeContext);

  const barStyle =
    theme.text === '#000000' || theme.background === '#FFFFFF'
      ? 'dark-content'
      : 'light-content';

  return (
    <>
      <StatusBar backgroundColor={theme.background} barStyle={barStyle} />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
        <Navigation />
      </SafeAreaView>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedAppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
