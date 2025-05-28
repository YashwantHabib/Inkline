import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'bookmarked_articles';

export const getBookmarks = async () => {
  const jsonValue = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

export const addBookmark = async (article: any) => {
  const bookmarks = await getBookmarks();
  const exists = bookmarks.some((a: any) => a.link === article.link);
  if (!exists) {
    const updated = [...bookmarks, article];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  }
};

export const removeBookmark = async (link: string) => {
  const bookmarks = await getBookmarks();
  const updated = bookmarks.filter((a: any) => a.link !== link);
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
};

export const isBookmarked = async (link: string): Promise<boolean> => {
  const bookmarks = await getBookmarks();
  return bookmarks.some((a: any) => a.link === link);
};
