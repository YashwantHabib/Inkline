import React, {useContext} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {RootStackParamList} from '../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {User, Clock} from 'lucide-react-native';
import {ThemeContext} from '../contexts/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Article'>;

type Props = {
  item: any;
  highlight?: string;
};

export default function ArticleItem({item, highlight = ''}: Props) {
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useContext(ThemeContext);

  const articleData = {
    title: item.title,
    author: item['dc:creator'] || item.author || 'Unknown',
    pubDate: item.pubDate,
    description: item.description || '',
    image:
      item.image ||
      item['media:content']?.['@_url'] ||
      item.enclosure?.['@_url'] ||
      '',
    detail: item.detail || item['media:description'] || '',
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

  const plainTextDescription = articleData.description.replace(/<[^>]*>/g, '');
  const previewText = plainTextDescription.substring(0, 140).trim() + '…';

  const renderHighlightedText = (text: string, style: any) => {
    if (!highlight.trim()) return <Text style={style}>{text}</Text>;

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return (
      <Text style={style}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={[style, styles.highlight]}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          ),
        )}
      </Text>
    );
  };

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
      {renderHighlightedText(articleData.title, [
        styles.title,
        {color: theme.text},
      ])}

      {/* Description Preview */}
      {renderHighlightedText(previewText, [
        styles.description,
        {color: theme.text},
      ])}

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
  highlight: {
    backgroundColor: '#ffe066',
  },
});
