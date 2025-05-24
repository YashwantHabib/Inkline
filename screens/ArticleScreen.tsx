import React from 'react';
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
import {useColorScheme} from '../hooks/useColorScheme';
import {MoveLeft, Bookmark} from 'lucide-react-native';

type ArticleRouteProp = RouteProp<RootStackParamList, 'Article'>;

export default function ArticleScreen({route}: any) {
  const {params} = useRoute<ArticleRouteProp>();
  const {article} = params;
  const theme = useColorScheme();
  const navigation = useNavigation();

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MoveLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: theme.text}]}>Details</Text>
        <Bookmark size={24} color={theme.text} />
      </View>
      <Text style={[styles.meta, {color: theme.text}]}>
        {new Date(article.pubDate).toLocaleString(undefined, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })}
      </Text>
      <Text style={[styles.title, {color: theme.text}]}>{article.title}</Text>
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
          Read full article
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: '10%'},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 8},
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

  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    paddingTop: '4%',
    paddingBottom: '16%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {fontSize: 20, fontWeight: 'bold'},
});
