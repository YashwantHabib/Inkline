import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation';

type ArticleRouteProp = RouteProp<RootStackParamList, 'Article'>;

export default function ArticleScreen({route}: any) {
  const {params} = useRoute<ArticleRouteProp>();
  const {article} = params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.meta}>
        By {article.author} • {new Date(article.pubDate).toLocaleString()}
      </Text>

      {article.image && (
        <Image source={{uri: article.image}} style={styles.image} />
      )}

      <Text style={styles.description}>{article.description}</Text>

      <TouchableOpacity
        style={styles.readMore}
        onPress={() => Linking.openURL(article.link)}>
        <Text style={styles.linkText}>Read full article</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 12},
  meta: {fontSize: 12, marginBottom: 16},
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  readMore: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
