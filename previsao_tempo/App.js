import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import api from './services/api';
import { TextInput } from 'react-native-web';
import { Input } from 'react-native-elements';

export default function App() {

  const [weather, setWeather] = useState(null); //para armazenar dados do tempo
  const [cidade, setCidade] = useState('');

  useEffect(() => {
    console.log("CIdade atual:", cidade)

    const fetchWeather = async () => {
      if (!cidade.trim()) {
        setWeather(null);
        return;
      }
      try {
        const response = await api.get('/weather', {
          params: {
            key: '9149fe5e',
            city_name: cidade,
            format: 'json'
          }
        });
        console.log('Resposta da API:', response.data); // debug
        setWeather(response.data.results);
      } catch(error) {
          console.error('Erro ao buscar clima:', error);
      }
    };

    fetchWeather();

  }, [cidade]);
  

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View>
            <Input value={cidade} onChangeText={setCidade} placeholder='Digite aqui a cidade' placeholderTextColor="white"
            containerStyle={styles.input}></Input>
          </View>
          <View style={styles.cartao}>
            {weather ? (
              <>
                <Text>Cidade: {weather.city}</Text>
                <Text>Temperatura: {weather.temp}°C</Text>
                <Text>Descrição: {weather.description}</Text>
              </>
            ) : (
              <Text style={styles.text}>Digite uma cidade para ver o clima.</Text>
            )}
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

  scroll: {
    paddingTop: 60,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },

  input: {
    alignSelf: 'flex-start',
    width: 300,
    height: 50,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 4,
  },
});
