import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchRSSFeed} from '../utils/fetchRSS';
import ArticleItem from '../components/ArticleItem';
import {useColorScheme} from '../hooks/useColorScheme';
import ScreenLayout from '../components/ScreenLayout';
import {useFocusEffect} from '@react-navigation/native';
import {ListFilter, Bolt} from 'lucide-react-native';

const CATEGORY_FEEDS: Record<string, string> = {
  Technology: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
  World: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
  Business: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
  Sports: 'https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml',
  Science: 'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
  Movies: 'https://rss.nytimes.com/services/xml/rss/nyt/Movies.xml',
};

type Article = {
  title: string;
  pubDate: string;
  link: string;
  description?: string;
  category: string;
  [key: string]: any;
};

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      const loadFeeds = async () => {
        setLoading(true);
        const stored = await AsyncStorage.getItem('preferredCategories');
        const parsed = stored ? JSON.parse(stored) : null;
        const categories: string[] =
          parsed && parsed.length > 0 ? parsed : ['World'];

        const allFeeds = await Promise.all(
          categories.map(async category => {
            const url = CATEGORY_FEEDS[category];
            if (!url) return [];
            const data = await fetchRSSFeed(url);
            return data.map((item: any) => ({...item, category}));
          }),
        );

        const merged = allFeeds.flat();
        const sorted = merged.sort((a, b) => {
          const dateA = new Date(a.pubDate).getTime();
          const dateB = new Date(b.pubDate).getTime();
          return dateB - dateA;
        });

        setArticles(sorted);
        setLoading(false);
      };

      loadFeeds();
    }, []),
  );

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning 👋';
    if (hour >= 12 && hour < 17) return 'Good Afternoon 👋';
    if (hour >= 17 && hour < 21) return 'Good Evening 👋';
    return 'Good Night 👋';
  }

  if (loading) {
    return (
      <ScreenLayout>
        <View
          style={[
            styles.loadingContainer,
            {backgroundColor: theme.background},
          ]}>
          <ActivityIndicator size="large" color={theme.primary || '#007bff'} />
          <Text style={[styles.loadingText, {color: theme.text}]}>
            Loading your feed...
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <FlatList
        data={articles}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => <ArticleItem item={item} />}
        ListHeaderComponent={
          <View style={[styles.header, {backgroundColor: theme.background}]}>
            <Text style={[styles.heading, {color: theme.text}]}>Home</Text>
            <Bolt color={theme.text} />
          </View>
        }
        stickyHeaderIndices={[0]} // Make the header stick after scroll
        contentContainerStyle={{paddingTop: 40}} // Optional: adds scrollable top space
        style={{backgroundColor: theme.background}}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    paddingHorizontal: '6%',
    paddingBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {fontSize: 23, fontWeight: 'bold'},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
