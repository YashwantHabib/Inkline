// navigation.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTab';
import ArticleScreen from './screens/ArticleScreen';
import SettingsScreen from './screens/SettingsScreen';
import WebViewScreen from './screens/WebViewScreen';

export type RootStackParamList = {
  Tabs: undefined;
  Article: {
    article: {
      title: string;
      author: string;
      pubDate: string;
      description: string;
      detail: string;
      image: string;
      link: string;
    };
  };
  Settings: undefined;
  WebView: {url: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={MainTabs} />
        <Stack.Screen name="Article" component={ArticleScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
