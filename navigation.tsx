import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Homescreen';
import ArticleScreen from './screens/ArticleScreen';
import {useColorScheme} from './hooks/useColorScheme';

export type RootStackParamList = {
  Home: undefined;
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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
