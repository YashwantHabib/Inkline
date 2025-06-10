import React, {useEffect, useState, useContext} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Trash, Bookmark} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation';
import {ThemeContext} from '../contexts/ThemeContext';
import ArticleItem from '../components/ArticleItem';
import {getBookmarks, removeBookmark} from '../utils/storage';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tabs'
>;

const BookmarksScreen = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const loadBookmarks = async () => {
    const saved = await getBookmarks();
    setArticles(saved);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadBookmarks);

    return unsubscribe;
  }, [navigation]);

  const clearAll = async () => {
    for (const article of articles) {
      await removeBookmark(article.link);
    }
    setArticles([]);
  };

  if (loading) {
    return (
      <View
        style={[styles.loadingContainer, {backgroundColor: theme.background}]}>
        <ActivityIndicator size="large" color={theme.primary || '#007bff'} />
        <Text style={[styles.loadingText, {color: theme.text}]}>
          Loading your feed...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => <ArticleItem item={item} />}
      ListHeaderComponent={
        <View style={[styles.header, {backgroundColor: theme.background}]}>
          <Text style={[styles.heading, {color: theme.text}]}>Bookmarks</Text>
          <TouchableOpacity onPress={clearAll}>
            <Trash color={theme.text} />
          </TouchableOpacity>
        </View>
      }
      ListEmptyComponent={
        <View style={[styles.emptyContainer]}>
          <Bookmark color={theme.text} />
          <Text style={[styles.emptyText, {color: theme.text}]}>
            No bookmarks yet.
          </Text>
        </View>
      }
      stickyHeaderIndices={[0]}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 40,
      }}
      style={{backgroundColor: theme.background}}
    />
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    paddingHorizontal: '6%',
    paddingBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCont: {
    paddingTop: 40,
    paddingHorizontal: '6%',
    paddingBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default BookmarksScreen;
