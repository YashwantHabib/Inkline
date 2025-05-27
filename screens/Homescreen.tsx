import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {fetchRSSFeed} from '../utils/fetchRSS';
import ArticleItem from '../components/ArticleItem';
import {useColorScheme} from '../hooks/useColorScheme';
import ScreenLayout from '../components/ScreenLayout';

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

  function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return 'Good Morning 👋';
    if (hour >= 12 && hour < 17) return 'Good Afternoon 👋';
    if (hour >= 17 && hour < 21) return 'Good Evening 👋';
    return 'Good Night 👋';
  }

  const theme = useColorScheme();

  return (
    <ScreenLayout>
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={styles.header}>
          <Text style={styles.heading}>{getGreeting()}</Text>
          <Text>Here's your curated feed</Text>
        </View>
        <FlatList
          data={articles}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <ArticleItem item={item} />}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    paddingHorizontal: '6%',
    paddingBottom: '4%',
  },
  heading: {fontSize: 24, fontWeight: 'bold'},
});
