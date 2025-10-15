import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AbsoluteHexGrid from './components/AbsoluteHexGrid';

export default function App() {
  return (
    <View style={styles.container}>
      <AbsoluteHexGrid />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
