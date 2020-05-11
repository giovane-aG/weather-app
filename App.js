import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Weather from './components/Weather';

const App = () => {
  const [latitude,  setLatitude]  = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg,  setErrorMsg]  = useState('');
  const [temperature,  setTemperature]  = useState(0);
  const [weather, setWeather] = useState(0);

  useEffect(() => { 
    getLocation();
  }, [])
  
  useEffect(() => {
      fetchWeather(latitude, longitude);
  }, [longitude])

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    
    if (status !== 'granted') {
      setErrorMsg('Permission not granted');
      alert(errorMsg);
    }

    let { coords } = await Location.getCurrentPositionAsync();
    setIsLoading(false);
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);

  }
  
  const fetchWeather = (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=3f44d3d4b211ac72ca8acb0fc62d29ca`;
    
    fetch(url)
      .then(response => response.json())
      .then(json => {
        const { main } = json.weather[0];
        const { temp } = json.main;
        const { name } = json;
        setTemperature(temp);
        setWeather(main);
        setCity(name);
      });
  }

  return (
    <View style={styles.container}>
      {
        isLoading 
        ? <Text>Buscando o clima</Text> 
        : <Weather 
            temperature={temperature} 
            weather={weather} 
            city={city}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;