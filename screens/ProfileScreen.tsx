import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from '../hooks/useColorScheme';
import ScreenLayout from '../components/ScreenLayout';

const categories = [
  'Technology',
  'World',
  'Business',
  'Sports',
  'Science',
  'Movies',
];

export default function ProfileScreen() {
  const theme = useColorScheme();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('preferredCategories').then(stored => {
      if (stored) setSelected(JSON.parse(stored));
    });
  }, []);

  const toggleCategory = (cat: string) => {
    setSelected(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat],
    );
  };

  const savePreferences = async () => {
    await AsyncStorage.setItem('preferredCategories', JSON.stringify(selected));
    Alert.alert('Preferences saved!');
  };

  return (
    <ScreenLayout>
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Text style={styles.heading}>Choose Your Categories</Text>
        <ScrollView contentContainerStyle={styles.grid}>
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
        </ScrollView>
        <TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  heading: {fontSize: 20, fontWeight: 'bold', marginBottom: 12},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 5,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
});
