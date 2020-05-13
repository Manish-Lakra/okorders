import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: '',
    };
  }

  componentDidMount() {
    const {weatherInfo} = this.props.route.params;
    console.log(weatherInfo);
    this.setState({weatherInfo});
  }

  render() {
    const weather = this.state.weatherInfo;
    const weatherIcon = weather.weather_icons;
    console.log(weatherIcon);
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{paddingVertical: 20}}>
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri: weatherIcon,
              }}
            />
          </View>
          <View style={{paddingVertical: 20}}>
            <Text style={styles.text}>temperature: {weather.temperature}</Text>
            <Text style={styles.text}>wind speed: {weather.wind_speed}</Text>
            <Text style={styles.text}>precip: {weather.precip}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 25,
    color: '#0A79DF',
  },
});
