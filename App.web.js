import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CSSHexGrid from './components/CSSHexGrid';
import './styles/hexGrid.css';

export default function App() {
  return (
    <View style={styles.container}>
      <CSSHexGrid />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
