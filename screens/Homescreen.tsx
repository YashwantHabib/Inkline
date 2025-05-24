import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {fetchRSSFeed} from '../utils/fetchRSS';
import ArticleItem from '../components/ArticleItem';
import {useColorScheme} from '../hooks/useColorScheme';
import {Bolt, Menu} from 'lucide-react-native';

export default function HomeScreen() {
  const [articles, setArticles] = useState<any[]>([]);
  useEffect(() => {
    fetchRSSFeed(
      'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    ).then((data: any[]) => {
      const sorted = data.sort((a, b) => {
        const dateA = new Date(a.pubDate).getTime();
        const dateB = new Date(b.pubDate).getTime();
        return dateB - dateA; // most recent first
      });
      setArticles(sorted);
    });
  }, []);

  const theme = useColorScheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, {color: theme.text}]}>Inkline</Text>
        <Menu size={24} color={theme.text} />
      </View>
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
  header: {
    paddingHorizontal: '10%',
    paddingBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {fontSize: 24, fontWeight: 'bold'},
});
