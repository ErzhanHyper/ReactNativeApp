import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Navigation } from './src/Screen/Navigation'

export default function App() {

  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const apiUrl = 'http://178.22.171.181:62535/operator';
export const apiToken = '470aadbb1b44390ce76dd8427edd301cf7377a3a';