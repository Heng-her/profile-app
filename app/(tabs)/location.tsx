// app/(tabs)/location.tsx
import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function LocationScreen() {
  return (
    <ThemedText type="title" style={styles.text}><Text>Location</Text></ThemedText>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});