import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
        <ScrollView>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
