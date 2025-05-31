import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import api from './services/api';
import { TextInput } from 'react-native-web';
import { Button, Input } from 'react-native-elements';

export default function App() {

  const [weather, setWeather] = useState(null); //para armazenar dados do tempo
  const [cidade, setCidade] = useState('');

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

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View>
            <Input value={cidade} onChangeText={setCidade} placeholder='Digite aqui a cidade' placeholderTextColor="white"
            containerStyle={styles.input}></Input>
            <Button title="Buscar Clima" onPress={fetchWeather} buttonStyle={styles.button} containerStyle={styles.buttonContainer} />
          </View>
          <View style={styles.cartao}>
            {weather ? (
              <>
                <Text>Cidade: {weather.city}</Text>
                <Text>Temperatura: {weather.temp}°C</Text>
                <Text>Descrição: {weather.description}</Text>
                <Text>Precipitação: {weather.rain}%</Text>
                <Text>Umidade: {weather.humidity}%</Text>
                <Text>Velocidade do Vento: {weather.wind_speedy}</Text>
              </>
            ) : (
              <Text style={styles.text}>Digite uma cidade para ver o clima.</Text>
            )}
          </View>

          <View style={styles.cartao}>
            {weather ? (
              <>
                <Text>Nascer do Sol: {weather.sunrise}</Text>
                <Text>Por do Sol: {weather.sunset}</Text>

              </>
            ) : (
              <Text style={styles.text}>Digite uma cidade para ver o clima.</Text>
            )}
          </View>

          <View style={styles.cartao}>
            <Text>Next Forecast</Text>
            {weather && (
              <>
                <Text>{weather.forecast[0].date}</Text><Text>-</Text> 
                <Text>{weather.forecast[0].weekday}</Text>
                <Text>{weather.sunset}</Text>
                <Text>{weather.forecast[1].date}</Text>
              </>
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    width: '90%',
    padding: 24,
    marginVertical: 12,
    alignItems: 'center',
    elevation: 0, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },

  input: {
    alignSelf: 'flex-start',
    width: 300,
    height: 50,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 4,
  },

  button: {
    backgroundColor: '#0D47A1',
    borderRadius: 25,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  }
});
