// components/ScreenLayout.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function ScreenLayout({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
