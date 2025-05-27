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
    description: item.description,
    image: item['media:content']?.['@_url'] || item.enclosure?.['@_url'],
    detail: item['media:description'],
    link: item.link,
  };

  function timeAgo(dateString: string): string {
    const publishedDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - publishedDate.getTime()) / 1000,
    );

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hour ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} day ago`;

    return publishedDate.toLocaleDateString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

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
          {timeAgo(articleData.pubDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: '10%', paddingVertical: '5%'},
  title: {fontSize: 18, fontWeight: '800', marginBottom: 8},
  childContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  bottomText: {fontSize: 14, fontWeight: 400},
});
