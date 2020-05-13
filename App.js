import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/home';
import Splash from './src/Splash';
import Info from './src/Info';
import CapitalInfo from './src/capitalInfo';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="CapitalInfo" component={CapitalInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
