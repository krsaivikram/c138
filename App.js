
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import HomeScreen from './screens/home'
import Details from './screens/detail'

export default class App extends Component {
  render(){
  return (
    <View>
     <Appcontainer/>
    </View>
  );
}}
const Appstacknavigator = createStackNavigator({
  home:{screen:HomeScreen,navigationOptions:{headerShown:false}},
  details:{screen:Details}},{initialRouteName:'home'
})
const Appcontainer = createAppContainer(Appstacknavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
