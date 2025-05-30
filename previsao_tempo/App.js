import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import api from './services/api';
import { TextInput } from 'react-native-web';
import { Input } from 'react-native-elements';

export default function App() {

  const [weather, setWeather] = useState(null); //para armazenar dados do tempo
  const [cidade, setCidade] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await api.get('/weather', {
          params: {
            key: '9149fe5e',
            city_name: cidade,
            format: 'json'
          }
        });
        setWeather(response.data.results);
      } catch(error) {
          console.error('Erro ao buscar clima:', error);
      }
    };

    fetchWeather();

  }, [cidade]);
  

  return (
      <View style={styles.container}>
        <ScrollView>
          <Input value={cidade} onChangeText={setCidade} placeholder='Digite aqui a cidade' placeholderTextColor="white"
          containerStyle={styles.input}></Input>
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
  },

  input: {
    alignSelf: 'flex-start',
    width: '80',
    borderRadius: '',
    marginBottom: 20,
    color: 'black'
  }
});
