import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { weatherConditions } from '../utils/weatherConditions'

  const Weather = ({ temperature, weather, city }) => {

  return (
    <View 
      style = {[
        styles.weatherContainer,
        {backgroundColor: weatherConditions[weather].color }
      ]}>

      <View style={styles.header}>
        <MaterialCommunityIcons 
          name={weatherConditions[weather].icon}
          size={48}
          color={'#fff'}
        />
        <Text style={styles.temperatureText}>{temperature} °C</Text>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subTitle}>{weatherConditions[weather].subtitle}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    borderWidth: 3,
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  temperatureText: {
    fontSize: 48,
    color: '#fff'
  },

  cityName: {
    fontSize: 24,
    color: '#fff',
  },
  
  body: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    paddingBottom: 40,
  },

  title: {
    fontSize: 48,
    color: '#fff',
  },

  subTitle: {
    fontSize: 24,
    color: '#fff',
  }
});

export default Weather;