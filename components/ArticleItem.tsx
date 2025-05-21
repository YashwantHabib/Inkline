import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {RootStackParamList} from '../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Article'>;

export default function ArticleItem({item}: any) {
  const navigation = useNavigation<NavigationProp>();

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
      style={styles.container}
      onPress={() => navigation.navigate('Article', {article: articleData})}>
      <Text style={styles.title}>{articleData.title}</Text>
      <View style={styles.childContainer}>
        <Text style={styles.bottomText}>{articleData.author}</Text>
        <Text style={styles.bottomText}>{articleData.pubDate}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {padding: 8},
  title: {fontSize: 18, fontWeight: 'bold'},
  childContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  bottomText: {fontSize: 10, color: 'grey'},
});
