import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TransactionScreen  from './screens/BookTransaction';
import SearchScreen from './screens/SearchScreen';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const TabNavigator=createMaterialTopTabNavigator({
  Transaction:{screen:TransactionScreen},
  Search:{screen:SearchScreen}
});

const AppContainer=createAppContainer(TabNavigator);

