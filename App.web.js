import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavigableWebMap from './components/NavigableWebMap';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigableWebMap />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
