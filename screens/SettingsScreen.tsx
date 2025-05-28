import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {MoveLeft} from 'lucide-react-native';
import {ThemeContext} from '../contexts/ThemeContext';
import ScreenLayout from '../components/ScreenLayout';

const categories = [
  'Technology',
  'World',
  'Business',
  'Sports',
  'Science',
  'Movies',
];

const themeModes = ['system', 'light', 'dark'];

export default function SettingsScreen() {
  const navigation = useNavigation();
  const {theme, mode, setMode} = useContext(ThemeContext);

  const [selected, setSelected] = useState<string[]>([]);
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>(mode);

  useEffect(() => {
    const loadPreferences = async () => {
      const storedCategories = await AsyncStorage.getItem(
        'preferredCategories',
      );
      if (storedCategories) setSelected(JSON.parse(storedCategories));

      const storedTheme = await AsyncStorage.getItem('themeMode');
      if (storedTheme) setThemeMode(storedTheme as 'system' | 'light' | 'dark');
    };
    loadPreferences();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelected(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat],
    );
  };

  const savePreferences = async () => {
    await AsyncStorage.setItem('preferredCategories', JSON.stringify(selected));
    setMode(themeMode);
    Alert.alert('Preferences saved!');
  };

  return (
    <ScreenLayout>
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MoveLeft size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.heading, {color: theme.text}]}>Settings</Text>
          </View>

          {/* Theme Selector */}
          <Text style={[styles.subheading, {color: theme.text}]}>
            Choose Theme
          </Text>
          <View style={styles.radioGroup}>
            {themeModes.map(mode => (
              <TouchableOpacity
                key={mode}
                onPress={() => setThemeMode(mode as any)}
                style={styles.radioRow}>
                <View style={[styles.outerCircle, {borderColor: theme.text}]}>
                  {themeMode === mode && (
                    <View
                      style={[
                        styles.innerCircle,
                        {backgroundColor: theme.primary},
                      ]}
                    />
                  )}
                </View>
                <Text style={[styles.radioLabel, {color: theme.text}]}>
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Category Selector */}
          <Text style={[styles.subheading, {color: theme.text}]}>
            Choose Your Categories
          </Text>
          <View style={styles.grid}>
            {categories.map(cat => {
              const isActive = selected.includes(cat);
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => toggleCategory(cat)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: isActive
                        ? theme.primary
                        : theme.cardBackground,
                    },
                  ]}>
                  <Text
                    style={{
                      color: isActive ? '#fff' : theme.text,
                      fontWeight: '500',
                    }}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, {backgroundColor: theme.primary}]}
          onPress={savePreferences}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  radioGroup: {
    marginBottom: 24,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    marginLeft: 10,
    textTransform: 'capitalize',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 10,
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
