import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation';
import {MoveLeft, Bookmark, BookmarkMinus} from 'lucide-react-native';
import {ThemeContext} from '../contexts/ThemeContext';
import {addBookmark, removeBookmark, isBookmarked} from '../utils/storage';

type ArticleRouteProp = RouteProp<RootStackParamList, 'Article'>;

export default function ArticleScreen() {
  const {params} = useRoute<ArticleRouteProp>();
  const {article} = params;
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    isBookmarked(article.link).then(setBookmarked);
  }, [article]);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(article.link);
    } else {
      await addBookmark(article);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background}]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MoveLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleBookmark}>
          {bookmarked ? (
            <BookmarkMinus size={24} color={theme.text} />
          ) : (
            <Bookmark size={24} color={theme.text} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.contentBlock}>
        <Text style={[styles.title, {color: theme.text}]}>{article.title}</Text>
        <Text style={[styles.meta, {color: theme.text}]}>
          {new Date(article.pubDate).toLocaleString()}
        </Text>
        <Text style={[styles.meta, {color: theme.text}]}>
          By {article.author}
        </Text>
        <Text style={[styles.description, {color: theme.text}]}>
          {article.description}
        </Text>
        {article.image && (
          <Image source={{uri: article.image}} style={styles.image} />
        )}
        <Text style={[styles.description, {color: theme.text}]}>
          {article.detail}
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL(article.link)}>
          <Text style={[styles.linkText, {color: theme.text}]}>
            🔗 Read full article
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '6%',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  contentBlock: {
    gap: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
  },
  meta: {
    fontSize: 12,
    color: '#888',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007bff',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
