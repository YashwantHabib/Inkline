import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {fetchRSSFeed} from '../utils/fetchRSS';
import ArticleItem from '../components/ArticleItem';

export default function HomeScreen() {
  const [articles, setArticles] = useState<any[]>([]);
  useEffect(() => {
    fetchRSSFeed(
      'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    ).then(setArticles);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => <ArticleItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
