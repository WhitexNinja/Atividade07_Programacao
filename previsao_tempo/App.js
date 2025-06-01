import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import api from './services/api';
import { Input, Button } from 'react-native-elements';

export default function App() {
  const [weather, setWeather] = useState(null);
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
      setWeather(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* INPUT */}
        <Input
          value={cidade}
          onChangeText={setCidade}
          placeholder="Digite a cidade"
          placeholderTextColor="#fff"
          inputStyle={{ color: '#fff' }}
          containerStyle={styles.input}
        />
        <Button
          title="Buscar Clima"
          onPress={fetchWeather}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />

        {/* DADOS DO CLIMA */}
        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>{weather.city}</Text>
            <Text style={styles.temp}>{weather.temp}°</Text>
            <Text style={styles.desc}>{weather.description}</Text>

            {/* INFORMAÇÕES EXTRAS */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>🌧 {weather.rain}%</Text>
              <Text style={styles.infoText}>💧 {weather.humidity}%</Text>
              <Text style={styles.infoText}>🌬 {weather.wind_speedy}</Text>
            </View>

            {/* PREVISÃO PARA HOJE */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Hoje</Text>
              <Text style={styles.cardText}>🌅 {weather.sunrise}</Text>
              <Text style={styles.cardText}>🌇 {weather.sunset}</Text>
            </View>

            {/* PRÓXIMOS DIAS */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Next Forecast</Text>
              <View style={styles.forecastItem}>
                <Text style={styles.day}>{weather.forecast[0].weekday}</Text>
                <Text style={styles.cardText}>{weather.forecast[0].max}° / {weather.forecast[0].min}°</Text>
              </View>
              <View style={styles.forecastItem}>
                <Text style={styles.day}>{weather.forecast[1].weekday}</Text>
                <Text style={styles.cardText}>{weather.forecast[1].max}° / {weather.forecast[1].min}°</Text>
              </View>
            </View>
          </View>
        )}

        {!weather && (
          <Text style={styles.text}>Digite uma cidade para ver o clima.</Text>
        )}

        <StatusBar style="light" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AFFF',
  },
  scroll: {
    paddingTop: 60,
    alignItems: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007ACC',
    borderRadius: 25,
  },
  buttonContainer: {
    width: '90%',
    marginBottom: 30,
  },
  weatherContainer: {
    alignItems: 'center',
    width: '100%',
  },
  city: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
  },
  temp: {
    fontSize: 64,
    color: '#fff',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 16,
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    width: '90%',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  day: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 30,
  },
});
