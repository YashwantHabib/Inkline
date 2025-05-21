import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {RootStackParamList} from '../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Article'>;

export default function ArticleItem({item}: any) {
  const navigation = useNavigation<NavigationProp>();
  const theme = useColorScheme();

  const articleData = {
    title: item.title,
    author: item['dc:creator'] || 'Unknown',
    pubDate: item.pubDate,
    description: item['media:description'] || item.description,
    image: item['media:content']?.['@_url'] || item.enclosure?.['@_url'],
    link: item.link,
  };

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: theme.background}]}
      onPress={() => navigation.navigate('Article', {article: articleData})}>
      <Text style={[styles.title, {color: theme.text}]}>
        {articleData.title}
      </Text>
      <View style={styles.childContainer}>
        <Text style={[styles.bottomText, {color: theme.text}]}>
          {articleData.author.slice(0, 20)}
        </Text>
        <Text style={[styles.bottomText, {color: theme.text}]}>
          {new Date(articleData.pubDate).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: '10%', paddingVertical: '5%'},
  title: {fontSize: 18, fontWeight: 'bold'},
  childContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  bottomText: {fontSize: 12, paddingTop: 16},
});
