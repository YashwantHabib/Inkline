import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {RootStackParamList} from '../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from '../hooks/useColorScheme';
import {User, Clock} from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Article'>;

export default function ArticleItem({item}: any) {
  const navigation = useNavigation<NavigationProp>();
  const theme = useColorScheme();

  const articleData = {
    title: item.title,
    author: item['dc:creator'] || 'Unknown',
    pubDate: item.pubDate,
    description: item.description || '',
    image: item['media:content']?.['@_url'] || item.enclosure?.['@_url'],
    detail: item['media:description'],
    link: item.link,
  };

  function timeAgo(dateString: string): string {
    const publishedDate = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - publishedDate.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

    return publishedDate.toLocaleDateString();
  }

  const previewText =
    articleData.description
      .replace(/<[^>]*>/g, '') // Remove HTML tags if present
      .substring(0, 140)
      .trim() + '…';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {borderBottomColor: theme.border, borderBottomWidth: 1},
      ]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Article', {article: articleData})}>
      {/* Author */}
      <View style={styles.metaRow}>
        <User size={16} color={theme.text} style={styles.icon} />
        <Text style={[styles.metaText, {color: theme.text}]} numberOfLines={1}>
          {articleData.author}
        </Text>
      </View>

      {/* Title */}
      <Text
        style={[styles.title, {color: theme.text}]}
        numberOfLines={3}
        ellipsizeMode="tail">
        {articleData.title}
      </Text>

      {/* Description Preview */}
      <Text
        style={[styles.description, {color: theme.text}]}
        numberOfLines={3}
        ellipsizeMode="tail">
        {previewText}
      </Text>

      {/* Time */}
      <View style={styles.metaRow}>
        <Clock size={16} color={theme.text} style={styles.icon} />
        <Text style={[styles.metaText, {color: theme.text}]}>
          {timeAgo(articleData.pubDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: '6%',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    paddingVertical: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginTop: 2,
    paddingVertical: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaText: {
    fontSize: 13,
    opacity: 0.7,
    flexShrink: 1,
  },
  icon: {
    marginTop: 1,
  },
});
