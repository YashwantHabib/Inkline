import React, {useState, useCallback, useContext} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {ThemeContext} from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchRSSFeed} from '../utils/fetchRSS';
import ArticleItem from '../components/ArticleItem';
import {RootStackParamList} from '../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ExploreScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tabs'
>;

type Article = {
  title: string;
  pubDate: string;
  link: string;
  description?: string;
  category: string;
  [key: string]: any;
};

const CATEGORY_FEEDS: Record<string, string> = {
  Technology: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
  World: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
  Business: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
  Sports: 'https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml',
  Science: 'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
  Movies: 'https://rss.nytimes.com/services/xml/rss/nyt/Movies.xml',
};

const ExploreScreen = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const {theme} = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ExploreScreenNavigationProp>();

  const loadInitialFeeds = async () => {
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
    const sorted = merged.sort((a: Article, b: Article) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    setArticles(sorted);
    setFilteredArticles(sorted);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadInitialFeeds();
    }, []),
  );

  const fetchCategoryFeed = async (category: string | null) => {
    setLoading(true);
    if (!category) {
      await loadInitialFeeds();
      setSelectedCategory(null);
      setLoading(false);
      return;
    }

    const url = CATEGORY_FEEDS[category];
    if (!url) return;

    const data = await fetchRSSFeed(url);
    const items = data.map((item: any) => ({...item, category}));
    const sorted = items.sort((a: Article, b: Article) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    setArticles(sorted);
    const lower = searchQuery.toLowerCase();
    const filtered = sorted.filter((article: Article) =>
      article.title.toLowerCase().includes(lower),
    );

    setFilteredArticles(filtered);
    setSelectedCategory(category);
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const lower = text.toLowerCase();
    const result = articles.filter(article =>
      article.title.toLowerCase().includes(lower),
    );
    setFilteredArticles(result);
  };

  const handleCategoryPress = (category: string) => {
    const isSame = selectedCategory === category;
    fetchCategoryFeed(isSame ? null : category);
  };

  return (
    <ScreenLayout>
      <View
        style={[styles.headerContainer, {backgroundColor: theme.background}]}>
        <Text style={[styles.heading, {color: theme.text}]}>Explore</Text>
        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Search articles..."
            placeholderTextColor={theme.text + '88'}
            style={[
              styles.searchInput,
              {color: theme.text, borderColor: theme.border},
            ]}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipContainer}>
          {Object.keys(CATEGORY_FEEDS).map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive
                      ? theme.primary
                      : theme.cardBackground,
                  },
                ]}
                onPress={() => handleCategoryPress(cat)}>
                <Text style={{color: isActive ? '#fff' : theme.text}}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {loading ? (
        <View
          style={[
            styles.loadingContainer,
            {backgroundColor: theme.background},
          ]}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, {color: theme.text}]}>
            Loading Explore...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredArticles}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <ArticleItem item={item} highlight={searchQuery} />
          )}
          contentContainerStyle={{paddingBottom: 40}}
          style={{backgroundColor: theme.background}}
        />
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 12,
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingHorizontal: '6%',
    marginBottom: 10,
  },
  InputContainer: {
    paddingHorizontal: '6%',
    paddingVertical: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ExploreScreen;
