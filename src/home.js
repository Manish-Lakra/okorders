import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import axios from 'axios';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: '',
    };
  }

  onChangeText = (text) => {
    this.setState({value: text});
  };

  disabledButton = () => {
    return (
      <View style={{paddingVertical: 30}}>
        <TouchableOpacity
          style={{
            height: 40,
            backgroundColor: '#DAE0E2',
            borderWidth: 0.3,
            borderColor: '',
            width: '100%',
            borderRadius: 10,
            paddingHorizontal: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onpress={() => {
            alert('please enter country code');
          }}>
          <Text style={{color: 'white'}}>submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  activeButton = () => {
    return (
      <View style={{paddingVertical: 40}}>
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
          onPress={this.handleSubmit}>
          <Text style={{color: 'white'}}>submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  handleSubmit = async () => {
    const country = this.state.value;
    console.log(country);

    const url = `https://restcountries.eu/rest/v2/name/${country}`;

    await axios
      .get(url)
      .then((res) => {
        console.log(res);
        const data = res.data;
        this.setState({result: data});
      })
      .catch((err) => {
        console.log(err);
      });

    if (this.state.result) {
      this.props.navigation.navigate('Info', {apiResult: this.state.result});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <TextInput
              style={{
                height: 50,
                borderColor: 'blue',
                borderWidth: 1,
                width: 250,
                borderRadius: 10,
                paddingHorizontal: 30,
              }}
              placeholder="Enter country"
              onChangeText={(text) => this.onChangeText(text)}
              value={this.state.value}
            />
            {this.state.value ? this.activeButton() : this.disabledButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
