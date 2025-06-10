// screens/WebViewScreen.tsx
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation';
import {MoveLeft} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {ThemeContext} from '../contexts/ThemeContext';

type WebViewScreenRouteProp = RouteProp<RootStackParamList, 'WebView'>;

const WebViewScreen = () => {
  const route = useRoute<WebViewScreenRouteProp>();
  const {url} = route.params;
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MoveLeft size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <WebView source={{uri: url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: '6%',
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default WebViewScreen;
