import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';
import {SvgUri} from 'react-native-svg';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResult: '',
      weatherInfo: '',
    };
  }

  componentDidMount() {
    const {apiResult} = this.props.route.params;
    console.log(apiResult);
    this.setState({apiResult});
  }

  renderItem = (item) => {
    console.log('item', item.item);
    const item1 = item.item;
    const imageUri = item1.flag;
    console.log(imageUri);
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{paddingVertical: 20}}>
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: 'contain',
            }}
            // source={{
            //   uri:
            //     'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
            // }}
            source={{
              uri: imageUri,
            }}
          />
        </View>
        <View style={{paddingVertical: 20}}>
          <Text style={styles.text}>capital: {item1.capital}</Text>
          <Text style={styles.text}>population: {item1.population}</Text>
          <Text style={styles.text}>latlng: {item1.latlng}</Text>
        </View>
        <View style={{paddingVertical: 20}}>
          <TouchableOpacity
            style={{
              height: 40,
              backgroundColor: '#0A79DF',
              borderWidth: 0.3,
              borderColor: 'gray',
              width: '100%',
              borderRadius: 10,
              paddingHorizontal: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.handleCapitalWeather(item1.capital);
            }}>
            <Text style={{color: 'white'}}>Capital Weather</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  handleCapitalWeather = async (capital) => {
    const apiKey = '6118a1da82425cdef33d617ccbbb6484';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`;
    await axios
      .get(url)
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          const weatherInfo = res.data.current;
          this.setState({weatherInfo});
        }
      })
      .then((err) => {
        console.log(err);
      });
    if (this.state.weatherInfo) {
      this.props.navigation.navigate('CapitalInfo', {
        weatherInfo: this.state.weatherInfo,
      });
    }
  };

  render() {
    const country = this.state.apiResult;
    console.log(country.capital);
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={country}
          extraData={this.state}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={(item, index) => {
            index.toString();
          }}
        />
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
