import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {

  const [weather, setWeather] = useState(null);

  

  return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.cartao}>
            <Text>Teste</Text>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartao: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    width: '90%',
    padding: 24,
    marginVertical: 12,
    alignItems: 'center',
    elevation: 6, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  }
});
